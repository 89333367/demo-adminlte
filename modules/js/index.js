define(['adminlte', 'common', 'menu'], function (adminlte, common, menu) {
    return {
        init: function () {
            common.init();
            menu.init();

            $('body').Layout('init');
            $('.wrapper').show();
        }
    }
});