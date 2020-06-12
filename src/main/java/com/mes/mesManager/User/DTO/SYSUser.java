package com.mes.mesManager.User.DTO;

import lombok.Data;

@Data
public class SYSUser {
	private String user_code;
	private String user_name;
	private String user_pwd;
	private String user_type;
	private String site_code;
	private String dept_code;
	private String dept_name;
	private String duty_code;
	private String duty_name;
	private String auth_code;
	private String auth_name;
	private String tel_no;
	private String email;
	private String use_yn;
	private String update_user;
	private String create_date;
	private String update_date;
	private String login_date;
	private int rownum;
	private int rec_count;
	private String keyword;
}
