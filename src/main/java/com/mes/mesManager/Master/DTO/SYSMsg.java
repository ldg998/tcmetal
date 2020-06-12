package com.mes.mesManager.Master.DTO;

import lombok.Data;

@Data
public class SYSMsg {
	private String msg_code;
	private String msg_name1;  
	private String msg_name2;  
	private String msg_name3;  
	private String msg_name4; 
	private String user_code;  
	private String user_name;  
	private String create_date;
	private String update_date;
	private int rownum;     
	private int rec_count;
	private int rownum_page;
	private String keyword;
}
