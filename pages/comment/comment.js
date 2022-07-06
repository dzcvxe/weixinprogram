// pages/index/index.js
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    telValue:"",
    select: false,
    tihuoWay: '选择评价等级',
    cateItems:[
     
    ],
    curNav:1,
    curIndex:0,
    curclass:{},
    tname:""
  },
  getInput: function (e) {
    this.setData({
      telValue: e.detail.value
    })
  },
  bindShowMsg() {
    this.setData({
        select:!this.data.select
    })
},
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
        tihuoWay: name,
        select: false
    })
},
  subm(e){
    var id0=""
    wx.cloud.database().collection('sc').get({
      success:(ret)=>{
        let cr=ret.data
        for(var i=0;i<cr.length;i++){
          if(cr[i].sno==app.globalData.idnumber&&cr[i].cno==this.data.curclass.cno){
            id0=cr[i]._id
            console.log(id0)
            wx.cloud.database().collection("sc").doc(id0).update({
              data:{
                level:this.data.tihuoWay,
                judge:this.data.telValue
              }, success: function() {
                wx.showToast({
                  title: '评论成功',
                  icon: 'success',
                  duration: 1000,
                  success: function () {
                  }
                })
              }
            }).then(res=>{
              console.log(res)
            })
          }
        }
      }
    })
},
  switchRightTab:function(e){
    let id = e.target.dataset.id,index=e.target.dataset.index;
    this.setData({
      curNav:id,
      curIndex:index
    })
    wx.cloud.database().collection('course').get({
      success:(ret)=>{
        let cr=ret.data
        var cname="";
        for(let j=0;j<cr.length;j++){
          if(cr[j].cname==this.data.cateItems[id-1].cate_name)
          {
            this.setData({
              curclass:cr[j]
            })
            wx.cloud.database().collection('teacher').get({
              success:(res)=>{
                let bgs=res.data
                for(var i=0;i<bgs.length;i++){
                  if(bgs[i].tno==cr[j].teacher){
                    this.setData({
                      tname:bgs[i].tname
                    })
                    break;
                  }
                }
              }
            })
            break;
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('sc').get({
      success:(res)=>{
        let bgs=res.data
        const that=this
        var nums=0
        f=0
        for(let i=0;i<bgs.length;i++){
          if("19090326"==bgs[i].sno)
          {
            wx.cloud.database().collection('course').get({
              success:(ret)=>{
                let cr=ret.data
                var cname="";
                for(let j=0;j<cr.length;j++){
                  if(cr[j].cno==bgs[i].cno)
                  {
                    cname=cr[j].cname;
                    if(f==0)
                    {
                      this.setData({
                        curclass:cr[j]
                      })
                      f=1;
                      wx.cloud.database().collection('teacher').get({
                        success:(res)=>{
                          let bgss=res.data
                          for(var k=0;k<bgs.length;k++){
                            if(bgss[k].tno==cr[j].teacher){
                              this.setData({
                                tname:bgss[k].tname
                              })
                              break;
                            }
                          }
                        }
                      })
                    }
                    break;
                  }
                }
                nums++;
                var tmp={
                  cate_id:nums,
                  cate_name:cname
                }
                this.setData({
                  cateItems:that.data.cateItems.concat(tmp)
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
