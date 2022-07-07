// pages/pay/pay.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultType: "",
    resultContent: "",
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gg_txt = options.gg_txt;
    console.log(gg_txt)
 
    if (gg_txt == "") {
      this.setData({
        resultType: "warn",
        resultContent: "支付失败",
     
      });
    } else {
      this.setData({
        resultType: "success",
        resultContent: "支付成功",
     
      });
    }
  },
returntransaction:function(e){
  wx.showToast({
    title: '返回',
    icon: 'success',
    duration: 1000,
    success: function () {
      setTimeout(function () {
        wx.navigateBack({ belta: 1 })
      }, 100)
    }
  })}
    
   
})