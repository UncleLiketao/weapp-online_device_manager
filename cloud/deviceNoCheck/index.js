// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'device-manager-4g758r2s19a6a77f'
})
const db = cloud.database()
const _ = db.command
const result = {
  code: '',
  body: ''
}
// 云函数入口函数
exports.main = (event, context) => {
  return new Promise((resolve, reject) => {
    db.collection('device_data').where({
      deviceNo: _.eq(event.deviceNo)
    }).get().then((res) => {
      if (res.data.length) {
        result.code = 200;
        result.body = "查询到对应设备码"
        resolve(result)
      } else {
        result.code = 404;
        result.body = "未查询到对应设备码"
        resolve(result)
      }
    })
  })
}