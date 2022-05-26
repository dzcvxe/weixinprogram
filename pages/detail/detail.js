// pages/detail/detail.js
const app=getApp()
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id0:"",
    detail:[],
    clicktimes:0,
    imgUrl:[],
    imgId:[],
    replyValue:"",
    rpl:{
      headurl:"",
      nickname:"",
      time:"",
      zanNum:0,
      content:""
    }
  },
  clickimage: function (e) {
    var index = e.target.dataset.index
    wx.previewImage({
      urls: [this.data.imgUrl[index]], 
    })
  },
  getReply: function(e){
    this.setData({
      rpl:{
        headurl:app.globalData.userIm.userInfo.avatarUrl,
        nickname:app.globalData.userIm.userInfo.nickName,
        content: e.detail.value,
        time:util.formatTime(new Date()),
        zanNum:0
      }
    })
  },
  upload:function(e){
    const _ = wx.cloud.database().command
    wx.cloud.database().collection('blogs').doc(this.data.id0).update({
      data:{
        replies: _.push(this.data.rpl)
      },
      success: function() {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 1000,
          success: function () {
          }
        })
        this.setData({
          replyValue:""
        })
      }
    })
  },
  reply:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id0:options.id
    })
    wx.cloud.database().collection('blogs').get({
      success:(res)=>{
        let bgs=res.data
        const that=this
        for(let i=0;i<bgs.length;i++){
          if(bgs[i]._id==options.id)
          {
            this.setData({
              detail:that.data.detail.concat(bgs[i])
            })
            console.log(this.data.detail)
            let temp=[]
            for(let j=0;j<this.data.detail[0].imgid.length;j++){
              wx.cloud.downloadFile({
                fileID: this.data.detail[0].imgid[j],
                success: res => {
                  // get temp file path
                  console.log(res.tempFilePath)
                  temp.push(res.tempFilePath)
                  this.setData({
                    imgUrl:temp
                  })
                },
                fail: err => {
                  // handle error
                }
              })
            }
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
    let pgs=getCurrentPages();
    let cp=pgs[pgs.length-1];
    console.log(cp);
    const _ = wx.cloud.database().command;
    wx.cloud.database().collection('blogs').doc(cp.options.id).update({
      data: {
        clicktimes: _.inc(1)
      }
    })
  }
,

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