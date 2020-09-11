

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly:['lot_no',''],
    auth:{}
}

////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main(); // main 그리드 생성
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]')); // 그리드 리사이즈
    /*----모달----*/
    authcheck();
    jqgridPagerIcons(); // 그리드 아이콘 설정
    datepickerInput();
    select();
    modal_start1();
});

////////////////////////////클릭 함수//////////////////////////////////
// 조회버튼
function get_btn(page) {
    main_data.send_data = value_return(".condition_main"); // 해당 클래스명을 가진 항목의 name에 맞도록 객체 생성
    main_data.send_data.keyword = main_data.send_data.type_code
    main_data.send_data.keyword2 = main_data.send_data.supp_code
    $("#mes_grid").setGridParam({ // 그리드 조회
        url: '/qmsProdErrorReqGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {
    if (main_data.auth.check_add !="N") {
        modal_reset(".modal_value", main_data.readonly); // 해당 클래스 명을 가진 항목들의 내용을 리셋,비워줌 main_data readonly 에 추가한 name의 항목에 readonly 옵션을 추가
        $('#file_01').closest("div").children(".file_labal").text("업로드")
        $('#file_02').closest("div").children(".file_labal").text("업로드")
        modalValuePush("#group_select","#group_code","#group_name"); // name1의 값을 name2,name3 에 넣어줌
        main_data.check = 'I'; // 추가인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
        main_data.check2 = 'Y';
        datepickerInput_modal();
        $("#select_modal1  option:eq(0)").prop("selected", true).trigger("change");
        $("#select_modal2  option:eq(0)").prop("selected", true).trigger("change");
        disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"N");

        $("#addDialog").dialog('open'); // 모달 열기
    } else {
        alert(msg_object.TBMES_A001.msg_name1);
    }
}

// 그리드 항목 더블클릭시 수정 화면
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        modal_reset(".modal_value", []);
        $('#file_01').closest("div").children(".file_labal").text("업로드")
        $('#file_02').closest("div").children(".file_labal").text("업로드")

        main_data.check = 'U'; // 수정인지 체크 'I' 추가 , 'U' 수정, 'D' 삭제
            disabled_tf(["#modal_select1","#modal_select2","#modal_select3"],"Y");
            modal_edits(".modal_value",[],jqgrid_data);
        select_makes_base("#modal_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:jqgrid_data.supp_code},"N").then(function (data) {
        $('#modal_select2').val(jqgrid_data.part_kind).trigger("change");
        select_makes_base("#modal_select3", "/sysSpartAllGet", "part_code", "part_name", {keyword: $("#modal_select1").val(), keyword2: $("#modal_select2").val()}, "N").then(function (data) {
            $('#modal_select3').val(jqgrid_data.part_code).trigger("change");
            select_makes_base('#select_modal5','/sysDeptAllGet2','dept_user_code','user_name',{keyword:$('#dept_select2').val(),keyword2:'Y'},'').then(function (e){
                $('#select_modal5').val(jqgrid_data.ret_user_code).trigger("change");
                $("#addDialog").dialog('open');// 모달 열기
            })
            })
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
                ccn_ajax("/qmsProdErrorReqDel", {keyword: ids.join(gu5)}).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                            $('#mes_grid').trigger('reloadGrid')
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
    ccn_ajax("/menuAuthGet", {keyword: "qmsProdErrorReq"}).then(function (data) {
        main_data.auth = data;
    });
}
function jqGrid_main() {
    //jqGrid 생성
    $('#mes_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['','','','','','','','','','접수일자','등록번호','업체','기종','품번','품명','제품LOT','부적합분류(코드화)','부적합세부','대책서송부일','대책방안','처리일자','처리구분','부적합연락서','대책서','등록자','등록일시'
        ],
        colModel: [
            {name: 'act_type', index: 'act_type',sortable: false,fixed: true,hidden:true},
            {name: 'file1_code', index: 'file1_code',sortable: false,fixed: true,hidden:true},
            {name: 'file2_code', index: 'file2_code',sortable: false,fixed: true,hidden:true},
            {name: 'supp_code', index: 'supp_code',sortable: false,fixed: true,hidden:true},
            {name: 'part_code', index: 'part_code',sortable: false,fixed: true,hidden:true},
            {name: 'part_kind', index: 'part_kind',sortable: false,fixed: true,hidden:true},
            {name: 'report_type', index: 'report_type',sortable: false,fixed: true,hidden:true},
            {name: 'ret_user_code', index: 'ret_user_code',sortable: false,fixed: true,hidden:true},
            {name: 'ret_dept_code', index: 'ret_dept_code',sortable: false,fixed: true,hidden:true},
            {name: 'work_date', index: 'work_date',sortable: false, width: 90,fixed: true , formatter: formmatterDate2},
            {name: 'ret_no', index: 'ret_no',sortable: false,key:true, width: 130,fixed: true},
            {name: 'supp_name', index: 'supp_name',sortable: false, width: 130,fixed: true},
            {name: 'part_kind', index: 'part_kind',sortable: false, width: 110,fixed: true},
            {name: 'part_code', index: 'part_code',sortable: false, width: 130,fixed: true},
            {name: 'part_name', index: 'part_name',sortable: false, width: 190,fixed: true},
            {name: 'lot_no', index: 'lot_no',sortable: false, width: 120,fixed: true},
            {name: 'ng_type', index: 'ng_type',sortable: false, width: 120,fixed: true},
            {name: 'ng_name', index: 'ng_name',sortable: false, width: 150,fixed: true},
            {name: 'report_date', index: 'report_date',sortable: false, width: 90,fixed: true ,formatter: formmatterDate2},
            {name: 'measuer_name', index: 'measuer_name',sortable: false, width: 100,fixed: true},
            {name: 'act_date', index: 'act_date',sortable: false, width: 90,fixed: true,formatter: formmatterDate2},
            {name: 'act_type_name', index: 'act_type_name',sortable: false, width: 70,fixed: true},
            {name: 'file1_ck', index: 'file1_code',sortable: false, width: 80,fixed: true,formatter: file1_formatter},
            {name: 'file2_ck', index: 'file2_code',sortable: false, width: 80,fixed: true,formatter: file2_formatter},
            {name: 'user_name', index: 'user_name',sortable: false, width: 80,fixed: true},
            {name: 'create_date', index: 'create_date',sortable: false, width: 140,fixed: true ,formatter: formmatterDate}

        ],
        caption: "부적합관리 | MES",
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
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') == 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function select(){
    $('#select1').select2();
    select_makes_base("#select2","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N")

    }


function file1_formatter(cellvalue, options, rowObject) {
    if (cellvalue == "" || cellvalue == null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span>없음</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file1_code + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span>저장</span>" +
            "</span>" +
            "</a>";

    }
}

function file2_formatter(cellvalue, options, rowObject) {
    if (cellvalue == "" || cellvalue == null) {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span>없음</span>" +
            "</span>" +
            "</a>";

    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file2_code + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span>저장</span>" +
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