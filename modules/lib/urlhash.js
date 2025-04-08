define([], function () {
    return {
        init: function () { },

        // 获取当前 URL 的 hash 值
        getHash: function () {
            return window.location.hash.substring(1); // 去掉开头的 '#'
        },

        // 设置 URL 的 hash 值
        setHash: function (hash) {
            window.location.hash = hash;
        },

        // 添加 hash 变化监听器
        hashChangeListener: function (callback) {
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
        }
    };
});