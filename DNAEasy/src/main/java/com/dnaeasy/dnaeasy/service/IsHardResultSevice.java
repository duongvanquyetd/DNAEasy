package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.HardResultCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.UpdatehardReusltRequest;
import com.dnaeasy.dnaeasy.dto.response.CanConfirmHardResultRespone;
import com.dnaeasy.dnaeasy.dto.response.HardResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.HardResultResponse;
import org.springframework.web.multipart.MultipartFile;

public interface IsHardResultSevice {

    HardResultCreateResponse CreateHardResult(HardResultCreateRequest request);
    HardResultResponse updateHardResult(UpdatehardReusltRequest request, MultipartFile file);
    CanConfirmHardResultRespone CanConfirm(Long hardResultId);

}
