$(function () {
  //点击 注册账号  的链接
  $('#link_reg').on('click', () => {
    $('.reg-box').show()
    $('.login-box').hide()
  })

  //点击 去登录  的链接
  $('#link_login').on('click', () => {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //显示/不显示密码
  $('#showpwd').on('click', () => {
    var ori = $('#showpwd i')
    var tar = $('#pwd')
    if (ori.hasClass('layui-extend-xianshimima')) {
      ori.removeClass('layui-extend-xianshimima')
        .addClass('layui-extend-buxianshimima')
      tar.attr('type', 'text')
    } else {
      ori.removeClass('layui-extend-buxianshimima')
        .addClass('layui-extend-xianshimima')
      tar.attr('type', 'password')
    }
  })

  $('#regshowpwd').on('click', () => {
    var ori = $('#regshowpwd i')
    var tar = $('#regpwd')
    if (ori.hasClass('layui-extend-xianshimima')) {
      ori.removeClass('layui-extend-xianshimima')
        .addClass('layui-extend-buxianshimima')
      tar.attr('type', 'text')
    } else {
      ori.removeClass('layui-extend-buxianshimima')
        .addClass('layui-extend-xianshimima')
      tar.attr('type', 'password')
    }
  })

  $('#regshowpwdrep').on('click', () => {
    var ori = $('#regshowpwdrep i')
    var tar = $('#regpwdrp')
    if (ori.hasClass('layui-extend-xianshimima')) {
      ori.removeClass('layui-extend-xianshimima')
        .addClass('layui-extend-buxianshimima')
      tar.attr('type', 'text')
    } else {
      ori.removeClass('layui-extend-buxianshimima')
        .addClass('layui-extend-xianshimima')
      tar.attr('type', 'password')
    }
  })

})

//使用layui
layui.use(['layer', 'form'], function () {
  var layer = layui.layer,
    form = layui.form

  //自定义效验规则
  form.verify({
    username: function (value, item) { //value:表单的值 item:表单的DOM对象
      if (value == null || value == '' || value == undefined) {
        return '用户名不能为空'
      }
      var nameRegex = new RegExp("^[a-zA-Z0-9_\S]{6,20}$")
      if (!(nameRegex.test(value))) {
        return '用户名只能由6-20位的字母数字和下划线组成'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线'
      }
    },

    pwd: function (value, item) {
      if (value == null || value == '' || value == undefined) {
        return '密码不能为空'
      }
      var regex = new RegExp("^(?!.*[！·（）{}【】“”：；，》￥、。‘’——\\s-……%\\n])(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_+`\\-={}:\";'<>?,.\\/])[^\\u4e00-\\u9fa5]{8,16}$")

      if (!(regex.test(value))) {
        return '密码8-16位，其中必须包含字符、数字、小写字母、大写字母；字符仅支持\“\!\@\#\¥\%\”'
      }
    },

    repwd: (value) => {
      var pwd = $('#regpwd').val()
      if (pwd != value) {
        return '两次密码输入不一致'
      }
    }
  })

  //监听表单的注册提交事件


  //自定义提交
  $('#form_reg').on('submit', function (e) {
    //阻止默认提交行为
    e.preventDefault()
    var userinfo = {
      username: $('#form_reg [name=userName]').val(),
      password: $('#form_reg [name=password]').val()
    }
    //console.log(userinfo)
    $.post(
      '/api/reguser',
      userinfo,
      (res) => {
        if (res.status !== 0) {
          return layer.open({
            title: '注册失败',
            content: res.message
          })
        }
        //return layer.msg('注册成功')
        //注册成功跳转到登录页面
        layer.msg('注册成功,请登录', {
          icon: 1,
          time: 2000
        })
        $('#link_login').click()

      }
    )
  })

  //监听表单的登录提交事件
  //layui方式提交

  // form.on('submit(login)', (data) => {
  //   var field = JSON.stringify(data.field)
  //   //console.log(field)
  //   $.ajax({
  //     url: 'http://127.0.0.1:5216/api/auth/login',
  //     type: "POST",
  //     data: field,
  //     datatype: 'JSON',
  //     contentType: 'application/json',
  //     success: (data) => {
  //       //console.log(data)
  //       layer.msg('登录成功', {
  //         icon: 1
  //       })
  //     },
  //     error: (data) => {
  //       //console.log(data)
  //       layer.msg('登录失败: ' + data.responseText, {
  //         icon: 2
  //       })
  //     }
  //   })
  // })

  form.on('submit(login)', (data) => {
    var field = {
      username: data.field.userName,
      password: data.field.password
    }
    $.post('/api/login', field, (result) => {
      if (result.status !== 0) {
        return layer.msg("登录失败", {
          icon: 2
        })
      }
      layer.msg('登录成功', {
        icon: 1,
        time: 1000
      })
      //存储token
      localStorage.setItem('token', result.token)
    })
  })
})