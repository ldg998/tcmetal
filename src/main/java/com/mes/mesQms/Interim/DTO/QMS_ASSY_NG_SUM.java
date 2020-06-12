package com.mes.mesQms.Interim.DTO;

import lombok.Data;

@Data
public class QMS_ASSY_NG_SUM {
    private String work_date;
    private double qc_qty;
    private double ng_qty;
    private String qc_ratio;
}
