// pages/search/search.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:[],
  },

  // 搜索事件
  search:function(e){
    let that = this
    db.collection('product').where({
      // name:e.detail.value
      name:{								                    //模糊查询数据所在列的名
          $regex:'.*' +e.detail.value+ '.*',		//queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i'							            //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
    }).get({
      success:function(res){
        that.setData({
          search:res.data
        })
        console.log('搜索成功成功',that.data.search)
        if(that.data.search == ""){
          wx.showToast({
            title: '抱歉，未找到产品',
            icon:"none"
          })
        }
      },
      fail:function(res){
        console.log('搜索失败',res)
      },
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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