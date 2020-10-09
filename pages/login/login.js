// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    password:'',
  },
//获取输入的账号
getName(event) {
  //console.log('账号', event.detail.value)
  this.setData({
    name: event.detail.value
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
  let name = this.data.name
  let password = this.data.password
  console.log('账号', name, '密码', password)
  if (!/^[\u4e00-\u9fa5]+$/i.test(name)) {
    wx.showToast({
      icon: 'none',
      title: '姓名只能是纯汉字',
    })
    return
  }
  if (password.length < 4) {
    wx.showToast({
      icon: 'none',
      title: '密码至少4位',
    })
    return
  }
  
  //登陆
  wx.cloud.database().collection('user').where({
    name: name
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
        wx.switchTab({
          url: '/pages/home/home',
        })
        //保存用户登陆状态
        wx.setStorageSync('user', user)
      } else {
        console.log('登陆失败')
        wx.showToast({
          icon: 'none',
          title: '姓名或密码不正确',
        })
      }
    },
    fail(res) {
      console.log("获取数据失败", res)
    }
  })
  },
  //点击注册
  register(){
    wx.navigateTo({
      url: '/pages/register/register',
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