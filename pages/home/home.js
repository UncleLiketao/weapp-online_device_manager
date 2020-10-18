// pages/home/home.js
// 初始化数据库
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrowerName: "",
    borrowerDepartment: " ",
    authorize: false,
    deviceData: [],
  },
  //跳转到搜索页面
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  /**
   * 从云数据库获取全部设备信息
   * 
   */
  loadData: function () {
    let self = this;
    db.collection('device_data')
      .limit(10)
      .get({
        success: function (res) {
          self.setData({
            deviceData: res.data,
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    self.loadData();
    const device_watcher = db.collection('device_data')
      .where({
        deviceNo: _.exists(true)
      })
      .watch({
        onChange: function (snapshot) {
          self.loadData()
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
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