define(['common'], function (common) {
    var dict_upgradeplanstatus = new Promise((resolve, reject) => {
        common.ajax({
            url: apiUrls.DICT_UPGRADEPLANSTATUS(),
            success: function (data, textStatus, jqXHR) {
                var datas = [];
                $.each(data.data.records, function (index, item) {
                    datas[item.dictCode] = item.dictName;
                });
                resolve(datas);
            }
        });
    });
    var dict_upgradestatus = new Promise((resolve, reject) => {
        common.ajax({
            url: apiUrls.DICT_UPGRADESTATUS(),
            success: function (data, textStatus, jqXHR) {
                var datas = [];
                $.each(data.data.records, function (index, item) {
                    datas[item.dictCode] = item.dictName;
                });
                resolve(datas);
            }
        })
    })

    return {
        init: function () {

        },
        /**
         * 升级计划状态字典
         * @returns 
         */
        DICT_UPGRADEPLANSTATUS: function () {
            return dict_upgradeplanstatus;
        },
        /**
         * 升级状态列表
         * @returns
         */
        DICT_UPGRADESTATUS: function () {
            return dict_upgradestatus;
        }
    }
})