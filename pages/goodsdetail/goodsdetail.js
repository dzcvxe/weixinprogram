// pages/goods1/goods1.js
const app=getApp()
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,//是否显示
    gg_id: 0,//规格ID
    gg_txt: '',//规格文本
    gg_price: 0,//规格价格
    guigeList: [{ guige: '微信支付' , price: '100'}, { guige: '支付宝' , price: '100' }, { guige: '线下面交'  , price: '100'}],
    num:1,//初始数量

    realname:"",
    id0:"",
    detail:[],
    imgUrl:[],
    replyValue:"",
    rpl:{
      headurl:"",
      nickname:"",
      time:"",
      content:""
    },
    is_shoucang: 0,
    goods_info: {
      goods_id: 1,
      goods_title: "",
      goods_price:0,
      goods_yunfei: 0,
      goods_kucun: 100,
      goods_xiaoliang: 1,
      content: ""
    },
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pjDataList: [{
        headpic: '/img/mryhtx.jpg',
        author: '张三',
        add_time: '2022-06-18',
        content: '好评好评!'
      },
      {
        headpic: '/img/mryhtx.jpg',
        author: '张三',
        add_time: '2022-06-18',
        content: '辣鸡!'
      }
    ], //评价数据
    
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist // 需要预览的图片http链接列表  
    })
  },
  buy:function(){
    var gg_txt=this.data.gg_txt;
    console.log(gg_txt)
    wx.navigateTo({
      url: '/pages/buy/buy?gg_txt='+gg_txt,
    })
  },
  del:function(e){
    const db = wx.cloud.database()
      db.collection('goods').doc(this.data.id0).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id0:options.id
    })
    this.setData({
      realname:app.globalData.userIm.userInfo.nickName
    })
    wx.cloud.database().collection('goods').get({
      success:(res)=>{
        let bgs=res.data
        const that=this
        for(let i=0;i<bgs.length;i++){
          if(bgs[i]._id==options.id)
          {
            this.setData({
              detail:that.data.detail.concat(bgs[i]),
              ["goods_info.goods_title"]:bgs[i].title,
              ["goods_info.goods_price"]:bgs[i].price,
              ["goods_info.content"]:bgs[i].content,
            })
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
  getReply: function(e){
    this.setData({
      rpl:{
        headurl:app.globalData.userIm.userInfo.avatarUrl,
        nickname:app.globalData.userIm.userInfo.nickName,
        content: e.detail.value,
        time:util.formatTime(new Date())
      }
    })
  },
  upload:function(e){
    const _ = wx.cloud.database().command
    console.log(this.data.rpl)
    wx.cloud.database().collection('goods').doc(this.data.id0).update({
      data:{
        judge: _.push(this.data.rpl)
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

  },
  //点击我显示底部弹出框
clickme:function(){
  this.showModal();
},

//显示对话框
 showModal: function () {
   // 显示遮罩层
   var animation = wx.createAnimation({
     duration: 200,
     timingFunction: "linear",
     delay: 0
   })
   this.animation = animation
   animation.translateY(300).step()
   this.setData({
     animationData: animation.export(),
     showModalStatus: true
   })
   setTimeout(function () {
     animation.translateY(0).step()
     this.setData({
       animationData: animation.export()
     })
   }.bind(this), 200)
 },
 //隐藏对话框
 hideModal: function () {
   // 隐藏遮罩层
   var animation = wx.createAnimation({
     duration: 200,
     timingFunction: "linear",
     delay: 0
   })
   this.animation = animation
   animation.translateY(300).step()
   this.setData({
     animationData: animation.export(),
   })
   setTimeout(function () {
     animation.translateY(0).step()
     this.setData({
       animationData: animation.export(),
       showModalStatus: false
     })
   }.bind(this), 200)
 },
 filter: function (e) {
  //console.log(e);
  var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, price = e.currentTarget.dataset.price
  self.setData({
    gg_id: id,
    gg_txt: txt,
    gg_price: price
  });
},

/* 点击减号 */
bindMinus: function () {
  var num = this.data.num;
  // 如果大于1时，才可以减  
  if (num > 1) {
    num--;
  }
  // 只有大于一件的时候，才能normal状态，否则disable状态  
  var minusStatus = num <= 1 ? 'disabled' : 'normal';
  // 将数值与状态写回  
  this.setData({
    num: num,
    minusStatus: minusStatus
  });
},
/* 点击加号 */
bindPlus: function () {
  var num = this.data.num;
  // 不作过多考虑自增1  
  num++;
  // 只有大于一件的时候，才能normal状态，否则disable状态  
  var minusStatus = num < 1 ? 'disabled' : 'normal';
  // 将数值与状态写回  
  this.setData({
    num: num,
    minusStatus: minusStatus
  });
},

//显示对话框
showModal: function () {
  // 显示遮罩层
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
    animationData: animation.export(),
    showModalStatus: true
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 200)
},


})
