import detailView from '../views/detail.art';
const detailModel = require ('../models/detail')
const BScroll = require('better-scroll')
const positionListView = require('../views/position-list.art')
import positionsController from './positions'
import collection from './collection';

class Detail{
    async render(){
        let hash = location.hash
        let reg=new RegExp('(\\d+)$','g')
        let id=reg.exec(hash)
        // console.log(id[0])

        //获取数据
        let result=await detailModel.get(id[0]);
        // console.log(result)
        
        //相关数据的ID
        let  similarDataId=result.post_type;
        let resultList=await detailModel.getList(similarDataId);
        let list=resultList.list
        
        // //---------
        // let result22=await detailModel.getSearch();
        // console.log(result22,111)

        //渲染详情页and相关数据列表
        let currentCommon=$('#root').attr('date-common')
        let html=detailView({result,currentCommon});
        $('#root').html(html);
        // console.log(result.post_type)
        let htmlList=positionListView({list});
        $('.detail-list').html(htmlList);

        //切换
        $('.detail-header li').eq(1).on('click',function(){
            $('.content1').hide();
            $('.content2').show();
           
            $(this).addClass('detail-active').siblings().removeClass('detail-active');
        })
        $('.detail-header li').eq(0).on('click',function(){
            $('.content1').show();
            $('.content2').hide();
            $(this).addClass('detail-active').siblings().removeClass('detail-active');
        })
        $('.return').eq(0).on('click',function(){
            location.hash='position'
        })

        positionsController.detailGo();
         
        let bScroll= new BScroll.default($('.detail-container main').get(0), {
            probeType:2,
            bounce:false,
          })
          
          bScroll.refresh();
          
   
          let onCollection=true;
          $('.keep').on('tap',function(){

              if(onCollection==true)
            {
            let collections=localStorage.getItem('collection')
            let collectionsArr=[]
            if(collections)
            {collectionsArr=JSON.parse(collections)}
            collectionsArr.push(result)
            localStorage.setItem('collection',JSON.stringify(collectionsArr))

            var toast5 = $(document).dialog({
                type: 'toast',
                infoIcon: '/assets/images/loading.gif',
                infoText: '正在收藏',
            });
            setTimeout(function () {
                toast5.update({
                    infoIcon: '/assets/images/success.png',
                    infoText: '收藏成功',
                    autoClose: 800,
                });   
            }, 500);
           
            
                $('.keep span').addClass('active')
            }
            else{
                let collections=localStorage.getItem('collection')
                let collectionsArr=[]
                if(collections)
                {collectionsArr=JSON.parse(collections)}
                collectionsArr.pop()
                localStorage.setItem('collection',JSON.stringify(collectionsArr))
                $('.keep span').removeClass('active')
            }
            onCollection=!onCollection;
          })

    }
}
export default new Detail;