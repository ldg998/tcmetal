



////////////////////////////시작 함수/////////////////////////////////////
function modal_start2() {
    modal_make2();
}


////////////////////////////클릭 함수/////////////////////////////////////

////////////////////////////호출 함수/////////////////////////////////////


function modal_make2() {
    $("#addDialog1").dialog({
        modal: true,
        width: 632,
        height: 750,

        autoOpen: false,
        resizable: false,
        buttons: [

            {
                text: "취소",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
        open: function () {
            if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                if ($.ui.dialog.prototype._allowInteraction) {
                    $.ui.dialog.prototype._allowInteraction = function (e) {
                        if ($(e.target).closest('.select2-drop').length) return true;

                        if (typeof ui_dialog_interaction!="undefined") {
                            return ui_dialog_interaction.apply(this, arguments);
                        } else {
                            return true;
                        }
                    };
                    $.ui.dialog.prototype._allowInteractionRemapped = true;
                }
                else {
                    $.error("You must upgrade jQuery UI or else.");
                }
            }
        },
        _allowInteraction: function (event) {
            return !!$(e.target).closest('.ui-dialog, .ui-datepicker, .select2-drop').length;
        }
    });


}
//
// var agent = navigator.userAgent.toLowerCase();
// function pdf_make_btn() {
//     var table =[];
//     var pageWidth = 900;
//     var pageHeigth = 1000;
//
//     for(var i =0; img_list.length >i; i++){
//         var table2 ={
//             image: img_list[i],
//             width: pageWidth / 1.55, // for 50 % image width
//             height: pageHeigth -240, // change the numbers accordingly
//             alignment: 'center'
//         }
//         table.push(table2);
//
//     }
//
//     pdfMake.fonts = {
//         hangul: {
//             normal: "malgun.ttf",
//             bold: "malgunbd.ttf",
//             italics: "malgun.ttf",
//             bolditalics: "malgun.ttf"
//         }
//     };
//     var documentDefinition = {
//         pageSize: {
//             width: pageWidth,
//             height: pageHeigth
//         },
//         content: table,
//
//
// //하단의 현재페이지 / 페이지 수 넣기
//         footer: function (currentPage, pageCount) {
//             return {
//                 margin: 10,
//                 columns: [{
//                     fontSize: 9,
//                     text: [{}],
//                     alignment: 'center'
//                 }]
//             };
//
//         },
// //필요한 스타일 정의하기
//         styles: {
//             style_test: {
//                 fontSize: 18,
//                 bold: true,
//                 margin: [0, 0, 0, 0],
//                 alignment: 'center', font: 'hangul'
//             },
//             tableExample: {
//                 margin: [0, 5, 0, 15], font: 'hangul'
//             },
//             header: {
//                 alignment: 'center',
//                 font: 'hangul'
//             }
//         },
//
// // 페이지 크기 용지의 크기 사이즈 넣기 또는 특정 사이즈 넣기 { width: number, height: number }
//         pageSize: 'A4',
//
//         /* 페이지 방향 portrait : 가로 , landscape : 세로 */
//         pageOrientation: 'portrait',
//         defaultStyle: {
//             font: 'hangul'
//         }
//     };
//
//     var pdf_name = 'pdf파일 만들기.pdf'; // pdf 만들 파일의 이름
//     if (agent.indexOf("chrome") != -1) {
//
//         pdfMake.createPdf(documentDefinition).open();
//
//     } else {
//         pdfMake.createPdf(documentDefinition).download();
//     }
// }
