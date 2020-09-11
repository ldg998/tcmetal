////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    selectBox_modal1();
    jqGrid_modal1();
    jqGridResize("#mes_modal1_grid1", $('#mes_modal1_grid1').closest('[class*="col-"]'));
    jqGridResize("#mes_modal1_grid2", $('#mes_modal1_grid2').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////
function modal1_get_btn(page) {
    var modal_data = value_return(".modal_value2");
    modal_data.keyword2='Y';
    $("#mes_modal1_grid1").setGridParam({
        url: '/sysUserGet',
        datatype: "json",
        page: page,
        postData: modal_data
    }).trigger("reloadGrid");
}

function num_keyup(e) {
    $(e).val($(e).val().replace(/[^0-9]/g,''));
}

function select_change2(value) {
    if (main_data.check === "I") {
        if (value !== '' && value !== null){

        $('#machine_select2').empty();
        select_makes_sub_ajax2("#machine_select2", "/tpmMachineAllGet", "machine_code", "machine_name", {keyword: value}, "Y").then(function (data) {
            if ($("#machine_select").val() !== '') {
                $("#machine_select2").val($("#machine_select").val()).trigger("change");
                if ($("#machine_select2").val() === null) {
                    $("#machine_select2 option:eq(0)").prop("selected", true).trigger("change");
                }
            } else {
                $("#machine_select2 option:eq(0)").prop("selected", true).trigger("change");
            }
        });
        } else{
            $('#machine_select2').empty();

            var option = $("<option></option>").text('전체').val('');

            $('#machine_select2').append(option);

            $('#machine_select2').select2();
        }
    }
}

function right_modal1_btn() {
        var ids = $("#mes_modal1_grid1").getGridParam('selarrrow').slice();
        if (ids.length === 0 ){
            alert("옮길 데이터를 선택해주세요");
            return false;
        }
        var ids2 = $("#mes_modal1_grid2").jqGrid("getDataIDs");
        var overlap = [];
        if (ids2.length != 0) {
            ids.forEach(function (idsfor, s) {
                ids2.forEach(function (ids2for) {
                    if (idsfor === ids2for) {
                        ids.splice(s, 1, '');
                        overlap.push(idsfor);
                    }
                });
            });
        }
        var list = [];
        ids.forEach(function (idsfor) {
            if (idsfor !== '') {
                list.push($("#mes_modal1_grid1").getRowData(idsfor));
            }
        });
        callback(function () {
            if (overlap.length !== 0) {
                alert(overlap.join(", ") + " 중복");
            }
            ids2 = $("#mes_modal1_grid2").getRowData();
            ids2 = ids2.concat(list);

            $('#mes_modal1_grid2').jqGrid("clearGridData");

            $("#mes_modal1_grid2").setGridParam({
                datatype: "local",
                data: ids2
            }).trigger("reloadGrid");

            $('#mes_modal1_grid1').jqGrid("resetSelection");
        });

}

function left_modal1_btn() {
        var ids2 = $("#mes_modal1_grid2").getGridParam('selarrrow').slice();
        for (var i = 0; i < ids2.length; i++) {
            $('#mes_modal1_grid2').jqGrid('delRowData', ids2[i]);
        }
        $('#mes_modal1_grid2').jqGrid("resetSelection");
}

function add_modal1_btn() {
    var gu5 = String.fromCharCode(5);
    if(  $("#alarm_day").val() === ''){
        $("#alarm_day").val(0);
    }
        var add_data = value_return(".modal_send_data");

        if ( add_data.line_code === ""){
            add_data.line_code = "AAAAA";
        }
        if ( add_data.machine_code === ""){
            add_data.machine_code = "AAAAA";
        }
        var jdata = $("#mes_modal1_grid2").getRowData();

        if (jdata.length > 0) {
            callback(function () {
                    var text = msg_object.TBMES_Q002.msg_name1;
                    if (main_data.check === "U") {
                        text = msg_object.TBMES_Q003.msg_name1;
                    }
                    if (confirm(text)) {
                        wrapWindowByMask2();
                        var list = [];
                        jdata.forEach(function (j) {
                            list.push(j.user_code);
                        })


                        add_data.alarm_user_code = list.join(gu5);
                        add_data.keyword = main_data.check;
                        ccn_ajax("/tpmMachineRegAlarmAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                    get_btn_post($("#mes_grid").getGridParam('page'));
                                }
                            }
                            closeWindowByMask();
                            $("#addDialog").dialog('close');
                        }).catch(function (err) {
                            closeWindowByMask();
                            alert(msg_object.TBMES_E008.msg_name1);
                        });
                    }
            })
        }else {
            alert("저장 목록을 넣어주세요");
        }
}

function close_modal1_btn() {
    $("#addDialog").dialog('close');
}

////////////////////////////호출 함수/////////////////////////////////////
//메세지 받아오는 함수
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function selectBox_modal1() {
    select_makes_sub_ajax2("#line_select2", "/syslineAllGroupGet", "line_code", "line_name",{keyword:'L9000'},'Y').then(function (data){ });
    select_makes_sub("#dept_select", "/sysDeptAllGet", "dept_code", "dept_name",'','Y');
}

function modal_make1() {

    $("#addDialog").dialog({
        modal: true,
        width: 1100,
        height: 'auto',
        autoOpen: false,
        resizable: false,

        open: function () {
            if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                if ($.ui.dialog.prototype._allowInteraction) {
                    $.ui.dialog.prototype._allowInteraction = function (e) {
                        if ($(e.target).closest('.select2-drop').length) return true;

                        if (typeof ui_dialog_interaction!="undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                }
                else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        },
        _allowInteraction: function (event) {
            return !!$(e.target).closest('.ui-dialog, .ui-datepicker, .select2-drop').length;
        }
    });
}

function jqGrid_modal1() {
    $("#mes_modal1_grid1").jqGrid({
        mtype: 'POST',
        datatype: "local",
        multiselect: true,
        caption: "예방점검알림추가 | MES",
        colNames: ['사용자코드', '사용자명'],
        colModel: [
            {name: 'user_code', index: 'user_code', key:true, sortable: false},
            {name: 'user_name', index: 'user_name', sortable: false},
        ],
        autowidth: true,
        height: 310,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        pager: "#mes_modal1_grid1_pager",
    });

    $("#mes_modal1_grid2").jqGrid({
        mtype: 'POST',
        datatype: "local",
        multiselect: true,
        caption: "예방점검알림추가 | MES",
        colNames: ['사용자코드', '사용자명'],
        colModel: [
            {name: 'user_code', index: 'user_code', key:true,sortable: false},
            {name: 'user_name', index: 'user_name', sortable: false},
        ],
        autowidth: true,
        height: 340,
    });

}
