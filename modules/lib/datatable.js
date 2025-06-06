define(['jquery', 'datatables.net-bs4', 'datatables.net-fixedcolumns-bs4', 'datatables.net-fixedheader-bs4'], function () {
    /**
    * 关闭datatable的弹窗异常
    * @type {string}
    */
    $.fn.dataTable.ext.errMode = function (e, settings, techNote, message) {
        console.error(e, settings, techNote, message);
    };
    /**
     * 改变datatable默认参数
     */
    $.extend($.fn.dataTable.defaults, {
        processing: false,
        serverSide: true,
        pagingType: 'simple',//只显示上一页和下一页按钮
        lengthMenu: [[10, 20, 50, 100, 200, 500, 1000], [10, 20, 50, 100, 200, 500, 1000]],
        pageLength: 10,
        scrollY: window.innerHeight,
        scrollCollapse: true,
        searching: false,
        ordering: false,
        //order: [[0, 'desc']],
        columns: [
            /* { data: 'terminalId', title: '终端ID', visible: false, orderable: false }
            , { data: 'did', title: '终端编号' }
            , { data: 'planId', title: '升级计划ID' }
            , { data: 'planStatus', title: '升级计划状态' }
            , { data: 'updateTime', title: '更新时间' }
            , {
                data: null, title: '操作', orderable: false, render: function (data, type, row) {
                    return '<button>编辑</button><button>删除</button>';
                }
            } */
        ],
        // 固定表头
        //fixedHeader: true,
        /* fixedHeader: {
            header: true,
            footer: true
        }, */
        // 固定右侧1列，左侧0列
        /* fixedColumns: {
            left: 0,
            right: 1
        }, */
        ajax: {
            url: '',
            method: 'POST',
            contentType: 'application/json', // 设置请求体内容类型为 JSON
            /* dataSrc: {
                data: 'data.records',
                //draw: 'data.draw',
                recordsTotal: 'data.total',
                recordsFiltered: 'data.total'
            }, */
            dataSrc: function (data) {
                data.recordsTotal = data.data.total;
                data.recordsFiltered = data.data.total;
                return data.data.records;
            },
            data: function (d) {
                const sortColumn = d.order[0] ? d.columns[d.order[0].column].data : null;
                const sortDirection = d.order[0] ? d.order[0].dir : null;
                /* // 新增表单参数合并
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
                return JSON.stringify(requestData); */
                return JSON.stringify({
                    "page": d.start / d.length + 1,
                    "pageSize": d.length,
                    "sortColumn": sortColumn,
                    "sortDirection": sortDirection
                });
            },
        },
        // 设置表头居左展示
        columnDefs: [{
            targets: '_all',
            className: 'dt-head-left'
        }],
        language: {
            "decimal": "",
            "emptyTable": "表中数据为空",
            "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "infoFiltered": "(由 _MAX_ 项结果过滤)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "显示 _MENU_ 项结果",
            "loadingRecords": "载入中...",
            "processing": "处理中...",
            "search": "搜索:",
            "zeroRecords": "没有匹配结果",
            "paginate": {
                "first": "首页",
                "last": "尾页",
                "next": "下一页",
                "previous": "上一页"
            },
            "aria": {
                "orderable": "按此列排序",
                "orderableReverse": "将此列进行倒序排列"
            }
        }
    });

    return {
        init: function () {
        },
        DynamicDataTable: function (options) {
        }
    }
});