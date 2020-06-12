package com.mes.Common.DataTransferObject;

import lombok.Data;

/**
 * <javadoc>
 * 프로시저 호출 후 리턴되는 메세지를 담는다.
 * @author      김재일
 * @version     1.0
 * @since       2019-11-14
 **/
@Data
public class Message {
    private String message;
    private String result;
}
