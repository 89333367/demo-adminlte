define(['common'], function (common) {
    return {
        init: function () {

        },
        upgradePlanStatus: function () {
            common.ajax({
                url: apiUrls.DICT_UPGRADEPLANSTATUS(),
                success: function (data, textStatus, jqXHR) {
                    return data.data;
                }
            });
        }
    }
})