// pages/authorize/authorize.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(options) {

        var that = this;
    
        //查看是否授权
    
        wx.getSetting({
    
          success: function(res) {
    
            if (res.authSetting['scope.userInfo']) {
    
              console.log("用户授权了");
    
            } else {
    
              //用户没有授权
    
              console.log("用户没有授权");
    
            }
    
          }
    
        });
    
      },
    
    getUserProfile:(e) =>{
      wx.getUserProfile({
        desc: '用于授权', 
        success:(res)=>{
            console.log(res)
            app.globalData.userIm=res
            wx.redirectTo({
              url: '/pages/choosetype/choosetype',
            })
        }
      })
    }
    })
  
