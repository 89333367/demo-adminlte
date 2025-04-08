define(['common', 'menu', 'header', 'footer'], function (common, menu, header, footer) {
    return {
        init: function () {
            common.init();
            menu.init();
            header.init();
            footer.init();
        }
    }
});