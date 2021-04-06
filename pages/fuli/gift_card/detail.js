// pages/fuli/gift_card/detail.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giftcard:{},
    selected:true,
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromFuli', function(data) {
      console.log(data.data,"上一级页面传过来的数据")
      self.setData({
        giftcard: data.data,
      })
    })
  },
  
  checkedTap(){
    this.setData({
      'selected': !this.data.selected
    })
  },
  add(){
    var num = this.data.num;
    if(num >=1000){
       return false
    }
    this.setData({
      'num': num+1
    })
  },
  cut(){
    var num = this.data.num;
    if(num <= 1){
       return false
    }
    this.setData({
      'num': num-1
    })
  },
  agreement_link(){
    wx.navigateTo({
      url: '../../pay/agreement/link'
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