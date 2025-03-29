define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    // 获取当前 URL 的 hash 值
    exports.getHash = function () {
        return window.location.hash.substring(1); // 去掉开头的 '#'
    };

    // 设置 URL 的 hash 值
    exports.setHash = function (hash) {
        window.location.hash = hash;
    };

    // 添加 hash 变化监听器
    exports.hashChangeListener = function (callback) {
        if (window.addEventListener) {
            window.addEventListener('hashchange', function () {
                callback(exports.getHash());
            }, false);
        } else if (window.attachEvent) {
            window.attachEvent('onhashchange', function () {
                callback(exports.getHash());
            });
        } else {
            window.onhashchange = function () {
                callback(exports.getHash());
            };
        }
    };
});