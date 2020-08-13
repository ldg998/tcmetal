////////////데이터////////////////////////////////
var lastsel;
var saverow = 0;
var savecol = 0;
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    jqGrid_main_modal();
    select_modal_Box();

}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {

    $("#mes_modal_grid2").jqGrid("saveCell", saverow, savecol);
    var gu5 = String.fromCharCode(5);
    var gu4 = String.fromCharCode(4);
    var jdata = $("#mes_add_grid2").getRowData();
    var add_data = value_return(".modal_value");


    if (jdata.length > 0) {
        if (qty_chck(jdata)) {
        var list = [];
        var list2 = [];
        jdata.forEach(function (data, j) {
            if (data.outs_qty !== '' && data.outs_qty > 0) {
                list.push(data.supp_code + gu4 + data.outs_supp_code + gu4 + data.part_kind + gu4 + data.part_code + gu4 + data.part_weight + gu4 + data.outs_qty);
            } else {
                list2.push(data.supp_code);
            }
        });
        callback(function () {
            var text = msg_object.TBMES_Q002.msg_name1;
            if (main_data.check === "U") {
                text = msg_object.TBMES_Q003.msg_name1;
            }
            console.log(list);
            if (confirm(text)) {
                wrapWindowByMask2();
                add_data.code_list = list.join(gu5);

                ccn_ajax("/outsOutAdd", add_data).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        if (main_data.check === "I") {
                            get_btn(1);
                        } else {
                            $('#mes_grid').trigger("reloadGrid");
                        }
                    }
                    $('#mes_modal_grid2').jqGrid('clearGridData');
                    closeWindowByMask();
                    $("#addDialog").dialog('close');
                }).catch(function (err) {
                    closeWindowByMask();
                    alert(msg_object.TBMES_E008.msg_name1);
                });
            }


        });
    }else {
            alert("출고수량을 확인해주세요.");
        }
    } else {
        alert("저장할 데이터가 없습니다.");
    }



}



function modal_get_btn(page) {
    main_data.send_data = value_return(".modal_value"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    $("#mes_add_grid2").setGridParam({ // 그리드 조회
        url:'/outsStockSumAllGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");

}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");// 저장여부
    msgGet_auth("TBMES_Q003"); //수정여부
    msgGet_auth("TBMES_E008");// 데이터 등록 실패
}


function modal_make1() { //dialog 에 사이즈 및 버튼 기타옵션을 설정해준다
    $("#addDialog").dialog({
        modal: true, // 모달 설정 ( 뒷배경 클릭 방지 마스크로 덮음)
        width: 900, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정

        ]
    })
}

function jqGrid_main_modal() {
    $("#mes_add_grid2").jqGrid({
        datatype: "local", // local 설정을 통해 handler 에 재요청하는 경우를 방지
        mtype: 'POST',// post 방식 데이터 전달
        colNames: ['','','업체', '기종', '품번', '품명', '단중', '재고수량', '출장검사', '출고수량', '납품처'],// grid 헤더 설정
        colModel: [// grid row 의 설정할 데이터 설정
            {name: 'supp_code', index: 'supp_code', sortable: false, fixed: true,hidden:true},
            {name: 'outs_supp_code', index: 'outs_supp_code', sortable: false, fixed: true,hidden:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 110, fixed: true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 110, fixed: true},
            {name: 'part_code', index: 'part_code', sortable: false, width: 110, fixed: true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 110, fixed: true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 110, fixed: true, formatter: 'integer', align: 'right'},
            {name: 'qty', index: 'qty', sortable: false, width: 110, fixed: true, formatter: 'integer', align: 'right'},
            {name: 'outs_qc', index: 'outs_qc', sortable: false, width: 110, fixed: true},
            {name: 'outs_qty', index: 'outs_qty', width: 80, sortable: false,align: 'right',formatter:'integer',fixed:true,
                editable: true,
                editoptions: {
                    dataEvents: [
                        {
                            type: 'focus',
                            fn: function (e) {
                                if (e.target.value === '0'){
                                    e.target.value = '';
                                }

                                if(main_data.status === 'Y') {
                                    $(e.target).prop('readonly',true);
                                }else {
                                    $(e.target).prop('readonly',false);
                                }

                                $(e.target).attr('autocomplete', 'off');
                            }
                        },
                        {
                            type: 'keydown',
                            fn: function (e) {
                                if (e.keyCode === 13) {
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var value = e.target.value;
                                    if (isNaN(value)){
                                        alert("숫자만 입력가능합니다.");
                                        e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                        $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    } else if(parseFloat_change(value) <= 0) {
                                        alert("출고량이 0보다 커야합니다.");
                                        e.target.value = '';
                                        $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                        return false;
                                    }
                                    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                }
                            }

                        },
                        {
                            type: 'focusout',
                            fn: function (e) {
                                var row = $(e.target).closest('tr.jqgrow');
                                var value = e.target.value;
                                if (isNaN(value)){
                                    alert("숫자만 입력가능합니다.");
                                    e.target.value = e.target.value.replace(/[^\.0-9]/g,'');
                                    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                } else if(parseInt_change(value) <= 0) {
                                    alert("출고량이 0보다 커야합니다.");
                                    e.target.value = '';
                                    $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                                    return false;
                                }
                                $("#mes_add_grid2").jqGrid("saveCell", saverow, savecol);
                            }
                        }
                    ]
                }
            },
            {name: 'delivery_place', index: 'delivery_place', sortable: false, width: 125, fixed: true}

        ],
        caption: "외주출고 관리 | MES",// grid 제목
        autowidth: true,// 그리드 자동 가로 길이 설정
        cellEdit: true,
        cellsubmit: 'clientArray',
        height: 200, // 그리드 세로 길이 설정
        beforeEditCell: function (id, name, val, IRow, ICol) {
            lastsel = id;
            saverow = IRow;
            savecol = ICol;
        },
        beforeSelectRow: function (rowid, e) {  // 클릭 시 체크박스 선택 방지 / 체크박스를 눌러야만 체크
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        loadComplete: function () {// 그리드 LOAD가 완료 되었을 때
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)// 데이터 조회 전에도 가로 스크롤이 생성
                $(".jqgfirstrow").css("height", "1px");
            else
                $(".jqgfirstrow").css("height", "0px");
        }
    })//.navGrid("mes_modal_grid_pager", {search: false, add: false, edit: false, del: false});// grid_pager 에 검색 삭제 수정 추가 기능 설정
}


function select_modal_Box() {
    $('#part_kind_modal_select').select2();
    select_makes_sub("#supp_modal_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N")
    select_makes_sub("#outs_supp_modal_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE3'})

}

function select_modal_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_modal_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_modal_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_modal_select').append(option);
        $('#part_kind_modal_select').select2();
    }
}

function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal1", 0);
}
function qty_chck(data){
    var ck = true;
    data.forEach(function(id) {
        if(id.outs_qty == '' || id.outs_qty == 0 ){
            ck = false
            return
        }
    }); //반복문
    return ck
}