define(['text!tpl/footer.html', 'common'], function (tpl, common) {
    return {
        init: function () {
            common.renderTpl(tpl, {}, function (html) {
                $('#footer').html(html);
            });
        }
    }
});