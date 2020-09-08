// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    borrowIsDisabled: false,
    returnIsDisabled: true,
    borrower: ""
  },
  clickBorrow: function (e) {
    if (!this.data.borrowIsDisabled) {
      this.setData({
        borrowIsDisabled: true, //修改isDisabled的值为true（即启用状态）
        returnIsDisabled: false,
        borrower: "李柯陶"
      })
    } else { //当disabled=true时
      this.setData({
        borrowIsDisabled: false, //修改isDisabled的值为false（即禁用状态）
        returnIsDisabled: true,
        borrower:""
      })
    }
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