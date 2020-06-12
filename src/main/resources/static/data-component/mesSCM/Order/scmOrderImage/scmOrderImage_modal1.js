
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
}

////////////////////////////클릭 함수/////////////////////////////////////

//사진 첨부
function readURL(input,value) {
    if(value !== "") {
        var reg = /(.*?)\.(jpg|jpeg|png|gif|bmp|PNG)$/;
        if(!value.match(reg)) { //가져온 이미지파일 형식체크
            alert("해당 파일은 이미지 파일이 아닙니다.");
            $("#xlsUploads").val("");
        } else {
            if (input.files && input.files[0]){
                var reader = new FileReader();
                reader.onload = function (e) { // 읽기 동작이 성공적으로 완료되었을때 발동
                    $('#img-text').remove(); //해당 객체를 비워주고
                    $('#img').show();       //해당 객체를 표시
                    $('#img').attr('src', e.target.result); //src = e.target.result 로 할당
                };
                reader.readAsDataURL(input.files[0]); //파일 이미지 미리보기
            }
        }
    }


}

//사진첨부 삭제 및 초기화
function readURLRemove() {
    $('#img').removeAttr('src'); //이미지 주소
    if (!$("#img-text").text()){ // 해당객체 텍스트가 아니면
        var div = $('<div class="img-text" id="img-text">미리보기가 표시됩니다.</div>'); // 이미지 텍스트에 해당div 할당
        $('#img_div').prepend(div); // div 넣어주기
        $('#img').hide();       // 이미지 감춤
    }
    if (main_data.check = 'U'){
        main_data["delCheck"] = 1;
    }
    $("#xlsUploads").val("");
}

// 모달 추가버튼
function add_modal1_btn() {
    var check=0;
    var add_data = value_return(".modal_value");
    var formData = new FormData(document.getElementById("scmOrderImage_Form"));
    formData.append("keyword",main_data.check);
    //formData 콘솔에 찍어보기
    // for (var key of formData.keys()) {
    //     console.log(key);
    // }
    //
    // for (var value of formData.values()) {
    //     console.log(value);
    // }

    //문자형 체크
    if(typeof $("#xlsUploads").prop("files")[0] !== 'undefined' && $("#xlsUploads").prop("files")[0] !== "" && $("#xlsUploads").prop("files")[0] !== null) {
        if(main_data.check = 'U') {
            main_data["delCheck"] = 0;
        }
    } else {
        check = 0;
    }
    formData.append("check",check);
    if (main_data.check = 'U') {
        formData.append("delCheck", main_data["delCheck"]);
    }

    if (effectiveness1(add_data)) {
        wrapWindowByMask2(); //마스크온
        $.ajax({
           type : "POST",
           enctype : "multipart/form-data",
           contentType : "application/x-www-form-urlencoded; charset=UTF-8",
           url : "/scmOrderImageAdd",
           data : formData,
           processData : false,
           contentType : false,
           cache : false,
           success : function(data) {
               if (data.result === "NG"){
                 alert(data.message);
               } else {
                   if(main_data.check === "I"){
                        get_btn(1); //페이지 재조회
                   } else {
                       get_btn($("#mes_grid").getGridParam("page")); //페이지 재조회
                   }
               }
               closeWindowByMask(); //마스크 오프
               $("#addDialog").dialog("close"); //모달닫기
           },
           error : function (e) {
               alert("업로드에 실패 하였습니다.");
               closeWindowByMask(); //마스크 오프
               console.log("ERROR : ",e);
           }
        });
    }
}

////////////////////////////호출 함수/////////////////////////////////////
function modal_make1() { //모달 설정
    $("#addDialog").dialog({
        modal: true,
        width: 800,
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '저장',
                'class': 'btn btn-primary btn-minier',
                click: function () {
                    add_modal1_btn();
                }
            },
            {
                text: '취소',
                'class': 'btn btn-minier',
                click: function () {
                    $(this).dialog('close');
                }
            }
        ],
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

function effectiveness1(modal_objact) {
    if(modal_objact.img_name === ''){
        alert("양식명을 입력해 주세요");
    }else{
        return true;
    }
}