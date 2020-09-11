package com.mes.mesPop.PopStatus;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.DTO.Files;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Mapper.mesPop.Status.MesPopStatusMapper;
import com.mes.mesPop.PopStatus.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class PopStatusService extends UploadFunction {
    @Autowired
    private MesPopStatusMapper mesPopStatusMapper;

    public RESTful popPlanOrderGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN_ORD_CD> rows = mesPopStatusMapper.popPlanOrderGet(p);
        return getListData(rows, p);
    }

    public List<POP_PLAN_ORD_CD> popPlanOrderOrd(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        p.setUser_code(getSessionData(req).getUser_code());
        return mesPopStatusMapper.popPlanOrderOrd(p);
    }

    public RESTful popProdRangeGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PLAN> rows = mesPopStatusMapper.popProdRangeGet(p);
        return getListData(rows, p);
    }

    public RESTful popProdList1Get(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PROD> rows = mesPopStatusMapper.popProdList1Get(p);
        return getListData(rows, p);
    }

    public void sysSPartDrawingAdd(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "sysSPartDrawing";
        Files newFiles = setSysSPartDrawingAdd(page_name,req,"C:/UploadFile/tcmetal/sysSPartDrawing/");
        files.setKey_value(newFiles.getUrl());
        mesPopStatusMapper.sysSPartDrawingAdd(files);
    }


    public void sysSPartDrawingAdd2(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        mesPopStatusMapper.sysSPartDrawingAdd2(files);
    }

    public void sysSPartWoodAdd(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        String page_name = "sysSPartWood";
        Files newFiles = setSysSPartWoodAdd(page_name,req,"C:/UploadFile/tcmetal/sysSPartWood/");
        files.setKey_value(newFiles.getUrl());
        mesPopStatusMapper.sysSPartWoodAdd(files);
    }

    public void sysSPartWoodAdd2(Files files, MultipartHttpServletRequest req) {
        files.setUser_code(getSessionData(req).getUser_code());
        mesPopStatusMapper.sysSPartWoodAdd2(files);
    }

    public RESTful popProdListGet(HttpServletRequest req, Page p) {
        List<POP_PLAN> rows = mesPopStatusMapper.popProdListGet(p);
        return getListData(rows, p);
    }

    public RESTful popProdAnalysisGet(HttpServletRequest req, Page p) {
        List<POP_PLAN> rows = mesPopStatusMapper.popProdAnalysisGet(p);
        return getListData(rows, p);
    }

    public RESTful popProdReport1Get(HttpServletRequest req, Page p) {
        List<POP_PLAN> rows = mesPopStatusMapper.popProdReport1Get(p);
        return getListData(rows, p);
    }

    public RESTful popSpectroGet(HttpServletRequest req, Page p) {

        List<POP_PLAN> rows = mesPopStatusMapper.popSpectroGet(p);
        return getListData(rows, p);
    }

    public RESTful sysProdHRGet(HttpServletRequest req, Page p) {
        List<POP_PROD_MHR> rows = mesPopStatusMapper.sysProdHRGet(p);
        return getListData(rows, p);
    }

    public RESTful sysProdSumGet(HttpServletRequest req, Page p) {
        List<POP_PLAN> rows = mesPopStatusMapper.sysProdSumGet(p);
        return getListData(rows, p);
    }


    public RESTful popProdList2Get(HttpServletRequest req, Page p) {
        List<POP_PLAN> rows = mesPopStatusMapper.popProdList2Get(p);
        return getListData(rows, p);
    }

    public RESTful popProdReportGet(HttpServletRequest req, Page p) {
        List<POP_PROD> rows = mesPopStatusMapper.popProdReportGet(p);
        return getListData(rows, p);
    }

    public RESTful popMonitoringGet(HttpServletRequest req, Page p) {
        List<POP_PLAN> rows = mesPopStatusMapper.popMonitoringGet(p);
        return getListData(rows, p);
    }

    public RESTful popLotTrackingGet(HttpServletRequest req, Page p) {
        List<POP_PLAN> rows = mesPopStatusMapper.popLotTrackingGet(p);
        return getListData(rows, p);
    }

    public Message sysProdHrAdd(HttpServletRequest req, POP_PROD_MHR ppm) {
        ppm.setUser_code(getSessionData(req).getUser_code());
        return mesPopStatusMapper.sysProdHrAdd(ppm);
    }

    public Message sysProdHrDel(HttpServletRequest req, POP_PROD_MHR ppm) {
        return mesPopStatusMapper.sysProdHrDel(ppm);
    }

    public RESTful popDownTimeGet(HttpServletRequest req, Page p) {
        List<POP_PROD> rows = mesPopStatusMapper.popDownTimeGet(p);
        return getListData(rows, p);
    }

    public Message popSpectroAdd(HttpServletRequest req, POP_PLAN pp) {
        pp.setUser_code(getSessionData(req).getUser_code());
        return mesPopStatusMapper.popSpectroAdd(pp); }

    public POP_PLAN popProdMeltGet(HttpServletRequest req, POP_PLAN pp) {
        POP_PLAN vo = new POP_PLAN();
        List<List<Object>> datas = mesPopStatusMapper.popProdMeltGet(pp);
        List<POP_PROD_MELT> dataset1 =  getDataset( datas , 0 );
        List<POP_PROD_MELT_SUB1> dataset2 =  getDataset( datas , 1 );
        List<POP_PROD_MELT_SUB2> dataset3 =  getDataset( datas , 2 );
        List<POP_PROD_MELT_SUB3> dataset4 =  getDataset( datas , 3 );

        vo.setPop_prod_melt(dataset1);
        vo.setPop_prod_melt_sub1(dataset2);
        vo.setPop_prod_melt_sub2(dataset3);
        vo.setPop_prod_melt_sub3(dataset4);
        return vo;
    }

    private <T> List<T> getDataset(List<List<Object>> datasets, int index){
        return (List<T>) datasets.get(index);
    }

    public Message sysProdHrDel2(HttpServletRequest req, POP_PLAN pp) {
        return mesPopStatusMapper.sysProdHrDel2(pp);
    }

    public RESTful popProdList2SubGet(Page p, POP_PLAN pp) {
        List<POP_PLAN> rows = mesPopStatusMapper.popProdList2SubGet(pp);
        return getListData(rows, p);
    }
}
