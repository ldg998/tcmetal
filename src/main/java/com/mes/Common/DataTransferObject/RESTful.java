package com.mes.Common.DataTransferObject;

import lombok.Data;
import java.util.List;

/**
 * <javadoc>
 * jqGrid로 데이터를 전달하는 클래스
 * @author      김재일
 * @version     1.0
 * @since       2019-11-14
 **/
@Data
public class RESTful {
    private List<?> rows;
    private int page;
    private int total;
    private int records;
}
