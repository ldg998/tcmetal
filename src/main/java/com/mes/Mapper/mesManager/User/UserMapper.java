package com.mes.Mapper.mesManager.User;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.Interceptor.Session;
import com.mes.mesManager.User.DTO.SYSDept;
import com.mes.mesManager.User.DTO.SYSUser;
import com.mes.mesManager.User.DTO.SYSUserSupp;
import com.mes.mesManager.User.DTO.SYS_USER_LOG_CD;
import org.springframework.stereotype.Repository;


import java.util.List;
@Repository
public interface UserMapper {
    Session loginAction(Session session);
    List<SYSDept> sysDeptGet(Page p);
    Message sysDeptAdd(SYSDept sdv);
    List<SYSUser> sysUserGet(Page p);
    List<SYSDept> sysDeptAllGet(Page p);
    Message sysUserAdd(SYSUser suv);
    List<SYSUserSupp> sysUserSuppGet(Page p);
    Message sysUserSuppAdd(SYSUserSupp susv);
    Message sysUserDelete(Page p);
    Message sysDeptDelete(Page p);
    Message sysUserSuppDelete(Page p);
    SYSUser sysUserOneGet(SYSUser su);

    SYSDept sysDeptOneGet(Page p);

    SYSUserSupp sysUserSuppOneGet(Page p);

    int userInformationChange(SYSUser u);

    int userInformationCheck(SYSUser u);

    Message sysUserPwdReset(SYSUser su);

    List<SYSDept> sysDeptAllGet2(Page p);

    List<SYSUser> sysUserAllGet(Page p);

    List<SYS_USER_LOG_CD> sysUserLogGet(Page p);
}
