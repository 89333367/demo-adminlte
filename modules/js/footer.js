define(['text!tpl/footer.html'], function (tpl) {
    return {
        init: function () {
            $('#footer').html(tpl);
        }
    }
});