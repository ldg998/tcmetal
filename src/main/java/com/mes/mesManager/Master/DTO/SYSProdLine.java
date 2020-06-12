package com.mes.mesManager.Master.DTO;

import lombok.Data;

@Data
public class SYSProdLine {
	private String site_code;  
	private String dept_code;  
	private String dept_name;  
	private String line_code;  
	private String line_name;  
	private String user_code;
	private String user_name;
	private String create_date;
	private String update_date;
	private int rownum;     
	private int rec_count;
	private String keyword;

	private String line_char;
	private String line_type;
	private String line_type_name;
}
