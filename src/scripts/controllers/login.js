import loginView from '../views/login.art';

class login{
    constructor(){
        this.render();
    }

    render(){
        let html=loginView({});
        $('main').html(html);

        $('#register-block').hide()

        $('.login-jump').on('tap',function(){
            $('#register-block').show();
            $('#login-block').hide()
        })

        $('.register-login a').on('tap',function(){
            $('#register-block').hide();
            $('#login-block').show()
        })



    }
}
export default new login();
