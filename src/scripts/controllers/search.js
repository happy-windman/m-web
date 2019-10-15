const searchView = require('../views/search.art')
const positionListView = require('../views/position-list.art')
const positionModel = require ('../models/postion')
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

      getdata(keyword){

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
            
            bScroll.refresh()
            if(bScroll.y>-40)
            bScroll.scrollBy(0, -40)
            
          })
            let $imgHead = $('.head img')
            let $imgFoot = $('.foot img')
   
                           
        // //-------------------------------
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
      
          $('.return').eq(0).on('click',function(){
            location.hash='position'
        })
      
        
    }
}

export default new search()