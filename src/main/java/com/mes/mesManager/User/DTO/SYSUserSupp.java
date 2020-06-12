package com.mes.mesManager.User.DTO;

import lombok.Data;

@Data
public class SYSUserSupp {
	private String user_code;
    private String user_name;
    private String auth_code;
    private String auth_name;
    private String tel_no;
    private String email;
    private String use_yn;
    private String update_user;
    private String update_user_name;
    private String create_date;
    private String update_date;
    private String login_date;
	private int rownum;
	private int rec_count;
	private String keyword;
    private String site_code;
}
