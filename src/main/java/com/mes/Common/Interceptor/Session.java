package com.mes.Common.Interceptor;

import lombok.Data;

/**
 * <javadoc>
 * 세션에 담을 데이터 DTO
 * @author      김재일
 * @version     1.0
 * @since       2019-11-14
 **/
@Data
public class Session {
    private String user_code;
    private String user_name;
    private String user_pwd;
    private String site_code;
    private String dept_code;
    private String duty_code;
    private String auth_code;
    private String tel_no;
    private String email;
    private String use_yn;
    private String update_user;
    private String create_date;
    private String update_date;
    private String login_date;
    private String keyword;
    private String message;
}
