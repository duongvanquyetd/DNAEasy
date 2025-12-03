package com.dnaeasy.dnaeasy.mapper;

import com.dnaeasy.dnaeasy.dto.request.AppointmentCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AppointmentAssingResponse;
import com.dnaeasy.dnaeasy.dto.response.AppointmentResponse;
import com.dnaeasy.dnaeasy.enity.Appointment;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enity.Service;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T20:07:21+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.7 (Microsoft)"
)
@Component
public class AppointmentMapperImpl implements AppointmentMapper {

    @Override
    public Appointment AppointmentCreateRequestToAppointment(AppointmentCreateRequest AppointmentCreateRequest) {
        if ( AppointmentCreateRequest == null ) {
            return null;
        }

        Appointment appointment = new Appointment();

        appointment.setLocation( AppointmentCreateRequest.getLocation() );
        appointment.setDateCollect( AppointmentCreateRequest.getDateCollect() );
        appointment.setNote( AppointmentCreateRequest.getNote() );
        appointment.setTypeCollect( AppointmentCreateRequest.getTypeCollect() );
        appointment.setPhoneAppointment( AppointmentCreateRequest.getPhoneAppointment() );
        appointment.setEmailAppointment( AppointmentCreateRequest.getEmailAppointment() );

        return appointment;
    }

    @Override
    public AppointmentResponse AppointmentCreateResponse(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        AppointmentResponse appointmentResponse = new AppointmentResponse();

        appointmentResponse.setServiceName( appointmentServiceServiceName( appointment ) );
        appointmentResponse.setStaffName( appointmentStaffName( appointment ) );
        appointmentResponse.setCustomerName( appointmentCustomerName( appointment ) );
        appointmentResponse.setTypeService( appointmentServiceTypeService( appointment ) );
        appointmentResponse.setServiceId( appointmentServiceServiceId( appointment ) );
        appointmentResponse.setTotalAmount( appointmentServiceServicePrice( appointment ) );
        appointmentResponse.setAppointmentId( appointment.getAppointmentId() );
        appointmentResponse.setLocation( appointment.getLocation() );
        appointmentResponse.setDateCollect( appointment.getDateCollect() );
        appointmentResponse.setNote( appointment.getNote() );
        appointmentResponse.setTypeCollect( appointment.getTypeCollect() );
        appointmentResponse.setCurentStatusAppointment( appointment.getCurentStatusAppointment() );
        appointmentResponse.setPhoneAppointment( appointment.getPhoneAppointment() );
        appointmentResponse.setEmailAppointment( appointment.getEmailAppointment() );
        appointmentResponse.setCreatedate( appointment.getCreatedate() );

        appointmentResponse.setPaymentMethod( paymentMehtod(appointment) );
        appointmentResponse.setTracking( AppointmentTrackingToList(appointment) );
        appointmentResponse.setPaymentAmount( paymentAmount(appointment) );
        appointmentResponse.setPaymentStatus( paymentStatus(appointment) );

        return appointmentResponse;
    }

    @Override
    public AppointmentAssingResponse ApointmenetToAppoinAssingResponse(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        AppointmentAssingResponse appointmentAssingResponse = new AppointmentAssingResponse();

        appointmentAssingResponse.setServiceName( appointmentServiceServiceName( appointment ) );
        appointmentAssingResponse.setTypeService( appointmentServiceTypeService( appointment ) );
        appointmentAssingResponse.setLocation( appointment.getLocation() );
        appointmentAssingResponse.setDateCollect( appointment.getDateCollect() );
        appointmentAssingResponse.setTypeCollect( appointment.getTypeCollect() );
        appointmentAssingResponse.setAppointmentId( appointment.getAppointmentId() );

        return appointmentAssingResponse;
    }

    private String appointmentServiceServiceName(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }
        Service service = appointment.getService();
        if ( service == null ) {
            return null;
        }
        String serviceName = service.getServiceName();
        if ( serviceName == null ) {
            return null;
        }
        return serviceName;
    }

    private String appointmentStaffName(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }
        Person staff = appointment.getStaff();
        if ( staff == null ) {
            return null;
        }
        String name = staff.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String appointmentCustomerName(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }
        Person customer = appointment.getCustomer();
        if ( customer == null ) {
            return null;
        }
        String name = customer.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String appointmentServiceTypeService(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }
        Service service = appointment.getService();
        if ( service == null ) {
            return null;
        }
        String typeService = service.getTypeService();
        if ( typeService == null ) {
            return null;
        }
        return typeService;
    }

    private int appointmentServiceServiceId(Appointment appointment) {
        if ( appointment == null ) {
            return 0;
        }
        Service service = appointment.getService();
        if ( service == null ) {
            return 0;
        }
        int serviceId = service.getServiceId();
        return serviceId;
    }

    private BigDecimal appointmentServiceServicePrice(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }
        Service service = appointment.getService();
        if ( service == null ) {
            return null;
        }
        BigDecimal servicePrice = service.getServicePrice();
        if ( servicePrice == null ) {
            return null;
        }
        return servicePrice;
    }
}
