// pages/device-upload/device-upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceTypes: ["投影仪", "手机", "笔记本电脑", "配件"],
    deviceTypeIndex: 0,
  },
  methods: {
    bindDeviceTypeChange: function (e) {
      console.log('picker deviceType 发生选择改变，携带值为', e.detail.value);
      this.setData({
        deviceTypeIndex: e.detail.value
      })
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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