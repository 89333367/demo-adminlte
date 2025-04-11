define(['text!tpl/ota/dashboard.html', 'common', 'dict', 'datatable'], function (tpl, common, dict) {
    return {
        init: function () {
            common.ajax({
                url: apiUrls.DASHBOARD_STATISTICS(),
                success: function (data, textStatus, jqXHR) {
                    Promise.all([dict.DICT_UPGRADESTATUS()]).then((values) => {
                        var dict_upgradestatus = values[0];

                        $('#bodyContent').html(common.renderTpl(tpl, {
                            datas: data.data,
                            dict_upgradestatus: dict_upgradestatus
                        }));

                        $('#datatable').DataTable({
                            ajax: {
                                url: apiUrls.DASHBOARD_LIST(),
                                data: function (d) {
                                    const sortColumn = d.order[0] ? d.columns[d.order[0].column].data : null;
                                    const sortDirection = d.order[0] ? d.order[0].dir : null;
                                    // 新增表单参数合并
                                    const formData = $('#f').serializeArray().reduce((obj, item) => {
                                        obj[item.name] = item.value;
                                        return obj;
                                    }, {});
                                    // 使用 jQuery.extend 合并对象
                                    var requestData = $.extend({}, formData,
                                        {
                                            "page": d.start / d.length + 1,
                                            "pageSize": d.length,
                                            "sortColumn": sortColumn,
                                            "sortDirection": sortDirection
                                        }
                                    );
                                    return JSON.stringify(requestData);
                                }
                            },
                            columns: [
                                { data: 'terminalId', title: '终端ID' },
                                { data: 'did', title: '终端编号' },
                                { data: 'planId', title: '升级计划ID' },
                                { data: 'planName', title: '升级计划名称' },
                                {
                                    data: 'planStatus', title: '升级计划状态', render: function (data, type, row) {
                                        if (data <= dict_upgradestatus.length) {
                                            return dict_upgradestatus[data];
                                        } else {
                                            return data;
                                        }
                                    }
                                },
                                { data: 'updateTime', title: '更新时间' },
                                {
                                    data: null, title: '操作', orderable: false, render: function (data, type, row) {
                                        return '<button class="btn btn-primary btn-sm"><i class="fas fa-history"></i> 升级日志</button>';
                                    }
                                }
                            ],
                            fixedHeader: true,
                            fixedColumns: {
                                left: 0,
                                right: 1
                            },
                        });

                        $('#f').on('submit', function (e) {
                            e.preventDefault();
                            // 新增重新加载表格的代码
                            $('#datatable').DataTable().ajax.reload();
                        });
                    });
                }
            });
        }
    }
});