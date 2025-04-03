define(['text!tpl/ota/dashboard.html'], function (tpl) {
    return {
        init: function () {
            require(['common'], function (common) {
                $.ajax({
                    global: true,
                    url: apiUrls.DASHBOARD_STATISTICS(),
                    method: 'POST',
                    contentType: 'application/json', // 设置请求体内容类型为 JSON
                    data: JSON.stringify({
                    }),
                    success: function (response) {
                        common.renderTpl(tpl, { datas: response.data }, function (html) {
                            $('#bodyContent').html(html);

                            $('.card').CardWidget('init');
                        });
                    }
                });
            });
        }
    }
});