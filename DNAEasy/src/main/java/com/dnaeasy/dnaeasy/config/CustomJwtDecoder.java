package com.dnaeasy.dnaeasy.config;

import com.dnaeasy.dnaeasy.dto.request.IntrospectRequest;
import com.dnaeasy.dnaeasy.dto.response.IntrospectResponse;
import com.dnaeasy.dnaeasy.service.AuthencationService;
import com.nimbusds.jose.JOSEException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
@Component

public class CustomJwtDecoder implements JwtDecoder {
    protected final static String SIGNERKEY = "1zbArs1Mw1U1DFy6gihY+UARQQERM6RIT6WsiB8KD+sG8ewTKntmCMGPlG7ZPHmF";
    @Autowired
    AuthencationService authencationService;
    private NimbusJwtDecoder nimbusJwtDecoder;

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            IntrospectResponse istoken = authencationService.IsAuthencation(new IntrospectRequest(token));
            System.out.println("ajfskkjl");
            if (!istoken.isSuccess()) {
                throw new JwtException("Invalid token DECODER");
            }
        } catch (Exception e)
        {
            throw new JwtException("Invalid token");
        }
        SecretKeySpec key = new SecretKeySpec(SIGNERKEY.getBytes(), "HSF512");

        nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(key).macAlgorithm(MacAlgorithm.HS512).build();
        return nimbusJwtDecoder.decode(token);
    }
}
