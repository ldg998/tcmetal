<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2020-03-23
  Time: 오후 1:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="/data-component/common/html2canvas.js"></script>

    <script>
        $(function() {
            $("#get").click(function() {


                $("#res").load("/test3", function () {
                    test = $("#res").clone();
                });
            });

            $("#get2").click(function() {
                $("#res").empty();
               // window.open("/test3",'_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none', '');

                // var imageDiv = document.getElementById("imageDiv");
                //
                //
                // var _transform = imageDiv.style.transform;
                //
                // imageDiv.style.setProperty("transform", "none");
                //
                //
                // html2canvas(imageDiv, {
                //
                // }).then(function (_canvas) {
                //     let base64image = _canvas.toDataURL("image/png");
                //
                //     // image 위치 정상복구
                //     imageDiv.style.transform = _transform;
                //
                // });




                $.ajax({
                    url: "/test3",
                    type: 'GET',
                    async: true,
                    dataType: "html",
                    data:{keyword:"50"},
                    success: function (data2) {
                        $("#res").append($(data2));


                        // var imageDiv = document.getElementById("all-content");
                        //
                        // //
                        // var _transform = imageDiv.style.transform;
                        //
                        // imageDiv.style.setProperty("transform", "none");


                        html2canvas($("#all-content").get(0),{
                            allowTaint: true,
                            taintTest: false,
                            useCORS: true,

                            width: 900 , height: 1200 ,
                            windowWidth:700,
                            windowHeight:900,
                            y:230,
                            x:20,
                            scale:3,
                            onclone: function (clonedDoc) {
                               //  console.log(clonedDoc);
                               $(clonedDoc).find("#res").find("#all-content").removeAttr("style");
                               // console.log($(clonedDoc).find("#res").html());
                            }
                        }).then(function(canvas) {
                            //canvas.removeAttr("style");
                            //console.log(canvas);
                            //$(canvas).attr("width","900").attr("height","1200px");
                            //console.log(canvas);
                            //var myImage = canvas.toDataURL("image/png");
                            //console.log(myImage);
                            //downloadURI(myImage,"test.png");


                            // var form = $('<form></form>');
                            // var imgSrc = $('<input type="hidden" id="imgSrc" name="imgSrc">');
                            // form.append(imgSrc);
                            //
                            // imgSrc.val(myImage);

                            $("#imgSrc").val(canvas.toDataURL("image/png"));

                            //console.log(imgSrc);

                            $.ajax({
                                type:     "post",
                                data : $("#work_page_form").serialize(),
                                url:     "/test4",
                                error: function(a, b, c){
                                    alert("fail!!");
                                },
                                success: function (data) {

                                }
                            });
                            $("#imgSrc").val("");


                            //imageDiv.style.transform = _transform;
                            //$("#res").attr("style","display: none");
                            // var imgageData = canvas.toDataURL("image/png");
                            // var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
                            // newData.down
                            // jQuery("a").attr("download", "screenshot.png").attr("href", newData);
                        });


                    },
                    error: function () {

                    }
                });


                //window.open('/test3', 'pop01', 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no');



                // var form = $('<form></form>');
                // form.attr('action', "/test3");
                // //form.attr('method', 'post');
                // form.appendTo('body');
                // // var idx = $("<input type='hidden' value="+idx+" name='idx'>");
                // // var pwd = $("<input type='hidden' value="+pw+" name='password'>");
                // // var mode = $("<input type='hidden' value='educomPw' name='mode'>");
                // // form.append(idx);
                // // form.append(pwd);
                // // form.append(mode);
                // form.submit();






                // test.find("#title").text("안녕하하하하하");
                //$("#res").removeAttr("style");


                //var qwe = $("#res").clone().removeAttr("style").get(0);
                // console.log($("#res").get(0));
                // html2canvas($("#res").get(0),{
                //     //allowTaint: true,
                //     //taintTest: false,
                //     //useCORS: true,
                //     height:1400,
                //     onclone: function (clonedDoc) {
                //         console.log(clonedDoc);
                //         $(clonedDoc).find("#res").find(".all-content").removeAttr("style");
                //        console.log($(clonedDoc).find("#res").html());
                //     }
                // }).then(function(canvas) {
                //     //canvas.removeAttr("style");
                //     console.log(canvas);
                //     var myImage = canvas.toDataURL();
                //     console.log(myImage);
                //     downloadURI(myImage,"test.png");
                //     //$("#res").attr("style","display: none");
                //     // var imgageData = canvas.toDataURL("image/png");
                //     // var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
                //     // newData.down
                //     // jQuery("a").attr("download", "screenshot.png").attr("href", newData);
                // });


                // html2canvas(document.querySelector("#res")).then(function (canvas) {
                //
                //
                //
                //         var el = document.getElementById("#res");
                //
                //         el.href = canvas.toDataURL("image/jpeg");
                //
                //         el.download = '파일명.jpg';
                //
                //         el.click();
                //
                //
                // });



                // html2canvas(document.getElementById("res")) //id container 부분만 스크린샷
                // .then(function (canvas) { //jpg 결과값
                //     //jpg 결과값
                //     drawImg(canvas.toDataURL('image/jpeg'));
                //     //이미지 저장
                //     saveAs(canvas.toDataURL(), 'file-name.jpg');
                //
                //
                //   //   var el = document.getElementById("res");
                //   // console.log(el);
                //   //
                //   //   el.href = canvas.toDataURL("image/jpeg");
                //   //
                //   //   el.download = '파일명.jpg';
                //   //
                //   //   el.click();
                // }).catch(function (err) {
                //     console.log(err);
                // });







            });



        });


        function downloadURI(uri,name) {
            var link = document.createElement("a")
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
        }


        function drawImg(imgData) { console.log(imgData); //imgData의 결과값을 console 로그롤 보실 수 있습니다.
             return new Promise(function reslove() { //내가 결과 값을 그릴 canvas 부분 설정
                 var canvas = document.getElementById('canvas');
                 var ctx = canvas.getContext('2d'); //canvas의 뿌려진 부분 초기화
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  var imageObj = new Image();
                  imageObj.onload = function () {
                      ctx.drawImage(imageObj, 10, 10); //canvas img를 그리겠다.
                      }; imageObj.src = imgData; //그릴 image데이터를 넣어준다.
                 }, function reject() {

             }); } function saveAs(uri, filename) {
            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                window.open(uri);
            }
        }



var test;






    </script>
</head>
<body>
    <button id="get">이미지 저장</button>
    <button id="get2">테스트버튼</button>
    <a>sss</a>
    <div id="res" style="width: 100%;" ></div>
    <form id="work_page_form" style="display: none">
        <input type="hidden" name="imgSrc" id="imgSrc" />
    </form>
</body>
</html>
