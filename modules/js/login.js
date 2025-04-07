define(['jquery', 'sweetalert2'], function (jQuery, Swal) {
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
            beforeSend: function (jqXHR, settings) {
                Pace.restart();
            },
            success: function (data, textStatus, jqXHR) {
                if (data.status == 0 && data.data && data.data.tokenName && data.data.tokenValue && data.data.loginId) {
                    localStorage.setItem('tokenName', data.data.tokenName);
                    localStorage.setItem('tokenValue', data.data.tokenValue);
                    localStorage.setItem('loginId', data.data.loginId);
                    window.location.href = 'index.html';
                } else {
                    Swal.fire({
                        title: "登入异常",
                        text: data.message,
                        icon: "error"
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire({
                    title: "登入异常",
                    text: errorThrown,
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