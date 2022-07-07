var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
const app=getApp();
var navList = [
  {id:"all", title: "全部"},
  {id:"hot", title: "热门"},
  {id:"put", title: "发帖"}
];

Page({
  data: {
    activeIndex: 0,
    navList: navList,
    title: '话题列表',
    postsList: [],
    tmpList: [],
    allList: [],
    hidden: false,
    page: 1,
    limit: 20,
    tab: 'all'
  },

  onLoad: function () {
    this.getData();
  },
  onPullDownRefresh: function () {

  },

  
  onReachBottom: function () {

  },

  // 点击获取对应分类的数据
  onTapTag: function(e) {
    var that = this;
    var tab = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeIndex: index,
      tab: tab,
      page: 1
    });
    if(index==0)
    {
      this.setData({
        postsList:this.data.allList
      })
    }
    if(index==1)
    {
      this.setData({
        postsList:this.data.tmpList
      })
    }
    if(index==2)
    {
      wx.navigateTo({
        url: '/pages/submitblog/submitblog'
      })
      this.setData({
        activeIndex:0
      })
      this.setData({
        postsList:this.data.allList
      })
    }
  },

  //获取文章列表数据
  getData: function() {
    wx.cloud.database().collection('blogs').get({
      success:(res)=>{
        let bgs=res.data
        const that=this
        for(let i=0;i<bgs.length;i++){
          if(app.globalData.userIm.userInfo.nickName==bgs[i].nickname){
            this.setData({
              postsList:that.data.postsList.concat(bgs[i])
            })
            this.setData({
              allList:that.data.allList.concat(bgs[i])
            })
            if(bgs[i].hot==true)
            {
              this.setData({
                tmpList:that.data.tmpList.concat(bgs[i])
              })
            }
          }
        }
        this.setData({
          postsList:this.data.postsList.reverse()
        })
        console.log(this.data.postsList)
      }
    })
  },

  // 滑动底部加载
  lower: function() {
    
  }
})
