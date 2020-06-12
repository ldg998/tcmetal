package com.mes.Mapper.Auth;

import com.mes.Common.Auth.Auth;
import com.mes.Common.DataTransferObject.Page;
import com.mes.Common.Interceptor.Session;
import com.mes.Common.Various.DTO.SYS_MENU_FAVORITES_CD;
import com.mes.mesManager.Authority.DTO.SYSAuthProgram;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AuthMapper {

    List<Auth> authSubSelect(Session session);
    SYSAuthProgram menuAuth(Page p);
    List<Auth> authMainSelect(Session session);

    List<?> menuFavoritesGet(Session session);

    int menuFavoritesCheck(SYS_MENU_FAVORITES_CD smfc);
}
