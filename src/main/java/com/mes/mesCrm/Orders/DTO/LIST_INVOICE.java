package com.mes.mesCrm.Orders.DTO;

import lombok.Data;

import java.util.List;

@Data
public class LIST_INVOICE {
    private CRM_INVOICE ci;
    private List<CRM_INVOICE_SUB> cis;
    private List<CRM_INVOICE_SUB1> cis1;
}
