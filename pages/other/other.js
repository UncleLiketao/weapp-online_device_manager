// pages/home/home.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrowerName: "",
    borrowerDepartment: " ",
    authorize: false,
    deviceData: [{}],
    deviceNoList: [],
    searchData: [],
    deviceType: "other"
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
   * 从云数据库获取全部设备信息
   * @param {*} key 搜索框输入的值
   */
  getDeviceData: function () {
    let self = this;
    let key = this.staticData.inputValue;
    console.log("搜索的内容", key)
    let oldData = self.data.deviceData;
    let deviceNo = [];
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('device_data')
    .where(_.or([{
      deviceName: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      }),
      deviceType: self.data.deviceType
    }]))
    .limit(10)
    .get({
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          deviceNo.push(res.data[i].deviceNo);
        }
        self.setData({
          deviceData: res.data,
          deviceNoList: deviceNo
        })
        console.log(self.data.deviceData)
        console.log(self.data.deviceNoList)
      }
    }) 
  },
  /**
   * 扫码函数
   *
   */
  deviceCodeScan: function (e) {
    let self = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        console.log(res.data)
        self.setData({
          borrowerName: res.data["name"],
          borrowerDepartment: res.data["department"],
          authorize: res.data["authorize"]
        })
        if (self.data.authorize) {
          wx.scanCode({
            scanType: ['barcode', 'qrCode'],
            success: (res) => {
              var str = res.result;
              console.log(str)
              if (self.data.deviceNoList.includes(str)) {
                wx.showModal({
                  title: '已找到匹配的设备',
                  content: '点击确定键借出设备',
                  confirmColor: '#9ca9e9',
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      const db = wx.cloud.database();
                      db.collection('device_data').where({
                        deviceNo: str
                      }).update({
                        data: {
                          borrowerName: self.data.borrowerName,
                          borrowerDepartment: self.data.borrowerDepartment
                        },
                        success: function (res) {
                          console.log(res)
                        }
                      });
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                });
                return;
              } else {
                wx.showModal({
                  title: '借出失败',
                  content: '未找到匹配的设备',
                  showCancel: false,
                  confirmColor: '#9ca9e9'
                });
                return;
              }
            },
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '当前账户未授权，请联系管理员',
          })
        }
      },
      fail(res) {
        wx.navigateTo({
          url: '/pages/login/login',
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.getDeviceData();
    const db = wx.cloud.database()
    const _ = db.command
    const watcher = db.collection('device_data')
      .where({
        deviceNo: _.exists(true)
      })
      .watch({
        onChange: function (snapshot) {
          self.getDeviceData();
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