package com.mes.Common.DataTransferObject;

import lombok.Data;

/**
 * <javadoc>
 * jqGrid에서 데이터를 받는 클래스
 * @author      김재일
 * @version     1.0
 * @since       2019-11-14
 **/
@Data
public class Page {
    private int page_num;
    private int total_num;
    private int page;
    private int rows;
    private String keyword;
    private String keyword2;
    private String keyword3;
    private String keyword4;
    private String keyword5;
    private String keyword6;
    private String keyword7;
    private String keyword8;
    private String start_date;
    private String stop_date;
    private String end_date;
    private String user_code;
    private String date;
    private String site_code;
    private String work_date;
    private String gb   ;
    private String supp_code;
    private String password;
    private String password_new;
    private String password_confirm;
    private String supp_name;
    private String we_no;
    private String supp_no;
}
