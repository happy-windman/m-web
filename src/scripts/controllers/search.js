const searchView = require('../views/search.art')
const positionListView = require('../views/position-list.art')
const provinceListView = require('../views/province-list.art')
const cityListView = require('../views/city-list.art')
const positionModel = require ('../models/postion')
const searchModel = require ('../models/search')
const BScroll = require('better-scroll')

class search{
    constructor() {
        this.list = []
        this.pageNo = 0
        this.totalCount = 0
        this.pageSize = 10
        
      }

      renderer(list) {
        let searchListHtml=positionListView({list});
        $('.search-scroll ul').html(searchListHtml);
      }

      async renderCity(){
        let cityList=await searchModel.getCityList();
        let provinceArr=[];
        
        for(let i=0;i<cityList.length;i++)
        {
          if(cityList[i].level==1)
          provinceArr.push(cityList[i]);
        }
        // console.log(provinceArr)
        let provincechtml=provinceListView({provinceArr})
        $('.city-container').html(provincechtml)
      
        $('.province li').on('tap',function(){
           let cityCode=$(this).attr('data-cityCode')
           let cityArr=[]
           console.log(cityCode)
           for(let i=0;i<cityList.length;i++)
        {
          if(cityList[i].parentcode==cityCode)
          cityArr.push(cityList[i]);
        }
        let cityhtml=cityListView({cityArr})
        $('.city-list').html(cityhtml)
      
        $('.city-list li').on('tap',function(){
          console.log($(this).attr('data-cityCode'))
        })
      
        })
        $('.city-block').hide();
      }
   
    async render(){
        
        let that=this;
        let hotKeyword = await positionModel.getKeyword();
        let hotList=hotKeyword.list
        console.log(hotList)
        let html = searchView({hotList});
        $('#root').html(html)
     
        

        $('.search-screen').hide();
        $('.search-scroll').hide();

        let bScroll=new BScroll.default($('.search-container main').get(0),{
          probeType:2,
    })
        bScroll.scrollBy(0, -40)
    
        //搜素
        $('.search-block .submit').on('tap',async function(){
             $('.search-scroll').show();
            $('.hot-search').hide();
            $('.search-screen').show();
              that.keyword=$('.search-block .text-block').val();
              console.log(that.keyword)
              
              if(that.keyword==undefined)
              that.keyword='土木工程';
            let searchList = await positionModel.getSearch(
              {
                keyword:that.keyword,
                pageNo: that.pageNo,
                pageSize: that.pageSize
              }
            );
            let list=searchList.list;
            let searchListHtml=positionListView({list});
            $('.search-scroll ul').html(searchListHtml); 
            bScroll.refresh(); 
            if(bScroll.y>-40){
              bScroll.scrollBy(0, -40)
            }
          console.log(bScroll.y)
          })
            let $imgHead = $('.head img')
            let $imgFoot = $('.foot img')
   
                           
        //-------------------------------
        bScroll.on('scrollEnd', async function () {
            // 下拉刷新
            if (this.y >= 0) {
              $imgHead.attr('src', '/assets/images/ajax-loader.gif')
              let result = await positionModel.getSearch({
                keyword:that.keyword,
                pageNo: 0,
                pageSize: 1
              })
              let list = result.list;
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
            if (this.maxScrollY >= this.y) {
              that.pageNo = that.pageNo + that.pageSize;
              $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
              let result = await positionModel.getSearch({
                keyword:that.keyword,
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
              $imgHead.attr('src', '/assets/images/arrow.png')
              $imgHead.removeClass('down')
            }
          })

          bScroll.on('scroll', function () {
            if(this.y>0){
               $imgHead.addClass('up')
            }
            if (this.maxScrollY > this.y) {
              $imgFoot.addClass('down')
            }
          })
          //返回
          $('.return').eq(0).on('tap',function(){
            location.hash='position'
        })

        //渲染城市列表
        this.renderCity();

        //控制城市列表
        let cityOnoff=false;
        $('.city').on('tap',function(){
          if(cityOnoff==false)
          {cityOnoff=true;
          $('.city-block').show()
          }
          else {
            cityOnoff=false;
          $('.city-block').hide()
          }
       })
       
      
        
    }
}

export default new search()