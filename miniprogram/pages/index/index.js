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
  update_open_file:function(e){
    let that = this
    console.log(e)    
    console.log('分类的id已经获取到了',e.currentTarget.dataset.item.file_src)
    // db.collection('category').doc(e.currentTarget.dataset.item.id).get({
    //   success:function(res){
    //     console.log('获取成功',res)
    //     that.setData({
    //       file_src:res.data.file_src,
    //       id:res.data._id
    //     })
    //   },fail:function(res){
    //     console.log('获取失败',res)
    //   }
    // })
    wx.cloud.downloadFile({
      // fileID: res.file_src, // 文件 ID
      fileID: e.currentTarget.dataset.item.file_src,
      success: res => {
        // 返回临时文件路径
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: console.error
    })

    // let that = this
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success (res) {
    //     var timestamp = Date.parse(new Date());
    //     timestamp = timestamp / 1000;
    //     console.log("当前时间戳为：" + timestamp);
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //     console.log(tempFilePaths)
    //     wx.cloud.uploadFile({
    //       cloudPath: 'product/'+timestamp+'.png',
    //       filePath: tempFilePaths[0], // 文件路径
    //       success: function(res) {
    //         // get resource ID
    //         console.log(res.fileID)
    //         that.setData({
    //           img:that.data.img.concat(res.fileID)
    //         })
    //       },
    //       fail: function(res) {
    //         // handle error
    //       }
    //     })
    //   }
    // })
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
          console.log('分类获取失败',res)
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
