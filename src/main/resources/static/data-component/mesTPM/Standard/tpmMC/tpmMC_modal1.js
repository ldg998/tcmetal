////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    msg_get_modal1(); //모달 메세지 설정
    modal_make1(); //모달 생성
    jqGrid_modal1(); //모달 jqgrid 설정
    datepickerInput_modal1(); //모달 datepicker설정
    selectBox_modal1(); //모달 select box설정
    jqGridResize('#mes_modal_grid',$('#mes_modal_grid').closest('[class*="col-"]')); //그리드 resize
}

////////////////////////////클릭 함수/////////////////////////////////////

// 키워드를 통한 저장,수정  INSERT-I , UPDATE-U
function add_modal1_btn() {
    var text = msg_object.TBMES_Q002.msg_name1;
    if (main_data.check === "U") {
        text = msg_object.TBMES_Q003.msg_name1;
    }

    if (confirm(text)){
    var check=0;
    var add_data = value_return(".modal_value"); //값를 받아옴
    if (effectiveness1(add_data)){ //유효성 검사
        var formData = new FormData(); // form데이터 받아옴
        if(add_data.install_amount === '' && add_data.install_amount === null) { //제작금액을 입력하지 않은경우
            add_data.install_amount = 0; // 0을 입력
        }else {
            add_data.install_amount = add_data.install_amount.replace(/[^0-9]/g,'');
        }

        formData.append("machine_code",add_data.machine_code);
        formData.append("machine_name",add_data.machine_name);
        formData.append("line_code",add_data.line_code);
        formData.append("loc_code",add_data.loc_code);
        formData.append("install_date",add_data.install_date);
        formData.append("install_amount",add_data.install_amount);
        formData.append("level",add_data.level);
        formData.append("focus_yn",add_data.focus_yn);
        formData.append("install_corp_name",add_data.install_corp_name);
        formData.append("corp_user_name",add_data.corp_user_name);
        formData.append("corp_tel_no",add_data.corp_tel_no);
        formData.append("machine_manager",add_data.machine_manager);
        formData.append("remark",add_data.remark);
        formData.append("keyword",main_data.check);
        // 사진 업로드
        for (var i = 1; i <=3 ; i ++){
            if (typeof $("#xlsUploads"+i).prop("files")[0] !== "undefined" && $("#xlsUploads"+i).prop("files")[0] !== "" && $("#xlsUploads"+i).prop("files")[0] !== null ) {
                check = 1;
                formData.append("file"+i, $("#xlsUploads"+i).prop("files")[0]);
                if (main_data.check === 'U'){
                    main_data["delCheck"+i] = 0;
                }
            }else {
                check = 0;
            }
            formData.append("check"+i, check);
            if (main_data.check === 'U'){
                formData.append("delCheck"+i,  main_data["delCheck"+i]);
            }
        }

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                url: "/tpmMCAdd",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    if (data.result === 'NG') {
                        alert(data.message);
                    } else {
                        if (main_data.check === "I") {
                            get_btn(1);
                        } else {
                            get_btn_post($("#mes_grid").getGridParam('page'));
                        }
                    }
                    $('#addDialog').dialog('close');
                },
                error: function (e) {
                    alert('저장에 실패하였습니다.');
                    closeWindowByMask();
                    console.log("ERROR : ", e);
                }
            });
        }
    }
}


function readURL(input,index) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-text'+index).hide();

            //var img = $('<img style="width: 100%; height: 100%;" id="img'+index+'\">')
            //$('#img_div'+index).prepend(img);
            $('#img'+index).attr('src', e.target.result);
            $('#img'+index).show();
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function readURLRemove(index) {
    $('#img'+index).removeAttr('src');
    //if (!$("#img-text"+index).text()){
        $("#img-text"+index).show();
        var div = $('<div class="img-text" id="img-text'+index+'\">미리보기가 표시됩니다.</div>');
        //$('#img_div'+index).prepend(div);
        $('#img'+index).hide();
   //}
    if (main_data.check = 'U'){
        main_data["delCheck"+index] = 1;
    }
    $("#xlsUploads"+index).val("");
}


// 그리는 더블 클릭 시 발동
function update_btn(jqgrid_data) {
    if (main_data.auth.check_edit !="N") {
        readURLRemove(1);
        readURLRemove(2);
        readURLRemove(3);
        main_data.delCheck1 = 0;
        main_data.delCheck2 = 0;
        main_data.delCheck3 = 0;

        modal_reset(".modal_value", []); // 해당 클래스 내용을 리셋 시켜줌 ,데이터에 readonly 사용할거

        main_data.check = 'U'; //

        ccn_ajax('/tpmMCOneGet', {machine_code:jqgrid_data.machine_code}).then(function (data) { // user의 하나 출력
            data.install_amount = data.install_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            modal_edits('.modal_value', main_data.readonly, data); // response 값 출력
            $("input[name=install_date]").val(formmatterDate2(data.install_date));
            if (data.image1 !== '' && data.image1 !== null){
                // var image1= data.image1.split("\\");
                // var index1 = image1.length;
                $('#img-text1').hide();
                $('#img1').attr('src','/uploadFile/tpmMC/'+data.image1);
                $('#img1').show();
            }else{
                $('#img1').hide();
            }


            if (data.image2 !== '' && data.image2 !== null){
                //var image2= data.image2.split("\\");
                //var index2 = image2.length;
                $('#img-text2').hide();
                $('#img2').attr('src','/uploadFile/tpmMC/'+ data.image2);
                $('#img2').show();
            }else {
                $('#img2').hide();
            }
            if (data.image3 !== '' && data.image3 !== null){
                //var image3= data.image3.split("\\");
                //var index3 = image3.length;
                $('#img-text3').hide();
                $('#img3').attr('src','/uploadFile/tpmMC/'+ data.image3);
                $('#img3').show();
            }else {
                $('#img3').hide();
            }

            return data;

        }).then(function (data2) {
            $("#mes_modal_grid").jqGrid('clearGridData');
            modal2_get_btn(); //설비부품조회
            $("#addDialog").dialog('open');
            jqGridResize2("#mes_modal_grid", $('#mes_modal_grid').closest('[class*="col-"]')); // 그리드 resize
        });
    } else {
        alert(msg_object.TBMES_A003.msg_name1);
    }
}

