// pages/store_operation_category_add/store_operation_category_add.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],
    fileID:"",
  },
    // 上传图片1
    upload_img:function(){
      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          console.log("当前时间戳为：" + timestamp);
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          wx.cloud.uploadFile({
            cloudPath: 'category/'+timestamp+'.png',
            filePath: tempFilePaths[0], // 文件路径
            success: function(res) {
              // get resource ID
              console.log(res.fileID)
              that.setData({
                img:that.data.img.concat(res.fileID)
              })
            },
            fail: function(res) {
              // handle error
            }
          })
        }
      })
    },
    // 删除图片
    // 删除数组中指定下标
    delete: function (e) {
      let that = this
      console.log(that.data.img)
      console.log(e.currentTarget.dataset.id)
      var id = e.currentTarget.dataset.id;
      var img= that.data.img;
      img.splice(id,1)
      that.setData({
        img: img
      })
      wx.cloud.deleteFile({
        fileList: [e.currentTarget.dataset.src],
        success: res => {
          // handle success
          console.log(res.fileList)
        },
        fail: err => {
          // handle error
        },
      })
      console.log(that.data.img)
    },

    //选择上传下载打开文件

    choose_file(){
      wx.chooseMessageFile({
        count: 1,
        type: 'all',
        success:res=> {
          console.log(res)
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFiles
          let tempFile = res.tempFiles[0]
          this.upload_file(tempFile.name,tempFile.path)
        }
      })
    },

    upload_file(name,tempUrl){
      let that = this
      var fileID = that.data.fileID
      console.log("下载链接",fileID)
        wx.cloud.uploadFile({           // 上传
          cloudPath: name,
          filePath: tempUrl, 
          success: res => {
            // get resource ID
            console.log("上传成功",res)
            that.setData({
              fileID:res.fileID
            })
            wx.cloud.downloadFile({       // 下载
              fileID:res.fileID
            }).then(res=>{
              console.log("下载成功",fileID)
              wx.openDocument({           // 打开
                filePath: res.tempFilePath,
                success: function(res){
                  console.log("打开文档成功",res)
                }
              })
            }).catch(res=>{
              console.log("下载失败",res)
            })
          },
          fail: err => {
            // handle error
          }
        })
    },

    // 删除文件
    // 删除数组中指定下标
    // delete2: function (e) {
    //   let that = this
    //   console.log(that.data.fileID)
    //   console.log(e.currentTarget.dataset.id)
    //   var fileID= that.data.fileID;
    //   that.setData({
    //     fileID: fileID
    //   })
    //   wx.cloud.deleteFile({
    //     fileList: [fileID],
    //     success: res => {
    //       // handle success
    //       console.log(res)
    //     },
    //     fail: err => {
    //       // handle error
    //     },
    //   })
    //   console.log(that.data)
    // },    


  submit:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.name!==""&&that.data.img.length!==0&&that.data.fileID!==""){
      db.collection('category').add({
        data:{
          name:e.detail.value.name,
          src:that.data.img,
          file_src:that.data.fileID,
        },success:function(res){
          console.log(that.data.fileID)
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_category/store_operation_category',
          })
        }
      })
    }else{
      wx.showToast({
        title: '您还未填完整',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('category').get({
      success:function(res){
        console.log('分类获取成功',res)
        that.setData({
          category:res.data
        })
      },fail:function(res){
        console.log('分类获取失败',res)
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
    let that = this
    wx.redirectTo({
      url: '../store_operation_category/store_operation_category',
    })
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