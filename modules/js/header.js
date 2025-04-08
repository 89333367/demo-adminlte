define(['text!tpl/header.html', 'common'], function (tpl, common) {
    return {
        init: function () {
            common.renderTpl(tpl, {}, function (html) {
                $('#headNav').html(html);
            });
        }
    }
});