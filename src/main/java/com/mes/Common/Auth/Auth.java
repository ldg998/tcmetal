package com.mes.Common.Auth;

import lombok.Data;

/**
 * <javadoc>
 * 메뉴 DTO
 * @author      김재일
 * @version     1.0
 * @since       2019-11-14
 **/
@Data
public class Auth {
    private String menu_code;
    private String menu_name;
    private int level;
    private String parent_menu_code;
}
