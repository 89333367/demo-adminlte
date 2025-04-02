define(['pace', 'sweetalert2'], function (Pace, Swal) {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); // 阻止表单的默认提交行为

        $.ajax({
            url: apiUrls.USER_LOGIN(),
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $('#username').val(),
                password: $('#password').val(),
                remember: $('#remember').prop('checked')
            }),
            beforeSend: function (xhr, settings) {
                Pace.restart();
            },
            success: function (response) {
                console.log(response);
                if (response.status == 0 && response.data && response.data.tokenName && response.data.tokenValue && response.data.loginId) {
                    localStorage.setItem('tokenName', response.data.tokenName);
                    localStorage.setItem('tokenValue', response.data.tokenValue);
                    localStorage.setItem('loginId', response.data.loginId);
                    window.location.href = 'index.html';
                } else {
                    Swal.fire({
                        title: "登入异常",
                        text: response.message,
                        icon: "error"
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "登入异常",
                    text: error,
                    icon: "error"
                });
            }
        });
    });

    return {
        init: function () {
            localStorage.removeItem('tokenName');
            localStorage.removeItem('tokenValue');
            localStorage.removeItem('loginId');
        }
    }
});