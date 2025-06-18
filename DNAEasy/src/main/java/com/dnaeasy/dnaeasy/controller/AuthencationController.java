package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.IntrospectRequest;
import com.dnaeasy.dnaeasy.dto.request.AuthencationRequest;
import com.dnaeasy.dnaeasy.dto.request.LogoutRequest;
import com.dnaeasy.dnaeasy.dto.request.UserCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AuthenctionResponse;
import com.dnaeasy.dnaeasy.dto.response.IntrospectResponse;
import com.dnaeasy.dnaeasy.mapper.UserMapper;
import com.dnaeasy.dnaeasy.service.impl.AuthencationService;
import com.dnaeasy.dnaeasy.service.impl.UserService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import java.io.IOException;
import java.text.ParseException;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/auth")
public class AuthencationController {
    AuthencationService authencationService;
    CloudinaryUtil cloudinaryUtil;
    UserService userService;
    UserMapper userMapper;


    @PostMapping("/login")

    //chú ý cài nào mà sài class enum thì phải so sánh theo kiểu emun chứ ss theo String là nó lỗi
    public ResponseEntity<?> UserLogin(@Valid @RequestBody AuthencationRequest authencationRequest) {
        AuthenctionResponse p = authencationService.UserLogin(authencationRequest);
        if (p == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }


        return ResponseEntity.ok(p);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> createUser(
            @RequestPart("user") @Valid UserCreateRequest userCreateRequest,
            @RequestPart(value = "file", required = false) MultipartFile file) {


        try {
            if (file != null) {
                userCreateRequest.setAvatarUrl(cloudinaryUtil.uploadImage(file));

            }

        } catch (IOException e) {
            System.out.println("loi file");
            e.printStackTrace();
        }
        if (userService.checkUsernameEmailPhone(userCreateRequest) != null) {
            System.out.println("sklfsfas");
            return ResponseEntity.badRequest().body(userService.checkUsernameEmailPhone(userCreateRequest));
        }

        return ResponseEntity.ok(authencationService.CreateUser(userCreateRequest));
    }


    @PostMapping("/token")
    //chú ý cài nào mà sài class enum thì phải so sánh theo kiểu emun chứ ss theo String là nó lỗi
    public ResponseEntity<IntrospectResponse> UserLogin(@RequestBody IntrospectRequest input) throws ParseException, JOSEException {
        return ResponseEntity.ok(authencationService.IsAuthencation(input));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> UserLogout(@RequestBody LogoutRequest token) throws ParseException, JOSEException {
        authencationService.Logout(token.getToken());
        return ResponseEntity.ok("lougout sucessFully");
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<AuthenctionResponse> UserRefreshToken(@RequestBody IntrospectRequest token) throws ParseException, JOSEException, AuthenticationException {

        return ResponseEntity.ok(authencationService.RefreshToken(token));
    }


}
