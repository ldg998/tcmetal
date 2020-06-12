package com.mes.mesWms.Stock.DTO;

import lombok.Data;

@Data
public class WMS_STOCK_TOTAL {
    private String site_code;
    private String cargo_code;
    private String part_code;
    private double qty;

}
