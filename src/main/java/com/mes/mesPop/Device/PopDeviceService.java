package com.mes.mesPop.Device;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.Function.ReturnFunction;
import com.mes.Mapper.mesPop.Device.MesPopDeviceMapper;
import com.mes.mesPop.Device.DTO.POP_PC_CD;
import com.mes.mesPop.Standard.DTO.POP_TERMINAL_CD;
import com.mes.mesPop.Standard.DTO.POP_TERMINAL_SUB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class PopDeviceService extends ReturnFunction {

    @Autowired
    private MesPopDeviceMapper mesPopDeviceMapper;

    public RESTful popPCGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_PC_CD> rows = mesPopDeviceMapper.popPCGet(p);
        return getListData(rows, p);
    }

    public Message popPCAdd(HttpServletRequest req, POP_PC_CD ppc) {
        ppc.setSite_code(getSessionData(req).getSite_code());
        ppc.setUser_code(getSessionData(req).getUser_code());
        return mesPopDeviceMapper.popPCAdd(ppc);
    }

    public Message popPCDel(HttpServletRequest req, POP_PC_CD ppc) {
        ppc.setSite_code(getSessionData(req).getSite_code());
        return mesPopDeviceMapper.popPCDel(ppc);
    }

    public POP_PC_CD popPCOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return  mesPopDeviceMapper.popPCOneGet(p);
    }

    public RESTful popTerminalGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<POP_TERMINAL_CD> rows = mesPopDeviceMapper.popTerminalGet(p);
        return getListData(rows, p);
    }

    public POP_TERMINAL_CD popTerminalOneGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return mesPopDeviceMapper.popTerminalOneGet(p);
    }

    public Message popTerminalAdd(HttpServletRequest req, POP_TERMINAL_CD ptc) {
        ptc.setSite_code(getSessionData(req).getSite_code());
        ptc.setUser_code(getSessionData(req).getUser_code());
        return mesPopDeviceMapper.popTerminalAdd(ptc);
    }

    public Message popTerminalDel(HttpServletRequest req, POP_TERMINAL_CD ptc) {
        ptc.setSite_code(getSessionData(req).getSite_code());
        return mesPopDeviceMapper.popTerminalDel(ptc);
    }

    public List<POP_TERMINAL_SUB> popTerminalSubGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return mesPopDeviceMapper.popTerminalSubGet(p);

    }

    public Message popTerminalSubAdd(HttpServletRequest req, POP_TERMINAL_SUB pts) {
        pts.setSite_code(getSessionData(req).getSite_code());
        return mesPopDeviceMapper.popTerminalSubAdd(pts);
    }

    public Message popTerminalSubDel(HttpServletRequest req, POP_TERMINAL_SUB pts) {
        pts.setSite_code(getSessionData(req).getSite_code());
        return mesPopDeviceMapper.popTerminalSubDel(pts);
    }
}
