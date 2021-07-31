// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }

const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud1-0g2ishqqbbb43d81"
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('order').doc(event.id).get()
}