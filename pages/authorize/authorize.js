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
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({//desc：必须写不写会不弹出弹框
        desc: '用于授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success:(res)=>{//建议使用es6箭头函数避免this指向问题
            console.log(res)
            app.globalData.userIm=res
            wx.redirectTo({
              url: '/pages/choosetype/choosetype',
            })
        }
      })
    }
    })
  
