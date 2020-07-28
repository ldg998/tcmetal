package com.mes.mesCrm.Standard.DTO;

import lombok.Data;

@Data
public class SYS_ERATE {
    // 화폐단위
    private String currency_code;

    // 시작일
    private String start_date;

    // 종료일
    private String stop_date;

    // 환율
    private double exch_rate;

    // 등록자
    private String user_code;

    // 생성일시
    private String create_date;

    // 수정일시
    private String update_date;
    private String keyword;
    private String user_name;
    private String code_name1;

}
