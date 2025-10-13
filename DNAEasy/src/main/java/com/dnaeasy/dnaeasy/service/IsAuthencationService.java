package com.dnaeasy.dnaeasy.service;

import com.dnaeasy.dnaeasy.dto.request.IntrospectRequest;
import com.dnaeasy.dnaeasy.dto.request.UserCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AuthenctionResponse;
import com.dnaeasy.dnaeasy.dto.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface IsAuthencationService {
    IntrospectResponse IsAuthencation(IntrospectRequest token) throws ParseException, JOSEException;
    AuthenctionResponse  LoginWithGoogle(UserCreateRequest token) ;

}
