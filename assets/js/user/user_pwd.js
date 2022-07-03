$(function () {
  var form = layui.form
  var layer = layui.layer

  //表单验证
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  //提交
  $('.layui-form').on('submit', (e) => {
    e.preventDefault()

    $.ajax({
      url: '/my/updatepwd',
      method: 'POST',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('修改密码失败！', {
            icon: 2
          })
        }
        layer.msg('更新密码成功', {
          icon: 1
        })
        //重置表单
        //console.log($(this)[0])
        $(this)[0].reset()
      }
    })
  })


})