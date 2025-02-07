$(document).ready(function () {
    $('#submitButton').on('click', function () {
        event.preventDefault(); // 阻止默认提交行为

        // 获取表单中的用户名和密码
        const identifier = $('#username').val();
        const password = $('#password').val();

        // 构建请求数据
        const data = {
            identifier: identifier,
            password: password
        };

        // 发送POST请求到Strapi的登录API
        $.ajax({
            url: 'http://localhost:1337/api/auth/local', // 替换为你的Strapi服务器地址和端口
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 2c09109074d12610bd81ca478ced9a0c0b2b371f2aa177017c9fb81970d1a15b9ce1028bf291bd7b7b44498f4d4ea89b88b814fdbb2e3a8676d46ecb5e483ca51100858d27028f524658a769f460a538f6e90aa548db0736312361b499f6073b56ca6709d2d3e5c6be14a5041af911c94ba549fb6475ec4d00930b6147d6632b',
                'Content-Type': 'application/json'

            },
            data: JSON.stringify(data),
            success: function (response) {
                // 登录成功后的处理
                $('#message').text('Login successful!').removeClass('text-danger').addClass('text-success');
                console.log('用户信息:', response);

                // 可以在这里存储用户的token到localStorage或者sessionStorage
                localStorage.setItem('jwt', response.jwt);
                localStorage.setItem('user', JSON.stringify(response.user));

                // 重定向到其他页面
                window.location.href = 'concertMain.html'; // 替换为你想要重定向到的页面
            },
            error: function (xhr, status, error) {
                // 登录失败后的处理
                var toast = new bootstrap.Toast(document.getElementById('loginFailedToast'));
                toast.show();
                console.error('登录失败:', error);
            }
        });
    });
});
