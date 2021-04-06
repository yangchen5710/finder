// pages/fuli/fuli.js
import model from '../../utils/model';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperChange:'height:250rpx;',
    pck_banner: {},
    pck_activitys: [],
    card_activitys: [],
    swiperIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndex()
  },

  getIndex(){
    model('activity/fuli-go/index',{},'POST').then(res=>{
        console.log(res,"activity/fuli-go/index");
        this.setData({
          pck_banner: res.data.pck_banner,
          pck_activitys: res.data.pck_activitys,
          card_activitys: res.data.card_activitys
        })

    });
  },

  goGiftCard(e){
    var giftCard = e.currentTarget.dataset.giftcard
    wx.navigateTo({
      url: '../fuli/gift_card/detail',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromFuli', { data: giftCard })
      }
    })
  },

  swiperChange(e){
    let current = e.detail.current;
    this.setData({
      swiperIndex:current
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