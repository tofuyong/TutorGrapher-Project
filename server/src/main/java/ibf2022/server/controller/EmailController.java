package ibf2022.server.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.server.models.EmailData;
import ibf2022.server.service.EmailService;

@RestController
@RequestMapping("api/email")
public class EmailController {
    
    @Autowired
    EmailService emailSvc;

    @PostMapping("/contact-admin")
    public ResponseEntity<Boolean> sendEmailToAdmin(@RequestBody EmailData emailData) throws IOException {
        emailSvc.sendEmailToAdmin(emailData.getName(), emailData.getUserEmail(), emailData.getSubject(), emailData.getMessage());
        return null;
    }
    
}