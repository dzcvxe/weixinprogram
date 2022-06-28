// pages/curriculum/curriculum.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
          
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('sc').get({
      success:(res)=>{
        let bgs=res.data
        console.log(res)
        console.log(app.globalData.idnumber)
        const that=this
        for(let i=0;i<bgs.length;i++){
          if(app.globalData.idnumber==bgs[i].sno)
          {
            console.log(bgs[i].sno)
            var cname="";
            wx.cloud.database().collection('course').get({
              success:(ret)=>{
                console.log(ret)
                let cr=ret.data
                for(let j=0;j<cr.length;j++){
                  if(cr[j].cno==bgs[i].cno)
                  {
                    cname=cr[j].cname;
                    break;
                  }
                }
                var tmp={
                  cname:cname,
                  day:bgs[i].weekday,
                  start:bgs[i].starttime,
                  duration:bgs[i].duration
                }
                console.log(tmp)
                this.setData({
                  wlist:that.data.wlist.concat(tmp)
                })
              }
            })
          }
        }
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