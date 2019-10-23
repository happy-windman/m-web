import collectionView from '../views/collection.art';

const BScroll = require('better-scroll')
class collection {

    render() {
        let html = collectionView({})
        $('#root').html(html);

        let collections = localStorage.getItem('collection')
        collections = JSON.parse(collections)
        console.log(collections)
        for (let i = 0; i < collections.length; i++) {
            let $lis = $('<li class="list-item"></li>')
            $lis.html(`<li class="list-item">
                <div class="item-title">
                    <div class="item-up">
                    <div class="item-up-left">
                        <h2>${collections[i].name}</h2>
                        <span>${collections[i].location.address}</span>
                    </div>
                    <div class="item-up-right"><span>${(collections[i].release_time).substr(0, 10)}</span>
                        <h3>${collections[i].salary / 1000}K-${collections[i].reach_salary / 1000}K</h3>
                    </div>
    
                    </div>
                    <div class="item-down">
                    <span class="yo-ico">&#xe61a;
                    </span>${collections[i].work_place_text}
                    <span class="yo-ico">&#xe61c;
    
                    </span>${collections[i].work_experience_text}
                    <span class="yo-ico">&#xe62a;
                    </span>${collections[i].education_text}
                    </div>
                    <div class="choose">
                    <div class="choose-left">
                        <span></span><i>取消收藏</i>
                    </div>
                    <div class="choose-right">
                        <span></span><i>发送简历</i>
                    </div>
                    </div>
                </div>
                </li>`)
            $('.colleaction-content ul').append($lis)
        }

        $('.choose-left').on('tap',function(){
            for(let i = 0; i < collections.length; i++){
                if($(this).parents('li').find('.item-up-left h2').html()==collections[i].name)
                {   
                    collections.splice(i,1)
                    $(this).parents('li').remove()
                    localStorage.setItem('collection',JSON.stringify(collections))
                }
            }
        })
        
        $('.collection-container .return').on('tap',function(){
            location.hash="#my";
        })

        let bScroll= new BScroll.default($('.colleaction-content-wrap').get(0), {
          
        
          })
         
        
    }
}

export default new collection();