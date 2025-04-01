define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    require('jquery');
    require('sweetalert2');
    require('pace');

    $(document).ready(function () {
        // 全局 AJAX 请求拦截
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                Pace.restart();

                // 检查 localStorage 中的 token
                var tokenName = localStorage.getItem('tokenName');
                if (!tokenName) {
                    // token 不存在，执行相应操作（例如跳转到登录页面）
                    window.location.href = 'login.html';
                    return false; // 阻止请求发送
                }
                xhr.setRequestHeader(tokenName, localStorage.getItem('tokenValue'));
                xhr.setRequestHeader('loginId', localStorage.getItem('loginId'));
            },
            complete: function (xhr, status) {
            },
            success: function (data, textStatus, xhr) {
                try {
                    // 尝试将响应内容解析为 JSON
                    var responseData = data;
                    // 检查是否包含 status 字段
                    if (responseData.hasOwnProperty('status')) {
                        // 检查 status 字段的值
                        if (responseData.status !== 0) {
                            if (responseData.status >= 20000 && responseData.status <= 20007) {
                                localStorage.setItem('urlHash', window.location.hash);
                                localStorage.setItem('tokenName', null);
                                localStorage.setItem('tokenValue', null);
                                localStorage.setItem('loginId', null);
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
    });

    /**
     * 读取模版
     * @param {*} tplPath 模版位置
     * @param {*} callback 读取成功后回调
     */
    exports.loadTpl = function (tplPath, callback) {
        $.ajax({
            url: tplPath,
            dataType: "text",
            success: function (data) {
                callback(data);
            },
            error: function () {
                console.error(tplPath, '加载失败');
            }
        });
    }

});