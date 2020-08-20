////////////////////////////데이터/////////////////////////////////////
var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['machine_code'],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////
//시작 함수
$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈
    /*----모달----*/
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정
    modal_start1();
});

////////////////////////////클릭 함수//////////////////////////////////
//조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data_post = main_data.send_data; // 수정,삭제 시 다시 조회하기 위한 데이터 저장
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/qmsInspMachineGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function get_btn_post(page) {
    $("#mes_grid").setGridParam({
        url: '/qmsInspMachineGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data_post
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 명을 가진 항목들의 내용을 리셋,비워줌 main_data readonly 에 추가한 name의 항목에 readonly 옵션을 추가
        modal_reset(".modal_value", []);
        $('#file_01').val('');
        $('.file_labal').text('업로드');
        datepicker_makes("#datepicker_modal", 0);
        datepicker_makes("#datepicker_modal2", 335);
        main_data.check = 'I'; // 추가인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

// 그리드 항목 더블클릭시 수정 화면
function update_btn(rowid) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $('#file_01').val('');
        $('.file_labal').text('업로드');
        main_data.check = 'U'; // 수정인지 체크
        ccn_ajax('/qmsInspMachineOneGet', {keyword:rowid}).then(function (data) {
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("#addDialog").dialog('open');// 모달 열기
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 삭제 버튼
function delete_btn() {
    if(main_data.auth.check_del != "N") {
        var gu5 = String.fromCharCode(5);
        var ids = $("#mes_grid").getGridParam('selarrrow'); // multiselect 된 그리드의 row
        if (ids.length === 0) {
            alert(msg_object.TBMES_A004.msg_name1);
        } else {
            if (confirm(msg_object.TBMES_A005.msg_name1)) {
                main_data.check = 'D'; // 삭제인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
                wrapWindowByMask2();
                ccn_ajax("/qmsInspMachineDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        get_btn_post($("#mes_grid").getGridParam('page'));
                    }
                    closeWindowByMask();
                }).catch(function (err) {
                    closeWindowByMask();
                    console.error(err); // Error 출력
                });
            }
        }
    } else {
        alert(msg_object.TBMES_A002.msg_name1);
    }
}

////////////////////////////호출 함수//////////////////////////////////
//호출함수
function msg_get() {
    msgGet_auth("TBMES_A001");
    msgGet_auth("TBMES_A002");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "qmsInspMachine"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['설비번호','설비명','기기번호','공정능력','제원','교정기관','교정일자','유효일자','사전알림','이미지','file1','등록자','등록일시'],
        colModel: [
            {name: 'machine_code', index: 'machine_code',sortable: false, width: 100,fixed: true, key:true},
            {name: 'machine_name', index: 'machine_name',sortable: false, width: 150,fixed: true},
            {name: 'device_no', index: 'device_no',sortable: false, width: 100,fixed: true},
            {name: 'capa', index: 'capa',sortable: false, width: 150,fixed: true},
            {name: 'spec', index: 'spec',sortable: false, width: 150,fixed: true},
            {name: 'correct_corp_name', index: 'correct_corp_name',sortable: false, width: 150,fixed: true},
            {name: 'correct_date', index: 'correct_date',sortable: false, width: 100,fixed: true,formatter:formmatterDate2},
            {name: 'end_date', index: 'end_date',sortable: false, width: 100,fixed: true,formatter:formmatterDate2},
            {name: 'alarm_day', index: 'alarm_day',sortable: false, width: 100,fixed: true},
            {name: 'file1_name', index: 'file1_name', sortable: false, width: 80, align: 'center', formatter:file1_formatter,fixed:true},
            {name: 'file1', index: 'file1', sortable: false,hidden: true},
            {name: 'user_name', index: 'user_name',sortable: false, width: 100,fixed: true},
            {name: 'update_date', index: 'update_date',sortable: false, width: 140,fixed: true,formatter:formmatterDate},
        ],
        caption: "검사설비관리 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) {            // 더블 클릭시 수정 모달창
            update_btn(rowid);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') == 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}


function file1_formatter(cellvalue, options, rowObject) {
    if (cellvalue === "Y") {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file1 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span>저장</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span>없음</span>" +
            "</span>" +
            "</a>";
    }
}


function file_download(file_name) {
    if (confirm('파일을 저장하시겠습니까?')) {
        $.fileDownload('/FileUploads', {
            httpMethod: "POST",
            data: { key_value: file_name },
            successCallback: function(url){
            },
            failCallback: function(){
            }
        });
    }
}