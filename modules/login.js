seajs.use(['sweetalert2'], function (_) {
    $('#submit').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var remember = $('#remember').prop('checked');
        console.log(username, password, remember);

        // 将表单数据转换为 JSON 格式
        var formData = JSON.stringify({
            username: username,
            password: password,
            remember: remember
        });

        // 发送 AJAX POST 请求
        $.ajax({
            url: seajs.data.apiUrls.USER_LOGIN(), // 替换为实际的 API 地址
            method: 'POST',
            contentType: 'application/json', // 设置请求体内容类型为 JSON
            data: formData, // 发送 JSON 格式的请求体
            success: function (response) {
                console.log(response);
                if (response.status == 0) {
                    var tokenName = response.data.tokenName;
                    var tokenValue = response.data.tokenValue;
                    var loginId = response.data.loginId;
                    localStorage.setItem('tokenName', tokenName);
                    localStorage.setItem('tokenValue', tokenValue);
                    localStorage.setItem('loginId', loginId);
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
});