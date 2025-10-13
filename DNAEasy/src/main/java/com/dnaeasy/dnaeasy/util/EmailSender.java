package com.dnaeasy.dnaeasy.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Component
public class EmailSender {
    @Autowired
  private JavaMailSender mailSender;

  public void SendMail(String to) throws MessagingException, IOException {

      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

      helper.setFrom("dnaeasyswp@gmail.com");
      helper.setTo(to);
      helper.setSubject("DNA Test Results Are Ready");

       try(var stream = Objects.requireNonNull(EmailSender.class.getResourceAsStream("/templates/ResultNotificaion.html")))
       {
           helper.setText( new String(stream.readAllBytes(), StandardCharsets.UTF_8), true);
       }
       mailSender.send(mimeMessage);
  }

}
