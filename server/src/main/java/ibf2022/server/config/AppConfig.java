package ibf2022.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AppConfig {
    @Value("${do.storage.key}")
    private String accessKey;

    @Value("${do.storage.secretkey}")
    private String secretKey;

    @Value("${do.storage.endpoint}")
    private String endPoint;

    @Value("${do.storage.endpoint.region}")
    private String endPointRegion;

    @Bean 
    public AmazonS3 createS3Client(){
        System.out.println(" " + accessKey);
        System.out.println(" " + secretKey);
        System.out.println(" " + endPoint);
        System.out.println(" " + endPointRegion);
        
        BasicAWSCredentials cred= new BasicAWSCredentials(accessKey, secretKey);
        EndpointConfiguration ep = new EndpointConfiguration(endPoint, endPointRegion);
        System.out.println(" " + ep.getServiceEndpoint());
        System.out.println(" " + ep.getSigningRegion());
        return AmazonS3ClientBuilder.standard()
            .withEndpointConfiguration(ep)
            .withCredentials(new AWSStaticCredentialsProvider(cred))
            .build();
    }
    
}
