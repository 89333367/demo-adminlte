define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    /**
     * 初始化菜单
     * @param {*} tplPath 模版路径 
     * @param {*} data 数据
     * @param {*} selector jQuery选择器
     */
    exports.init = function () {
        seajs.use(["jquery", "common", "handlebars", "urlhash"], function (_jQuery, common, _Handlebars, urlhash) {
            common.loadTpl('tpl/404.html', function (tpl) {
                var template = Handlebars.compile(tpl);
                var html = template({});
                $('#bodyContent').html(html);
            });
        });
    };

});