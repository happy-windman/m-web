import newsView from '../views/news.art';

class news{
    constructor(){
        this.render();
    }

    render(){
        let html=newsView({});
        $('main').html(html);
    }
}
export default new news();
