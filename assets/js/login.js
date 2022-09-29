$(function(){
    //点击去注册账号
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录账号
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd:function(val){
            var text = $('.reg-box [name=password]').val()
            if(text!==val){
                return '两次密码不一致!'
            }
        }
    })

    //监听表单提交事件 注册
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{username:$('.reg-box [name=username]').val(),password:$('.reg-box [name=password]').val()},function(res){
            if(res.status!==0){
                // return console.log(res.message);
                return layer.msg(res.message, {icon: 5}); 
            }
                return layer.msg('注册成功！请登录!', {icon: 1});
            // 模拟登录行为
        })
        $('#link_login').click()
    })

    //监听表单提交事件 登录
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.post('/api/login',{username:$('.login-box [name=username]').val(),password:$('.login-box [name=password]').val()},function(res){
            if(res.status!==0){
                // return console.log(res.message);
                return layer.msg(res.message, {icon: 5}); 
            }
                layer.msg('登录成功!', {icon: 1});
                // console.log(res.token);
                localStorage.setItem('token',res.token)
            // 跳到后台
            location.href = '/index.html'
        })
    })

})