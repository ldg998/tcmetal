package com.mes.mesQms.Shipment.DTO;

import lombok.Data;

@Data
public class QMS_INSP_MACHINE {
    private String machine_code;
    private String machine_name;
    private String device_no;
    private String capa;
    private String spec;
    private String correct_corp_name;
    private String correct_date;
    private String end_date;
    private int alarm_day;
    private String file1;
    private String file1_name;
    private String alarm_user_code;
    private String user_code;
    private String user_name;
    private String create_date;
    private String update_date;
    private String keyword;

    private int rownum;
    private int rownum_page;
    private int rec_count;
}
