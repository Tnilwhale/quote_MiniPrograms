// pages/store_operation_indexbanner_upload/store_operation_indexbanner_upload.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],
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
          cloudPath: 'swiper/'+timestamp+'.png',
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



  submit:function(e){
    let that = this
    console.log(e)
    if(that.data.img.length!==0){
      db.collection('swiper').add({
        data:{
          src:that.data.img,
        },success:function(res){
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_indexbanner_upload/store_operation_indexbanner_upload',
          })
        }
      })
    }else{
      wx.showToast({
        title: '您还有未上传图片',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('swiper').get({
      success:function(res){
        console.log('轮播获取成功',res)
        that.setData({
          swiper:res.data
        })
      },fail:function(res){
        console.log('轮播获取失败',res)
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
      url: '../store_operation_indexbanner_upload/store_operation_indexbanner_upload',
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