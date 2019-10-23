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
        // $('.login-submit').on('tap',function(){
        //     localStorage.removeItem('loginStatus')
        //     window.location.reload();
        // })

        $('.login-reg').on('tap',function(){
            location.hash=$(this).attr('data-page');
        })

        $('#btn-01').on('click',function() {
            var dialog1 = $('body').dialog({
                type : 'confirm',
                style: 'android',
                titleText: '提示',
                content: '您确定要退出吗？',
                onClickConfirmBtn:function(){
                    localStorage.removeItem('loginStatus')
                    dialog1.close();
                    window.location.reload();
                },
            });
        });
        $('.collection').on('tap',function(){
            if(localStorage.getItem('loginStatus'))
            location.hash='#collection';
            else location.hash='#login'
        })

    }
}
export default new My();
