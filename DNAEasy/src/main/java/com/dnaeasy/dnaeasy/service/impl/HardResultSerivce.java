package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.HardResultCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.UpdatehardReusltRequest;
import com.dnaeasy.dnaeasy.dto.response.CanConfirmHardResultRespone;
import com.dnaeasy.dnaeasy.dto.response.HardResultCreateResponse;
import com.dnaeasy.dnaeasy.dto.response.HardResultResponse;
import com.dnaeasy.dnaeasy.enity.*;
import com.dnaeasy.dnaeasy.mapper.HardResultMapper;
import com.dnaeasy.dnaeasy.responsity.IsHardReusltRepo;
import com.dnaeasy.dnaeasy.responsity.IsProcessShipResult;
import com.dnaeasy.dnaeasy.responsity.IsResultResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsHardResultSevice;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
public class HardResultSerivce implements IsHardResultSevice {
    @Autowired
    IsHardReusltRepo isHardReusltRepo;
    @Autowired
    HardResultMapper hardResultMapper;
    @Autowired
    IsResultResponsitory resultResponsitory;
    @Autowired
    CloudinaryUtil cloudinaryUtil;
   @Autowired
   IsProcessShipResult isprocessShipResult;
   @Autowired
    IsUserResponsity isuserResponsity;

    @Override
    public HardResultCreateResponse CreateHardResult(HardResultCreateRequest request) {

        HardResult hs = hardResultMapper.hardCreatetoHardResult(request);

        for(Integer i : request.getResultid())
        {
            Result r  = resultResponsitory.findResultsByResultId(i);
            r.setHardresult(hs);
            hs.getListResult().add(r);
        }

        return hardResultMapper.hardCreatetoHardResultCreateResponse(isHardReusltRepo.save(hs));
    }

    @Override
    public HardResultResponse updateHardResult(UpdatehardReusltRequest request, MultipartFile file) {

        HardResult hs = isHardReusltRepo.findById(request.getHardresultID()).orElseThrow(()->new RuntimeException("Hard Result Not Found"));

        HardResultTracking hrt = new HardResultTracking();
        hrt.setStatusName(request.getStatusName());
        hrt.setTrackingdate(LocalDateTime.now());

        try
        {
            if(file != null)
            {
                hrt.setImgUrl(cloudinaryUtil.uploadImage(file));
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        hrt.setHardresult(hs);
        hs.setCurentStatus(request.getStatusName());
        hs.getListTracking().add(hrt);

        return hardResultMapper.hardUpdatetoHardResult(isHardReusltRepo.save(hs));
    }

    @Override
    public CanConfirmHardResultRespone CanConfirm(Long hardResultId) {
       HardResult hs = isHardReusltRepo.findById(hardResultId).orElseThrow(()->new RuntimeException("Hard Result Not Found"));
       CanConfirmHardResultRespone canCf = new CanConfirmHardResultRespone();
       String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isuserResponsity.findByUsername(username);
        ProcessShipResult psr = null;
       if(hs.getCurentStatus() == null)
       {
            psr = isprocessShipResult.findALlByTypeAndOrderProcess(hs.getType(),1);


       }else {
           ProcessShipResult order = isprocessShipResult.findALlByTypeAndStatusName(hs.getType(),hs.getCurentStatus());
            psr = isprocessShipResult.findALlByTypeAndOrderProcess(hs.getType(),order.getOrderProcess()+1);

       }
        if(psr != null)
        {
            canCf.setNextStatus(psr.getStatusName());
            if(psr.getPermision().equals(p.getRolename()))
            {
               canCf.setCanConfirmHardResult(true);

            }
            else {
                canCf.setCanConfirmHardResult(false);
            }

        }

        return canCf;
    }
}
