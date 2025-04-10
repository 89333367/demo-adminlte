define(['text!tpl/demo/changelog.html'], function (tpl) {
    return {
        init: function () {
            $('#bodyContent').html(tpl);
        }
    }
});