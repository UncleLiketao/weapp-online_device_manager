// pages/home/home.js
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
    searchData: [],
    deviceType: "phone"
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
   * 
   */
  loadData: function () {
    let self = this;
    db.collection('device_data')
      .where({
        deviceType: self.data.deviceType
      })
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
   * 从云数据库获取全部设备信息
   * 
   */
  loadMoreData: function () {
    let self = this;
    let oldData = self.data.deviceData;
    db.collection('device_data')
      .where({
        deviceType: self.data.deviceType
      })
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
        deviceType: self.data.deviceType
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
              wx.cloud.callFunction({
                name: "deviceNoCheck",
                data: {
                  deviceNo: str
                },
                success: res => {
                  if (res.result.code == 200) {
                    wx.showModal({
                      title: '已找到匹配的设备',
                      content: '点击确定键借出设备',
                      confirmColor: '#9ca9e9',
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
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
                }
              })
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
    let self = this
    self.loadData();
    const watcher = db.collection('device_data')
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
    this.loadMoreData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})