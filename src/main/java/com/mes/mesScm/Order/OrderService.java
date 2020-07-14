package com.mes.mesScm.Order;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesScm.Order.OrderMapper;
import com.mes.mesScm.Order.DTO.*;
import com.mes.mesScm.Standard.DTO.SYS_PART_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class OrderService extends ReturnFunction {
    @Autowired
    private OrderMapper orderMapper;


    public RESTful scmOrderGet(HttpServletRequest req, Page p) {
        List<SCM_IN_ORD> rows = orderMapper.scmOrderGet(p);
        return getListData(rows, p);
    }

    public RESTful scmOrderSubGet(HttpServletRequest req, Page p) {
        List<SCM_IN_ORD_SUB> rows = orderMapper.scmOrderSubGet(p);
        return getListData(rows, p);
    }

    public Message scmOrderAdd(HttpServletRequest req, SCM_IN_ORD sio) {
        sio.setUser_code(getSessionData(req).getUser_code());
        return orderMapper.scmOrderAdd(sio);
    }

    public List<SCM_IN_ORD_SUB> scmOrderPartOneGet(HttpServletRequest req, SCM_IN_ORD_SUB sios) {
        return orderMapper.scmOrderPartOneGet(sios);
    }

    public Message scmOrderDel(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderMapper.scmOrderDel(sio);
    }

    public Message scmOrderComp(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderMapper.scmOrderComp(sio);
    }

    public RESTful scmOrderListGet(HttpServletRequest req, Page p) {
        List<SCM_IN_ORD_SUB> rows = orderMapper.scmOrderListGet(p);
        return getListData(rows, p);
    }

    public Message scmOrderReady(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderMapper.scmOrderReady(sio);
    }


    public SCM_IN_ORD scmOrderOneGet(HttpServletRequest req, SCM_IN_ORD sio) {
        return orderMapper.scmOrderOneGet(sio);
    }


    public RESTful scmOrderPartGet(HttpServletRequest req, Page p) {
        List<SYS_PART_CD> rows = orderMapper.scmOrderPartGet(p);
        return getListData(rows, p);
    }
}
