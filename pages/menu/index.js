// pages/menu/index.js
import model from '../../utils/model';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_id:'51',
    store:{},
    classify:[],
    hasBanner:false,
    listHeight:500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndex()
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

  getIndex(){
    model('home/product/all',{
      'storeId':this.data.store_id,
    },'POST').then(res=>{
      console.log(res,"home/product/all");
      this.setData({
        store: res.data.store,
        classify:res.data.classify
      })
      if(res.data.store.banners){
        this.setData({
          hasBanner:true
        })
      }
      this.calClassifyHeight()
    });
  },

  calClassifyHeight(){
    let height1, height2;
    let res = wx.getSystemInfoSync();
    console.log(res)
    let winHeight = res.windowHeight;
    let statusBarHeight = res.statusBarHeight;
    console.log(winHeight)
		let query = wx.createSelectorQuery();
		query.select(".store").boundingClientRect();
		query.exec(res => {
      height1 = res[0].height;
      console.log(height1)
			let query1 = wx.createSelectorQuery();
			query1.select(".store_banner").boundingClientRect();
			query1.exec(res => {
        height2 = res[0].height;
        console.log(height2)
				this.setData({
					listHeight: winHeight - height1 - height2 - statusBarHeight
				});
			});
		});
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