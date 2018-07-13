Page({
  data: {
    x: 0,
    y: 0,
    scale: 1,
    src: ''
  },
  onChange: function (e) {
    console.log(1,e.detail)
    this.setData({
      x: e.detail.x,
      y: e.detail.y
    })

  },
  onScale: function (e) {
    console.log(e)
    this.setData({
      scale: e.detail.scale,
      x: e.detail.x,
      y: e.detail.y
    })
  },
  chooseImg: function () {
    const self = this
    wx.chooseImage({
      success: function (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res)
            self.setData({
              src: res.path,
              width: res.width,
              height: res.height
            })
          }
        })
      }
    })
  },
  cut: function () {
    // console.log(12)
    wx.showLoading({
      title: '裁剪中...',
    })
    const self = this;
    const ctx = wx.createCanvasContext('firstCanvas')
    const x = this.data.x;
    const y = this.data.y;
    const scale = this.data.scale
    const width = this.data.width;
    const height = this.data.height
    const src = this.data.src;
    console.log(x, y, scale, width, height)
    // ctx.drawImage(src, -x / scale, -y / scale, width / scale, height / scale, 0, 0, 200, 200)
    ctx.drawImage(src, -x *scale, -y * scale, width / scale, width / scale, 0, 0, 200, 200)
    // ctx.drawImage(src)

    ctx.draw()
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        destWidth: width,
        destHeight: width,
        canvasId: 'firstCanvas',
        success: function (res) {
          console.log(res.tempFilePath)
          wx.redirectTo({
            url: '../../pages2/information/information?src=' + res.tempFilePath,
          })
          self.setData({
            src: res.tempFilePath
          })

          wx.hideLoading()
        },
        fail:function(){
          wx.hideLoading()
        }
      })
    }, 3000)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const self = this
    wx.getImageInfo({
      src: options.src,
      success: function (res) {
        self.setData({
          src: res.path,
          width: res.width,
          height: res.height
        })
      }
    })
    try {
      var res = wx.getSystemInfoSync()
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      this.setData({
        zhewidth: (res.windowWidth - 200) / 2,
        zheheigth: (res.windowHeight - 200) / 2
      })
    } catch (e) {

    }
    // this.chooseImg()
  },

})