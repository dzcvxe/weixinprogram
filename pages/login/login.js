const app = getApp()
 let username=''
 let password=''
 let cnt=0
Page({
  data: {
    username: '',
    password: '',
    open: false,
    focus:false,
  },
  onShow: function () {
    console.log(app.globalData.type)  
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
  goxieyi(){
   cnt+=1
  },
  content(e){
    username=e.detail.value
  },
  password(e){
    password=e.detail.value
  },
  goadmin(){
    let flag = false
    if(cnt%2==0)
    {
      wx.showToast({
        icon:'none',
        title: '请阅读并同意协议！',
      })
    }  
    else if(username=='')
    {
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }else if(password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else{
      wx.cloud.database().collection('users')
      .get({
        success:(res)=>{
          let admin=res.data
          for (let i = 0; i < admin.length; i++) {  
            if(app.globalData.type!=admin[i].type)
              continue;
            if (username === admin[i].idnumber) {
              flag=true;
              if (password !== admin[i].password) {  
                wx.showToast({  
                  title: '密码错误！！',
                  icon: 'error',
                  duration: 2500
                });
               break;
              } else {
                  wx.showToast({  
                    title: '登陆成功！！',
                    icon: 'success',
                    duration: 2500
                  })
                  flag=true;
                  wx.getUserProfile({//desc：必须写不写会不弹出弹框
                    desc: '用于授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success:(res)=>{//建议使用es6箭头函数避免this指向问题
                        console.log(res)
                    }
                  })
                wx.switchTab({
                  url: '/pages/index/index',
                })
                  break;
              }
            }
          };
          if(flag==false)
          {
            wx.showToast({
              title: '该用户不存在',
              icon: 'error',
              duration: 2500
            })
          }
        }
      })
    }
  }
})
 
