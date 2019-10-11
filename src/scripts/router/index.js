
import indexController from '../controllers/index'
import positionController from '../controllers/positions';
import searchController from '../controllers/search';
import myController from '../controllers/my';
import positions from '../controllers/positions';

class Router{
    constructor(){
        this.render()
    }
    render(){
        window.addEventListener('hashchange',this.handleHashchange.bind(this))
        window.addEventListener('load',this.handlePageload.bind(this))
    }

    renderDOM(hash){
        let pageControllers={
            positionController,
            searchController,
            myController
            }
            pageControllers[hash+'Controller'].render();
    }

    handlePageload(){
        let currentHash=location.hash.substr(1)||"position";
        indexController.render();
        location.hash=currentHash;
        this.renderDOM(currentHash);
        this.setActive(currentHash);
    }
    handleHashchange(){
        let currentHash=location.hash.substr(1);
        this.renderDOM(currentHash);
        this.setActive(currentHash);
        if(currentHash!="position"){
            $('#bannerTop').hide()
        }
    }
    
    setActive(hash){console.log(hash)
        $(`footer li[data-page=${hash}]`).addClass('active').siblings().removeClass('active');

    }
}
new Router();
