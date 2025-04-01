define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    require('jquery');
    require('handlebars');
    var common = require('common');
    var urlhash = require('urlhash');

    /**
     * 初始化菜单
     * @param {*} tplPath 模版路径 
     * @param {*} data 数据
     * @param {*} selector jQuery选择器
     */
    exports.init = function () {
        var $menu = $('ul[role="menu"]');

        $menu.on('click', 'a', function () {
            var $this = $(this);
            if ($this.attr('href') != '#') {
                console.log('切换菜单', $this.attr('href'));
                urlhash.setHash($this.attr('href').substring(1));
                $menu.find('a').removeClass('active');
                $this.addClass('active');
                // 查找外层的 a 标签并添加 active 类
                var $outerA = $this.closest('.nav-treeview').parent().find('> a.nav-link');
                $outerA.addClass('active');
                $outerA.closest('li').addClass('menu-open');
                seajs.use('modules/' + urlhash.getHash(), function (module) { module.init(); });
            }
        });

        common.loadTpl('tpl/menu.html', function (tpl) {
            var template = Handlebars.compile(tpl);
            var html = template({});
            $menu.children('li').last().before(html);
            if (!urlhash.getHash()) {
                $menu.find('a[href="' + $menu.find('a').last().attr('href') + '"]').click();
            } else {
                if ($menu.find('a[href="#' + urlhash.getHash() + '"]').length == 0) {
                    seajs.use('modules/404.js', function (module) { module.init(); });
                } else {
                    $menu.find('a[href="#' + urlhash.getHash() + '"]').click();
                }
            }
        });
    };

});