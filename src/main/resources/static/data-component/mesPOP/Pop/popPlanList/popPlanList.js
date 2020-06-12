/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////

var main_data = {
    check: 'I',
    send_data: {},
    send_data_post: {},
    readonly: [''],
    auth: {}
};


////////////////////////////시작 함수//////////////////////////////////

$(document).ready(function () {
    msg_get();
    modal_start1();
    jqGrid_main();
    jqGridResize('#mes_grid', $('#mes_grid').closest('[class*="col-"]'));
    datepickerInput();
    authcheck();
    selectBox();
    jqgridPagerIcons();
    get_btn(1);
});


////////////////////////////클릭 함수//////////////////////////////////
function get_btn(page) {
    main_data.send_data = value_return(".condition_main");
    main_data.send_data.start_date = main_data.send_data.start_date.replace(/-/gi, '');
    main_data.send_data.end_date = main_data.send_data.end_date.replace(/-/gi, '');
    main_data.send_data.keyword2 = '';

    $("#mes_grid").setGridParam({
        url: '/popPlanListGet',
        datatype: "json",
        page: page,
        postData: main_data.send_data
    }).trigger("reloadGrid");
}

// 추가 버튼
function add_btn() {

}

//업데이트 버튼
function img_btn(data) {
    ccn_ajax("/popPlanListOneGet", data).then(function (data) {
        var imgs = {1: data[0].image1, 2: data[0].image2, 3: data[0].image3, 4: data[0].image4, 5: data[0].image5, 6: data[0].image6, 7: data[0].image7, 8: data[0].image8, 9: data[0].image9, 10: data[0].image10};
        var imgs2 = {1: data[0].img1, 2: data[0].img2, 3: data[0].img3, 4: data[0].img4, 5: data[0].img5};
        var main_div = $("<div class='swiper-wrapper' id='wrapper2' ></div>");
        $("#wrapper").append(main_div);

        var i = 1;
        while (i <= Object.keys(imgs).length) {
            if (imgs[i] == null || imgs[i] == "") {} else {

                var div = $(" " +
                    "<div class='swiper-slide'>\n" +
                    "               <div class='swiper-zoom-container'>\n" +
                    "                   <img src='"+imgs[i]+"' id='addDialog_image" + i + "'>\n" +
                    "                </div>\n" +
                    "            </div>");
                $("#wrapper2").append(div);
            }
            i = i + 1;
        }/*end while*/


        var i2=1;
        while (i2 <= Object.keys(imgs2).length) {
            if (imgs2[i2] == null || imgs2[i2] == "") {} else {
                var div = $(" " +
                    "<div class='swiper-slide'>\n" +
                    "               <div class='swiper-zoom-container'>\n" +
                    "                   <img src='"+imgs2[i2]+"' id='addDialog_img" + i2 + "'>\n" +
                    "                </div>\n" +
                    "            </div>");
                $("#wrapper2").append(div);
            }
            i2 = i2 + 1;
        }/*end while2*/


        var div2 = $(" <div class='swiper-pagination swiper-pagination-white rm'></div>\n" +
            "        <div class='swiper-button-prev rm'></div>\n" +
            "        <div class='swiper-button-next rm'></div>" +
            "");

        $("#wrapper2").after(div2);
        $("#addDialog").dialog('open');
        $("#wrapper2").trigger("resize");
        img_swiper();
    });

}

function excel_download() {
    if (confirm(msg_object.TBMES_Q014.msg_name1)) {
        var $preparingFileModal = $("#preparing-file-modal");
        $preparingFileModal.dialog({modal: true});
        $("#progressbar").progressbar({value: false});
        $.fileDownload("/excel_download", {
            httpMethod: 'POST',
            data: {
                "name":"popPlanList",
                "row0":$('#datepicker').val().replace(/-/gi,""),
                "row1": $('#datepicker2').val().replace(/-/gi,""),
                "row2":$('#place_name').val()
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


////////////////////////////호출 함수//////////////////////////////////
function msg_get() {
    msgGet_auth("TBMES_Q014");
}

function authcheck() {
    ccn_ajax("/menuAuthGet", {keyword: "popPlanList"}).then(function (data) {
        main_data.auth = data;
    });
}

function datepickerInput() {
    datepicker_makes("#datepicker", -30);
    datepicker_makes("#datepicker2", 0);
}

function selectBox() {
    // select_makes_sub("#place_name", "/sysProdLineAllGet", "line_code", "line_name",{keyword:''},'Y');
}

function jqGrid_main() {
    $('#mes_grid').jqGrid({
        mtype: 'POST',
        datatype: "local",
        colNames: ['계획일자', '계획번호', '업체', '현장', '구분', '구분', '계획명', '상태', '라우팅', '등록자', '등록일시'],
        colModel: [
            {name: 'plan_date', index: 'plan_date', sortable: false, width: 150, formatter: formmatterDate2, fixed: true},
            {name: 'plan_no', index: 'plan_no', sortable: false, width: 150, fixed: true},
            {name: 'supp_name', index: 'supp_name', sortable: false, width: 150, fixed: true},
            {name: 'place_name', index: 'place_name', sortable: false, width: 150, fixed: true},
            {name: 'prod_type_name', index: 'prod_type_name', sortable: false, width: 150, fixed: true},
            {name: 'prod_name', index: 'prod_name', sortable: false, width: 150, fixed: true},
            {name: 'plan_name', index: 'plan_name', sortable: false, width: 150, fixed: true},
            {name: 'status_name', index: 'status_name', sortable: false, width: 150, fixed: true},
            {name: 'route_name', index: 'route_name', sortable: false, width: 150, fixed: true},
            {name: 'user_name', index: 'user_name', sortable: false, width: 150, fixed: true},
            {name: 'create_date',index: 'create_date',sortable: false,width: 150,formatter: formmatterDate,fixed: true}
        ],
        caption: "생산계획현황 | MES",
        autowidth: true,
        height: 562,
        pager: '#mes_grid_pager',
        rowNum: 100,
        ondblClickRow: function (rowid, iRow, iCol, e) {
            $("#wrapper").empty();
            $( '.rm' ).remove();
            var data = $('#mes_grid').jqGrid('getRowData', rowid);
            img_btn(data);
        },
        rowList: [100, 200, 300, 500, 1000],
        viewrecords: true,
    }).navGrid('#mes_grid_pager', {search: false, add: false, edit: false, del: false});
}

function Enter_Check(){
    if (event.keyCode == 13) {
        get_btn(1);  // 실행할 이벤트
    }
}