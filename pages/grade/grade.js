// pages/grade/grade.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1:["全部","2022-2023","2021-2022","2020-2021","2019-2020","2018-2019","2017-2018"],
    index1:0,
    array2:["全部","第一学期","第二学期"],
    index2:0,  
  },
  out:function(e){

  },
  query:function(e){
    wx.cloud.database().collection('student').get({
      success:(res)=>{
        let bgs=res.data
        console.log(res)
        const that=this
        var fl=0;
        for(let i=0;i<bgs.length;i++){
          if(app.globalData.idnumber==bgs[i].sno){
            fl=1;
          }
        }
        if(fl==0)
        {
          wx.showToast({
            title: '未找到学生资料',
            icon: 'none',
            duration: 2000
          })
        }
        else{
          wx.navigateTo({
            url: '/pages/gradedetail/gradedetail?year='+this.data.index1+'&term='+this.data.index2,
          })
        }
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
    // 生命周期函数--监听页面初次渲染完成
    
  },
  bindPickerChange1: function (e) {

    this.setData({
      index1:e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2:e.detail.value
    })
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