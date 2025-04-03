require.config({
    baseUrl: "modules/",
    urlArgs: "v=" + (new Date()).getTime(),
    paths: {
        // requirejs插件
        'css': 'common/css.min',
        "text": 'common/text',

        // AdminLTE插件
        'jquery': '../plugins/jquery/jquery.min',
        'bootstrap': '../plugins/bootstrap/js/bootstrap.bundle.min',
        'adminlte': '../dist/js/adminlte.min',

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
        'bootstrap': {
            deps: [
                'css!../plugins/icheck-bootstrap/icheck-bootstrap.min.css',
                'jquery'
            ]
        },
        'sweetalert2': {
            deps: ['css!../plugins/sweetalert2/sweetalert2.min.css'],
            exports: 'Swal'
        },
        'pace': {
            deps: ['css!../plugins/pace-progress/themes/black/pace-theme-big-counter.css'],
            exports: 'Pace'
        },
        'adminlte': {
            deps: [
                'css!../dist/css/adminlte.min.css',
                'css!../plugins/fontawesome-free/css/all.min.css',
                'pace',
                'sweetalert2',
                'bootstrap'
            ]
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