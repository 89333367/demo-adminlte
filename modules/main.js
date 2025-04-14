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
    },
    DASHBOARD_LIST: function () {
        //升级状态列表
        return this.BASE_URL + '/dashboard/list';
    },
    DICT_UPGRADESTATUS: function () {
        //升级状态列表
        return this.BASE_URL + '/dict/upgradeStatus';
    },
    DICT_UPGRADEPLANSTATUS: function () {
        //升级计划状态字典
        return this.BASE_URL + '/dict/upgradePlanStatus';
    }
};

/**
 * requirejs配置
 * 注意：
 * 1. 配置的baseUrl是相对于index.html的路径
 * 2. 配置的urlArgs是为了避免浏览器缓存，每次请求都会加上时间戳
 * 3. 配置的waitSeconds是为了避免请求超时，超时时间为7秒
 * 4. 配置的shim是为了配置依赖关系
 * 5. 配置的paths是为了配置模块的路径，key是模块的名称，value是模块的路径
 */
require.config({
    baseUrl: 'modules/',
    urlArgs: 'v=' + (new Date()).getTime(),
    waitSeconds: 7, // 超时时间，秒
    paths: {
        // requirejs插件
        'css': ['https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min'],
        'text': ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'],
        'domReady': ['https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min'],

        // AdminLTE插件
        'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min'],
        'bootstrap': ['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.2/js/bootstrap.bundle.min'],
        'adminlte': ['https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/js/adminlte.min'],

        // 三方插件
        'es6-promise': ['https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.2.8/es6-promise.auto.min'],
        'sweetalert2': ['https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.16.1/sweetalert2.all.min'],//all.min包含了css样式
        'pace': ['https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/pace.min'],
        'handlebars': ['https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min'],

        // datatables
        'datatables.net': ['https://cdn.datatables.net/2.2.2/js/dataTables.min'],
        'datatables.net-bs4': ['https://cdn.datatables.net/2.2.2/js/dataTables.bootstrap4.min'],
        'datatables.net-fixedcolumns': ['https://cdn.datatables.net/fixedcolumns/5.0.4/js/dataTables.fixedColumns.min'],
        'datatables.net-fixedcolumns-bs4': ['https://cdn.datatables.net/fixedcolumns/5.0.4/js/fixedColumns.bootstrap4.min'],
        'datatables.net-fixedheader': ['https://cdn.datatables.net/fixedheader/4.0.1/js/dataTables.fixedHeader.min'],
        'datatables.net-fixedheader-bs4': ['https://cdn.datatables.net/fixedheader/4.0.1/js/fixedHeader.bootstrap4.min'],

        // 自定义模块
        'urlhash': ['lib/urlhash'],
        'common': ['lib/common'],

        // 页面模块
        'login': ['js/login'],
        'index': ['js/index'],
        'menu': ['js/menu'],
        'header': ['js/header'],
        'footer': ['js/footer'],

        //自定义模块
        'dict': ['js/dict'],
        'datatable': ['lib/datatable'],
    },
    shim: {
        // 配置依赖关系
        'pace': {
            deps: ['css!https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/themes/black/pace-theme-big-counter.min.css'],
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'adminlte': {
            deps: [
                'css!https://cdnjs.cloudflare.com/ajax/libs/icheck-bootstrap/3.0.1/icheck-bootstrap.min.css',
                'css!https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
                'css!https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/css/adminlte.min.css',
                'pace',
                'bootstrap'
            ]
        },
        'datatables.net-bs4': {
            deps: [
                'css!https://cdn.datatables.net/2.2.2/css/dataTables.bootstrap4.min.css',
                'bootstrap'
            ]
        },
        'datatables.net-fixedcolumns-bs4': {
            deps: [
                'css!https://cdn.datatables.net/fixedcolumns/5.0.4/css/fixedColumns.bootstrap4.min.css',
                'datatables.net-bs4'
            ]
        },
        'datatables.net-fixedheader-bs4': {
            deps: [
                'css!https://cdn.datatables.net/fixedheader/4.0.1/css/fixedHeader.bootstrap4.min.css',
                'datatables.net-bs4'
            ]
        },
        'datatables.net-buttons-bs4': {
            deps: [
                'css!https://cdn.datatables.net/buttons/3.2.2/css/buttons.bootstrap4.min.css',
                'datatables.net-buttons'
            ]
        },
    },
    retryConfig: {
        maxAttempts: 7, // 最大重试次数
        retryDelay: 1000 // 重试间隔(ms)
    },
    moduleRetries: {},
    utils: {
        appendLoader: function (msg) {
            const cfg = require.s.contexts._.config;
            const loader = document.querySelector('#loading-modules');
            if (loader) {
                const li = document.createElement('li');
                li.textContent = msg;
                loader.appendChild(li);

                // 更新加载计数
                cfg.progress.loaded++;
                cfg.progress.updatePercent();

                Pace && Pace.restart();
            }
        }
    },
    progress: {
        total: 0,
        loaded: 0,
        updatePercent: function () {
            const percent = this.loaded / this.total * 100 || 0;
            const element = document.getElementById('loading-percent');
            if (element) {
                element.textContent = `${Math.min(100, percent.toFixed(0))}%`;
            }
        }
    }
});
/**
 * 模块加载失败时的重试机制
 * @param {*} err 
 */
require.onError = function (err) {
    const cfg = require.s.contexts._.config;
    const retryCfg = cfg.retryConfig;
    const utils = cfg.utils;
    const retries = cfg.moduleRetries;

    (err.requireModules || []).forEach(moduleId => {
        retries[moduleId] = retries[moduleId] || 0;

        if (retries[moduleId] < retryCfg.maxAttempts) {
            retries[moduleId]++;
            const msg = `[${moduleId}] 第 ${retries[moduleId]} 次重试`;
            console.warn(msg);
            utils.appendLoader(msg);

            require.undef(moduleId);

            setTimeout(() => {
                require([moduleId],
                    () => utils.appendLoader(`[${moduleId}] 重试成功`),
                    (newErr) => utils.appendLoader(`[${moduleId}] 重试失败`)
                );
            }, retryCfg.retryDelay);
        } else {
            utils.appendLoader(`资源加载失败，已重试 ${retryCfg.maxAttempts} 次，请检查网络连接后刷新页面`);
        }
    });
};
/**
 * 配置模块加载完成后的回调函数
 * @param {*} context 
 * @param {*} map 
 * @param {*} depMaps 
 */
require.onResourceLoad = function (context, map, depMaps) {
    const cfg = require.s.contexts._.config;
    cfg.progress.total++;
    cfg.progress.updatePercent();
    const utils = cfg.utils;
    const moduleName = map.name;

    console.log('onResourceLoad', moduleName);
    utils.appendLoader(moduleName);
};

/**
 * 页面加载完毕后执行的函数
 * 1. 初始化页面
 * 2. 初始化插件
 */
require(['domReady', 'es6-promise'], function (domReady) {
    domReady(function () {
        require(['adminlte'], function () {
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

            $('.preloader_hide').show();
        });
    });
});