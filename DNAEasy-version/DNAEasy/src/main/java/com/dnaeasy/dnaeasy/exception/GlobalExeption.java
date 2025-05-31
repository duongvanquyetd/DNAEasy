package com.dnaeasy.dnaeasy.exception;

import com.dnaeasy.dnaeasy.enity.Person;
import jakarta.validation.ConstraintViolationException;
import org.hibernate.validator.internal.engine.ConstraintViolationImpl;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.NonTransientDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExeption {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField(); // vd: username
            String errorMessage = error.getDefaultMessage(); // vd: "Username not empty"
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        Map<String, String> errors = new HashMap<>();

        // Kiểm tra nếu lỗi do trùng phone number
        if (ex.getCause() instanceof ConstraintViolationException) {
            ConstraintViolationException cve = (ConstraintViolationException) ex.getCause();
            if (cve.getConstraintViolations().contains("phone")) {
                errors.put("phone", "Số điện thoại đã được sử dụng");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
            }
        }

        errors.put("error", "Lỗi không xác định");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }


    }



