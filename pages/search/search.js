// pages/search/search.js
// 初始化数据库
const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    deviceData: [],
  },
  //搜索输入框初始数据
  staticData: {
    inputValue: ""
  },
  //获取搜索框输入
  handleInputChange(e) {
    this.staticData.inputValue = e.detail.value;
  },
  /**
   * 搜索函数
   * 
   */
  searchData: function () {
    let self = this;
    let key = this.staticData.inputValue;
    console.log("搜索的内容", key)
    db.collection('device_data')
      .where(_.or([{
        deviceName: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        }),
      }]))
      .get({
        success: function (res) {
          self.setData({
            deviceData: res.data,
          })
        }
      })
  },
  /**
   * 上拉触底加载更多设备信息
   * 
   */
  loadMoreSearchData: function () {
    let self = this;
    let oldData = self.data.deviceData;
    let key = this.staticData.inputValue;
    console.log("搜索的内容", key)
    db.collection('device_data')
      .where(_.or([{
        deviceName: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        }),
      }]))
      .skip(oldData.length)
      .get({
        success: function (res) {
          self.setData({
            deviceData: oldData.concat(res.data),
          })
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
    this.searchData();
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
    this.loadMoreSearchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})