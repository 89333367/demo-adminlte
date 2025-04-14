define(['text!tpl/menu.html', 'text!tpl/loading.html', 'urlhash'], function (tpl, loading, urlhash) {
    return {
        init: function () {
            Pace.restart();
            $('#leftAside').html(tpl);

            var $menu = $('#leftAside ul[role="menu"]');
            $menu.on('click', 'a', function () {
                var $this = $(this);
                if ($this.attr('href') != '#') {
                    Pace.restart();

                    $('#bodyContent').html(loading);

                    urlhash.setHash($this.attr('href'));
                    $menu.find('a').removeClass('active');
                    $this.addClass('active');
                    // 查找外层的 a 标签并添加 active 类
                    var $outerA = $this.closest('.nav-treeview').parent().find('> a.nav-link');
                    $outerA.addClass('active');
                    $outerA.closest('li').addClass('menu-open');
                    var modulePath = 'js/' + urlhash.getHash();
                    require([modulePath], function (module) {
                        if (module && module.init && module.init instanceof Function) {
                            module.init();
                        }
                    });
                    localStorage.setItem('preUrlHash', urlhash.getHash());
                }
            });

            var urlHash = localStorage.getItem('preUrlHash');
            if (urlHash) {
                urlhash.setHash(urlHash);
            }
            if (!urlhash.getHash()) {
                $menu.find('a[href="' + $menu.find('a').last().attr('href') + '"]').trigger('click');
            } else {
                if ($menu.find('a[href="#' + urlhash.getHash() + '"]').length == 0) {
                    require(['js/404'], function (module) {
                        if (module && module.init && module.init instanceof Function) {
                            module.init();
                        }
                    });
                } else {
                    $menu.find('a[href="#' + urlhash.getHash() + '"]').trigger('click');
                }
            }
        }
    }
});