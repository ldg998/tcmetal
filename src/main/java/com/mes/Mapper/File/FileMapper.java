package com.mes.Mapper.File;

import com.mes.Common.DataTransferObject.Message;
import com.mes.Common.File.DTO.Files;
import org.springframework.stereotype.Repository;

@Repository
public interface FileMapper {
    Message setOneFile(Files files);

    Files FileDownloads(Files files);
}
