// pages/store/index.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeList:[],
    userLocation:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let self = this
    self.getUserLocation()
    console.log(option.query,"store/index")
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      //console.log(data,"上一级页面传过来的数据")
      self.setData({
        storeList: data.data,
      })
    })
  },

  getUserLocation(){
    let self = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']){
          app.globalData.userLocation = true;
          self.setData({
            userLocation:true
          })
        }
      }
    })
  },
  makePhoneCall(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
      fail: res=>{
          console.log(res)
      }
    })
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