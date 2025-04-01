seajs.use(["modules/menu.js", "jquery"], function (menu, _) {
    menu.init();

    $('#logoutBtn').on('click', function () {
        var formData = JSON.stringify({
            loginId: localStorage.getItem('loginId')
        });
        $.ajax({
            url: seajs.data.apiUrls.USER_LOGOUT(),
            method: 'POST',
            contentType: 'application/json',
            data: formData
        });
        localStorage.removeItem('tokenName');
        localStorage.removeItem('tokenValue');
        localStorage.removeItem('loginId');
        window.location.href = 'login.html';
    });
});