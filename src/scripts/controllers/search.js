const searchView = require('../views/search.art')
const positionListView = require('../views/position-list.art')
const provinceListView = require('../views/province-list.art')
const cityListView = require('../views/city-list.art')
const positionModel = require('../models/postion')
const searchModel = require('../models/search')
const BScroll = require('better-scroll')
import positionsController from './positions'

class search {
  constructor() {
    this.init()
  }
  init(){
    this.list = []
    this.pageNo = 0
    this.totalCount = 0
    this.pageSize = 10
    this.keyword = '';
    this.workplace='';
    this.cityOnoff = false;
  }

  renderer(list) {
    let searchListHtml = positionListView({ list });
    $('.search-scroll ul').html(searchListHtml);
  }

  async renderCity() {
    let that=this;
    let cityList = await searchModel.getCityList();
    let provinceArr = [];

    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].level == 1)
        provinceArr.push(cityList[i]);
    }
    // console.log(provinceArr)
    let provincechtml = provinceListView({ provinceArr })
    $('.city-container').html(provincechtml)

    $('.province li').on('tap', function () {
      let cityCode = $(this).attr('data-cityCode')
      let cityArr = []
      for (let i = 0; i < cityList.length; i++) {
        if (cityList[i].parentcode == cityCode)
          cityArr.push(cityList[i]);
      }
      let cityhtml = cityListView({ cityArr })
      $('.city-list').html(cityhtml)

     
      //点击城市事件
        $('.city-list li').on('tap', function () {
          console.log(2222222)
          
          that.workplace=$(this).attr('data-cityCode');
          that.renderList()
           $('.city').html(`${$(this).html()}<span></span>`)
          $('.city-block').hide();
          that.cityOnoff = false;

        })
    })
    $('.city-block').hide();
    
  }

  async renderList() {
    console.log(111111111)
    let that = this;
    $('.search-scroll').show();
    $('.hot-search').hide();
    $('.search-screen').show();
    // this.keyword = $('.search-block .text-block').val();
   

    if ($('.search-block .text-block').val()!='')
      this.keyword = $('.search-block .text-block').val()


    let searchList = await positionModel.getSearch(
      {
        keyword: this.keyword,
        workplace:this.workplace,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    );
    let list = searchList.list;
    let searchListHtml = positionListView({ list });
    $('.search-scroll ul').html(searchListHtml);
    this.list=list
    this.bScroll.refresh()
    this.bScroll.scrollTo(0, 0)
    positionsController.detailGo();
    // $('.city').html(`${this.workplace}<span></span>`)
  }
  async render() {

    let that = this;
    let hotKeyword = await positionModel.getKeyword();
    let hotList = hotKeyword.list
    // console.log(hotList)
    let html = searchView({ hotList });
    $('#root').html(html)

    $('.search-screen').hide();
    $('.search-scroll').hide();


    //搜素
    $('.search-block .submit').on('tap', await this.renderList.bind(that))

    let bScroll = new BScroll.default($('.search-container main').get(0), {
      probeType: 2,
    })
           this.bScroll=bScroll;
           bScroll.scrollBy(0, 0)
  
  
    let $imgFoot = $('.foot img')
      //-------------------------------
      bScroll.on('scrollEnd', async function () {
        console.log(this.y)
    
        // 上拉加载更多
        if (this.maxScrollY >= this.y) {
          that.pageNo = that.pageNo + that.pageSize;
          $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
          console.log(that.keyword)
          let result = await positionModel.getSearch({
            keyword: that.keyword,
            workplace:that.workplace,
            pageNo: that.pageNo,
            pageSize: that.pageSize
          })
          let list = result.list;
          // 1.将原来数据list和现在返回的数据做拼接，
          // 2.重新渲染
          that.list = [...that.list, ...list]
          that.renderer(that.list)
          bScroll.refresh()
          bScroll.scrollBy(0, 0)
         
        }
      })
  
      bScroll.on('scroll', function () {
        if (this.maxScrollY > this.y) {
          $imgFoot.addClass('down')
        }
      })

      //热门关键词
      $('.hot-keyword a').on('tap',function(){
        that.keyword=$(this).html();
        that.renderList();
      })
  
    //返回
    $('.return').eq(0).on('tap', function () {
      location.hash = 'position'
      that.init()
    })

    //渲染城市列表
    this.renderCity();

    //控制城市列表
 
    $('.city').on('tap', ()=> {
      console.log(this.cityOnoff)
      if (this.cityOnoff == false) {
        this.cityOnoff = true;
        $('.city-block').show()
      }
      else {
        this.cityOnoff = false;
        $('.city-block').hide()
      }
    })





  }
}

export default new search()