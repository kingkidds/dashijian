//每次调用 $.get() 或 $.post() 或 $.ajax()的时候
//会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
  //在发起真正的Ajax请求之前，统一拼接请求的根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  //需要权限token的api请求设置headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
    //complete回调函数
    options.complete = (res) => {
      //res.responseJSON拿到服务器响应回来的数据
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //清空token
        localStorage.removeItem('token')
        //跳转到登录页
        location.href = "/login.html"
      }
    }
  }

})