require.config({
    baseUrl: "modules/",
    paths: {
        // requirejs插件
        'css': 'common/css.min',
        "text": 'common/text',

        // 三方插件
        "sweetalert2": '../plugins/sweetalert2/sweetalert2.min',
        "pace": '../plugins/pace-progress/pace.min',
        "handlebars": '../plugins/handlebars/handlebars.min',

        // 自定义模块
        "urlhash": "common/urlhash",
        "common": "common/common",

        // 页面模块
        "login": "js/login",
        "index": "js/index",
        "menu": "js/menu"
    },
    shim: {
        // 配置依赖关系
        'sweetalert2': {
            deps: ['css!../plugins/sweetalert2/sweetalert2.min.css'],
            exports: 'Swal'
        },
        'pace': {
            deps: ['css!../plugins/pace-progress/themes/black/pace-theme-big-counter.css'],
            exports: 'Pace'
        }
    }
});

/**
 * 所有接口地址
 */
apiUrls = {
    BASE_URL: 'http://bcnytest.bcnyyun.com/dapr-service-iot-ota',
    USER_LOGIN: function () {
        //登入
        return this.BASE_URL + '/user/login';
    },
    USER_LOGOUT: function () {
        //登出
        return this.BASE_URL + '/user/logout';
    },
    DASHBOARD_STATISTICS: function () {
        //获取统计数据
        return this.BASE_URL + '/dashboard/statistics';
    }
};