// 부품추가
function part_add_btn() {
    if (main_data.check === "U"){ // check가 u(update)저장이라면
    modal_reset(".modal_value2", modal2_data.readonly); //리셋시켜주고
    modal2_data.check = 'I'; //modal2_data.check를 i로 바꾸고
    $("#addDialog2").dialog('open');  //모달창 열기
    }
}

// 부품 삭제
function part_delete_btn() {
    if (main_data.check === "U"){
    var gu4 = String.fromCharCode(4); // 아스키코드4번
    var gu5 = String.fromCharCode(5); // 아스키코드5번
    var list = []; // list생성
    var ids = $("#mes_modal_grid").getGridParam('selarrrow'); // 체크된 그리드 로우
    if (ids.length === 0) { // 선택한 데이터가 0개라면
        alert(msg_object.TBMES_A004.msg_name1); // 데이터를 선택해 달라는 alert
    } else { //데이터를 하나라도 선택했으면
        if (confirm(msg_object.TBMES_A005.msg_name1)) { //삭제하시겠습니까? alert

            ids.forEach(function (id) {
                list.push($("#machine_code").val() +gu4+id); //설비코드+4번+id 붙이기
            })

            modal2_data.check = 'D';
            wrapWindowByMask2(); // 뒷배경 클릭 방지 마스크
            ccn_ajax("/tpmMCPartDel", {keyword: list.join(gu5)}).then(function (data) {
                if (data.result === 'NG') {
                    alert(data.message);
                } else {
                    modal2_get_btn(1);
                }
                closeWindowByMask();  // 마스크해제
            }).catch(function (err) { // 에러시
                closeWindowByMask();  // 마스크해제
                console.error(err); // Error 출력
            });
        }
    }
    }
}

function close_modal1_btn() {
    $("#addDialog").dialog('close');
}

////////////////////////////호출 함수/////////////////////////////////////
function msg_get_modal1() {
    msgGet_auth("TBMES_Q002");
    msgGet_auth("TBMES_Q003");
    msgGet_auth("TBMES_E008");
    msgGet_auth("TBMES_A003");
    msgGet_auth("TBMES_A004");
    msgGet_auth("TBMES_A005");
}

function datepickerInput_modal1() {
    datepicker_makes("#datepicker", 0);
}

function selectBox_modal1() {
    select_makes_sub("#line_select2", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''},'N');
    $('#focus_yn_modal').select2();
}

function modal_make1() {
    $("#addDialog").dialog({
        modal: true, // 모달설정
        width: 800, //가로
        height: 650, //세로
        autoOpen: false, //자동오픈 해제
        resizable: false //크기 조절 해제
    })
}

function jqGrid_modal1() {
    $('#mes_modal_grid').jqGrid({
        datatype: "local",
        mtype: 'POST',
        colNames: ['부품명','규격','소요수량','구매처','연락처','비고'],
        colModel: [
            {name: 'part_name', index: 'part_name', key:true, sortable: false,fixed:true,width:150},
            {name: 'spec', index: 'spec', sortable: false,fixed:true,width:150},
            {name: 'qty', index: 'qty', sortable: false,fixed:true,width:100},
            {name: 'buy_corp_name', index: 'buy_corp_name', sortable: false,fixed:true,width:150},
            {name: 'corp_tel_no', index: 'corp_tel_no', sortable: false,fixed:true,width:150},
            {name: 'remark', index: 'remark', sortable: false,fixed:true,width:300}
        ],
        width : 465,
        height: 270,
        viewrecords: true,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {          // 클릭시 체크 방지
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            return (cm[i].name === 'cb');
        },
        ondblClickRow: function (rowid, iRow, iCol, e) { // 더블 클릭시 수정 모달창
            var data = $('#mes_modal_grid').jqGrid('getRowData', rowid);
            modal2_update_btn(data);
        },
        loadComplete:function(){
            if ($("#mes_modal_grid").jqGrid('getGridParam', 'reccount') === 0)
                $("table#mes_modal_grid  tr.jqgfirstrow").css("height","1px");
        }
    });
}

function effectiveness1(modal_objact) { // 유효성 검사
    if (modal_objact.machine_name === '') {
        alert("설비명을 입력해주세요");
        return false;
    }  else if (modal_objact.line_code === '') {
        alert("설치장소를 선택해주세요");
        return false;
    } else {
        return true;
    }
}