require.config({
    baseUrl: 'modules/',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        // requirejs插件
        'css': 'common/css.min',
        'text': 'common/text',
        'domReady': 'common/domReady',

        // AdminLTE插件
        'jquery': '../plugins/jquery/jquery.min',
        'bootstrap': '../plugins/bootstrap/js/bootstrap.bundle.min',
        'adminlte': '../dist/js/adminlte.min',

        // 三方插件
        'sweetalert2': '../plugins/sweetalert2/sweetalert2.all.min',//all.min包含了css样式
        'pace': '../plugins/pace-progress/pace.min',
        'handlebars': '../plugins/handlebars/handlebars.min',
        'overlayScrollbars': '../plugins/overlayScrollbars/js/jquery.overlayScrollbars.min',

        // 自定义模块
        'urlhash': 'common/urlhash',
        'common': 'common/common',

        // 页面模块
        'login': 'js/login',
        'index': 'js/index',
        'menu': 'js/menu'
    },
    shim: {
        // 配置依赖关系
        'pace': {
            deps: ['css!../plugins/pace-progress/themes/black/pace-theme-big-counter.css'],
            exports: 'Pace'
        },
        'overlayScrollbars': {
            deps: [
                'css!../plugins/overlayScrollbars/css/OverlayScrollbars.min.css',
                'jquery'
            ]
        },
        'adminlte': {
            deps: [
                'css!../plugins/icheck-bootstrap/icheck-bootstrap.min.css',
                'css!../plugins/fontawesome-free/css/all.min.css',
                'css!../dist/css/adminlte.min.css',
                'bootstrap',
                'pace',
                'jquery',
                'overlayScrollbars'
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

require(['domReady'], function (domReady) {
    domReady(function () {
        require(['adminlte'], function (adminlte) {
            //$('[data-card-widget="card-refresh"]').CardRefresh();
            //$('.card').CardWidget('init');
            //$('[data-widget="control-sidebar"]').ControlSidebar('init');
            //$('[data-widget="direct-chat"]').DirectChat('init');
            //$('[data-widget="dropdown"]').Dropdown('init');
            //$('[data-widget="expandable-table"]').ExpandableTable('init');
            //$('[data-widget="fullscreen"]').Fullscreen();
            //$('[data-widget="iframe"]').IFrame('init');
            $('body').Layout('init');
            //$('[data-widget="navbar-search"]').NavbarSearch('init');
            $('[data-widget="pushmenu"]').PushMenu('init');
            //$('[data-widget="sidebar-search"]').SidebarSearch('init');
            //$('[data-widget="toasts"]').Toasts('init');
            //$('[data-widget="todo-list"]').TodoList('init');
            $('[data-widget="treeview"]').Treeview('init');

            /* $("input[data-bootstrap-switch]").each(function () {
                $(this).bootstrapSwitch('state', $(this).prop('checked'));
            }) */

            $('.preHide').show();
        });
    });
});