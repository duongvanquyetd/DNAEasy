package com.dnaeasy.dnaeasy.service;

public interface IsPaymentService {
    void UpdateStatus(int appointmentId);
    String PayToviewResult(int appointmentId);
}
