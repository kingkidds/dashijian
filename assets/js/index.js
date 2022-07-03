$(function () {
  getUserInfo()

  var layer = layui.layer
  $('#btnLogout').on('click', () => {
    layer.confirm('确定退出系统？', {
      icon: 3,
      title: '提示'
    }, (index) => {
      //1.清空本地存储的token
      localStorage.removeItem('token')
      //2.重新跳转到登录页面
      location.href = '/login.html'
      //3.关闭 confirm 窗口
      layui.close(index)
    })
  })
})

//获取用户信息
function getUserInfo() {

  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    success: (res) => {
      //console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败', {
          icon: 2
        })
      }
      // 渲染用户头像
      renderAvatar(res.data)
    }
  })
}

//渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}