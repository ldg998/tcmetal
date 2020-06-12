package com.mes.mesManager.Master.DTO;

import lombok.Data;

@Data
public class SYSCargo {
	private String site_code;     
	private String cargo_code;    
	private String cargo_name;    
	private String cargo_grp_code;
	private String cargo_grp_name;
	private String qty_yn;        
	private String use_yn;        
	private String user_code;     
	private String create_date;   
	private String update_date;  
	private String user_name;     
	private int rownum;        
	private int rec_count;
	private String keyword;
}
