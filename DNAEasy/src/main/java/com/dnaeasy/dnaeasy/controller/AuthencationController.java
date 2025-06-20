package com.dnaeasy.dnaeasy.controller;

import com.dnaeasy.dnaeasy.dto.request.IntrospectRequest;
import com.dnaeasy.dnaeasy.dto.request.AuthencationRequest;
import com.dnaeasy.dnaeasy.dto.request.LogoutRequest;
import com.dnaeasy.dnaeasy.dto.request.UserCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AuthenctionResponse;
import com.dnaeasy.dnaeasy.dto.response.IntrospectResponse;

import com.dnaeasy.dnaeasy.service.impl.AuthencationService;
import com.dnaeasy.dnaeasy.service.impl.UserService;
import com.dnaeasy.dnaeasy.util.CloudinaryUtil;


import com.nimbusds.jose.JOSEException;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.naming.AuthenticationException;
import java.io.IOException;
import java.text.ParseException;
import java.util.Base64;
import java.util.Collections;
import java.util.Map;

import static com.cloudinary.AccessControlRule.AccessType.token;

@CrossOrigin("*")

@RestController
@RequestMapping("api/auth")
public class AuthencationController {
    @Autowired
    AuthencationService authencationService;
    @Autowired
    CloudinaryUtil cloudinaryUtil;
    @Autowired
    UserService userService;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String CLIENT_SECRET;


    //chú ý cài nào mà sài class enum thì phải so sánh theo kiểu emun chứ ss theo String là nó lỗi
    @PostMapping("/login")
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

    @GetMapping("/login/google")
    public RedirectView UserGetInfo(OAuth2AuthenticationToken token) {

        String email = token.getPrincipal().getAttributes().get("email").toString();
        String name = token.getPrincipal().getAttributes().get("name").toString();

        String picture = token.getPrincipal().getAttributes().get("picture").toString();
        UserCreateRequest request = new UserCreateRequest();

        request.setEmail(email);
        request.setName(name);
        request.setUsername(email);
        request.setAvatarUrl(picture);


        System.out.println(email + " " + name + " " +  " " + picture);
        AuthenctionResponse authencationResponse = authencationService.LoginWithGoogle(request);
        return  new RedirectView("http://localhost:5173/user/login?"+"token="+authencationResponse.getToken()+"&rolename="+authencationResponse.getRolename());

    }
}
