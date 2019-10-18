import detailView from '../views/detail.art';
const detailModel = require ('../models/detail')
const BScroll = require('better-scroll')
const positionListView = require('../views/position-list.art')
import positionsController from './positions'

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
          
        console.log(bScroll.y)
    }
}
export default new Detail;