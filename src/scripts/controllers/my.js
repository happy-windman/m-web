import myView from '../views/my.art';

class My{
    constructor(){
        this.render();
    }

    render(){
        let html=myView({});
        $('main').html(html);
    }
}
export default new My();
