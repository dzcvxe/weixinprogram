// pages/update/update.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        version:'',
        yn:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let Version = wx.getAccountInfoSync().miniProgram.envVersion
    console.log('当前版本',Version)
    this.setData({
      version:Version,
      yn:'否'
    })
  },

 check:function(e){
    let Version = wx.getAccountInfoSync().miniProgram.envVersion

    if(Version=this.data.version){
      wx.showToast({
      title: '程序是最新版！',
      icon: 'success',
      duration: 1000
    })}
    else{
      this.setData({
        yn:'是'
      })
      wx.showToast({
      title: '程序不是最新版！',
      icon: 'none',
      duration: 1000
    })}

  },
  reload:function(e){
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})