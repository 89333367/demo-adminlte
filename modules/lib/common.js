define(['urlhash', 'handlebars', 'pace', 'jquery'], function (urlhash, Handlebars, Pace, jQuery) {
    var colors = ['cyan', 'green', 'yellow', 'red', 'blue', 'secondary', 'orange', 'purple', 'fuchsia'];
    Handlebars.registerHelper('getColor', function (index) {
        return colors[index % colors.length];
    });

    var ajaxOptions = {
        url: '',//apiUrls.DASHBOARD_STATISTICS()
        method: 'POST',
        contentType: 'application/json', // 设置请求体内容类型为 JSON
        data: JSON.stringify({}),
        beforeSend: function (jqXHR, settings) {
            Pace.restart();

            // 检查 localStorage 中的 token
            var tokenName = localStorage.getItem('tokenName');
            if (!tokenName) {
                // token 不存在，跳转到登录页面
                window.location.href = 'login.html';
                return false; // 阻止请求发送
            }
            jqXHR.setRequestHeader(tokenName, localStorage.getItem('tokenValue'));
            jqXHR.setRequestHeader('loginId', localStorage.getItem('loginId'));
        },
        success: function (data, textStatus, jqXHR) {
            try {
                // 检查是否包含 status 字段
                if (data.hasOwnProperty('status')) {
                    // 检查 status 字段的值
                    if (data.status !== 0) {
                        if (data.status >= 20000 && data.status <= 20007) {
                            localStorage.setItem('preUrlHash', urlhash.getHash());
                            // 跳转到登录页面
                            window.location.href = 'login.html';
                            return;
                        } else {
                            Swal.fire({
                                title: "异常",
                                text: data.message,
                                icon: "error"
                            });
                        }
                    }
                }
            } catch (e) {
                // 如果响应内容不是 JSON 格式，忽略错误
                console.log('响应内容不是 JSON 格式');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // 处理请求错误
            console.error('AJAX 请求错误:', textStatus, errorThrown);
        }, complete: function (jqXHR, textStatus) {
        }
    };
    /**
     * 设置全局 ajax 选项
     */
    $.ajaxSetup(ajaxOptions);

    return {
        init: function () {
        },
        /**
         * 渲染模版
         * @param {*} tpl 
         * @param {*} data 
         * @param {*} callback 
         */
        renderTpl: function (tpl, data, callback) {
            var template = Handlebars.compile(tpl);
            var html = template(data);
            if (callback && callback instanceof Function) {
                callback(html);
            }
        },
        /**
         * ajax封装
         * @param {*} options 
         */
        ajax: function (options) {
            var opts = $.extend({}, ajaxOptions, options);
            if (options.beforeSend) {
                var originalBeforeSend = options.beforeSend;
                opts.beforeSend = function (jqXHR, settings) {
                    ajaxOptions.beforeSend(jqXHR, settings);
                    originalBeforeSend(jqXHR, settings);
                };
            }
            if (options.success) {
                var originalSuccess = options.success;
                opts.success = function (data, textStatus, jqXHR) {
                    ajaxOptions.success(data, textStatus, jqXHR);
                    originalSuccess(data, textStatus, jqXHR);
                };
            }
            if (options.error) {
                var originalError = options.error;
                opts.error = function (jqXHR, textStatus, errorThrown) {
                    ajaxOptions.error(jqXHR, textStatus, errorThrown);
                    originalError(jqXHR, textStatus, errorThrown);
                };
            }
            if (options.complete) {
                var originalComplete = options.complete;
                opts.complete = function (jqXHR, textStatus) {
                    ajaxOptions.complete(jqXHR, textStatus);
                    originalComplete(jqXHR, textStatus);
                };
            }
            $.ajax(opts);
        }
    }
});
