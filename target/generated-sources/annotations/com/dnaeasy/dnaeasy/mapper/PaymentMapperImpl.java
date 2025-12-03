package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.PaymentRefundRequest;
import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.enity.Payment;
import com.dnaeasy.dnaeasy.enity.Person;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:21+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class PaymentMapperImpl implements PaymentMapper {

    @Override
    public PaymentResponse PaymentToPaymentResponse(Payment payment) {
        if ( payment == null ) {
            return null;
        }

        PaymentResponse paymentResponse = new PaymentResponse();

        paymentResponse.setStaffConfirmName( paymentStaffReceptionName( payment ) );
        paymentResponse.setPaymentId( payment.getPaymentId() );
        paymentResponse.setPaymentMethod( payment.getPaymentMethod() );
        paymentResponse.setPaymentStatus( payment.isPaymentStatus() );
        paymentResponse.setContenPayment( payment.getContenPayment() );
        paymentResponse.setPaymentAmount( payment.getPaymentAmount() );
        paymentResponse.setPaycode( payment.getPaycode() );
        paymentResponse.setPaymentDate( payment.getPaymentDate() );

        return paymentResponse;
    }

    @Override
    public Payment PaymentRefuntToPayment(PaymentRefundRequest request) {
        if ( request == null ) {
            return null;
        }

        Payment payment = new Payment();

        payment.setPaymentMethod( request.getPaymentMethod() );
        payment.setPaycode( request.getPaycode() );
        payment.setContenPayment( request.getContenPayment() );
        payment.setPaymentAmount( request.getPaymentAmount() );

        return payment;
    }

    private String paymentStaffReceptionName(Payment payment) {
        if ( payment == null ) {
            return null;
        }
        Person staffReception = payment.getStaffReception();
        if ( staffReception == null ) {
            return null;
        }
        String name = staffReception.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
