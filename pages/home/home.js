// pages/home/home.js
// 初始化数据库
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceTypes: [{
        "id": "all",
        "name": "全部设备"
      },
      {
        "id": "projector",
        "name": "投影仪"
      },
      {
        "id": "phone",
        "name": "移动设备"
      },
      {
        "id": "laptop",
        "name": "笔记本"
      },
      {
        "id": "router",
        "name": "路由器"
      },
      {
        "id": "accessory",
        "name": "配件"
      },
    ],
    deviceTypeSelected: {
      name: '全部设备',
      id: 'all'
    },
    onLoadStatus: true,
    scrolltop: 0,
    userName: "",
    userDpt: " ",
    authorize: false,
    deviceData: [],
  },
  //跳转到搜索页面
  goSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  //跳转到登录页面
  goLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //跳转到登录页面
  goDeviceUpload: function () {
    wx.navigateTo({
      url: '/pages/device-upload/device-upload'
    })
  },
  //设备类别选择
  onDeviceTypeClick: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    console.log(e)
    console.log(id)
    console.log(that.data.deviceTypeSelected.id)
    if (id === that.data.deviceTypeSelected.id) {
      that.setData({
        scrolltop: 0,
      })
    } else {
      that.setData({
        deviceTypeSelected: {
          id: id
        },
        scrolltop: 0
      })
      that.loadData(id)
    }
  },
  /**
   * 从云数据库获取全部设备信息
   * 
   */
  loadData: function (e) {
    let self = this;
    if(e==='all'){
    db.collection('device_data')
      .get({
        success: function (res) {
          self.setData({
            deviceData: res.data,
          })
        }
      });
    }else{
      db.collection('device_data')
      .where({
        deviceType: e
      })
      .get({
        success: function (res) {
          self.setData({
            deviceData: res.data,
          })
        }
      });
    }
  },
  /**
   * 上拉触底加载更多设备信息
   * 
   */
  loadMoreData: function (e) {
    let self = this;
    let oldData = self.data.deviceData;
      if(e==='all'){
        db.collection('device_data')
          .skip(oldData.length)
          .get({
            success: function (res) {
              self.setData({
                deviceData: oldData.concat(res.data),
              })
            }
          });
        }else{
          db.collection('device_data')
          .where({
            deviceType: e
          })
          .skip(oldData.length)
          .get({
            success: function (res) {
              self.setData({
                deviceData: oldData.concat(res.data),
              })
            }
          });
        }
  },
  //加载用户授权信息
  loadUserData: function (e) {
    let self = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data["name"])
        self.setData({
          userName: res.data["name"]
        })
        db.collection('user')
          .where({
            name: self.data.userName
          })
          .get({
            success: function (res) {
              console.log(res)
              console.log("获取用户数据成功", res.data[0]["authorize"])
              var _authorize = wx.getStorageSync('user')
              _authorize.authorize = res.data[0]["authorize"]
              wx.setStorageSync('user', _authorize)
            }
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
          userName: res.data["name"],
          userDpt: res.data["department"],
          authorize: res.data["authorize"]
        })
        console.log(res.data.authorize)
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
                              borrowerName: self.data.userName,
                              borrowerDepartment: self.data.userDpt
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
    wx.showLoading({
      title: '加载中',
    })
    let self = this
    self.loadData();
    self.loadUserData();
    wx.hideLoading()
    const device_watcher = db.collection('device_data')
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
    const user_watcher = db.collection('user')
      .where({
        authorize: _.exists(true)
      })
      .watch({
        onChange: function (snapshot) {
          self.loadUserData();
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