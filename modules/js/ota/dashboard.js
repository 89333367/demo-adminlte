define(['text!tpl/ota/dashboard.html', 'common', 'dict', 'adminlte', 'datatable'], function (tpl, common, dict) {
    return {
        init: function () {
            common.ajax({
                url: apiUrls.DASHBOARD_STATISTICS(),
                success: function (data, textStatus, jqXHR) {
                    common.renderTpl(tpl, { datas: data.data }, function (html) {
                        $('#bodyContent').html(html);

                        Promise.all([dict.DICT_UPGRADESTATUS()]).then((values) => {
                            var dict_upgradestatus = values[0];
                            $('#datatable').DataTable({
                                ordering: false,
                                ajax: {
                                    url: apiUrls.DASHBOARD_LIST()
                                    , type: 'post'
                                    , contentType: 'application/json'
                                    , dataSrc: {
                                        data: 'data.records',
                                        recordsTotal: 'data.total',
                                        recordsFiltered: 'data.total'
                                    }
                                    , data: function (d) {
                                        const sortColumn = d.order[0] ? d.columns[d.order[0].column].data : null;
                                        const sortDirection = d.order[0] ? d.order[0].dir : null;
                                        return JSON.stringify({
                                            "page": d.start / d.length + 1,
                                            "pageSize": d.length,
                                            "sortColumn": sortColumn,
                                            "sortDirection": sortDirection
                                        });
                                    }
                                }
                                , columns: [
                                    { data: 'terminalId', title: '终端ID' }
                                    , { data: 'did', title: '终端编号' }
                                    , { data: 'planId', title: '升级计划ID' }
                                    , {
                                        data: 'planStatus', title: '升级计划状态', render: function (data, type, row) {
                                            if (data <= dict_upgradestatus.length) {
                                                return dict_upgradestatus[data];
                                            } else {
                                                return data;
                                            }
                                        }
                                    }
                                    , { data: 'updateTime', title: '更新时间' }
                                    , {
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
                        });
                    });
                }
            });
        }
    }
});
