define(function (require, exports, module) {
    console.log('加载模块', module.uri);

    /**
     * 初始化菜单
     * @param {*} tplPath 模版路径 
     * @param {*} data 数据
     * @param {*} selector jQuery选择器
     */
    exports.init = function () {
        seajs.use(["jquery", "common", "handlebars", "urlhash"], function (_jQuery, common, _Handlebars, urlhash) {
            var $menu = $('ul[role="menu"]');

            $menu.on('click', 'a', function () {
                var $this = $(this);
                if ($this.attr('href') != '#') {
                    console.log('切换菜单', $this.attr('href'));
                    urlhash.setHash($this.attr('href').substring(1));
                    $menu.find('a').removeClass('active');
                    seajs.use('modules/' + urlhash.getHash(), function (module) { module.init(); });
                    $this.addClass('active');
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
        });
    };

});