package com.mes.Common.Vaild;

import com.mes.Common.DataTransferObject.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

@Slf4j
public class ValidFunction {
    public Message ValidData(BindingResult errors){
        Message msg = new Message();
        log.info("error = " + errors.hasErrors());
        if(errors.hasErrors()){
            for (ObjectError objectError : errors.getAllErrors()) {
                msg.setMessage(objectError.getDefaultMessage());
                msg.setResult("NG");
            }
            return msg;
        }else{
            msg.setResult("OK");
            return msg;
        }
    }
}
