//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
    /**
   * 页面的初始数据
   */
  data: {
    img: '',
    name: '',
    menuitems: [
      { text: '我的信息', url: '../userinfo/userinfo', icon: '/icons/myinfo.png', tips: '' },
      { text: '关于我们', url: '../userinfo/userinfo', icon: '/icons/aboutus.png', tips: '' },
      { text: '意见反馈', url: '../userinfo/userinfo', icon: '/icons/feedback.png', tips: '' },
      { text: '检查更新', url: '../userinfo/userinfo', icon: '/icons/update.png', tips: '' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img:app.globalData.userIm.userInfo.avatarUrl,
      name:app.globalData.userIm.userInfo.nickName
    })
  },
})