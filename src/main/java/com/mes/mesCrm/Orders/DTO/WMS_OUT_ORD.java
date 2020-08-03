package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

@Data
public class WMS_OUT_ORD {
    private String req_no;
    private String work_date;
    private String ord_no;
    private String status;
    private String user_code;
    private String create_date;
    private String update_date;
    private String delivery_place;
}
