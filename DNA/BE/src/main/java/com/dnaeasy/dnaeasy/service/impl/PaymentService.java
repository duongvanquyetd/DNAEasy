package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.config.VnpayConfig;
import com.dnaeasy.dnaeasy.dto.request.*;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.dto.response.RevenueChartResponse;
import com.dnaeasy.dnaeasy.dto.response.StaticReponse;
import com.dnaeasy.dnaeasy.dto.response.VnpayResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.AppointmnentTracking;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enums.PaymentMehtod;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.mapper.PaymentMapper;
import com.dnaeasy.dnaeasy.mapper.SampleMapper;
import com.dnaeasy.dnaeasy.responsity.IsAppointmentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsPaymentResponsitory;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsPaymentService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import com.dnaeasy.dnaeasy.util.VnpayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaymentService implements IsPaymentService {
    @Autowired
    VnpayConfig vnpayConfig;
    @Autowired
    VnpayUtil vnpayUtil;
    @Autowired
    IsPaymentResponsitory isPaymentResponsitory;
    @Autowired
    IsAppointmentResponsitory isAppointmentResponsitory;
    @Autowired
    IsUserResponsity isUserResponsitory;
    @Autowired
    PaymentMapper paymentMapper;
    @Autowired
    CloudinaryUtil cloudinaryUtil;

    @Override

    public String paymentUrlVnpay(int appointmnetid, HttpServletRequest request) {
        Map<String, String> params = vnpayConfig.getVNPayConfig();
        Payment payment = isPaymentResponsitory.findByAppointmentIdAndExpenseIsFalse(appointmnetid);
        BigDecimal money = payment.getPaymentAmount().multiply(BigDecimal.valueOf(100));// mai mốt thay giá trị vào
        String value = String.valueOf(money);
        String val[] = value.split("\\.");

        String ID = UUID.randomUUID().toString();

        payment.setPaycode(ID);
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

        Payment payment = isPaymentResponsitory.findByAppointmentIdAndExpenseIsFalse(appointmentId);
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

        Payment payment = isPaymentResponsitory.findByAppointmentIdAndExpenseIsFalse(a.getAppointmentId());
        payment.setPaymentStatus(true);
        payment.setPaymentAmount(payment.getPaymentAmount().multiply(BigDecimal.valueOf(2)));
        if (!payment.getPaymentMethod().equals(resquest.getPaymentMehtod())) {
            if (payment.getPaymentMethod().equals(PaymentMehtod.Cash)) {
                payment.setPaymentMethod(PaymentMehtod.Cash_VNpay);
            } else {
                payment.setPaymentMethod(PaymentMehtod.VNPay_Cash);
            }
        }
        a.getPayment().add(payment);

        isPaymentResponsitory.save(payment);
        return paymentMapper.PaymentToPaymentResponse(payment);
    }

    @Override
    public String PayToviewResult(int appointmentId, HttpServletRequest request) {
        Appointment a = isPaymentResponsitory.findByAppointment_AppointmentId(appointmentId).getAppointment();
        Payment payment = isPaymentResponsitory.findByAppointmentIdAndExpenseIsFalse(a.getAppointmentId());
        if (payment.getContenPayment().contains("haft")) {
            a.getPayment().getFirst().setContenPayment(a.getPayment().getFirst().getContenPayment().replaceAll("haft", "full"));

        } else if (payment.getContenPayment().contains("againt")) {
            payment.setContenPayment(payment.getContenPayment().replaceAll("againt", "full"));
        }
        payment.setAppointment(a);
        a.getPayment().add(payment);
        isPaymentResponsitory.save(payment);
        return paymentUrlVnpay(a.getAppointmentId(), request);
    }

    @Override
    public String PayAgaint(int appointmentId, HttpServletRequest request) {
        Appointment a = isPaymentResponsitory.findByAppointment_AppointmentId(appointmentId).getAppointment();

        a.getPayment().getFirst().setContenPayment(a.getPayment().getFirst().getContenPayment().replaceAll("haft", "againt"));

        isPaymentResponsitory.save(a.getPayment().getFirst());
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
                a.setCurentStatusAppointment("PAID_" + payment.getPaymentMethod());

            } else {

                response.setSuccess(true);
                response.setAppointmentId(a.getAppointmentId());
                response.setPaymentfor("view");

            }

            payment.setAppointment(a);
            isPaymentResponsitory.save(payment);

        } else {
            response.setSuccess(false);
            response.setAppointmentId(a.getAppointmentId());
        }

        return response;
    }

    @Override

    public BigDecimal totalRevenueToday() {
        BigDecimal revenue = isPaymentResponsitory.getTodayRevenueToday(LocalDateTime.now().minusDays(1),LocalDateTime.now());
        return revenue != null ? revenue : BigDecimal.ZERO;
    }
    public Double findAllByPaymentYesterday() {
        LocalDateTime start = LocalDateTime.now().minusDays(1).toLocalDate().atStartOfDay();
        LocalDateTime end = LocalDateTime.now().toLocalDate().atStartOfDay().minusNanos(1);

        List<Payment> payments = isPaymentResponsitory.findAllByPaymentStatusIsTrueAndPaymentDateIsBetween(start, end);

        return payments.stream().mapToDouble(p-> p.getPaymentAmount().doubleValue()).sum();

  }

    @Override
    public List<RevenueChartResponse> getRevenueStats(RevenueStatsRequest request) {
        List<RevenueChartResponse> revenueChartResponses = new ArrayList<>();

        if(request.getType() != null && request.getType().equals("year")) {

            int year = request.getTo().getYear();
            for (int i = 1; i <= 12; i++) {
                LocalDateTime star = LocalDate.of(year, i, 1).atStartOfDay();
                LocalDateTime end = LocalDate.of(year, i, 1).with(TemporalAdjusters.lastDayOfMonth()).atTime(23, 59, 59);
                RevenueChartResponse response =  new RevenueChartResponse();

                BigDecimal revenua = isPaymentResponsitory.getRevenueByPeriod(star,end,false);
                BigDecimal refund = isPaymentResponsitory.getRevenueByPeriod(star,end,true);
                response.setRevenue(revenua);
                response.setRefund(refund);
                response.setDate(LocalDate.from(star));

                revenueChartResponses.add(response);
            }
            return revenueChartResponses;


        }
        LocalDateTime star = request.getFrom().atStartOfDay();
        LocalDateTime end = request.getTo().atTime(23, 59, 59);
        LocalDateTime current = star.plusDays(1);
        while(star.isBefore(end)) {
            RevenueChartResponse response =  new RevenueChartResponse();
            BigDecimal revenua = isPaymentResponsitory.getRevenueByPeriod(star,end,false);
            BigDecimal refund = isPaymentResponsitory.getRevenueByPeriod(star,end,true);
            response.setRevenue(revenua);
            response.setRefund(refund);
            response.setDate(LocalDate.from(star));
            revenueChartResponses.add(response);
            star = star.plusDays(1);
            current = star.plusDays(1);
        }

        return revenueChartResponses;
    }


    @Override
    public PaymentResponse CreatePaymentRefund(PaymentRefundRequest request, MultipartFile file) {

        List<Payment> p = isPaymentResponsitory.findALLByPaycode(request.getPaycode());

        if(p != null && p.size() > 0) {
            throw  new BadRequestException("Transaction code "+request.getPaycode()+" already exists");
        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Person person = isUserResponsitory.findByUsername(username);
        Appointment a = isAppointmentResponsitory.findById(request.getAppointmentId()).orElseThrow(() -> new RuntimeException("appointmentId not found"));
        Payment payment = paymentMapper.PaymentRefuntToPayment(request);
        payment.setStaffReception(person);
        payment.setExpense(true); // chi tien ra
        payment.setPaymentDate(LocalDateTime.now());

        person.getPaymentList().add(payment);
        AppointmnentTracking appointmnentTracking = new AppointmnentTracking();
        appointmnentTracking.setStatusName("Refund_" + payment.getPaymentMethod() + "(" + payment.getPaymentAmount() + ")");
        try {
            if(file != null) {
                appointmnentTracking.setImageUrl(cloudinaryUtil.uploadImage(file));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        appointmnentTracking.setStatusDate(LocalDateTime.now());
        appointmnentTracking.setAppointment(a);
        a.setCurentStatusAppointment("REFUNDED");
        a.getAppointmnentTrackings().add(appointmnentTracking);
        a.getPayment().add(payment);
        payment.setAppointment(a);
        isAppointmentResponsitory.save(a);
        return paymentMapper.PaymentToPaymentResponse(a.getPayment().getLast());
    }



    @Override
    public Page<PaymentResponse> getPaymentList(PaymentListRequest request,Pageable pageable) {

        Page<Payment> list = isPaymentResponsitory.findByTypeAndDate(request.getStartDate().atStartOfDay(),
                request.getEndDate().atTime(23,59)
                ,request.isStatus(),pageable);
        return  list.map(paymentMapper::PaymentToPaymentResponse);
    }

    @Override
    public StaticReponse getStaticByDate(StaticRequest request) {

        StaticReponse staticReponse = new StaticReponse();
         BigDecimal revenua = isPaymentResponsitory.getRevenueByPeriod(request.getStartDate().atStartOfDay(),request.getEndDate().atTime(23,59),false);
        BigDecimal refund = isPaymentResponsitory.getRevenueByPeriod(request.getStartDate().atStartOfDay(),request.getEndDate().atTime(23,59),true);
        staticReponse.setRevenue(revenua);
        staticReponse.setExpense(refund);

        return staticReponse;
    }

}
