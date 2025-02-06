$(document).ready(function () {
    $('#submitButton').on('click', function () {
        event.preventDefault(); // 阻止默认提交行为

        // 获取表单中的用户名、邮箱和密码
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        // 构建请求数据
        const data = {
            username: username,
            email: email,
            password: password
        };

        // 发送POST请求到Strapi的注册API
        $.ajax({
            url: 'http://localhost:1337/api/auth/local/register', // 替换为你的Strapi服务器地址和端口
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function (response) {
                // 注册成功后的处理
                $('#message').text('Registration successful!').removeClass('text-danger').addClass('text-success');
                console.log('用户信息:', response);

                // 可以在这里存储用户的token到localStorage或者sessionStorage
                localStorage.setItem('jwt', response.jwt);
                localStorage.setItem('user', JSON.stringify(response.user));

                // 显示成功Toast
                var toast = new bootstrap.Toast(document.getElementById('successToast'));
                toast.show();

                // // 重定向到登录页面或其他页面
                // window.location.href = 'login.html'; 
            },
            error: function (xhr, status, error) {
                // 注册失败后的处理
                var toast = new bootstrap.Toast(document.getElementById('errorToast'));
                toast.show();
                console.error('注册失败:', error);
            }
        });
    });
});
