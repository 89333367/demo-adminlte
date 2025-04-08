require.config({
    baseUrl: 'modules/',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        // requirejs插件
        'css': ['https://cdn.bootcdn.net/ajax/libs/require-css/0.1.10/css.min'],
        'text': ['https://cdn.bootcdn.net/ajax/libs/require-text/2.0.12/text.min'],
        'domReady': ['https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min'],

        // AdminLTE插件
        'jquery': ['https://code.jquery.com/jquery-3.7.0.min'],
        'bootstrap': ['https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.6.2/js/bootstrap.bundle.min'],
        'adminlte': ['https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/js/adminlte.min'],

        // 三方插件
        'sweetalert2': ['https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.16.1/sweetalert2.all.min'],//all.min包含了css样式
        'pace': ['https://cdn.bootcdn.net/ajax/libs/pace/1.2.4/pace.min'],
        'handlebars': ['https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min'],
        // datatables
        'datatables.net': 'https://cdn.datatables.net/2.2.2/js/dataTables.min',
        'datatables.net-bs4': 'https://cdn.datatables.net/2.2.2/js/dataTables.bootstrap4.min',

        // 自定义模块
        'urlhash': 'lib/urlhash',
        'common': 'lib/common',

        // 页面模块
        'login': 'js/login',
        'index': 'js/index',
        'menu': 'js/menu',
        'header': 'js/header',
        'footer': 'js/footer'
    },
    shim: {
        // 配置依赖关系
        'pace': {
            deps: ['css!https://cdn.bootcdn.net/ajax/libs/pace/1.2.4/themes/black/pace-theme-big-counter.min.css'],
            exports: 'Pace'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'adminlte': {
            deps: [
                'css!https://cdnjs.cloudflare.com/ajax/libs/icheck-bootstrap/3.0.1/icheck-bootstrap.min.css',
                'css!https://cdn.bootcdn.net/ajax/libs/font-awesome/6.7.2/css/all.min.css',
                'css!https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/css/adminlte.min.css',
                'pace',
                'bootstrap'
            ]
        },
        'datatables.net-bs4': {
            deps: [
                'bootstrap',
                'datatables.net',
            ]
        },
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

            $('.hide').show();
        });
    });
});