define(['text!tpl/404.html'], function (tpl) {
    return {
        init: function () {
            $('#bodyContent').html(tpl);
        }
    }
});