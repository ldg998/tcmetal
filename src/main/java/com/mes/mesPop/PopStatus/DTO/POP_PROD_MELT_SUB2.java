package com.mes.mesPop.PopStatus.DTO;

import lombok.Data;

@Data
public class POP_PROD_MELT_SUB2 {

    private String work_date;
    private String line_code;
    private String charge;
    private int seq;
    private int chg_temp;
    private String chg_time;
    private double chg_ce;
    private double chg_c;
    private double chg_si;
    private String wedge_cw;
    private String wedge_pw;
}
