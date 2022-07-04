const app=getApp();
// pages/password/password.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    sno: '',
    pw:'',
    id:'',
  },
  formSubmit:function(e){
    // console.log(e);
    var oldpwd=e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;
    var no=this.data.sno;
    console.log(no);
    console.log(app.globalData.idnumber);
    if(oldpwd=='' || newpwd=='' || newpwd2==''){
      wx.showToast({
        title: '密码不能为空',
        icon:'none',
        duration:1000
      })
    }else if(newpwd!=newpwd2){
      wx.showToast({
        title: '两次输入不一致',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.cloud.database().collection('users').get({

        success: (res) => {
          let bgs=res.data
          console.log('数据表查询成功',res)
          console.log(app.globalData.id)
          for(let i=0;i<bgs.length;i++){
            if(no==bgs[i].idnumber)
            {
              console.log('学号查询成功',bgs[i].idnumber,bgs[i].password)
              console.log('id查询成功',bgs[i].id)
              this.setData({ pw: bgs[i].password ,
                             id:bgs[i].id
              });
              
            }}
            console.log('原密码',this.data.pw)
            console.log('写的密码',oldpwd)
            console.log('新的密码',newpwd)
          if(oldpwd!=this.data.pw){
            console.log('原密码有误！')
            wx.showToast({
              title:'原密码有误！',
              icon:  'none',
              duration: 2000
            })
          }else{
            console.log('修改成功，请重新登陆')
            wx.cloud.database().collection('users').where({idnumber:no}).update({data:{password:newpwd}}).then(res=>{
              console.log('修改密码成功',res.data)//打印返回结果
              //之后编写 需要利用返回数据的代码 看个人情况吧
          }).catch(err=>{
            console.log(err)//打印错误信息
          })

            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({ belta: 1 })
                }, 2000)
              }
            })
          }
         
        }
      })
    }
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sno = options.sno;
    console.log(sno)
    this.setData({
      sno:sno
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    
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