import myView from '../views/my.art';

class My{
    constructor(){
       
    }

    render(){
        let loginStatus=localStorage.getItem('loginStatus')
        let html=myView({});
        $('main').html(html);
        $('.login-submit').hide();
        
        if(loginStatus)
        {
            $('.login-reg').hide();
            $('.login-status').html(JSON.parse(loginStatus).username);
            $('.login-submit').show();
        }
        $('.login-submit').on('tap',function(){
            localStorage.removeItem('loginStatus')
            window.location.reload();
        })

        $('.login-reg').on('tap',function(){
            location.hash=$(this).attr('data-page');
        })
    }
}
export default new My();
