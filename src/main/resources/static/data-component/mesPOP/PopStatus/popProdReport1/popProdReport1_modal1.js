var lastsel;
var saverow = 0;
var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1(); //모달 메세지설정
    modal_make1();    // 모달생산
    datepicker_modal1(); //모달안 날짜 넣어주기
    selectBox_modal1(); // 셀렉트박스 데이터 넣어주기
    jqGrid_modal1();  //그리드 생성
    jqGridResize("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]')); //행당그리드 리사이즈
    jqGridResize("#mes_add_grid2", $('#mes_add_grid2').closest('[class*="col-"]')); //행당그리드 리사이즈
    header_make();
}

////////////////////////////클릭 함수/////////////////////////////////////
//모달 조회 버튼
function get_modal1_btn(page) {
    if(main_data.status === 'N') {
        var data = value_return(".modal_value"); //해당클레스이름 데이터 name value 할당
        if(data.keyword !== '') {
            $("#mes_add_grid").setGridParam({ //그리드 조회
                url: "/scmOrderPartGet",
                datatype: "json",
                page: page,
                postData: data
            }).trigger("reloadGrid"); //그리드 재시작
        }else {
            alert("업체를 선택해주세요.");
        }
    }else {
        alert("완료처리된 항목은 수정 할 수 없습니다.");
    }
}

//이미지 여부를 묻고 있다면 할당 없으면 ""  체크가 y가 아니라면 다시 이미지를 호출
function img_change(value){
    if(main_data.check3 === 'Y') {
        ccn_ajax("/scmOrderImageOneGet",{keyword: value}).then(function (data) {
            if(value == '' || value == null) {
                $("#remark").val("").trigger("change");
            }else {
                $("#remark").val(data.remark).trigger("change");
            }
        });
    }else {
        ccn_ajax("/scmOrderImageOneGet",{keyword: value}).then(function (data) {  });
    }
}

//추가모달 취소 버튼
function close_modal1_btn() {
    modal_reset(".modal_value", []);
    $("#addDialog").dialog('close');
}

//수정 버튼
function update_btn(rowid) {
    main_data.check3 = 'N';
    if (main_data.auth.check_edit != "N") {
        modal_reset(".modal_value", []);
        $("#mes_add_grid").jqGrid('clearGridData');
        $("#mes_add_grid2").jqGrid('clearGridData');
        main_data.check = 'U';
        ccn_ajax("/scmOrderOneGet", {keyword: rowid}).then(function (data) {
            if (data.status === '1') {
                main_data.status = 'Y';
                trigger_true();
            } else {
                main_data.status = 'N';
                trigger_false();
            }

            $("#ord_no").val(data.ord_no);
            $('#supp_code_modal').val(data.supp_code).prop("selected",true).trigger("change")
            $("#place_name").val(data.place_name);
            $('#datepicker3').datepicker('setDate', data.work_date);
            $('#datepicker4').val(formmatterDate2(data.delivery_date));
            $("#delivery_place").val(data.delivery_place);

            main_data.check3 = 'Y';
        });

        ccn_ajax("/scmOrderPartOneGet", {keyword: rowid}).then(function (data) {
            $("#mes_add_grid2").setGridParam({
                datatype: "local",
                data: data
            }).trigger("reloadGrid");
            $("#addDialog").dialog('open');
            jqGridResize2("#mes_add_grid", $('#mes_add_grid').closest('[class*="col-"]'));
            jqGridResize2("#mes_add_grid2", $('#mes_add_grid2').closest('[class*="col-"]'));
        });

    } else {
        alert("수정권한이 없습니다.");
    }


}

// 추가 모달 저장 버튼
function add_modal1_btn() {
    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var add_data = value_return(".modal_value");

    add_data.work_date = add_data.work_date.replace(/\-/g, '');
    add_data.delivery_date = add_data.delivery_date.replace(/\-/g, '');
    add_data.save_type = main_data.check;
    var jdata = $("#mes_add_grid2").getRowData();

    if (jdata.length > 0) {
        var list = [];
        var list2 = [];
        jdata.forEach(function (data, j) {
            if (data.ord_qty !== '' && data.ord_qty > 0) {
                list.push(data.part_code + gu4 + data.ord_qty + gu4 + data.remark);

            } else {
                list2.push(data.part_code);
            }
        });
        callback(function () {
            if (list2.length > 0) {
                alert(list2[0] + "를 다시 확인해주세요");
            } else {
                if(main_data.status === 'Y') {
                    alert("완료처리된 항목은 수정 할 수 없습니다.");
                }else {
                    var text = msg_object.TBMES_Q002.msg_name1;
                    if (main_data.check === "U") {
                        text = msg_object.TBMES_Q003.msg_name1;
                    }

                    if (confirm(text)) {
                        wrapWindowByMask2();
                        add_data.ord_sub = list.join(gu5);

                        ccn_ajax("/scmOrderAdd", add_data).then(function (data) {
                            if (data.result === 'NG') {
                                alert(data.message);
                            } else {
                                if (main_data.check === "I") {
                                    get_btn(1);
                                } else {
                                    $('#mes_grid').trigger("reloadGrid"); //화면 리로딩
                                    $('#mes_grid2').trigger("reloadGrid"); //화면 리로딩
                                }
                            }
                            $('#mes_add_grid').jqGrid('clearGridData');
                            $('#mes_add_grid2').jqGrid('clearGridData');
                            closeWindowByMask();
                            $("#addDialog").dialog('close');
                        }).catch(function (err) {
                            closeWindowByMask();
                            alert(msg_object.TBMES_E008.msg_name1);
                        });
                    }
                }
            }
        });
    } else {
        alert("저장 목록을 넣어주세요");
    }
}

