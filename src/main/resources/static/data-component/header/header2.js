var array =
    [
        {code: "", title: 'TCMETAL', sub: 'MES', name: 'HOME'},

        // 관리자 - 권한관리
        {code: "sysAuth", title: '관리자', sub: '권한관리', name: '권한그룹'},
        {code: "sysAuthProgram", title: '관리자', sub: '권한관리', name: '권한별 프로그램관리'},

        //사용자관리
        {code: "sysDept", title: '관리자', sub: '사용자관리', name: '부서정보'},
        {code: "sysUser", title: '관리자', sub: '사용자관리', name: '사용자관리'},

        //마스터관리
        {code: "sysCommon", title: '관리자', sub: '마스터관리', name: '공통코드관리'},
        {code: "sysMsg", title: '관리자', sub: '마스터관리', name: '메세지관리'},
        {code: "sysBoard", title: '관리자', sub: '마스터관리', name: '게시판관리'},
        {code: "sysSupp", title: '관리자', sub: '마스터관리', name: '업체정보'},
        {code: "sysProdLine", title: '관리자', sub: '마스터관리', name: '라인정보'},
        {code: "sysCargo", title: '관리자', sub: '마스터관리', name: '창고관리'},
        {code: "sysMachineRegAlarm", title: '관리자', sub: '마스터관리', name: '예방점검알림설정'},

        // 자재관리-기준정보
        {code: "sysPart", title: '자재관리', sub: '기준정보', name: '품목정보'},
        {code: "sysLoc", title: '자재관리', sub: '기준정보', name: '로케이션'},
        {code: "sysPartCost", title: '자재관리', sub: '기준정보', name: '자재관리'},


        //발주관리
        {code: "scmOrder", title: '자재관리', sub: '발주관리', name: '발주관리'},
        {code: "scmOrderList", title: '자재관리', sub: '발주관리', name: '발주현황'},

        //자재입출고
        {code: "scmIn", title: '자재관리', sub: '자재입출고', name: '자재입고'},
        {code: "scmInList", title: '자재관리', sub: '자재입출고', name: '자재입고현황'},
        {code: "scmOut", title: '자재관리', sub: '자재입출고', name: '자재출고'},
        {code: "scmOutList", title: '자재관리', sub: '자재입출고', name: '자재출고현황'},
        {code: "scmIOList", title: '자재관리', sub: '자재입출고', name: '자재입출고현황'},

        //재고관리
        {code: "scmStockList", title: '자재관리', sub: '재고관리', name: '재고현황'},
        {code: "scmStockSumMonth", title: '자재관리', sub: '재고관리', name: '월원장'},
        {code: "scmStockRev", title: '자재관리', sub: '재고관리', name: '재고조정'},
        {code: "scmStockRevList", title: '자재관리', sub: '재고관리', name: '재고조정현황'},


        //출하관리-기준정보
       // {code: "", title: '출하관리', sub: '기준정보', name: ''},

        //입출고관리
        {code: "wmsIn", title: '출하관리', sub: '입출고관리', name: '제품입고관리'},
        {code: "wmsInList", title: '출하관리', sub: '입출고관리', name: '제품입고현황'},
        {code: "wmsOutOrder", title: '출하관리', sub: '입출고관리', name: '제품출고관리'},
        {code: "wmsOutList", title: '출하관리', sub: '입출고관리', name: '제품출고현황'},
        {code: "wmsOutReady", title: '출하관리', sub: '입출고관리', name: '제품 미출고 현황'},
        {code: "wmsStockReady", title: '출하관리', sub: '입출고관리', name: '제품재고현황'},
        {code: "wmsSumMonth", title: '출하관리', sub: '입출고관리', name: '제품재고월원장'},
        {code: "wmsSumRev", title: '출하관리', sub: '재고관리', name: '제품재고조정'},



        // //운송비관리
        // {code: "", title: '출하관리', sub: '운송비관리', name: '운송비등록'},
        // {code: "", title: '출하관리', sub: '운송비관리', name: '운송비현황'},
        //
        // //인보이스
        // {code: "", title: '출하관리', sub: '인보이스', name: '인보이스등록'},
        // {code: "", title: '출하관리', sub: '인보이스', name: '인보이스현황'},
        //
        // //패킹리스트
        // {code: "", title: '출하관리', sub: '패킹리스트', name: '패킹리스트등록'},
        // {code: "", title: '출하관리', sub: '패킹리스트', name: '패킹리스트현황'},




        //영업관리-기준정보
        {code: "sysSPart", title: '영업관리', sub: '기준정보', name: '품목정보관리'},
        {code: "crm_1", title: '영업관리', sub: '기준정보', name: '제품품목'},
        {code: "crm_2", title: '영업관리', sub: '기준정보', name: '환율관리'},
        {code: "crm_3", title: '영업관리', sub: '기준정보', name: '목재단가관리'},
        {code: "crm_4", title: '영업관리', sub: '기준정보', name: '수주등록'},

        //수주관리
        {code: "crm_5", title: '영업관리', sub: '수주관리', name: '제품단가관리'},
        {code: "crm_6", title: '영업관리', sub: '수주관리', name: '운송비용관리'},
        {code: "crm_7", title: '영업관리', sub: '수주관리', name: '운송비용현황'},
        {code: "crm_8", title: '영업관리', sub: '수주관리', name: '인보이스양식'},
        {code: "crm_9", title: '영업관리', sub: '수주관리', name: '인보이스등록'},
        {code: "crm_10", title: '영업관리', sub: '수주관리', name: '출고지시서'},
        //영업관리
        {code: "crmOrderRecp", title: '영업관리', sub: '영업관리', name: '수주정보관리'},
        {code: "crmWorkList", title: '영업관리', sub: '영업관리', name: '실적현황'},
        {code: "sysSPartCost", title: '영업관리', sub: '영업관리', name: '제품단가관리'},
        {code: "wmsoutOrd", title: '영업관리', sub: '영업관리', name: '출고지시서'},
        //납기관리
        // {code: "", title: '영업관리', sub: '납기관리', name: '납기관리'},
        // {code: "", title: '영업관리', sub: '납기관리', name: '납기현황'},
        //도면과리

        //대책서관리(클레임)
        // {code: "", title: '영업관리', sub: '대책서관리', name: '문제점접수'},
        // {code: "", title: '영업관리', sub: '대책서관리', name: '진행상황관리'},



        //품질관리 -기준정보
        {code: "qmsTestItem", title: '품질관리', sub: '기준정보', name: '검사항목관리'},
        // {code: "", title: '품질관리', sub: '기준정보', name: '용해규격관리'},



        {code: "qmsRecvList", title: '품질관리', sub: '수입검사', name: '수입검사현황'},
        {code: "qmsRecvErrorMan", title: '품질관리', sub: '수입검사', name: '수입검사부적합등록'},
        {code: "qmsRecvErrorList", title: '품질관리', sub: '수입검사', name: '수입검사불량현황'},


        //중간검사(1차,2차)
        // {code: "", title: '품질관리', sub: '중간검사', name: '중간검사항목관리'},
        // {code: "", title: '품질관리', sub: '중간검사', name: '중간검사현황'},
        // {code: "", title: '품질관리', sub: '중간검사', name: '중간검사부적합등록'},
        // {code: "", title: '품질관리', sub: '중간검사', name: '중간검사불량현황'},

        //출하검사

        {code: "qmsProd", title: '품질관리', sub: '출하검사', name: '출하검사진행'},
        {code: "qmsProdList", title: '품질관리', sub: '출하검사', name: '출하검사현황'},

        {code: "qmsProdErrorList", title: '품질관리', sub: '출하검사', name: '출하검사불량현황'},


        // 이력관리
        // {code: "", title: '품질관리', sub: '이력관리', name: '성적서관리'},
        // {code: "", title: '품질관리', sub: '이력관리', name: '제품이력관리'},
        // {code: "", title: '품질관리', sub: '이력관리', name: '도형제관리'},
        // {code: "", title: '품질관리', sub: '이력관리', name: '부적합관리'},

        //POP 생산관리 - 기준정보
        // {code: "", title: '생산관리', sub: '기준정보', name: '바코드양식'},
        // {code: "", title: '생산관리', sub: '기준정보', name: '공정라우팅'},
        // {code: "", title: '생산관리', sub: '기준정보', name: '공정별작업자관리'},
        // {code: "", title: '생산관리', sub: '기준정보', name: '작업의뢰서설정'},

        //생산관리
        // {code: "", title: '생산관리', sub: '생산관리', name: '생산계획관리'},
        // {code: "", title: '생산관리', sub: '생산관리', name: '작업의뢰서관리'},

        //생산현황
        {code: "popProdRange", title: '생산관리', sub: '생산형황', name: '기간별생산실적'},
        {code: "popProdList1", title: '생산관리', sub: '생산형황', name: '제품별생산실적'},
        {code: "popProdList2", title: '생산관리', sub: '생산형황', name: '공정별작업현황'},
        // {code: "", title: '생산관리', sub: '생산형황', name: '작업일보관리'},
        {code: "popMonitoring", title: '생산관리', sub: '생산형황', name: '생산모니터링'},


        //외주업체-외주관리
        {code: "OutsOut", title: '외주업체', sub: '외주관리', name: '외주출고등록'},
        {code: "OutsOutList", title: '외주업체', sub: '외주관리', name: '외주출고현황'},
        {code: "OutsIn", title: '외주업체', sub: '외주관리', name: '외주입고등록'},
        {code: "OutsInList", title: '외주업체', sub: '외주관리', name: '외주입고현황'},
        {code: "OutsInReady", title: '외주업체', sub: '외주관리', name: '미입고관리'},
        // {code: "", title: '외주업체', sub: '외주관리', name: '외주불량현황'},


        //설비관리-기준정보
        {code: "tpmMC", title: '설비관리', sub: '기준정보', name: '설비정보'},

        //예방점검
        {code: "tpmMachineRegItem", title: '설비관리', sub: '예방점검', name: '예방점검항목관리'},
        {code: "tpmMachineRegCycle", title: '설비관리', sub: '예방점검', name: '예방점검주기설정'},
        {code: "tpmMachineRegComp", title: '설비관리', sub: '예방점검', name: '예방점검관리'},


        //사후보전
        {code: "tmpMachineRegAlarm", title: '설비관리', sub: '사후보전관리', name: '사후보전관리'},

        //게시판-topBoard1
        {code:"board", title:"게시판" , sub:"게시판", name:"게시판"},

    ];
