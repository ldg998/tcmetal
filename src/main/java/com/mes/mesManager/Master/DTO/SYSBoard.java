package com.mes.mesManager.Master.DTO;

import lombok.Data;

@Data
public class SYSBoard {
	private String site_code;  
	private String board_code; 
	private String board_en;  
	private String board_kr;   
	private String board_auth; 
	private String board_auth_name; 
	private int files;      
	private int file_size;  
	private String use_yn;     
	private String user_code;  
	private String create_date;
	private String update_date;
	private int rownum;     
	private String user_name;  
	private int rec_count;
	private String keyword;
}
