/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    send_data: {},
    auth: {}
};

////////////////////////////시작 함수/////////////////////////////////////

$(document).ready(function () {
    msg_get();
    jqGrid_main();
    jqGridResize("#mes_grid", $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    jqgridPagerIcons();
    selectBox();
});

////////////////////////////클릭 함수/////////////////////////////////////
//조회버튼
function get_btn(page) {
    main_data.send_data = value_return2(".condition_main");
    $("#mes_grid").setGridParam({
        url: '/wmsOutListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data : {
                "name":"wmsOutList",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,"")
            },
            successCallback: function (url) {
                $preparingFileModal.dialog('close');
            },
            failCallback: function (responseHtml, url) {
                $preparingFileModal.dialog('close');
                $("#error-modal").dialog({modal: true});
            }
        });
        return false;
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "wmsOutList"}).then(function (data) {
        main_data.auth = data;
    });
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        datatype: 'local',
        mtype: 'POST',
        colNames: ['출고일자', '출고전표', '업체','기종', '품명', '품번','단중','수량','중량','제품LOT','성적서','업로드','출고요청번호','생산일자','중간검사','출하검사','리드타임','등록자','등록일시'],
        colModel: [
            {name: 'out_date', index: 'out_date', sortable: false, width: 90, fixed:true, formatter:formmatterDate2},
            {name: 'out_no', index: 'out_no', sortable: false, width: 120, fixed:true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 100, fixed:true},
            {name: 'part_kind', index: 'part_kind', sortable: false, width: 100, fixed:true},
            {name: 'part_name', index: 'part_name', sortable: false, width: 120, fixed:true},
            {name: 'part_code', index: 'part_no', sortable: false, width: 120, fixed:true},
            {name: 'part_weight', index: 'part_weight', sortable: false, width: 80, fixed:true,formatter:'integer',align: 'right'},
            {name: 'qty', index: 'qty', sortable: false, width: 80, fixed:true,formatter:'integer',align: 'right'},
            {name: 'weight', index: 'weight', sortable: false, width: 80, fixed:true,formatter:'integer',align: 'right'},
            {name: 'lot_no', index: 'lot_no', sortable: false, width: 120, fixed:true },
            {name: 'file1_name', index: 'file1_name', sortable: false, width: 80, align: 'center', formatter: file1_formatter,fixed:true},//성적서
            {name: 'file1', index: 'file1', sortable: false, width: 100, align: 'center',formatter: filebox,fixed:true},//성적서 수정
            {name: 'req_no', index: 'req_no', sortable: false, width: 120, fixed:true},
            {name: 'date1', index: 'date1', sortable: false, width: 130, fixed:true,formatter:formmatterDate2},
            {name: 'date2', index: 'date2', sortable: false, width: 130, fixed:true,formatter:formmatterDate2},
            {name: 'date3', index: 'date3', sortable: false, width: 90, fixed:true,formatter:formmatterDate2},
            {name: 'read_time', index: 'read_time', sortable: false, width: 80, fixed:true,formatter: {number:{thousandsSeparator:",", decimalPlaces: 1}},align: 'right'},
            {name: 'user_name', index: 'user_name', sortable: false, width: 90, fixed:true},
            {name: 'create_date', index: 'create_date', sortable: false, width: 150, fixed:true,formatter:formmatterDate}
        ],
        caption: '제품출고 현황 | MES',
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }
    });
}

function selectBox() {
    $('#part_kind_select').select2();
    select_makes_sub("#supp_select","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"Y")
}

function select_change1(value) {
    if (value !== ""){
        select_makes_base("#part_kind_select","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"Y");
    } else {
        $('#part_kind_select').empty();
        var option = $("<option></option>").text('전체').val('');
        $('#part_kind_select').append(option);
        $('#part_kind_select').select2();
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

function file1_formatter(cellvalue, options, rowObject) {
    if (cellvalue === "Y") {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' data-original-title='' title='' onclick='file_download(\"" + rowObject.file1 + "\");'>" +
            "<span><i class='fa fa-download bigger-110 blue'></i>" +
            "<span> 저장</span>" +
            "</span>" +
            "</a>";
    } else {
        return "" +
            " <a class='dt-button buttons-csv buttons-html5 btn btn-white btn-danger btn-mini btn-bold'" +
            "tabindex='0' aria-controls='dynamic-table' style='cursor: not-allowed;'>" +
            "<span><i class='fa fa-ban bigger-110 red'></i>" +
            "<span> 없음</span>" +
            "</span>" +
            "</a>";
    }
}

function filebox(cellvalue, options, rowObject) {   //업로드null, 그리드, 그리드내용
    if (cellvalue === null || cellvalue === "") {
        return "" +
            "<div class='filebox_lee'>"+
            "<label class='file_labal' for='file_01'>업로드</label>"+
            "<input type='file' id='file_01"+"'  onchange='file_change(this"+",this.value,\""+rowObject.out_no+"\"" +");' />" +
            "</div>";
    } else {
        return "" +
            "<div class='filebox_lee'>"+
            "<label class='file_labal' for='file_01'>완료</label>"+
            "<input type='file' id='file_01'  onchange='file_change(this"+",this.value,\""+rowObject.out_no+"\"" +");' />" +
            "</div>";
    }
}

function file_change(e,value,no) {
    if ( $(e).val() !== ''){
        var reg = /(.*?)\.(pdf)$/;
        if(!value.match(reg)) {
            alert("해당 파일은 pdf 파일이 아닙니다.");
            $(e).closest("div")
                .children(".file_labal")
                .text("업로드");
        }else {
            var formData = new FormData();
            formData.append("out_no", no);
            // formData.append("file", $("#file_"+no).prop("files")[0]);
            // formData.append("files", $(e).prop("files")[0]);
            formData.append("file1", $("#file_01").prop("files")[0]);
            // formData.append("file3", $("#file_03").prop("files")[0]);
            if(confirm("등록 하시겠습니까?")){
                wrapWindowByMask2();
                ccn_file_ajax("/wmsOutListAdd", formData).then(function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    }
                    closeWindowByMask();
                    $('#mes_grid').trigger('reloadGrid')
                    $(e).closest("div")
                        .children(".file_labal")
                        .text("업로드완료");
                }).catch(function (err) {
                    closeWindowByMask();
                });
            }
        }


    }
}