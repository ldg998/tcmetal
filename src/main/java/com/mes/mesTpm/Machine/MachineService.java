package com.mes.mesTpm.Machine;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.DataTransferObject.RESTful;
import com.mes.Common.File.Function.UploadFunction;
import com.mes.Mapper.mesTpm.Machine.MachineMapper;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_CD;
import com.mes.mesTpm.Machine.DTO.TPM_MACHINE_PART_CD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@Service
public class MachineService   extends UploadFunction {
    @Autowired
    private MachineMapper machineMapper;

    public RESTful tpmMCGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        List<TPM_MACHINE_CD> rows = machineMapper.tpmMCGet(p);
        return getListData(rows , p);
    }

    public Message tpmMCAdd(MultipartHttpServletRequest req, TPM_MACHINE_CD tmc) {
        tmc.setSite_code(getSessionData(req).getSite_code());
        tmc.setUser_code(getSessionData(req).getUser_code());

        tmc.setInstall_date(tmc.getInstall_date().replaceAll("-", ""));

        int check1 = Integer.parseInt(req.getParameter("check1"));
        int check2 = Integer.parseInt(req.getParameter("check2"));
        int check3 = Integer.parseInt(req.getParameter("check3"));

        Message m = machineMapper.tpmMCAdd(tmc);

        File dir = new File("D:/UploadFile/tcmetal/tpmMC");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        String page_name = "tpmMC";
        if (tmc.getKeyword().equals("I")) {


            if (m.getResult().equals("OK")){
                if (check1 == 1) {
                    tmc.setImage1(tpmMCFileAdd(page_name,tmc.getMachine_code(), req, 1));
                } else {
                    tmc.setImage1("");
                }

                if (check2 == 1) {
                    tmc.setImage2(tpmMCFileAdd(page_name,tmc.getMachine_code(), req, 2));
                } else {
                    tmc.setImage2("");
                }

                if (check3 == 1) {
                    tmc.setImage3(tpmMCFileAdd(page_name,tmc.getMachine_code(), req, 3));
                } else {
                    tmc.setImage3("");
                }

            } else {
                return m;
            }
        }else {
            if (m.getResult().equals("OK")) {
                TPM_MACHINE_CD tmc2 = machineMapper.tpmMCOneGet(tmc);
                TPM_MACHINE_CD tmc3 = new TPM_MACHINE_CD();
                File file = null;

                if (check1 == 1) {
                    tmc3.setImage1(tpmMCFileAdd(page_name,tmc2.getMachine_code(), req, 1));
                    // 삭제 메소드
                    file = new File("D:/UploadFile/tcmetal/tpmMC/"+tmc2.getImage1());
                    file.delete();
                }

                if (check2 == 1) {
                    tmc3.setImage2(tpmMCFileAdd(page_name,tmc2.getMachine_code(), req, 2));
                    // 삭제 메소드
                    file = new File("D:/UploadFile/tcmetal/tpmMC/"+tmc2.getImage2());
                    file.delete();
                }

                if (check3 == 1) {
                    tmc3.setImage3(tpmMCFileAdd(page_name,tmc2.getMachine_code(), req, 3));
                    // 삭제 메소드
                    file = new File("D:/UploadFile/tcmetal/tpmMC/"+tmc2.getImage3());
                    file.delete();
                }
                int delCheck1 = Integer.parseInt(req.getParameter("delCheck1"));
                int delCheck2 = Integer.parseInt(req.getParameter("delCheck2"));
                int delCheck3 = Integer.parseInt(req.getParameter("delCheck3"));

                // 삭제 키워드 메소드
                if (delCheck1 == 1) {
                    file = new File("D:/UploadFile/tcmetal/tpmMC/"+tmc2.getImage1());
                    file.delete();
                    tmc2.setImage1("");
                }
                if (delCheck2 == 1) {
                    file = new File("D:/UploadFile/tcmetal/tpmMC/"+tmc2.getImage2());
                    file.delete();
                    tmc2.setImage2("");
                }
                if (delCheck3 == 1) {
                    file = new File("D:/UploadFile/tcmetal/tpmMC/"+tmc2.getImage3());
                    file.delete();
                    tmc2.setImage3("");
                }


                if (check1 == 1) {
                    tmc2.setImage1(tmc3.getImage1());
                }
                if (check2 == 1) {
                    tmc2.setImage2(tmc3.getImage2());
                }
                if (check3 == 1) {
                    tmc2.setImage3(tmc3.getImage3());
                }
                return machineMapper.tpmMCFileAdd(tmc2);
            }else {
                return m;
            }
        }
        return machineMapper.tpmMCFileAdd(tmc);
    }

    public TPM_MACHINE_CD tpmMCOneGet(HttpServletRequest req, TPM_MACHINE_CD tmc) {
        tmc.setSite_code(getSessionData(req).getSite_code());
        return machineMapper.tpmMCOneGet(tmc);
    }

    public Message tpmMCDel(HttpServletRequest req, TPM_MACHINE_CD tmc) {
        tmc.setSite_code(getSessionData(req).getSite_code());

        List<TPM_MACHINE_CD> tmcLsit = machineMapper.tpmMCFileGet(tmc);

        File file = null;

        for (TPM_MACHINE_CD tm :tmcLsit) {
            if (!tm.getImage1().equals("")){
                file = new File("D:/UploadFile/tcmetal/tpmMC/"+tm.getImage1());
                file.delete();
            }
            if (!tm.getImage2().equals("")){
                file = new File("D:/UploadFile/tcmetal/tpmMC/"+tm.getImage2());
                file.delete();
            }
            if (!tm.getImage3().equals("")){
                file = new File("D:/UploadFile/tcmetal/tpmMC/"+tm.getImage3());
                file.delete();
            }
        }

        return machineMapper.tpmMCDel(tmc);
    }

    public List<TPM_MACHINE_PART_CD> tpmMCPartAllGet(HttpServletRequest req, Page p) {
        p.setSite_code(getSessionData(req).getSite_code());
        return machineMapper.tpmMCPartAllGet(p);
    }

    public Message tpmMCPartAdd(HttpServletRequest req, TPM_MACHINE_PART_CD tmpc) {
        tmpc.setSite_code(getSessionData(req).getSite_code());
        tmpc.setUser_code(getSessionData(req).getUser_code());
        return machineMapper.tpmMCPartAdd(tmpc);
    }

    public Message tpmMCPartDel(HttpServletRequest req, TPM_MACHINE_PART_CD tmpc) {
        tmpc.setSite_code(getSessionData(req).getSite_code());
        return machineMapper.tpmMCPartDel(tmpc);
    }

    public TPM_MACHINE_PART_CD tpmMCPartOneGet(HttpServletRequest req, TPM_MACHINE_PART_CD tmpc) {
        tmpc.setSite_code(getSessionData(req).getSite_code());
        return machineMapper.tpmMCPartOneGet(tmpc);
    }
}
