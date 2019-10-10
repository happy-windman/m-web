import myView from '../views/search.art';

class search{
    constructor(){
        this.render();
    }

    render(){
        let html=myView({});
        $('main').html(html);
    }
}
export default new search();
