// pages/register/register.js
const app=getApp()
let username=''
let password=''
let repassword=''
let flag = false  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    repassword:'',
    open: false,
    focus:false,
    open1: false,
    focus1:false
  },
  onShow: function () {
  },
  switch() {
    this.setData({
      open: !this.data.open
    })
  },
  focus(){
    this.setData({
      focus:true
    })
  },
  blur(){
    this.setData({
      focus:false
    })
  },
  switch1() {
    this.setData({
      open1: !this.data.open1
    })
  },
  focus1(){
    this.setData({
      focus1:true
    })
  },
  blur1(){
    this.setData({
      focus1:false
    })
  },
  content(e){
    username=e.detail.value
  },
  password(e){
    password=e.detail.value
  },
  repassword(e){
    repassword=e.detail.value
  },
  goadmin(){
    wx.cloud.database().collection('users')
      .get({
        success:(res)=>{
          let admin=res.data
          for (let i = 0; i < admin.length; i++) {  
            if (username === admin[i].idnumber&&app.globalData.type==admin[i].type) {
              flag=true;
            }
          }
        }
        })
    if(flag==true){
      wx.showToast({
        icon:'none',
        title: '账户已存在',
      })
    }
    else{
    if(username=='')
    {
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }
    else if(password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else if(password.length<6){
      wx.showToast({
        icon:'none',
        title: '密码不得少于六位',
      })
    }
    else if(password!==repassword){
      wx.showToast({
        icon:'none',
        title: '密码不一致',
      })
    }
    else{
      wx.cloud.database().collection('users').add({
        data:{
            type:app.globalData.type,
            idnumber:username,
            password:password
        },
        success(res){
            console.log(res)
            wx.navigateTo({
              url: '/pages/login/login',
            })
            wx.showToast({
              icon:'none',
              title: '注册成功，请重新登录',
            })
        },
        fail:console.error
    })    
    }
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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