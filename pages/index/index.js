
var app = getApp()
Page({
  data: {
    systemInfo: {},
    navbar: ['简介', '信息', '设计'],
    currentNavbar: '0',
    swipers: [],
    list: [],
    hot_last_id: 0,
    latest_list: [],
    latest_last_id: 0,
    address: [],
    hours: "",
    phoneNumber: [],
    gallery: ""
  },

  onLoad () {
    var that = this
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res,
        address: ["湖北省武汉市武昌区雄楚大道350号省检察院旁", "湖北省武汉市洪山区珞狮路狮城翰园4栋1单元403室","湖北省武汉市徐东大街岳家嘴山河企业大厦2003-2004室"],
        hours: "9:00 - 18:00",
        phoneNumber: ["13006164205","13100712523"],
        gallery: "门店照片",
        imglist:[]//等待加上图片外链
      })
    })
  },


  /**
   * 点击跳转详情页
   */
  onItemClick (e) {
    //var targetUrl = api.PAGE_WORK
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl + '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * 切换 navbar
   */
  swichNav (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh () {
    switch (this.data.currentNavbar) {
      case '0':
        this.setData({
          list: [],
          hot_last_id: 0
        })
        this.pullUpLoad()
        break
      case '1':
        this.setData({
          latest_list: [],
          latest_list_id: 0
        })
        this.pullUpLoadLatest()
        break
      case '2':
        wx.stopPullDownRefresh()
        break
    }
  },

  bindAddressTap: function (e) {
    if (e.currentTarget.dataset.idx == 0){
      wx.openLocation({
        latitude: 30.509736,
        longitude: 114.354862,
        scale: 28
      })
    }
    else if (e.currentTarget.dataset.idx == 1){
      wx.openLocation({
        latitude: 30.508330, 
        longitude: 114.349076,
        scale: 28
      })
    }
    else{
      wx.openLocation({
        latitude: 30.575329, 
        longitude: 114.361534,
        scale: 28
      })
    }
    

  },

  bindCallTap: function (e) {
    if (e.currentTarget.dataset.idx == 0){
      wx.makePhoneCall({
        phoneNumber: "13006164205"
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: "13100712523"
      })
    }
    
  },

  bindImageTap: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imglist // 需要预览的图片http链接列表  
    })
  }
})
