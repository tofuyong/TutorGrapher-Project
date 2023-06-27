package ibf2022.server.service;

import java.io.IOException;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {
    
    @Value("${spring.sendgrid.api-key}")
    private String sendGridApiKey;

    public boolean sendEmailToAdmin(String name, String userEmail, String subject, String message) throws IOException {
        Boolean isSent = true;

        Email fromEmail = new Email("tofuyong@gmail.com");
        Email toEmail = new Email("tofuyong@gmail.com");

        String emailBody = "Sent by: " + name + "\n" +
                           "Date: " + LocalDate.now().toString() + "\n" +
                           "User Email: " + userEmail + "\n\n" +
                           "Message:\n" + message;
        
        Content emailContent = new Content("text/plain", emailBody);
        Mail mail = new Mail(fromEmail, subject, toEmail, emailContent);

        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            isSent = false;
        }
        return isSent;
    }

}
