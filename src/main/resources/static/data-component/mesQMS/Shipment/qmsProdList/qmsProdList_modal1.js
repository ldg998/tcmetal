
////////////////////////////시작 함수/////////////////////////////////////
function modal_start1() {
    modal_make1();
}

////////////////////////////클릭 함수/////////////////////////////////////

function file1_Modal(in_no,part_code) {
    $(".file1_modal").remove();
    var div1;
    var div2;
    var div3;
    var input1;
    ccn_ajax("/qmsProdListRPTGet", {keyword:in_no,keyword2:part_code}).then(function (data) {
        data.forEach(function (d,i) {

            div1 = $(' <div class="profile-info-row"></div>').addClass("file1_modal");
            div2 = $('<div class="profile-info-name"></div>').text(d.qc_name);
            div1.append(div2);
            for (var z = 1; z < 21; z++) {
                div3 = $('<div class="profile-info-value wt-px-75"></div>');
                input1 = $('<input type="text" readonly>').addClass("form-control").val(d["qc_result"+z]);
                div3.append(input1);
                div1.append(div3);

            }
            $("#modal1_column").append(div1);
        });
        $("#addDialog").dialog('open');
    });
}

////////////////////////////호출 함수/////////////////////////////////////

function modal_make1() {
    $("#addDialog").dialog({
        modal: true,
        width: 'auto',
        height: 'auto',
        autoOpen: false,
        resizable: false,
        buttons: [
            {
                text: '닫기',
                'class': 'btn btn-minier',
                click: function () {
                    $("#addDialog").dialog('close');
                }
            }
        ]
    });
}