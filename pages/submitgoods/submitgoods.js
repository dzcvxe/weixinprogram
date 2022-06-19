const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    number: 1,
    PostType: '',
    titleValue: "",
    telValue: "",
    UserInfo: '',
    Price : 0,
    array:["二手图书","家电数码","日常用品","其它"],
    type:0,
    index:0,
    Filepath:[]
  },
  getTitle: function(e){
    console.log(e)
    this.setData({
      titleValue: e.detail.value
    })
  },
  getInput: function (e){
    this.setData({
      telValue: e.detail.value
    })
  },
  getPriceinput:function(e){
    this.setData({
      Price: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      type:e.detail.value,
      index:e.detail.value
    })
  },
  clickimage: function (e) {
    var index = e.target.dataset.index
    wx.previewImage({
      urls: [this.data.Filepath[index]], 
    })
  },
  addImage: function (e) {
    var that = this
    wx.chooseImage({
      count: 6,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths)
        that.setData({
          Filepath:that.data.Filepath.concat(res.tempFilePaths[0]),
          number: that.data.number + 1
        })
        console.log(that.data.number)
      }
    })
  },
  
  deleteImage: function (e) {
    var that = this
    var index = e.target.dataset.index

    var tempFilePaths = that.data.Filepath
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          Filepath: tempFilePaths,
          number: that.data.number - 1
        });
        console.log(that.data.Filepath);
      }
    })
  },
  upload: function () {
    var that = this
    let ids=[]
    if (that.data.telValue.length > 2) {
      wx.showLoading({
        title: '上传中...',
      })
      if(that.data.number > 1)
      {
        Promise.all(that.data.Filepath.map((value) => {
        return wx.cloud.uploadFile({
          cloudPath: Date.now() + parseInt(Math.random() * 100) + value.match(/\.[^.]+?$/)[0],
          filePath: value,
        })
      })).then(res => {
        return res.map((res) => {
          ids.push(res.fileID)
          return res.fileID
        });
      }).then(res => {
        return  wx.cloud.database().collection('goods').add({ 
              data: {
                title:that.data.titleValue,
                content: that.data.telValue,
                //nickname:app.globalData.userIm.userInfo.nickName,
                //headurl:app.globalData.userIm.userInfo.avatarUrl,
                nickname:"韡",
                headurl:"https://thirdwx.qlogo.cn/mmopen/vi_32/T5ib25P58AoTDx0p2Kg2Iiar1ibde2RMNObQjz52icpX5bpria3e76kFJCzibKicn4trzCqqUs7AI0cWiaSzsRY6rDdWUg/132",
                time: util.formatTime(new Date()),
                type:Number(this.data.type),
                price:Number(this.data.Price),
                hot:false,
                imgid:ids,
                judge:[]
              }
            }).then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                console.log(res)
                wx.switchTab({
                  url: '/pages/transaction/transaction',
                })
              }
            })
          }).catch((ex) => {
            console.log(ex);
          })
      })
      }
      else{    
        return  wx.cloud.database().collection('goods').add({ 
          data: {
            title:that.data.titleValue,
            content: that.data.telValue,
            nickname:app.globalData.userIm.userInfo.nickName,
            headurl:app.globalData.userIm.userInfo.avatarUrl,
            time: util.formatTime(new Date()),
            type:Number(this.data.type),
            price:Number(this.data.Price),
            hot:false,
            imgid:ids,
            judge:[]
          }
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              console.log(res)
              wx.switchTab({
                url: '/pages/transaction/transaction',
              })
            }
          })
        })
      }
    }
    else {
      wx.showToast({
        title: '话题内容字数不够',
        duration: 1000,
        mask: true,
        icon: 'none',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
})