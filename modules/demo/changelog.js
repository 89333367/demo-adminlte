define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    require('jquery');
    require('handlebars');
    var common = require('common');

    /**
     * 初始化菜单
     * @param {*} tplPath 模版路径 
     * @param {*} data 数据
     * @param {*} selector jQuery选择器
     */
    exports.init = function () {
        common.loadTpl('tpl/demo/changelog.html', function (tpl) {
            var template = Handlebars.compile(tpl);
            var html = template({});
            $("#bodyContent").html(html);
        });
    };

});