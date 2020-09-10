
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    select_modal1();
    jqGrid_modal();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {
    var add_data = value_return(".modal_value");
    var formData = new FormData();
    var check1;
    var text = msg_object.TBMES_Q003.msg_name1;

    if (confirm(text)) {
        formData.append("qc_no", add_data.qc_no);
        formData.append("file_ck", main_data.file_ck);
        formData.append("file_key", add_data.file_key);
        formData.append("key_value",add_data.file_key);
        if ($("#file_01").prop("files")[0] == null) {
            check1 = 0;
            formData.append("check1", check1);
        } else {
            check1 = 1;
            formData.append("files", $("#file_01").prop("files")[0]);
            formData.append("check1", check1);
        }
        wrapWindowByMask2();
        if ($("#file_01").prop("files")[0] != null) {
            ccn_file_ajax('/qmsProdListUpload', formData).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    $('#mes_grid').trigger('reloadGrid')
                    $('#addDialog').dialog("close");
                    closeWindowByMask();
                }
            })
        }else {
            $('#mes_grid').trigger('reloadGrid')
            $('#addDialog').dialog("close");
            closeWindowByMask();
        }

    }

}

function file_change(e) {
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자
    if ( $(e).val() !== ''){
        //var filename2 = filename[2].substr(0,13) + "..";

        $(e).closest("div")
            .children(".file_labal")
            .text("업로드완료");
    }

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
        width: 450, // 가로 설정
        height: 'auto', //세로 설정
        autoOpen: false, //자동 오픈 해제
        resizable: false, // 크기 조절 불가설정
        buttons: [ // 모달 하단 버튼 설정
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    addUdate_btn();
                }
            },
            {
                text: '취소',
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog("close");
                }
            }

        ]
    })
}

function select_modal1(){
   $("#select_modal1").select2();
}



function jqGrid_modal() {
    $("#mes_modal1_grid2").jqGrid({
        mtype:"POST",
        datatype: "local",
        caption: "출하검사현황 | MES",
        colNames: ['검사항목','체크'],
        colModel: [
            {name: 'qc_name', index: 'qc_name', sortable:false, width: 300, fixed:true },
            {name: 'qc_result_name', index: 'qc_result_name', sortable:false, width: 90, fixed:true},
        ],
        autowidth: true,
        viewrecords: true,
        height: 150,
        rowNum: 100,
        rowList: [100, 200, 300, 500, 1000],
        onCellSelect: function (rowid, icol, cellcontent, e) {

        },
        beforeSelectRow: function (rowid, e) {  },
        ondblClickRow: function (rowid, iRow, iCol, e) { },
        loadComplete:function(){
            if ($("#mes_grid").jqGrid('getGridParam', 'reccount') === 0)
                $(".jqgfirstrow").css("height","1px");
            else
                $(".jqgfirstrow").css("height","0px");
        }

    });

}