var path = window.location.pathname.split("/").slice(1);
$(function () {
    wrapWindowByMask2();
    setTimeout(function () {
        closeWindowByMask()
    }, 300);
    // 엑티브 메뉴 nav
    for (var i = 0; array.length > i; i++) {
        if (array[i].code == path) {
            $('#sub-t-1').text(array[i].name);
            $('#sub-t-2').text(array[i].title);
            $('#sub-t-3').text(array[i].sub);
            $('#sub-t-4').text(array[i].name);
        }
    }

    $('#go_hpdk').click(function(){
        $.ajax({
            type: "POST",
            dataType : "jsonp",
            url: "http://tobesystem.co.kr/partners",
            data:
                {
                    site_code : $('#hstcd').val(),
                    user_code : $('#huscd').val(),
                    user_name : $('#husnm').val(),
                    url : "http://"+window.location.host
                },
            error: function (request,status,error) {
                if(request.status == 200){
                    var newTab = window.open('http://tobesystem.co.kr/h_index', '_blank');
                    newTab.focus();
                }else{
                    alert('헬프데스크 인증에 실패하였습니다.');
                }

            }
        });
    });




    password_modal_start();




    var filter = "win16|win32|win64|mac|macintel";
    if ( navigator.platform ) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
            $('select').on('select2:open', function(e) {
                $('.select2-search input').prop('focus',false);
            })
        }
    }




});
// var settime =  setInterval(function() {
//
//     if (getCookie('senUserData') == null){
//
//         alert('회원데이터가 존재하지않습니다.\n로그인페이지로 이동합니다.');
//
//         window.location.href = "logout";
//
//         clearTimeout(settime);
//
//
//     }
// },1000);

