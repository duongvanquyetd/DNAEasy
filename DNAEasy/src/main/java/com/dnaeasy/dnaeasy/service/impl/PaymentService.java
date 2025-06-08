package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.config.VnpayConfig;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsPaymentResponsitory;
import com.dnaeasy.dnaeasy.service.IsAppointmentService;
import com.dnaeasy.dnaeasy.service.IsPaymentService;
import com.dnaeasy.dnaeasy.util.VnpayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class PaymentService implements IsPaymentService {
    @Autowired
    VnpayConfig vnpayConfig;
    @Autowired
    VnpayUtil vnpayUtil;
    @Autowired
    HttpServletRequest request;
    @Autowired
    IsPaymentResponsitory isPaymentResponsitory;
    @Autowired
    IsAppointmentResponsitory isAppointmentResponsitory;

    public String paymentUrl(Payment payment) {
        Map<String, String> params = vnpayConfig.getVNPayConfig();

        BigDecimal money = payment.getPaymentAmount().multiply(BigDecimal.valueOf(100));// mai mốt thay giá trị vào

        String value = String.valueOf(money);
        String val[] = value.split("\\.");
        if (val.length == 2) {
            value = val[0];
        }
        String id = String.valueOf(payment.getAppointment().getAppointmentId())+"_"+ payment.getContenPayment().substring(4,8);
        System.out.println(value);
        params.put("vnp_TxnRef", id);
        params.put("vnp_Amount", value);
        params.put("vnp_IpAddr", request.getRemoteAddr());
        params.put("vnp_OrderInfo", payment.getContenPayment());
        String query = vnpayUtil.dataToappendUrl(params);
        String hasdata = vnpayUtil.hmacSHA512(vnpayConfig.getSecretKey(), query);

        //  String hashdata = vnpayUtil.hmacSHA512(vnpayConfig.getSecretKey(), hasdata.toString());

        String payurl = vnpayConfig.getVnp_PayUrl() + query + "&vnp_SecureHash=" + hasdata;

        return payurl;
    }

    public Boolean checkPayment() {


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
            return true;
        }
        return false;


    }

    public boolean StatusPayment(int appointmentId) {

        Payment payment = isPaymentResponsitory.getPaymentByAppointment_AppointmentId(appointmentId);
        return payment.isPaymentStatus();

    }


    @Override
    public void UpdateStatus(int appointmentId) {
        Appointment a = isAppointmentResponsitory.findById(appointmentId).orElseThrow(() -> new ResourceNotFound("Not have an appointment with id " + appointmentId));
        a.getPayment().setPaymentStatus(true);
        a.getPayment().setPaymentAmount(a.getPayment().getPaymentAmount().multiply(BigDecimal.valueOf(2)));
        isAppointmentResponsitory.save(a);

    }

    @Override
    public String PayToviewResult(int appointmentId) {
        Appointment a = isAppointmentResponsitory.findById(appointmentId).orElseThrow(() -> new ResourceNotFound("Not have an appointment with id " + appointmentId));

        a.getPayment().setContenPayment(a.getPayment().getContenPayment().replaceAll("haft","full"));

        isAppointmentResponsitory.save(a);
        return paymentUrl(a.getPayment()) ;
    }
}
