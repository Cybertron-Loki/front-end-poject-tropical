
$(document).ready(function () {
    $('.submitButton').on('click', function (event) {
        event.preventDefault(); // 阻止默认行为

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
            url: 'http://localhost:1337/api/auth/local/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 2c09109074d12610bd81ca478ced9a0c0b2b371f2aa177017c9fb81970d1a15b9ce1028bf291bd7b7b44498f4d4ea89b88b814fdbb2e3a8676d46ecb5e483ca51100858d27028f524658a769f460a538f6e90aa548db0736312361b499f6073b56ca6709d2d3e5c6be14a5041af911c94ba549fb6475ec4d00930b6147d6632b',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function (response) {
                console.log(data);
                // 注册成功后的处理
                $('#message').text('Registration successful!').removeClass('text-danger').addClass('text-success');
                console.log('用户信息:', response);

                // 存储用户的token到localStorage
                localStorage.setItem('jwt', response.jwt);
                localStorage.setItem('user', JSON.stringify(response.user));

                // 显示成功Toast
                var toast = new bootstrap.Toast(document.getElementById('successToast'));
                toast.show();

    // 跳转到 main.html
    setTimeout(() => {
        window.location.href = 'concertMain.html';
    }, 2000); // 2秒后跳转

            },
            
            error: function (xhr, status, error) {
                // 注册失败后的处理
                console.error('注册失败:', error);
                var toast = new bootstrap.Toast(document.getElementById('errorToast'));
                toast.show();
            }
        });
    });
});
