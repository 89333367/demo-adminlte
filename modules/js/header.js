define(['text!tpl/header.html'], function (tpl) {
    return {
        init: function () {
            $('#headNav').html(tpl);
        }
    }
});