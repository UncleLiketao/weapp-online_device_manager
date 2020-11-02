// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    name: '',
    password: '',
    authorize: false,

    department: ["软件测试部", "GMUI研发部", "中台研发部", "终端研发部", "项目管理部", "用户发展中心","硬件结构部"],
    departmentIndex: 0

  },

  //获取用户名
  getName(event) {
    console.log('获取输入的用户名', event.detail.value)
    this.setData({
      name: event.detail.value
    })
  },
  //获取部门
  bindDepartmentChange: function (e) {
    console.log('picker department 发生选择改变，携带值为', e.detail.value);

    this.setData({
      departmentIndex: e.detail.value
    })
  },
  // 获取密码
  getPassword(event) {
    console.log('获取输入的密码', event.detail.value)
    this.setData({
      password: event.detail.value
    })
  },

  //注册
  register() {
    let name = this.data.name
    let department = this.data.department[this.data.departmentIndex]
    let password = this.data.password
    let authorize = this.data.authorize
    console.log("点击了注册")
    console.log("name", name)
    console.log("department", department)
    console.log("password", password)
    //校验姓名
    if (!/^[\u4e00-\u9fa5]+$/i.test(name)) {
      wx.showToast({
        icon: 'none',
        title: '姓名只能是纯汉字',
      })
      return
    }
    //校验密码
    if (password.length < 4) {
      wx.showToast({
        icon: 'none',
        title: '密码至少4位',
      })
      return
    }
    //注册功能的实现
    wx.cloud.database().collection('user').add({
      data: {
        name: name,
        department: department,
        password: password,
        authorize: authorize
      },
      success(res) {
        console.log('注册成功', res)
        wx.showToast({
          title: '注册成功',
        })
        wx.navigateTo({
          url: '../login/login',
        })
      },
      fail(res) {
        console.log('注册失败', res)
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