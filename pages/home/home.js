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
    borrower: "",
    //用户个人信息
    userInfo: {
      avatarUrl: "", //用户头像
      nickName: "", //用户昵称
    }

  },
  deviceCodeScan: function (e) {
    var that = this
    wx.scanCode({
      scanType: ['barCode'],
      success: (res) => {
        var str = res.result;
        console.log(str)
        if (str == "XGIMIH2LKT") {
          wx.showModal({
            title: '校验成功',
            content: '点击确定按钮输入你的名字',
            confirmColor: '#9ca9e9',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  borrower: that.data.userInfo.nickName
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
          return;

        } else {
          wx.showModal({
            title: '借出失败',
            content: '设备条形码不匹配',
            showCancel: false,
            confirmColor: '#9ca9e9'
          });
          return;
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              that.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)

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