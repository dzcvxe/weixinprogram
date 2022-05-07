Page({
  bindtest: function () {
    wx.request({
      url: 'http://localhost:8080/mypro1/serveletDemo1',
      data: {
        username: '阿伟',
        password: '123465'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../picture/1.jpg',
      '../../picture/2.jpg',
      '../../picture/3.jpg',
      '../../picture/4.jpg',
      '../../picture/5.jpg'
    ],
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",
    categoryList: {
    pageone: [{
      name: "成绩查询",
      src: "../../icons/grade.png",
      url: "/pages/grade/grade"
    }, {
      name: "考试查询",
      src: "../../icons/test.png",
        url: "/pages/test/test"
    }, {
      name: "课表查询",
        src: "../../icons/curriculum.png",
        url: "/pages/curriculum/curriculum"
    }, {
      name: "教学评价",
        src: "../../icons/comment.png",
        url: "/pages/comment/comment"
    }, {
      name: "校园论坛",
        src: "../../icons/forum.png",
        url: "/pages/forum/forum"
    }, {
      name: "校园地图",
        src: "../../icons/map.png",
        url: "/pages/map/map"
    }, {
      name: "校历",
        src: "../../icons/calendar.png",
        url: "/pages/calendar/calendar"
    }]}
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