define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    /**
     * 读取模版
     * @param {*} tplPath 模版位置
     * @param {*} callback 读取成功后回调
     */
    exports.loadTpl = function (tplPath, callback) {
        seajs.use(["jquery"], function (_jQuery) {
            jQuery.ajax({
                url: tplPath,
                dataType: "text",
                success: function (data) {
                    callback(data);
                },
                error: function () {
                    console.error(tplPath, '加载失败');
                }
            });
        });
    }

});