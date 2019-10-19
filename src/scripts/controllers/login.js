import loginView from '../views/login.art';

class login {
    constructor() {
        this.render();

        this.userData = localStorage.getItem('user')

    }

    register() {
        var reg1;
        var reg2;
        var reg3;
        var usrReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        var pwdReg = /^\w{6,16}$/;
        let that = this;
        this.userData = localStorage.getItem('user')
        $('#register-block .username').bind('input', function () {
            let user = $(this).val();
            if (user != "" && user.search(usrReg) != -1) {
                reg1 = true;
                if (that.userData)
                    for (var i = 0; i < JSON.parse(that.userData).length; i++) {
                        if (JSON.parse(that.userData)[i].username == user) {
                            reg1 = false;
                            break;
                        }
                    }
                if (reg1 == true) {
                    $("#register-block .errTip").html("");
                }
                else {
                    $("#register-block .errTip").html("账号已被注册！").css("color", "red");
                }
            }
            else {
                $("#register-block .errTip").html("请输入正确的手机号");
                reg1 = false;
            }
            if (reg1 && reg2 && reg3) {
                $("#register-block .errTip").html("可以注册！").css("color", "green");
            }
        })
        $('#register-block .password').bind('input', function () {
            let pwd = $(this).val();
            if (pwd != "" && pwd.search(pwdReg) != -1) {
                reg2 = true;
                $("#register-block .errTip").html("");
            }
            else {
                $("#register-block .errTip").html("请输入正确格式的密码");
                reg2 = false;
            }
            if (reg1 && reg2 && reg3) {
                $("#register-block .errTip").html("可以注册！").css("color", "green");
            }
        })
        $('.agree-choose').on('click', function () {
            console.log($(this).prop('checked'))
            if ($(this).prop('checked') == true)
                reg3 = true;
            else {
                reg3 = false;
            }
            if (reg1 && reg2 && reg3) {
                $("#register-block .errTip").html("可以注册！").css("color", "green");
            }
        })
        // $('#register-block .login-submit').bind('click', function () {
        //     console.log(that.userData)
        //     if (reg1 && reg2 && reg3) {
        //         var users = []
        //         if (that.userData) {
        //             users = JSON.parse(that.userData)
        //         }
        //         let user = {
        //             "username": $("#register-block .username").val(),
        //             "password": $("#register-block .password").val()
        //         }
        //         users.push(user);
        //         users = JSON.stringify(users);
        //         localStorage.setItem('user', users)
        //     }
        //     else {
        //         $("#register-block .errTip").html("您填写的格式有误或未同意使用协议!").css("color", "red");
        //     }
        // })
        $(document).on('click', '#register-submit', function () {
            if (reg1 && reg2 && reg3) {
                var users = []
                if (that.userData) {
                    users = JSON.parse(that.userData)
                }
                let user = {
                    "username": $("#register-block .username").val(),
                    "password": $("#register-block .password").val()
                }

                users.push(user);
                users = JSON.stringify(users);
                localStorage.setItem('user', users)

                //-------
                var toast5 = $(document).dialog({
                    type: 'toast',
                    infoIcon: '/assets/images/loading.gif',
                    infoText: '正在注册',
                });
                setTimeout(function () {
                    toast5.update({
                        infoIcon: '/assets/images/success.png',
                        infoText: '注册成功',
                        autoClose: 1500,
                    });   
                }, 500);
                setTimeout(function(){
                    window.location.reload()
                },1000)
                $("#register-block .errTip").html("可以注册").css("color", "green");
            }
            else {
                $("#register-block .errTip").html("您填写的格式有误或未同意使用协议!").css("color", "red");
            }
        });
    }

    login() {
        let that = this
        let login = false
        this.userData = localStorage.getItem('user')
        $(document).on('click', '#login-submit2', function () {
        // $('#login-block .login-submit').bind('click', function () {
            if (that.userData) {
                let users = JSON.parse(that.userData);
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username == $('#login-block .username').val() && users[i].password == $('#login-block .password').val()) {
                        $('#login-block .errTip').html("登录成功").css("color", "green");
                        login = true;
                        let loginStatus = {
                            username: users[i].username,
                            password: users[i].password,
                            status: true
                        }
                        localStorage.setItem('loginStatus', JSON.stringify(loginStatus))
                        setTimeout(function () {
                            location.hash = 'my';
                        }, 1000)
                        //--
                        var toast5 = $(document).dialog({
                            type: 'toast',
                            infoIcon: '/assets/images/loading.gif',
                            infoText: '正在登录',
                        });
                        setTimeout(function () {
                            toast5.update({
                                infoIcon: '/assets/images/success.png',
                                infoText: '登录成功',
                                autoClose: 1500,
                            });   
                        }, 500);
                        //--
                    }
                }
                if (login == false) {
                    $('#login-block .errTip').html("请输入正确的账号和密码")
                }
            }
        })
    }

    render() {

        let html = loginView({});
        $('#root').html(html);

        $('#register-block').hide()

        $('.login-jump').on('tap', function () {
            $('#register-block').show();
            $('#login-block').hide()
        })

        $('.register-login a').on('tap', function () {
            $('#register-block').hide();
            $('#login-block').show()
        })
        $('.login-look .text-block').on('tap', function () {
            location.hash = 'position'
        })

        this.register();
        this.login();


    }
}
export default new login();