// 추가 모달 -> 버튼
function right_modal1_btn() {
    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
    if (main_data.check2 === 'Y') {
        if(main_data.status === 'Y') {
            alert("완료처리된 항목은 수정 할 수 없습니다.");
        }else {
            var ids = $("#mes_add_grid").getGridParam('selarrrow').slice();
            if (ids.length === 0 ){
                alert("옮길 데이터를 선택해주세요");
                return false;
            }
            var ids2 = $("#mes_add_grid2").jqGrid("getDataIDs");
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
                    list.push($("#mes_add_grid").getRowData(idsfor));
                }
            });
            callback(function () {
                if (overlap.length !== 0) {
                    alert(overlap.join(", ") + " 중복");
                }
                ids2 = $("#mes_add_grid2").getRowData();
                ids2 = ids2.concat(list);
                $('#mes_add_grid2').jqGrid("clearGridData");
                $("#mes_add_grid2").setGridParam({
                    datatype: "local",
                    data: ids2
                }).trigger("reloadGrid");
                $('#mes_add_grid').jqGrid("resetSelection");
            });
        }
    }
}

//추가 모달 <- 버튼
function left_modal1_btn() {
    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
    if (main_data.check2 === 'Y') {
        if(main_data.status === 'Y') {
            alert("완료처리된 항목은 수정 할 수 없습니다.");
        }else {
            var ids2 = $("#mes_add_grid2").getGridParam('selarrrow').slice();
            for (var i = 0; i < ids2.length; i++) {
                $('#mes_add_grid2').jqGrid('delRowData', ids2[i]);
            }
            $('#mes_add_grid2').jqGrid("resetSelection");
        }
    }
}



////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002"); //저장 여부
    msgGet_auth("TBMES_Q003"); //수정 여부
    msgGet_auth("TBMES_E008"); //데이터 등록 실패
}

function datepicker_modal1() {
    datepicker_makes("#datepicker_modal1", 0); //모달 초기날짜 설정
    datepicker_makes("#datepicker_modal2", 0); // 모달 초기날짜 설정
}

function selectBox_modal1() {
    select_makes_sub('#part_type_select', "/sysPartTypeGet","part_type" ,"part_type_name",{keyword:''},'Y'); //셀렉트박스 초기값할당
    select_makes_sub("#supp_code_modal","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE1'},"N")
}

function jqGrid_modal1() { // 메인 그리드 설정
    $("#mes_add_grid").jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: [ 'No', '온도', '시간', 'CE', 'C','Si','CW','PW'],
        colModel: [
            {name: '1', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false},
            {name: '2', index: '', width: 60, sortable: false},
            {name: '', index: '', width: 60, sortable: false}
        ],
        autowidth: true,
        height: 190,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        loadComplete:function(){
            if ($("#mes_add_grid").jqGrid('getGridParam', 'reccount') === 0) {
                $("table#mes_add_grid  tr.jqgfirstrow").css("height","1px");
            }
        }
    });

    $("#mes_add_grid2").jqGrid({ //메인그리드2 설정
        datatype: "local",
        colNames: ['업체','기종','품명','단중','수량','중량','LOT','작업자'],
        colModel: [
            {name: '3', index: '', width: 70, sortable: false},
            {name: '', index: '', width: 70, sortable: false},
            {name: '', index: '', width: 70, sortable: false},
            {name: '', index: '', width: 70, sortable: false},
            {name: '', index: '', width: 70, sortable: false},
            {name: '', index: '', width: 70, sortable: false},
            {name: '', index: '', width: 70, sortable: false},
            {name: '', index: '', width: 70, sortable: false}



        ],
        autowidth: true,
        height: 190,
        cellEdit: true,
        cellsubmit: 'clientArray',
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        loadComplete:function(){
            if ($("#mes_add_grid2").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_add_grid2  tr.jqgfirstrow").css("height","1px");

        }
    });

}


function modal_make1() {
    $("#addDialog").dialog({//모달 초기설정
        modal: true,
        width: 1400,
        height: 800,
        autoOpen: false,
        buttons: [ // 모달 하단 버튼 설정
            {
                text: "닫기",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
        resizable: false,
        open: function () {
            if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                if ($.ui.dialog.prototype._allowInteraction) {
                    $.ui.dialog.prototype._allowInteraction = function (e) {
                        if ($(e.target).closest('.select2-drop').length) return true;

                        if (typeof ui_dialog_interaction != "undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                } else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        }

    });
}


function header_make() {
    $("#mes_add_grid").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: '1', numberOfColumns: 6, titleText: '<center>성분조사</center>'},
            {startColumnName: '2', numberOfColumns: 2, titleText: '<center>WEDGE</center>'}
        ]
    })

    $("#mes_add_grid2").jqGrid('setGroupHeaders',{
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: '3', numberOfColumns: 8, titleText: '<center>주입내역</center>'},
        ]
    })

}

