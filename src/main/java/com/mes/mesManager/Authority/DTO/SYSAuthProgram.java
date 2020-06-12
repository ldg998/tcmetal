package com.mes.mesManager.Authority.DTO;

import lombok.Data;

@Data
public class SYSAuthProgram {
    private String auth_code;
    private String menu_code;
    private String menu_name;
    private int level;
    private String check_get;
    private String check_add;
    private String check_edit;
    private String check_del;
    private String parent_menu_code;
    private boolean leaf;
    private boolean expanded;
}
