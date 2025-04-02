define(['handlebars', 'pace', 'sweetalert2', 'urlhash'], function (Handlebars, Pace, Swal, urlhash) {
    var colors = ['cyan', 'green', 'yellow', 'red', 'blue', 'secondary', 'orange', 'purple', 'fuchsia'];
    Handlebars.registerHelper('getColor', function (index) {
        return colors[index % colors.length];
    });

    // 全局 AJAX 请求拦截
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            Pace.restart();

            // 检查 localStorage 中的 token
            var tokenName = localStorage.getItem('tokenName');
            if (!tokenName) {
                localStorage.setItem('preUrlHash', urlhash.getHash());
                // token 不存在，跳转到登录页面
                window.location.href = 'login.html';
                return false; // 阻止请求发送
            }
            xhr.setRequestHeader(tokenName, localStorage.getItem('tokenValue'));
            xhr.setRequestHeader('loginId', localStorage.getItem('loginId'));
        },
        complete: function (xhr, status) {
        },
        success: function (responseData, textStatus, xhr) {
            try {
                // 检查是否包含 status 字段
                if (responseData.hasOwnProperty('status')) {
                    // 检查 status 字段的值
                    if (responseData.status !== 0) {
                        if (responseData.status >= 20000 && responseData.status <= 20007) {
                            localStorage.setItem('preUrlHash', urlhash.getHash());
                            // 跳转到登录页面
                            window.location.href = 'login.html';
                            return;
                        } else {
                            Swal.fire({
                                title: "异常",
                                text: responseData.message,
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
        error: function (xhr, textStatus, errorThrown) {
            // 处理请求错误
            console.error('AJAX 请求错误:', textStatus, errorThrown);
        }
    });

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
        }
    }
});