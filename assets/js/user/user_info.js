$(function () {
  var form = layui.form
  var layer = layui.layer

  //表单验证
  form.verify({
    nickname: (value) => {
      if (value.length > 6) {
        return '昵称长度必须在1-6个字符之间'
      }
    }
  })

  //重置按键功能
  $('#btnReset').on('click', (e) => {
    //阻止默认的表单重置
    e.preventDefault()
    initUserInfo()
  })

  //提交修改
  $('.layui-form').on('submit', (e) => {
    e.preventDefault()
    $.ajax({
      url: '/my/userinfo',
      method: 'POST',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！', {
            icon: 2
          })
        }
        layer.msg('更新用户信息成功', {
          icon: 1
        })
        //调用父页面index.html的方法，重新渲染用户的头像与用户信息
        window.parent.getUserInfo()
      }
    })
  })

  initUserInfo();

  //初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      method: 'GET',
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败!', {
            icon: 2
          })
        }
        //console.log(res)
        form.val('formUserInfo', res.data)
      }
    })
  }

})