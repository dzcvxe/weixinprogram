// pages/test/test.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examList:[ 
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // let promise =new Promise(function(resolve, reject) {
    wx.cloud.database().collection('exam').get({
      success:(res)=>{
        let bgs=res.data
        const that=this
        for(let i=0;i<bgs.length;i++){
          if(app.globalData.idnumber==bgs[i].sno)
          {
            var cname=""
            var cnum=0
            wx.cloud.database().collection('course').get({
              success:(ret)=>{
                let cr=ret.data
                for(let j=0;j<cr.length;j++){
                  if(cr[j].cno==bgs[i].cno)
                  {
                    cname=cr[j].cname;
                    cnum=cr[j].cnum;
                    break;
                  }
                }
                var tmp={
                  courseName:cname,
                  credit:cnum,
                  start:bgs[i].start,
                  end:bgs[i].end,
                  place:bgs[i].place,
                  time:bgs[i].startExam
                }
                this.setData({
                  examList:that.data.examList.concat(tmp)
                })    
              }
            })
          }
        }
        
        resolve(this.data.examList);
        }
    // })
  });
  // promise.then(function(value) {
  //   examList.sort(function(a,b){
  //     return a.time-b.time;
  //   })
  //   console.log(examList);
  // }
  // )
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