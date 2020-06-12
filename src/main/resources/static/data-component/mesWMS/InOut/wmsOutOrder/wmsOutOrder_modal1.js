////////////////////////////데이터////////////////////////////////////////
// var main_data = {
//     supp_check: 'A',
// };

var lastsel;
var saverow = 0;
var savecol = 0;

////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();
    modal_make1();
    jqGrid_modal1();
    datepickerInput_modal1();
    suppModal_start();
    jqGridResize('#mes_modal_grid',$('#mes_modal_grid').closest('[class*="col-"]'));
}


////////////////////////////클릭 함수/////////////////////////////////////

function get_modal_btn(page) {
    var data = value_return(".modal_value");
    data.keyword =main_data.check;

    if (main_data.check2 === 'Y'){
        // console.log(main_data.check2);
        $("#mes_modal_grid").setGridParam({ // 그리드 조회
            url: '/wmsOrdPlanGet',
            datatype: "json",
            page: page,
            postData: data
        }).trigger("reloadGrid");
    }else {
        alert("완료된 항목은 조회할 수 없습니다.");
    }
}

function addupdate_btn() {
    var gu5 = String.fromCharCode(5);
    var plan_no = $("#mes_modal_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
    var ord_no = $("#mes_modal_grid").getRowData(plan_no[0]).ord_no; // 체크된 그리드 로우 중 첫 컬럼의 수주번호

    var list = [];
    var list2 = [];

    for (var i = 0; i < plan_no.length; i++) {
        list.push(($("#mes_modal_grid").getRowData(plan_no[i]).ord_no));
        if (ord_no !== list[i]) {
            alert("수주번호가 같지 않습니다.");
        } else {
            list2.push($("#mes_modal_grid").getRowData(plan_no[i]).plan_no);
        }
    }
    if (main_data.check2 === 'Y') {
        // console.log(main_data.check2);

        if (list2.length === 0) {
            alert("데이터를 선택해 주십시요.");
        }
        if (list2.length !== 0 && (list.length === list2.length)) {
            var modal_objact = value_return(".modal_value");
            var text = msg_object.TBMES_Q002.msg_name1;
            if (main_data.check === "U") {
                text = msg_object.TBMES_Q003.msg_name1;
            }

            if (confirm(text)) {
                wrapWindowByMask2(); // 마스크로 화면 덮음 / 삭제중 다른 작업을 할 수 없도록 방지
                modal_objact.work_date = modal_objact.work_date.replace(/\-/g, '');
                modal_objact.keyword = main_data.check;
                modal_objact.ord_no = ord_no;
                modal_objact.code_list = list2.join(gu5);
                // console.log(modal_objact);

                ccn_ajax("/wmsOutOrderAdd", modal_objact).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                    closeWindowByMask(); // 마스크 종료
                    $("#addDialog").dialog('close');

                }).catch(function (err) {
                    closeWindowByMask(); // 마스크 종료
                    alert(msg_object.TBMES_E008.msg_name1);
                });
            }
        }
    } else {
        alert("완료처리된 항목은 수정할 수 없습니다.");
    }
}

function close_modal1_btn() {
    $("#addDialog").dialog('close');
}


function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $("#mes_modal_grid").jqGrid('clearGridData');
        main_data.check = 'U';
        // console.log(main_data.check2);

            ccn_ajax('/wmsOutOrderOneGet',{keyword: rowid}).then(function (data){

                // 그리드에 데이터를 찍어줌
                $("#ord_no").val(data[0].ord_no);
                $("#req_no").val(data[0].req_no);
                $("#supp_name_modal").val(data[0].supp_name);
                $("#supp_code_modal").val(data[0].supp_code);
                $("#datepicker3").val(formmatterDate2(data[0].work_date));
                $("#place_name").val(data[0].place_name);

                // 내용을 바꾸지 못하게
                $("#supp_name_modal").prop("disabled", true);
                $("#supp_code_modal").prop("disabled", true);
                $("#place_name").prop("readonly", true);

                if(main_data.check2 === 'N'){
                    $("#datepicker3").prop("disabled", true);
                }else {
                    $("#datepicker3").prop("disabled", false);
                }
                wrapWindowByMask2();
                ccn_ajax("/wmsOrdPlanUpGet", {keyword:data[0].req_no}).then(function (data){
                    $("#mes_modal_grid").setGridParam({
                        datatype: "local",
                        data: data
                    }).trigger("reloadGrid");
                });
                closeWindowByMask(); // 마스크 종료
                $("#addDialog").dialog('open');
                jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]'));
            });

    } else {
        closeWindowByMask(); // 마스크 종료
        alert(msg_object.TBMES_A003.msg_name1);
    }
}


////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
}

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width:'1300',
        height: 'auto',
        autoOpen:false,
        resizable: false

    });
}

function jqGrid_modal1() {
    $('#mes_modal_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        multiselect: true,
        caption: "제품출고요청 | MES",
        colNames: ['현장', '제품구분', '제품명', '계획명', '생산계획번호', '수주번호'],
        colModel: [
            {name: 'place_name', index: 'place_name', width: 100, sortable: false},
            {name: 'prod_type_name', index: 'prod_type_name', width: 100, sortable: false},
            {name: 'prod_name', index: 'prod_name', width: 100, sortable: false},
            {name: 'plan_name', index: 'plan_name', width: 100, sortable: false},
            {name: 'plan_no', index: 'plan_no', width: 100, sortable: false, key: true},
            {name: 'ord_no', index: 'ord_no', width: 100, sortable: false}
        ],

        autowidth: true,
        height: 250,

        // cellEdit: true,
        // cellsubmit: 'clientArray',
        // beforeEditCell: function (id, name, val, IRow, ICol) {
        //     lastsel = id;
        //     saverow = IRow;
        //     savecol = ICol;
        //
        // },
        // afterSaveCell: function (rowid, name, val, iRow, iCol) {
            //var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
            // if (iCol === 7) {
                // if (isNaN(data.req_qty)) {
                //     alert("숫자만 입력가능합니다.");
                //     data.req_qty = data.req_qty.replace(/[^\.0-9]/g,'');
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', data.req_qty);
                //     if (data.req_qty === '') {
                //         $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', '0');
                //     }
                //     return false;
                // } else if (Number(data.ready_qty) < Number(data.req_qty)) {
                //     alert("납품가능 수량이 초과 하였습니다.");
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', 0);
                //     return false;
                // } else if(data.req_qty === ''){
                //     $('#mes_modal_grid').jqGrid('setCell', rowid, 'req_qty', 0);
                // }
            // }
        // },
        // loadComplete: function (data) {
        //     if(main_data.check === 'U'){
        //         var rows = data.rows;
        //         rows.forEach(function (r) {
        //             $("#mes_modal_grid").jqGrid('setCell', r.part_code,  'req_qty', "", 'not-editable-cell');
        //         })
        //     }
        //
        // }
    });
}

function datepickerInput_modal1() {
    datepicker_makes("#datepicker3", 0);
}


// function effectiveness1(modal_objact) { // 유효성 검사
//     if (modal_objact.work_date === '') {
//         alert("날짜를 선택해주세요");
//         return false;
//     } else if (modal_objact.ord_no === '') {
//         alert("수주번호를 선택해주세요");
//         return false;
//     }   else {
//         return true;
//     }
// }
