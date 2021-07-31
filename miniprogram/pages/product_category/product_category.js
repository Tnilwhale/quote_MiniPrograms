// pages/product_category/product_category.js

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
    product:[],
    category_now:"",
    curIndex: 0
  },
  get_product_category:function(e){
    let that = this
    that.setData({
      category_now:e.currentTarget.dataset.name,
      curIndex:e.target.dataset.index
    })
    that.get_product()
  },
  // 获取当前分类的商品
  get_product:function(){
    let that = this
    db.collection('product').where({
      category:that.data.category_now
  }).get({
    success:function(res){
      console.log('获取分类成功',res)
      that.setData({
        product:res.data
      })
    },fail:function(res){
      console.log('获取分类成功',res)
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    db.collection('category').get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          category:res.data
        })
      },fail:function(res){
        console.log('获取分类失败',res)
      }
    })
    db.collection('product').where({
        category:"SaaS"
    }).get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          product:res.data
        })
      },fail:function(res){
        console.log('获取分类失败',res)
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