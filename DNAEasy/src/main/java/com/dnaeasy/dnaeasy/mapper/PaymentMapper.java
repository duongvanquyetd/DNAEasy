package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.response.PaymentResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "staffConfirmName", source = "staffReception.name")
    PaymentResponse  PaymentToPaymentResponse(Payment payment);
}
