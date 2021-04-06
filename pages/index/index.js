//index.js
import model from '../../utils/model';
//获取应用实例
const app = getApp()

const QR = require('../../utils/weapp-qrcode.js')

const member_level_img = {
    '1':'../../icons/qingmai.png',
    '2':'../../icons/yinmai.png',
    '3':'../../icons/jingmai.png',
    '4':'../../icons/bojing.png',
    '5':'../../icons/zuanshi.png',
}

Page({
  data: {
    scrollTop:'--top:350rpx;--top_mark:0;',
    motto: 'Hello World',
    userInfo: {},
    userWechat: {},
    hasUserInfo: false,
    hasUserPhone: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    banner:[],
    storeList:[],
    current_store:{},
    number:7,
    cups:0,
    days:3,
    isShowQrcode:false,
    qrcodeURL:''
  },
  scroll(e) {
    this.setData({
      scrollTop: this.data.scrollTop,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        cups:2
      })
      this.login()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          cups:2
        })
        this.login()
      } 
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            cups:2
          })
          this.login()
        }
      })
    }
    model('base/site/config-list').then(res => {
      console.log(res,"base/site/config-list")
      this.setData({     
        banner: res.data.homeBanners
      })
    }).catch(e => {
      console.log(e, '@@@ base/site/config-list error')
    })
  },
  onShow: function () {
    this.getUserLocation()
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  getOpenId(){
    model('my/user/get-open-id',{
      "code":wx.getStorageSync('code'),
    }).then(res=>{
        console.log(res,"my/user/get-open-id");
        wx.setStorageSync('openid', res.data.openid);
        wx.setStorageSync('session_key', res.data.session_key);
        this.login()
    });
  },
  login() {
    model('my/user/login',{
      "channel":"小程序",
      "sign":"xcx",
      "user_name":this.data.userInfo.nickName,
      "user_avatar":this.data.userInfo.avatarUrl,
      "unionId":wx.getStorageSync('unionid'),
      "openId":wx.getStorageSync('openid')
    }).then(res=>{
        console.log(res,"my/user/login");
        if(res.data.token){
          wx.setStorageSync('token', res.data.token);
        }
        if(res.data.member){
          //app.globalData.memberData = res.data.member
          if(res.data.member.tel){
            //app.globalData.hasUserPhone = true
            this.setData({
              hasUserPhone:true
            })
          }
          this.data.userInfo.recharge = res.data.member.recharge
          this.data.userInfo.member_level = res.data.member.member_level
          this.data.userInfo.member_energy_score = res.data.member.member_energy_score
          this.data.userInfo.member_points = res.data.member.member_points
          this.data.userInfo.if_new_member = res.data.member.if_new_member
          this.data.userInfo.coupons_num = res.data.member.coupons_num
          this.data.userInfo.create_time = res.data.member.create_time
          this.setData({
            userInfo: this.data.userInfo,
            member_level_img: member_level_img[res.data.member.member_level],
            cups : res.data.member.activity_cups
          })
          app.globalData.userInfo = this.data.userInfo
          this.getUserQrCode()
        }
    });
  },
  getUserQrCode(){
    model('my/user/pay-qrcode',{},'POST').then(res=>{
        console.log(res,"my/user/pay-qrcode");
        var imgData = QR.drawImg(res.data.data, {
          typeNumber: 4,
          errorCorrectLevel: 'M',
          size: 200
        })
        this.setData({
          qrcodeURL: imgData
        })
    });
  },
  getStore(location) {
    model('home/lbs/get-store-list-with-city',{
      "lng":location.longitude,
      "lat":location.latitude
    }).then(res=>{
        console.log(res,"home/lbs/get-store-list-with-city");
        this.setData({
          storeList: res.data.data.stores,
          current_store: res.data.data.current_store
        })

    });
  },
  getUserLocation() {
    let self = this
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        wx.setStorageSync('location', res);
        self.getStore(res)
      },
      fail (){
      self.showLocationModal()
      }
    })
  },
  showLocationModal(){
    let self = this
    wx.showModal({
      title: '授权位置信息',
      content: '为了更好给您提供完整的功能，请确认授权您的位置信息',
      confirmText: '授权',
      confirmColor: '#CCAA7A',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.openSetting({
            success (res) {
              console.log(res.authSetting)
              // if(res.authSetting('scope.userLocation')){
              //    self.getUserLocation()
              // }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          self.showLocationModal()
        }
      }
    })
  },
  getUserInfo: function(e) {
    let self = this
    console.log(e)
    if(e.detail.userInfo){
      var userInfo = e.detail.userInfo
      app.globalData.userInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true,
        cups:2
      })
      wx.login({
        success (res) {
          if (res.code) {
            wx.setStorageSync('code', res.code);
            //发起网络请求
            self.getOpenId()
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

      
      
    } 
  },
  getPhoneNumber: function(e) {
    console.log(e);
    if(e.detail.errMsg == 'getPhoneNumber:ok'){
      console.log('success');
      model('my/user/getPhoneNum',{
        "openId":wx.getStorageSync('openid'),
        "sessionKey":wx.getStorageSync('session_key'),
        "phoneEncryptedData":e.detail.encryptedData,
        "phoneIv":e.detail.iv
      }).then(res=>{
          console.log(res,"my/user/getPhoneNum");
          if(res.data.member){
            //app.globalData.memberData = res.data.member
            if(res.data.member.tel){
              //app.globalData.hasUserPhone = true
              this.setData({
                hasUserPhone:true
              })
            }
          }
      });
    }
  },
  showUserQrcode: function(){ 
    this.setData({
      isShowQrcode: true
    })
    this.getUserQrCode()
  },
  closeMember() {
    this.setData({
      isShowQrcode: false
    })
  },
  goStoreList: function (){
    let self = this
    wx.navigateTo({
      url: '../store/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data,"123")
        },
        someEvent: function(data) {
          console.log(data,"456")
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: self.data.storeList })
      }
    })
  },
  goFuliGo: function (){
    wx.navigateTo({
      url: '../fuli/fuli'
    })
  }
})
