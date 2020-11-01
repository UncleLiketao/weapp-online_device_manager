// pages/profile/profile.js
// 初始化数据库
const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    borrowerName: "",
    deviceData: [],
  },
  //跳转登录页面
  goLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //退出登录
  loginOut: function () {
    try {
      wx.removeStorageSync('user')
      wx.reLaunch({
        url: '/pages/profile/profile'
      })
    } catch (e) {
      console.log(e)
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
    try {
      var value = wx.getStorageSync('user')
      if (value) {
        console.log("用户信息缓存存在")
        this.setData({
          auth: true
        })
      } else {
        this.setData({
          auth: false
        })
      }
    } catch (e) {
      console.log(e)
    }

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
    this.setData({
      deviceData: [],
    })
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