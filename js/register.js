
$(document).ready(function () {
    $('.submitButton').on('click', function (event) {
        event.preventDefault(); // 阻止默认行为

       
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

       
        const data = {
            username: username,
            email: email,
            password: password
        };

        $.ajax({
            url: 'http://localhost:1337/api/auth/local/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
    
            },
            data: JSON.stringify(data),
            success: function (response) {
                console.log(data);
                // 注册成功后的处理
                $('#message').text('Registration successful!').removeClass('text-danger').addClass('text-success');
                console.log('user info:', response);

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
                console.error('fail:', error);
                var toast = new bootstrap.Toast(document.getElementById('errorToast'));
                toast.show();
            }
        });
    });
});
