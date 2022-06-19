let col1H = 0;
let col2H = 0;
Page({
    data: {
        scrollH: 0,
        imgWidth: 0,
        images: [],
        col1: [],
        col2: [],
        activeIndex:1,
        loadingCount:0
    },
    onLoad: function () {
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;
                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });
                this.loadImages();
            }
        })
    },
    onImageLoad: function (e) {
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width;      
        let oImgH = e.detail.height;        
        let imgWidth = this.data.imgWidth; 
        let scale = imgWidth / oImgW;        
        let imgHeight = oImgH * scale;      
        let images = this.data.images;
        let imageObj = null;
        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id == imageId) {
                imageObj = img;
                break;
            }
        }
        imageObj.height = imgHeight;
        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;
        if (col1H <= col2H) {
            col1H += imgHeight;
            col1.push(imageObj);
        } else {
            col2H += imgHeight;
            col2.push(imageObj);
        }
        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };
        if (!loadingCount) {
            data.images = [];
        }
        this.setData(data);
    },

    loadImages: function () {
        let images=[];
        wx.cloud.database().collection('goods').get({
            success:(res)=>{
              let bgs=res.data
              const that=this
              for(let i=0;i<bgs.length;i++){
                  let str='images['+i+'].height'
                  let str1='images['+i+'].id'
                this.setData({
                    images:that.data.images.concat(bgs[i]),
                })
                this.setData({
                    [str]:0,
                    [str1]:i
                })
                wx.cloud.downloadFile({
                    fileID: bgs[i].imgid[0],
                    success: res => {
                    // get temp file path
                    let str='images['+i+'].imgurl'
                    this.setData({
                        [str]:res.tempFilePath
                    })
                    },
                    fail: err => {
                    // handle error
                    }
                })
              }
              this.setData({
                  loadingCount:this.data.images.length
              })
            }
          })
    },
    func:function(e){
        this.setData({
            activeIndex:e.currentTarget.dataset.num
        })
    },
    jump:function(e){
        wx.navigateTo({
          url: '/pages/submitgoods/submitgoods',
        })
    }
})