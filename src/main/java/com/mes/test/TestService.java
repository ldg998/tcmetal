package com.mes.test;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Mapper.Test.Test;
import com.mes.mesManager.Authority.DTO.SYSAuth;
import com.mes.mesManager.Master.DTO.SYSProdLine;
import com.mes.mesManager.User.DTO.SYSUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    private Test test;

    public Message mobileKey(Page p) {
        Message m = new Message();

        System.out.println(p.getKeyword());
        int count = test.mobileKey(p);
        System.out.println(count);
        if (count == 0){
            m.setResult("NG");
        } else {
            m.setResult("OK");
        }


        return m;




    }

    public SYSUser mobileLogin(SYSUser u) {
        u = test.mobileLogin(u);
        if (u == null){
            return u;
        }else {
            return u;
        }

    }

    public List<SYSProdLine> mobileLine() {
        return test.mobileLine();
    }

    public List<?> test0609() {
        List<List<Object>> datas = test.test0609();

        List<SYSAuth> dataset1 =  getDataset( datas , 0 ); // SelectList 1

        Integer dataset2 = (Integer) getDataset( datas , 1 ).get(0);// SelectOne 2

        System.out.println(dataset1.toString());
        System.out.println(dataset2);


        return datas;
    }


    private <T> List<T> getDataset(List<List<Object>> datasets, int index){


        return (List<T>) datasets.get(index);

    }

}
