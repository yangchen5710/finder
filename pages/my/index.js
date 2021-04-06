// pages/my/index.js
import model from '../../utils/model';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    top:"-320rpx",
    userInfo:null,
    touch:0,
    bian:true,
    swiperIndex:0,
    member_design:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  test(){
    if(this.data.top){
      this.setData({
        top:0
      })
    }else{
      this.setData({
        top:"-320rpx"
      })
    }
    
  },

  longpress(e){
    if(e.type == 'touchstart'){
      if(this.data.top =="-320rpx"){
        this.setData({
          top:0,
          touch:1
        })
      }else if(this.data.top == 0){
        if(this.data.touch == 1){
          this.setData({
            touch:2
          })
        }
        if(this.data.touch == 2){
          this.setData({
            bian:true
          })
        }  
      }
    } 

    if(e.type == 'touchend' && this.data.top == 0 && this.data.touch == 2 && this.data.bian){
      this.setData({
        top:"-320rpx"
      })
    }
  },

  transition(e){
    this.setData({
      bian:false
    }) 
  },

  changeMember(e){
    console.log(e)
    let current = e.detail.current;
    this.setData({
      swiperIndex:current
    })
  },

  getMemberDesign(){
    model('my/user/getMemberDesign',{},'POST').then(res=>{
        console.log(res,"my/user/getMemberDesign");
        var member_design= {};
        for(var key in res.data){
          var item = res.data[key]
          member_design[item.level-1] = item;
        }
        console.log(member_design)
        this.setData({
          member_design: member_design
        })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        swiperIndex: app.globalData.userInfo.member_level-1
      })
    }
    this.getMemberDesign()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})