//index.js
const db = wx.cloud.database()

Page({
  data:{
     banner:[],
     catecory:[],
     product:[]
  },

  into_search:function(e){
  wx.navigateTo({
    url: '../search/search'
  })
  },

  onLoad: function() {
      let that =this
      db.collection('swiper').get({
        success:function(res){
          console.log('轮播图获取成功',res)
          that.setData({
            banner:res.data
          })
        },
        fail:function(res){
          console.log('轮播图获取失败',res)
        },
      })
      db.collection('category').get({
        success:function(res){
          console.log('分类获取成功',res)
          that.setData({
            category:res.data
          })
        },
        fail:function(res){
          console.log('分取获取失败',res)
        },
      })
      db.collection('product').get({
        success:function(res){
          console.log('产品获取成功',res)
          that.setData({
            product:res.data
          })
        },
        fail:function(res){
          console.log('产品获取失败',res)
        },
      })
  },

})
