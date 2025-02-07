$(document).ready(function () {
    $('#submitButton').on('click', function () {
        event.preventDefault(); // 阻止默认提交行为

        
        const identifier = $('#username').val();
        const password = $('#password').val();

      
        const data = {
            identifier: identifier,
            password: password
        };

        
        $.ajax({
            url: 'http://localhost:1337/api/auth/local', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                

            },
            data: JSON.stringify(data),
            success: function (response) {
                // 登录成功后的处理
                $('#message').text('Login successful!').removeClass('text-danger').addClass('text-success');
                console.log('info:', response);

                // 可以在这里存储用户的token到localStorage或者sessionStorage
                localStorage.setItem('jwt', response.jwt);
                localStorage.setItem('user', JSON.stringify(response.user));

                // 重定向到其他页面
                window.location.href = 'concertMain.html'; 
            },
            error: function (xhr, status, error) {
                // 登录失败后的处理
                var toast = new bootstrap.Toast(document.getElementById('loginFailedToast'));
                toast.show();
                console.error('fail:', error);
            }
        });
    });
});
