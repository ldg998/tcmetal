/**
 * various.js 와 연동
 */

////////////////////////////데이터/////////////////////////////////////
var main_date = {
    date: '',
    year: '',
    month: ''
};


////////////////////////////시작 함수//////////////////////////////////
$(document).ready(function () {
    date_maker();
    calendar_make();

    $(document).on("click",".fc-prev-button",function() {
        prev_date();
        console.log(main_date);
    });
    $(document).on("click",".fc-next-button",function() {
        next_date();
        console.log(main_date);
    });
    $(document).on("click",".fc-today-button",function() {
        date_maker();
    });
});

function date_maker() {
    var date = new Date();
    var year =  date.getFullYear();
    var month = date.getMonth()+1;
    if (month.toString().length < 2){
        month = '0'+ month;
    }
    main_date.date = year+month;
    main_date.year = year;
    main_date.month = month;
    console.log(main_date);
}

function prev_date() {
    if(main_date.month == 1) {
        main_date.month = "12";
        main_date.year -= 1;
        main_date.date = main_date.year+main_date.month;
    }else {
        main_date.month -= 1;
        if (main_date.month.toString().length < 2){
            main_date.month = '0'+ main_date.month;
        }else{
            main_date.month = main_date.month+"";
        }
    }
    main_date.date = main_date.year+main_date.month;
}

function next_date() {
    if(main_date.month == 12) {
        main_date.month = "01";
        main_date.year += 1;
        main_date.date = main_date.year+main_date.month;
    }else {
        var int_month = parseInt(main_date.month);
        int_month += 1;
        main_date.month = int_month;
        if (main_date.month.toString().length < 2) {
            main_date.month = '0' + main_date.month;
        }else{
            main_date.month = main_date.month+"";
        }
    }
    main_date.date = main_date.year+main_date.month;
}

function calendar_make(){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        header: {
            left: '',
            center: 'title',
            right: 'prev, next today'
        },
        locale: 'ko',
        height : 850,
        eventSources : [{
            events : function(info, successCallback, failureCallback){
                setTimeout( function () {
                    $.ajax({
                        url: "/calendarList",
                        type:'POST',
                        async: true,
                        dataType:"json",
                        data : {work_date:main_date.date},
                        success: function (data) {
                            var events = [];
                            $.each(data, function (index, item) {
                                events.push({
                                    id : index,
                                    start:formmatterDate2(data[index].start_date),
                                    end:formmatterDate2((data[index].end_date)),
                                    title:data[index].title,
                                    color:data[index].color
                                })
                            });
                            // console.log(events);
                            successCallback(events);
                        },error:function () {
                            console.log("error");
                        }
                    });
                }, 10);
            }
        }]
    });
    calendar.render();
}