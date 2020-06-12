$(function () {
    $(".file-tree").filetree();
    $(document).on("click",".menuMainA",function () {
        if (!$(this).hasClass("menuMainA_down")){
            $(".menuMainA").removeClass("menuMainA_down");
            $(".file-tree").slideUp(100);
        }


        if ($(this).hasClass("menuMainA_down")){
            $(this).removeClass('menuMainA_down');
            $(this).parent().children(".file-tree").slideUp(100);
        }else {
            $(this).addClass('menuMainA_down');
            $(this).parent().children(".file-tree").slideDown(100);
        }

    });


    $('.top-active').addClass("menuMainA_down");
    $('.top-active').parent().children(".file-tree").slideDown(100);

    var $sidebar = $('.sidebar').eq(0);
    if( !$sidebar.hasClass('h-sidebar') ) return;

    $(document).on('settings.ace.top_menu' , function(ev, event_name, fixed) {
        if( event_name !== 'sidebar_fixed' ) return;

        var sidebar = $sidebar.get(0);
        var $window = $(window);

        //return if sidebar is not fixed or in mobile view mode
        var sidebar_vars = $sidebar.ace_sidebar('vars');
        if( !fixed || ( sidebar_vars['mobile_view'] || sidebar_vars['collapsible'] ) ) {
            $sidebar.removeClass('lower-highlight');
            //restore original, default marginTop
            sidebar.style.marginTop = '';

            $window.off('scroll.ace.top_menu')
            return;
        }


        var done = false;
        $window.on('scroll.ace.top_menu', function(e) {

            var scroll = $window.scrollTop();
            scroll = parseInt(scroll / 4);//move the menu up 1px for every 4px of document scrolling
            if (scroll > 17) scroll = 17;


            if (scroll > 16) {
                if(!done) {
                    $sidebar.addClass('lower-highlight');
                    done = true;
                }
            }
            else {
                if(done) {
                    $sidebar.removeClass('lower-highlight');
                    done = false;
                }
            }

            sidebar.style['marginTop'] = (17-scroll)+'px';
        }).triggerHandler('scroll.ace.top_menu');

    }).triggerHandler('settings.ace.top_menu', ['sidebar_fixed' , $sidebar.hasClass('sidebar-fixed')]);

    $(window).on('resize.ace.top_menu', function() {
        $(document).triggerHandler('settings.ace.top_menu', ['sidebar_fixed' , $sidebar.hasClass('sidebar-fixed')]);
    });
});

function logout() {
    if (confirm("로그아웃 하시겠습니까?")){
        location.href="logout";
    }
}


function wrapWindowByMask2() {
    //화면의 높이와 너비를 구한다.
    var maskHeight = $(document).height();
//      var maskWidth = $(document).width();
    var maskWidth = window.document.body.clientWidth;

    var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg = '';

    loadingImg += "<div id='loadingImg' style='position:absolute; left:50%; top:40%; display:none; z-index:10000; '>";
    loadingImg += " <img src='/images/loading.gif'/>";
    loadingImg += "</div>";

    //화면에 레이어 추가
    $('body')
        .append(mask)
        .append(loadingImg)

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    $('#mask').css({
        'width' : maskWidth
        , 'height': maskHeight
        , 'opacity' : '0.3'
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
