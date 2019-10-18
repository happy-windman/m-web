const newsView = require('../views/news.art')

class news{

    render(){
        
       
        let loginStatus=localStorage.getItem('loginStatus')
            if(loginStatus){
                let html=newsView({})
                $('main').html(html);
            }
            else
                window.location.hash="login";
    }
}

export default new news();