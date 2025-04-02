define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    require('jquery');
    require('handlebars');
    var common = require('common');

    var colors = ['cyan', 'green', 'yellow', 'red', 'blue', 'secondary', 'orange', 'purple', 'fuchsia'];
    Handlebars.registerHelper('getColor', function (index) {
        return colors[index % colors.length];
    });

    /**
     * 初始化菜单
     * @param {*} tplPath 模版路径 
     * @param {*} data 数据
     * @param {*} selector jQuery选择器
     */
    exports.init = function () {
        common.loadTpl('tpl/ota/dashboard.html', function (tpl) {
            var formData = JSON.stringify({
            });
            $.ajax({
                url: seajs.data.apiUrls.DASHBOARD_STATISTICS(),
                method: 'POST',
                contentType: 'application/json', // 设置请求体内容类型为 JSON
                data: formData, // 发送 JSON 格式的请求体
                success: function (response) {
                    console.log(response.data);
                    var template = Handlebars.compile(tpl);
                    var html = template({ datas: response.data });
                    $("#bodyContent").html(html);
                }
            });
        });
    };

});