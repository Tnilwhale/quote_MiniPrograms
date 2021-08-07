// pages/store_operation_category/store_operation_category.js

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[]
  },

  to_add:function(){
    wx.navigateTo({
    url: '../store_operation_category_add/store_operation_category_add',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    let that = this
    db.collection('category').get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          category:res.data
        })
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