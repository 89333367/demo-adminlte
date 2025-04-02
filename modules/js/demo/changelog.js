define(['text!tpl/demo/changelog.html', 'common'], function (tpl, common) {
    return {
        init: function () {
            common.renderTpl(tpl, {}, function (html) {
                $('#bodyContent').html(html);
            });
        }
    }
});