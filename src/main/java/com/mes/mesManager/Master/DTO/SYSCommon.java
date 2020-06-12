package com.mes.mesManager.Master.DTO;

import lombok.Data;

@Data
public class SYSCommon {

	//SYS_COMMON_CD
	private String site_code;
	private String code_type;
	private String code_value;
	private String code_name1;
	private String code_name2;
	private String code_name3;
	private String code_name4;
	private String code_name5;
	private String code_name6;
	private String code_name7;
	private String code_name8;
	private String use_yn;
	private String user_code;
	private String create_date;
	private String update_date;

	//GRID PAGE
	private int rownum;
	private int rownum_page;
	private int rec_count;

	//코드그룹 명
	private String cn;
	// #group_select 값을 담는 용도
	private String keyword;

	//JOIN DATA
	private String group_code;
	private String user_name;
}
