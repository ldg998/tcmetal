/**
** @DESC : 유저 로그인
 * @제작자 : 김재일
 * @생성일 :2019-11-05
 **/
$( ".btn-login" ).on('click', function(e) {
    e.preventDefault();
    if($('#user_code').val() == ''){
        alert ('아이디를 입력하세요.');
        return false;
    }if($('#user_pwd').val() == ''){
        alert ('비밀번호를 입력하세요.');
        return false;
    }else{
        $.ajax({
            url : '/loginAction',
            data :
                {
                    user_code : $('#user_code').val(),
                    user_pwd : $('#user_pwd').val()
                },
            method: "POST",
            dataType: "json",
            success : function (result) {
                if(result.user_code == ""){
                    alert(result.message);
                    return false;
                }else{
                    location.href ='/';
                }
            }
        });
    }
});