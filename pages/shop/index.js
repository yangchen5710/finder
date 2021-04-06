// pages/shop/index.js
import model from '../../utils/model';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    member_points:0,
    point_shop_lists:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  getIndex(){
    model('my/user/point-shop-index',{},'POST').then(res=>{
      console.log(res,"my/user/point-shop-index");
      this.setData({
        point_shop_lists: res.data.point_shop_lists,
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
        member_points: app.globalData.userInfo.member_points,
        userInfo: app.globalData.userInfo,
      })
    }
    this.getIndex()
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