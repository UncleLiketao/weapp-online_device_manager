// pages/my-device/my-device.js
// 初始化数据库
const db = wx.cloud.database()
const _ = db.command



Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceData: [],
    userName:"",
  },
   /**
   * 搜索函数
   * 
   */
  loadUserData: function () {
    let self = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data["name"])
        self.setData({
          userName: res.data["name"]
        })
        db.collection('device_data')
          .where({
            owner: self.data.userName
          })
          .get({
            success: function (res) {
              console.log(res)
              self.setData({
                deviceData: res.data
              })
            }
          })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadUserData()
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