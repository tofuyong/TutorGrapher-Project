package ibf2022.server.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    
    @Autowired
    private AmazonS3 s3Client;

    public String saveReport(MultipartFile file, String studentIdentifier, int studentId) throws IOException{
        // User data
        Map<String, String> userData = new HashMap<>();
        userData.put("name", "TutorGrapher");
        userData.put("uploadTime", new Date().toString());
        userData.put("originalFilename", file.getOriginalFilename());
        
        // Metadata
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        metadata.setUserMetadata(userData);
        String key = studentIdentifier + UUID.randomUUID().toString().substring(0, 8);
        System.out.println(file.getOriginalFilename());
        
        StringTokenizer tk = new StringTokenizer(file.getOriginalFilename(), ".");
        int count = 0;
        String filenameExt = "";
        while(tk.hasMoreTokens()){
            if(count == 1){
                    filenameExt = tk.nextToken();
                break;
            }else{
                filenameExt = tk.nextToken();
            }
            count++;
        }
        System.out.println("myobjects/%s.%s".formatted(key, filenameExt));
        if(filenameExt.equals("blob"))
            filenameExt = filenameExt + ".pdf";
        PutObjectRequest putRequest = 
            new PutObjectRequest(
                "tofuibfb22022", 
                "reports/%s.%s".formatted(key, filenameExt), 
                file.getInputStream(), 
                metadata);
        putRequest.withCannedAcl(
                CannedAccessControlList.PublicRead);
        s3Client.putObject(putRequest);
        return "%s.%s".formatted(key, filenameExt);
    }

}
