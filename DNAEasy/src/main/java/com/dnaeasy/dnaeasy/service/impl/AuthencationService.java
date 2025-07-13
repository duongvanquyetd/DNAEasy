package com.dnaeasy.dnaeasy.service.impl;

import com.dnaeasy.dnaeasy.dto.request.IntrospectRequest;
import com.dnaeasy.dnaeasy.dto.request.AuthencationRequest;
import com.dnaeasy.dnaeasy.dto.request.UserCreateRequest;
import com.dnaeasy.dnaeasy.dto.response.AuthenctionResponse;
import com.dnaeasy.dnaeasy.dto.response.IntrospectResponse;
import com.dnaeasy.dnaeasy.enity.InvalidToken;
import com.dnaeasy.dnaeasy.enity.Person;
import com.dnaeasy.dnaeasy.enums.GenderEnum;
import com.dnaeasy.dnaeasy.enums.RoleName;
import com.dnaeasy.dnaeasy.exception.BadRequestException;
import com.dnaeasy.dnaeasy.mapper.UserMapper;
import com.dnaeasy.dnaeasy.responsity.IsInvalidateToken;
import com.dnaeasy.dnaeasy.responsity.IsPersonTesting;
import com.dnaeasy.dnaeasy.responsity.IsUserResponsity;
import com.dnaeasy.dnaeasy.service.IsAuthencationService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
public class AuthencationService implements IsAuthencationService {
    // JwtService jwtService;
    @Autowired
    IsUserResponsity personResponsity;
    @Autowired
    UserMapper userMapper;
    @Autowired
    IsInvalidateToken isInvalidateToken;
    @Value("${jwt.signlekey}")
    protected  String SIGNERKEY;
    @Value("${avatar.female}")
    private String avatarMale;

    @Value("${avatar.male}")
    private String avatarFemale;


    public AuthenctionResponse UserLogin(AuthencationRequest authencationRequest) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        Person person = personResponsity.findByUsername(authencationRequest.getUsername());
        if (person != null) {

            boolean isvalid = passwordEncoder.matches(authencationRequest.getPassword(), person.getPassword());
            if (isvalid == true) {

                String token = generateToken(person);
                AuthenctionResponse response = userMapper.PersonToAuthenctionResponse(person);
                response.setToken(token);
                if(!person.getActive()) {
                    throw new BadRequestException("This account deleted by admin ");
                }
                return response;
            }
        }

        return null;
    }


    public AuthenctionResponse CreateUser(UserCreateRequest userCreateRequest) {

        if (userCreateRequest == null) {
            return null;
        }
        Person p = userMapper.PersonRequestToPerson(userCreateRequest);
       if(p.getAvatarUrl() == null || p.getAvatarUrl().isEmpty()) {
           if(p.getGender() == GenderEnum.F)
           {
               p.setAvatarUrl(avatarFemale);
           }
           else {
               p.setAvatarUrl(avatarMale);
           }
       }


        p.setRolename(RoleName.CUSTOMER);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        p.setPassword(passwordEncoder.encode(p.getPassword()));
        personResponsity.save(p);

        return userMapper.PersonToAuthenctionResponse(p);

    }

    //test xem token co gia tri khong a ma
    public IntrospectResponse IsAuthencation(IntrospectRequest request) throws JOSEException, ParseException {
        var veri = verifyToken(request.getToken());
        String usename = veri.getJWTClaimsSet().getSubject();

        Person p = personResponsity.findByUsername(usename);


        if (p.getActive() == false) {
            return new IntrospectResponse(false);
        }
        if (isInvalidateToken.existsInvalidTokenById(veri.getJWTClaimsSet().getJWTID())) {

            return new IntrospectResponse(false);
        }


        return new IntrospectResponse(true);
    }

    @Override
    public AuthenctionResponse LoginWithGoogle(UserCreateRequest request) {
        AuthenctionResponse response = new AuthenctionResponse();
        Person person ;
        if(personResponsity.findByUsername(request.getUsername()) != null) {
          person = personResponsity.findByUsername(request.getUsername());
        }
        else {
            person = userMapper.PersonRequestToPerson(request);
            person.setRolename(RoleName.CUSTOMER);
            person.setTypeLogin("Gmail");
            person = personResponsity.save(person);

        }

        response.setToken(generateToken(person));
        response.setRolename(person.getRolename());
        return  response;
    }

    public String generateToken(Person peroson) {
        //header
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(peroson.getUsername())
                .issuer("DNAEasy.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(3600*4, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", peroson.getRolename())
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNERKEY.getBytes()));
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
        return jwsObject.serialize();
    }

    public AuthenctionResponse RefreshToken(IntrospectRequest request) throws ParseException, JOSEException, AuthenticationException {

        var signed = verifyToken(request.getToken());

        if(isInvalidateToken.existsInvalidTokenById(signed.getJWTClaimsSet().getJWTID())) {
            throw  new AuthenticationException("Invalid Refresh Token");
        }
        Person p = personResponsity.findByUsername(signed.getJWTClaimsSet().getSubject());
        String jwt = signed.getJWTClaimsSet().getJWTID();
        Date expirationDate = signed.getJWTClaimsSet().getExpirationTime();
        isInvalidateToken.save(new InvalidToken(jwt, expirationDate));
        String token = generateToken(p);
        AuthenctionResponse response = userMapper.PersonToAuthenctionResponse(p);
        response.setToken(token);
        return response;

    }

    public void Logout(String token) throws ParseException, JOSEException {
        var signed = verifyToken(token);
        String jwt = signed.getJWTClaimsSet().getJWTID();
        Date expirationDate = signed.getJWTClaimsSet().getExpirationTime();
        isInvalidateToken.save(new InvalidToken(jwt, expirationDate));

    }

    public SignedJWT verifyToken(String token) throws ParseException, JOSEException {
        JWSVerifier jwsVerifier = new MACVerifier(SIGNERKEY.getBytes(StandardCharsets.UTF_8));

        SignedJWT signedJWT = SignedJWT.parse(token);
        Date ExpDate = signedJWT.getJWTClaimsSet().getExpirationTime();
        var veri = signedJWT.verify(jwsVerifier);
        if (!(veri && ExpDate.after(new Date()))) {
            throw new ParseException("Invalid token", 0);
        }
        return signedJWT;
    }
}
