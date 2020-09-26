// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:'',
  },
//获取输入的账号
getAccount(event) {
  //console.log('账号', event.detail.value)
  this.setData({
    account: event.detail.value
  })
  
  },
  //获取输入的密码
  getPassword(event) {
  // console.log('密码', event.detail.value)
  this.setData({
    password: event.detail.value
  })
  },
  //点击登陆
  login() {
  let account = this.data.account
  let password = this.data.password
  console.log('账号', account, '密码', password)
  if (account.length < 4) {
    wx.showToast({
      icon: 'none',
      title: '账号至少4位',
    })
    return
  }
  if (password.length < 4) {
    wx.showToast({
      icon: 'none',
      title: '账号至少4位',
    })
    return
  }
  
  //登陆
  wx.cloud.database().collection('user').where({
    account: account
  }).get({
    success(res) {
      console.log("获取数据成功", res)
      let user = res.data[0]
      console.log("user", user)
      if (password == user.password) {
        console.log('登陆成功')
        wx.showToast({
          title: '登陆成功',
        })
        // wx.navigateTo({
        //   url: '../home/home?name=' + user.name,
        // })
        wx.navigateTo({
          url: '/pages/home/home',
        })
        //保存用户登陆状态
        wx.setStorageSync('user', user)
      } else {
        console.log('登陆失败')
        wx.showToast({
          icon: 'none',
          title: '账号或密码不正确',
        })
      }
    },
    fail(res) {
      console.log("获取数据失败", res)
    }
  })
  
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