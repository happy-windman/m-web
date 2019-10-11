
import indexController from '../controllers/index'
import positionController from '../controllers/positions';
import searchController from '../controllers/search';
import myController from '../controllers/my';
import detailController from '../controllers/detail';

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
            myController,
            detailController
            }
            pageControllers[hash+'Controller'].render();
    }

    handlePageload(){
        let currentHash=location.hash.substr(1)||"position";
        indexController.render();
        let reg=new RegExp('^\\w+','g');
        let path=reg.exec(currentHash);
        this.renderDOM(path);
        this.setActive(path);
        location.hash=path;
        if(path=="detail")
        {
            location.hash=currentHash;
        }
    }
    handleHashchange(){
        let currentHash=location.hash.substr(1)||"position";
        let reg=new RegExp('^\\w+','g');
        let path=reg.exec(currentHash);
        // console.log(path)
        this.renderDOM(path);
        this.setActive(path);
        if(path!="position"){
            $('#bannerTop').hide()
        }
    }
    
    setActive(hash){
        // console.log(hash)
        $(`footer li[data-page=${hash}]`).addClass('active').siblings().removeClass('active');

    }
}
new Router();