function  callback2(cb){
    return  cb();
}

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}


function logout() {
    if (confirm("로그아웃 하시겠습니까?")) {
        location.href = "logout";
    }
}



function password_add_btn() {
    modal_reset(".password_value", []);
    $("#passwordDialog").dialog('open');
}


function wrapWindowByMask2() {
    //화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
    var maskHeight2 = maskHeight / 2;
//      var maskWidth = $(document).width();
    var maskWidth = window.document.body.clientWidth;
    var maskWidth2 = maskWidth / 2;

    var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg = '';

    loadingImg += "<div id='loadingImg' style='position:absolute; left:" + (maskWidth2 - 45) + "px;top:40%; display:none; z-index:10000;'>";
    loadingImg += " <img src='/ui-component/imagesNew/loding/loding1.gif' style='max-width: 50px; max-height: 50px;'/>";
    loadingImg += "</div>";

    //화면에 레이어 추가
    $('body')
        .append(mask)
        .append(loadingImg)

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#mask').css({
        'width': maskWidth
        , 'height': maskHeight
        , 'opacity': '0.3'
    });

    //마스크 표시
    $('#mask').show();

    //로딩중 이미지 표시
    $('#loadingImg').show();
}

function closeWindowByMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').remove();
}


function viewBoard(idx){
    $.ajax({
        url: '/validCode?idx='+idx,
        complete : function (e) {
            if(e.status == 200){
                $.ajax({
                    url: '/board?idx='+idx,
                    complete : function (e) {
                        if(e.status == 200){
                            location.href = '/board';
                        }
                    }
                });
            } else {alert('시스템 에러. 관리자에게 문의하세요.')}
        }
    });
}


var filter = "win16|win32|win64|mac|macintel";
var pmCheck = 'Y';
if ( navigator.platform ) {
    if ( filter.indexOf( navigator.platform.toLowerCase() ) >= 0 ) {
        pmCheck = 'Y';
    } else {
        pmCheck = 'N';
    }
}

var msg_object = {};

function msgGet_auth(keyword) {
    ccn_ajax("/msgGet", {keyword: keyword}).then(function (data) {
        msg_object[keyword] = data;
    });
}

function favorites_btn() {
    var path = window.location.pathname.split("/").slice(1);
    ccn_ajax("/sysMenuFavoritesAdd", {menu_code:path[0]}).then(function (data) {
        if(data.result === 'NG'){
            $(".favorites_star").attr('class','fa fa-star-o favorites_star');

        }else {
            $(".favorites_star").attr('class','fa fa-star favorites_star');
        }

        ccn_ajax("/sysMenuFavoritesGet", {}).then(function (data2) {
            $("#left_submenu").empty();
            for (var i  =0 ; i<data2.length; i++){
               $("#left_submenu").append(
               $(' <li class="'+(data2[i].menu_code == under_active ? "active" : "")  +'" >' +
                   '<a href="'+ data2[i].menu_code +'">'+ data2[i].menu_name +'</a>' +
                   '<b class="arrow"></b>'+
                   '</li>'));
           }

        });
    });

}
