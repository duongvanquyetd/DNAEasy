package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.config.VnpayConfig;
import com.dnaeasy.dnaeasy.dto.request.PaymentUpdateResquest;
import com.dnaeasy.dnaeasy.dto.request.SampleCreateRequest;
import com.dnaeasy.dnaeasy.dto.request.StatusUpdateAppointment;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.dto.response.VnpayResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import com.dnaeasy.dnaeasy.enums.SampleMethod;
import com.dnaeasy.dnaeasy.exception.ResourceNotFound;
import com.dnaeasy.dnaeasy.mapper.PaymentMapper;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsPaymentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsAppointmentService;
import com.dnaeasy.dnaeasy.service.IsPaymentService;
import com.dnaeasy.dnaeasy.service.IsUserService;
import com.dnaeasy.dnaeasy.util.VnpayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaymentService implements IsPaymentService {
    @Autowired
    VnpayConfig vnpayConfig;
    @Autowired
    VnpayUtil vnpayUtil;
    @Autowired
    IsPaymentResponsitory isPaymentResponsitory;
    //    @Autowired
//    IsAppointmentResponsitory isAppointmentResponsitory;
    @Autowired
    IsUserResponsity isUserResponsitory;
    @Autowired
    PaymentMapper paymentMapper;

    @Override

    public String paymentUrlVnpay(int appointmnetid, HttpServletRequest request) {
        Map<String, String> params = vnpayConfig.getVNPayConfig();
        Payment payment = isPaymentResponsitory.findByAppointment_AppointmentId(appointmnetid);
        BigDecimal money = payment.getPaymentAmount().multiply(BigDecimal.valueOf(100));// mai mốt thay giá trị vào
        String value = String.valueOf(money);
        String val[] = value.split("\\.");

        String ID = UUID.randomUUID().toString();

        payment.setVnpay_code(ID);
        isPaymentResponsitory.save(payment);
        if (val.length == 2) {
            value = val[0];
        }
        //   String id = String.valueOf(payment.getAppointment().getAppointmentId()) + "_" + payment.getContenPayment().substring(4, 8);

        params.put("vnp_TxnRef", ID);
        params.put("vnp_Amount", value);
        params.put("vnp_IpAddr", request.getRemoteAddr());
        params.put("vnp_OrderInfo", payment.getContenPayment());
        String query = vnpayUtil.dataToappendUrl(params);
        String hasdata = vnpayUtil.hmacSHA512(vnpayConfig.getSecretKey(), query);
        String payurl = vnpayConfig.getVnp_PayUrl() + query + "&vnp_SecureHash=" + hasdata;
        System.out.println("dev tools");
        return payurl;
    }

    public Boolean checkPayment(HttpServletRequest request) {


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
    public PaymentResponse UpdateStatusToView(PaymentUpdateResquest resquest) {
        Appointment a = isPaymentResponsitory.findByAppointment_AppointmentId(resquest.getAppointmentId()).getAppointment();
        AppointmnentTracking appointmnentTracking = new AppointmnentTracking();
        appointmnentTracking.setAppointment(a);
        appointmnentTracking.setStatusDate(LocalDateTime.now());
        appointmnentTracking.setStatusName("PAID_" + resquest.getPaymentMehtod());
        a.getAppointmnentTrackings().add(appointmnentTracking);

        Payment payment = a.getPayment();
        payment.setPaymentStatus(true);
        payment.setPaymentAmount(a.getPayment().getPaymentAmount().multiply(BigDecimal.valueOf(2)));
        if (!payment.getPaymentMethod().equals(resquest.getPaymentMehtod())) {
            if (payment.getPaymentMethod().equals(PaymentMehtod.Cash)) {
                payment.setPaymentMethod(PaymentMehtod.Cash_VNpay);
            } else {
                payment.setPaymentMethod(PaymentMehtod.VNPay_Cash);
            }
        }
        a.setPayment(payment);

        isPaymentResponsitory.save(payment);
        return paymentMapper.PaymentToPaymentResponse(a.getPayment());
    }

    @Override
    public String PayToviewResult(int appointmentId, HttpServletRequest request) {
        Appointment a = isPaymentResponsitory.findByAppointment_AppointmentId(appointmentId).getAppointment();
        if (a.getPayment().getContenPayment().contains("haft")) {
            a.getPayment().setContenPayment(a.getPayment().getContenPayment().replaceAll("haft", "full"));

        } else if (a.getPayment().getContenPayment().contains("againt")) {
            a.getPayment().setContenPayment(a.getPayment().getContenPayment().replaceAll("againt", "full"));
        }


        isPaymentResponsitory.save(a.getPayment());
        return paymentUrlVnpay(a.getAppointmentId(), request);
    }

    @Override
    public String PayAgaint(int appointmentId, HttpServletRequest request) {
        Appointment a = isPaymentResponsitory.findByAppointment_AppointmentId(appointmentId).getAppointment();

        a.getPayment().setContenPayment(a.getPayment().getContenPayment().replaceAll("haft", "againt"));

        isPaymentResponsitory.save(a.getPayment());
        return paymentUrlVnpay(a.getAppointmentId(), request);
    }

    @Override
    public void ConfirmPaidCash(int appointmentId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = isUserResponsitory.findByUsername(username);
        Payment payment = isPaymentResponsitory.getPaymentByAppointment_AppointmentId(appointmentId);
        payment.setStaffReception(p);

        isUserResponsitory.save(p);
    }

    @Override
    public VnpayResponse UrlReturnFE(HttpServletRequest request) {

        String vn_code = request.getParameter("vnp_TxnRef");
        System.out.println(vn_code);
        Payment payment = isPaymentResponsitory.findAllByVnpay_codeEqualsIgnoreCase(vn_code);

        Appointment a = payment.getAppointment();
        VnpayResponse response = new VnpayResponse();
        if (checkPayment(request) && request.getParameter("vnp_ResponseCode").equals("00")) {


            System.out.println(a.getService() + "appointment");

            AppointmnentTracking appointmnentTracking = new AppointmnentTracking();
            appointmnentTracking.setAppointment(a);
            appointmnentTracking.setStatusDate(LocalDateTime.now());
            appointmnentTracking.setStatusName("PAID_" + payment.getPaymentMethod());
            a.getAppointmnentTrackings().add(appointmnentTracking);



            if (a.getCurentStatusAppointment().equalsIgnoreCase("WAITING FOR PAYMENT")) {


                response.setSuccess(true);
                response.setAppointmentId(a.getAppointmentId());
                response.setPaymentfor("pay");

            } else {

                response.setSuccess(true);
                response.setAppointmentId(a.getAppointmentId());
                response.setPaymentfor("view");

            }
            a.setCurentStatusAppointment("PAID_" + payment.getPaymentMethod());
            payment.setAppointment(a);
            isPaymentResponsitory.save(payment);

        }else
        {
            response.setSuccess(false);
            response.setAppointmentId(a.getAppointmentId());
        }




        return response;
    }

    @Override
    public BigDecimal totalRevenueToday() {
        BigDecimal revenue= isPaymentResponsitory.getTodayRevenueToday();
        return revenue != null ? revenue : BigDecimal.ZERO;
    }


}
