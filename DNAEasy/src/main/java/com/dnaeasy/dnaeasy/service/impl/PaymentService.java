package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.config.VnpayConfig;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.util.VnpayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class PaymentService {
    @Autowired
    VnpayConfig vnpayConfig;
    @Autowired
    VnpayUtil vnpayUtil;
    @Autowired
    HttpServletRequest request;

    public String paymentUrl(String serviceName, long amount) {
        Map<String, String> params = vnpayConfig.getVNPayConfig();
        long money = amount * 100;// mai mốt thay giá trị vào
        params.put("vnp_Amount", String.valueOf(money));
        params.put("vnp_IpAddr", request.getRemoteAddr());
        params.put("vnp_OrderInfo", "Thanh toan don hang:" + serviceName);
        String query = vnpayUtil.dataToappendUrl(params);
        String hasdata = vnpayUtil.hmacSHA512(vnpayConfig.getSecretKey(), query);

        //  String hashdata = vnpayUtil.hmacSHA512(vnpayConfig.getSecretKey(), hasdata.toString());

        String payurl = vnpayConfig.getVnp_PayUrl() + query + "&vnp_SecureHash=" + hasdata;

        return payurl;
    }

    public String checkPayment() {


        Map<String, String> params = new HashMap<>();
        List<String> paymentUrls = Collections.list(request.getParameterNames());
        for (String paymentUrl : paymentUrls) {
            if (paymentUrl.startsWith("vnp_")) {
                params.put(paymentUrl, request.getParameter(paymentUrl));
            }
        }
        String hasdata = params.remove("vnp_SecureHash");
        String query = vnpayUtil.dataToappendUrl(params);
        String hasdataRequest = vnpayUtil.hmacSHA512(vnpayConfig.getSecretKey(), query);

        System.out.println(hasdata);
        System.out.println(hasdataRequest);
        if (hasdataRequest.equals(hasdata)) {
            return "success";
        }
        throw new RuntimeException();


    }


}
