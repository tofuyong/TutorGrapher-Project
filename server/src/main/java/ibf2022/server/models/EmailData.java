package ibf2022.server.models;

public class EmailData {
    
    private String name;
    private String userEmail;
    private String subject;
    private String message;

    public String getName() {return this.name;}
    public void setName(String name) {this.name = name;}

    public String getUserEmail() {return this.userEmail;}
    public void setUserEmail(String userEmail) {this.userEmail = userEmail;}

    public String getSubject() {return this.subject;}
    public void setSubject(String subject) {this.subject = subject;}

    public String getMessage() {return this.message;}
    public void setMessage(String message) {this.message = message;}

}
