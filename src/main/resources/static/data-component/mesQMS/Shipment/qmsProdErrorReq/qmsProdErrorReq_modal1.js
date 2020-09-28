////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1();// 모달 메세지 설정
    modal_make1(); // 모달 생성
    selectBox_modal1();
    datepickerInput_modal();
}

////////////////////////////클릭 함수/////////////////////////////////////
// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function addUdate_btn() {
    var text = msg_object.TBMES_Q002.msg_name1;
    if (main_data.check === "U") {
        text = msg_object.TBMES_Q003.msg_name1;
    }
    if (confirm(text)) {
        var add_data = value_return(".modal_value");
        var formData = new FormData();
        var check1;
        var check2;
        formData.append("ret_no", add_data.ret_no);
        formData.append("work_date", add_data.work_date);
        formData.append("lot_no", add_data.lot_no);
        formData.append("supp_code", add_data.supp_code);
        formData.append("part_kind", add_data.part_kind);
        formData.append("part_code", add_data.part_code);
        formData.append("ng_type", add_data.ng_type);
        formData.append("ng_name", $('#modal_select4').text());
        formData.append("report_type", add_data.report_type);
        formData.append("report_date", add_data.report_date);
        formData.append("measuer_name", add_data.measuer_name);
        formData.append("act_type", add_data.act_type);
        formData.append("act_date", add_data.act_date);
        formData.append("ret_dept_code", add_data.ret_dept_code);
        formData.append("ret_user_code", add_data.ret_user_code);
        formData.append("keyword",main_data.check);


        if ($("#file_01").prop("files")[0] == null) {
            check1 = 0;
            formData.append("file_ck1", check1);
        } else {
            check1 = 1;
            formData.append("file1", $("#file_01").prop("files")[0]);
            formData.append("file_ck1", check1);
        }

        if ($("#file_02").prop("files")[0] == null) {
            check2 = 0;
            formData.append("file_ck2", check2);
        } else {
            check2 = 1;
            formData.append("file2", $("#file_02").prop("files")[0]);
            formData.append("file_ck2", check2);
        }
        wrapWindowByMask2();

        ccn_file_ajax("/qmsProdErrorReqAdd", formData).then(function (data) {
            if (data.result === 'NG') {
                alert(data.message);
            }
            closeWindowByMask();
            ccn_ajax("/procedureLogAdd",{keyword:"사외부적합관리 저장수정",keyword2:JSON.stringify(add_data)})
            $("#addDialog").dialog('close');
            $('#mes_grid').trigger('reloadGrid')

        }).catch(function (err) {
            closeWindowByMask();
            $("#addDialog").dialog('close');
        });
    }
}


function select_change_modal1(value) {
    if (value !== ""){
        select_makes_base("#modal_select2","/partKindGet","part_kind","part_kind",{keyword:'Y',keyword2:value},"N");
    } else {
        $('#modal_select2').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#modal_select2').append(option);
        $('#modal_select2').select2();

        var option2 = $("<option></option>").text('선택안함').val('');
        $('#modal_select3').empty();
        $('#modal_select3').append(option2);
        $('#modal_select3').select2();
        $('#part_code').val("");
    }
}


function select_change_modal2(value) {
    if (main_data.check2 === 'Y') {
        if (value !== "") {
            select_makes_base("#modal_select3", "/sysSpartAllGet", "part_code", "part_name", {
                keyword: $("#modal_select1").val(),
                keyword2: value
            }, "N").then(function (data) {

            });
        } else {
            $('#modal_select3').empty();
            var option2 = $("<option></option>").text('선택안함').val('');
            $('#modal_select3').append(option2);
            $('#modal_select3').select2();
            $('#part_code').val("");
        }

    }
}

function select_change_modal3(value) {
    if (main_data.check2 === 'Y') {

        if (value !== "") {
            $('#part_code').val(value)
        } else {
            $('#part_code').val("");
        }

    }
}



function select_change_modal4(value) {
        if (value != "") {
            select_makes_base('#select_modal5','/sysDeptAllGet2','dept_user_code','user_name',{keyword:value,keyword2:'Y'},'').then(function (e){
                    if(e[0].user_name == "" || e[0].user_name == null || e[0].user_name == "null") {
                        $('#select_modal5').empty();
                        var option = $("<option></option>").text('담당자 없음').val('');
                        $('#select_modal5').append(option);
                        $('#select_modal5').select2();
                    }
                })

        } else {
            $('#select_modal5').empty();
            var option = $("<option></option>").text('선택안함').val('');
            $('#select_modal5').append(option);
            $('#select_modal5').select2();

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
        width: 550, // 가로 설정
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
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    $(this).dialog("close");

                }
            }

        ]
    })
}




function selectBox_modal1() {


    $('#select_modal1').select2();
    $('#select_modal2').select2();
    $('#select_modal3').select2();
    select_makes("#dept_select2", "/sysDeptAllGet", "dept_code", "dept_name");

    $('#select_modal5').select2();

    select_makes_base("#modal_select1","/suppAllGet","supp_code","supp_name",{keyword:'Y',keyword2:'CORP_TYPE2'},"N").then(function (data) {
        $('#modal_select2').empty();
        var option = $("<option></option>").text('선택안함').val('');
        $('#modal_select2').append(option);
        $('#modal_select2').select2();

        $('#modal_select3').empty();
        var option2 = $("<option></option>").text('선택안함').val('');
        $('#modal_select3').append(option2);
        $('#modal_select3').select2();
    });
    select_makes_base('#modal_select4','/sysQcItemCdAll','qc_code','qc_name',{keyword:4,keyword2:1},'N').then(function(data){
    })
    select_makes_base('#modal_select5','/sysCommonAllGet','code_value','code_name1',{keyword:'WMS_STOCK_REV'},'');
}


function datepickerInput_modal() {
    datepicker_makes("#datepicker_modal1", 0);
    datepicker_makes("#datepicker_modal2", 0);
    datepicker_makes("#datepicker_modal3", 0);

}

function file_change(e) {
    var filename = $(e).val().split('\\');
    var data = $(e).val().split('.'); // 확장자
    if ( $(e).val() !== ''){
        $(e).closest("div")
            .children(".file_labal")
            .text("업로드완료");
    }
}
