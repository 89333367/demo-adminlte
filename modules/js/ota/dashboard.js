define(['text!tpl/ota/dashboard.html', 'common'], function (tpl, common) {

    return {
        init: function () {
            var formData = JSON.stringify({
            });
            $.ajax({
                url: apiUrls.DASHBOARD_STATISTICS(),
                method: 'POST',
                contentType: 'application/json', // 设置请求体内容类型为 JSON
                data: formData, // 发送 JSON 格式的请求体
                success: function (response) {
                    common.renderTpl(tpl, { datas: response.data }, function (html) {
                        $('#bodyContent').html(html);
                    });
                }
            });
        }
    }
});