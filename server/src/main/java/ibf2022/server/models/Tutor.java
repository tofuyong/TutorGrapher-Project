package ibf2022.server.models;

public class Tutor {
    
    private Integer tutorId;
    private String firstName;
    private String lastName;
    private String salutation;
    private Integer phone;
    private String email;
    private String photo;

    public Integer getTutorId() {return this.tutorId;}
    public void setTutorId(Integer tutorId) {this.tutorId = tutorId;}

    public String getFirstName() {return this.firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return this.lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public String getSalutation() {return this.salutation;}
    public void setSalutation(String salutation) {this.salutation = salutation;}

    public Integer getPhone() {return this.phone;}
    public void setPhone(Integer phone) {this.phone = phone;}

    public String getEmail() {return this.email;}
    public void setEmail(String email) {this.email = email;}

    public String getPhoto() {return this.photo;}
    public void setPhoto(String photo) {this.photo = photo;}
    
}
