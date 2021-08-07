// pages/shopping_cart/shopping_cart.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    money:0,
    product_now:[],
    product_id:[],
    delete_id:[]
  },
  // 支付事件
  pay:function(e){
    let that = this
    db.collection('shopping_cart').where({
      product_checked:"true"
    }).get({
      success:function(res){
        console.log('获取产品成功',res)
        if(res.data.length == 0){
          wx.showToast({
            title: '您还未选择产品',
            icon:"none"
          })
        }else{
          wx.redirectTo({
            url: '../pay/pay'
          })
        }
      },fail:function(res){
        console.log('获取产品失败',res)
      }
    })
  },

  // 计算金额
  get_money_sum() {
    let that = this
    let money_sum = 0
    for(var x = 0;x<that.data.product.length;x++){
      if(that.data.product[x].product_checked == "true"){
        money_sum=money_sum+(that.data.product[x].product_num*that.data.product[x].product_price)
      }
    }
    that.setData({
      money:money_sum
    })
  },
    // 选择事件
    choose:function(e){
      let that = this
      console.log(e)
      that.setData({
        delete_id:that.data.delete_id.concat(e.detail.value[0])
      })
      if(e.detail.value.length !== 0){
        db.collection('shopping_cart').doc(e.target.dataset.id).update({
          data:{
            product_checked:"true"
          },success:function(res){
            that.onLoad()
          }
        })
      }else{
        db.collection('shopping_cart').doc(e.target.dataset.id).update({
          data:{
            product_checked:""
          },success:function(){
            that.onLoad()
          }
        })
      }
    },
//quanxuan
    checkedAll:function(e){
      let that = this
      console.log(e)
      if(that.checked == true){
        db.collection('shopping_cart').update({
          data:{
            product_checked:"true"
          },success:function(res){
            that.onLoad()
          }
        })
      }else{
        db.collection('shopping_cart').update({
          data:{
            product_checked:""
          },success:function(){
            that.onLoad()
          }
        })

        that.setData({
          product_checked:that.data.product_checked
        })        
      }
      
    },

  // 商品删除
  delete:function(){
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '确认删除选中的产品么？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name:"product_delete",
            success:function(res){
              console.log('删除产品成功',res)
              that.onLoad()
            },fail:function(res){
              console.log('删除产品失败',res)
            }
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    // wx.cloud.callFunction({
    //   name:"product_delete",
      // success:function(res){
      //   console.log('删除商品成功',res)
      //   that.onLoad()
      // },fail:function(res){
      //   console.log('删除商品失败',res)
    //   }
    // })

  },



  // 商品数量加事件
  product_plus:function(e){
    let that = this
    console.log(e)
    db.collection('shopping_cart').doc(e.target.dataset.id).update({
      data: {
        product_num: _.inc(1)
      }, success:function(res){
        console.log('商品数量加一',res)
        that.onLoad()
      },fail:function(res){
        console.log('获取商品价格失败',res)
      }
    })
  },
  // 商品数量减事件
  product_subtract:function(e){
    let that = this
    console.log(e)
    if(e.target.dataset.product_num<2){
      wx.showToast({
        title:'可选中产品后点击“选中删除”按钮进行批量删除',
        icon:"none"
      })
    }else{
      db.collection('shopping_cart').doc(e.target.dataset.id).update({
      data: {
        product_num: _.inc(-1)
      }, success:function(res){
        console.log('商品数量加一',res)
        that.onLoad()
      },fail:function(res){
        console.log('获取商品价格失败',res)
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('shopping_cart').get({
      success:function(res){
        console.log('获取购物车商品成功',res)
        that.setData({
          product:res.data,
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取购物车商品失败',res)
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
    let that = this
    db.collection('shopping_cart').get({
      success:function(res){
        console.log('获取购物车商品成功',res)
        that.setData({
          product:res.data,
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取购物车商品失败',res)
      }
    })
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