const app=getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    //   wx.stopPullDownRefresh()
    // },
    myinfo:null
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //var stu = wx.getStorageSync('student');
    //var stu =wx.cloud.database().collection('student').get
    wx.cloud.database().collection('student').get({
      success:(res)=>{
        let bgs=res.data
        console.log('数据表查询成功',res)
        for(let i=0;i<bgs.length;i++){
          if(app.globalData.idnumber==bgs[i].sno)
          {
            console.log('学号查询成功',bgs[i].sno)
            this.setData({ myinfo: bgs[i] });
            
          }
        }
        }
    })
    
    
    // console.log(this.data.myinfo);
  },

  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('student');
          //页面跳转
          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
resetpwd:function(e){
    var no=this.data.myinfo.no;
    wx.navigateTo({
      url: '../password/password?no=' + no,
    })
  },
  setemail: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../email/email?no=' + no,
    })
  }
})