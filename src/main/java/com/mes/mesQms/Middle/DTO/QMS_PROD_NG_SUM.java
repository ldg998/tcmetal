package com.mes.mesQms.Middle.DTO;

import lombok.Data;

@Data
public class QMS_PROD_NG_SUM {
   private String work_date;
    private double qc_qty;
    private double ng_qty;
    private String qc_ratio;
}
