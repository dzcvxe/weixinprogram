// pages/gradedetail/gradedetail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:0,
    term:0,
    introduction:"",
    scoreList:[
      
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      year:options.year,
      term:options.term
    })
    wx.cloud.database().collection('sc').get({
      success:(res)=>{
        let bgs=res.data
        console.log(res)
        const that=this
        for(let i=0;i<bgs.length;i++){
          if(app.globalData.idnumber==bgs[i].sno&&(bgs[i].year==options.year||options.year=="0")&&(bgs[i].term==options.term||options.term=="0"))
          {
            var cname="";
            var cnum=0;
            wx.cloud.database().collection('course').get({
              success:(ret)=>{
                console.log(ret)
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
                  grade:bgs[i].grade
                }
                this.setData({
                  scoreList:that.data.scoreList.concat(tmp)
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
    let item1 = ["col1", "col2", "col3","col4","col5"];
    let item2 = ["col4", "col5", "col6","col7","col8"];
    let item = [];
    for (let i = 0; i < 9; i++) {
      item.push(item1);
      item.push(item2)
    }
    this.setData({
      tableInfo:{
        title:["第一","第二","第三","第四","第五"],
        contentItem: item
      }
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