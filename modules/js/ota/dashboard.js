define(['text!tpl/ota/dashboard.html', 'adminlte', 'datatables.net-bs4'], function (tpl, adminlte, datatables) {
    return {
        init: function () {
            require(['common'], function (common) {
                common.ajax({
                    url: apiUrls.DASHBOARD_STATISTICS(),
                    success: function (data, textStatus, jqXHR) {
                        common.renderTpl(tpl, { datas: data.data }, function (html) {
                            $('#bodyContent').html(html);


                        });
                    }
                });
            });
        }
    }
});