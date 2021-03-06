const positionView = require('../views/position.art')
const positionListView = require('../views/position-list.art')
const postionModel = require('../models/postion')
const BScroll = require('better-scroll')

import Swiper from 'swiper'
import indexController from './index'

class Position {
  constructor() {
    // this.render()
    this.list = []
    this.pageNo = 0
    this.totalCount = 0
    this.pageSize = 10
  }

  detailGo(){
    $('.list-item').on('tap',function(){
      let currentCommon=$(this).find('.item-up-left span').html()
      $('#root').attr('date-common',currentCommon)
      let id=$(this).attr('data-id')
      location.hash=`detail/${id}`
      console.log(1)
    })
  }

  renderer(list) {
    let positionListHtml = positionListView({
      list
    })

    $('main .list-container ul').html(positionListHtml)
    // console.log($('main ul .list-container .list-item'))

    this.detailGo();
  }



  async render() {
   
    
    indexController.render();
    let that = this;

    let result = await postionModel.get({
      pageNo: that.pageNo,
      pageSize: that.pageSize
    })
   
    // 把PositionView 先装填到main里
    let positionHtml = positionView({})
    let $main = $('main')
    $main.html(positionHtml)

    // 再把list装到ul里
    that.list = result.list
    that.totalCount = result.count;

    this.renderer(that.list)

    //   // 定义图片对象
    let $imgHead = $('.head img')
    let $imgFoot = $('.foot img')
    

    // bScroll 是BetterScroll实例，将来可以用来调用API
    let bScroll = new BScroll.default($('.index-container main').get(0), {
      probeType:3,
    })

      // 开始要隐藏下拉刷新的div
      bScroll.refresh()
    bScroll.scrollBy(0, -40)
    
    bScroll.on('scrollEnd', async function () {
      // 下拉刷新

      if (this.y >= 0) {

        $imgHead.attr('src', '/assets/images/ajax-loader.gif')

        let result = await postionModel.get({
          pageNo: 0,
          pageSize: 1
        })
        
        let list = result.list

        // 1. 将原来数据list和现在返回的数据做拼接，
        // 2.重新渲染
        that.list = [...list, ...that.list]
        that.renderer(that.list)
        bScroll.refresh()
        bScroll.scrollBy(0, -40)
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('up')
      }

      // 上拉加载更多
     
      if (this.maxScrollY >= this.y && Math.ceil(that.totalCount / that.pageSize) >= Math.ceil(that.pageNo / that.pageSize)) {
        that.pageNo = that.pageNo + that.pageSize;

        $imgFoot.attr('src', '/assets/images/ajax-loader.gif')

        let result = await postionModel.get({
          pageNo: that.pageNo,
          pageSize: that.pageSize
        })

        let list = result.list;

        // 更新pageCount, 因为有新的内容发布出来了
        

        // 1.将原来数据list和现在返回的数据做拼接，
        // 2.重新渲染
        that.list = [...that.list, ...list]
        that.renderer(that.list)

        bScroll.scrollBy(0, 0)
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('down')
      }
    })
    $('#bannerTop').hide()
    bScroll.on('scroll', function () {
      if(location.hash=="#position")
  {
      // console.log(this.y)
      let op=Math.abs(this.y/100)
      if(this.y>0){
         $imgHead.addClass('up')
      }
      if (this.y >= -40) {
       $('#bannerTop').hide()
        $('#bannerScroll').show()
      }
      
      if (this.y< -40) {
        $('#bannerTop').show().css({
          background:`rgba(255, 165, 0,${op})`});
        $('#bannerScroll').hide();
      }

      if (this.maxScrollY > this.y) {
        $imgFoot.addClass('down')
      }}
    })

    $('#bannerTop').on('tap',function(){
      location.hash=$(this).attr('data-page')
    
    })
    $('#bannerScroll').on('tap',function(){
      location.hash=$(this).attr('data-page')

      
    })
    // $('#root').on('click','#bannerTop',function(){
    //   location.hash=$(this).attr('data-page')
    // })
    // $('#root').on('click','#bannerScroll',function(){
    //   location.hash=$(this).attr('data-page')
    // })
    var mySwiper = new Swiper ('.swiper-container', {
      loop: true, // 循环模式选项
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        },
      // 如果需要分页器
      // effect : 'fade',
      pagination: {
        el: '.swiper-pagination',
      },

    })        
    
      
  }
  
  
}

export default new Position()