// pages/category/category.js
Page({
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '洁面皂',
            image: "../../images/cart1.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "../../images/cart1.png"
          },
          {
            child_id: 3,
            name: '洁面乳',
            image: "../../images/cart1.png"
          },
          {
            child_id: 4,
            name: '面部祛角质',
            image: "../../images/cart1.png"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '气垫bb',
            image: "../../images/cart1.png"
          },
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../images/cart1.png"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "../../images/cart1.png"
          },
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
})  
