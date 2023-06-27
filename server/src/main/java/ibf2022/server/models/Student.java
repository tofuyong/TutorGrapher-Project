package ibf2022.server.models;

import java.sql.Date;

public class Student {
    
    private Integer studentId;
    private Boolean isActive;
    private String firstName;
    private String lastName;
    private String gender;
    private Date dob;
    private Integer phone;
    private String email;
    private String photo;
    private String school;
    private String level;
    private Integer year;
    private String band;
    private String cca;
    private String interests;
    private Integer tutorId;

    public Integer getStudentId() {return this.studentId;}
    public void setStudentId(Integer studentId) {this.studentId = studentId;}

    public Boolean isIsActive() {return this.isActive;}
    public Boolean getIsActive() {return this.isActive;}
    public void setIsActive(Boolean isActive) {this.isActive = isActive;}

    public String getFirstName() {return this.firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return this.lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public String getGender() {return this.gender;}
    public void setGender(String gender) {this.gender = gender;}

    public Date getDob() {return this.dob;}
    public void setDob(Date dob) {this.dob = dob;}

    public Integer getPhone() {return this.phone;}
    public void setPhone(Integer phone) {this.phone = phone;}

    public String getEmail() {return this.email;}
    public void setEmail(String email) {this.email = email;}

    public String getPhoto() {return this.photo;}
    public void setPhoto(String photo) {this.photo = photo;}
   
    public String getSchool() {return this.school;}
    public void setSchool(String school) {this.school = school;}

    public String getLevel() {return this.level;}
    public void setLevel(String level) {this.level = level;}

    public Integer getYear() {return this.year;}
    public void setYear(Integer year) {this.year = year;}

    public String getBand() {return this.band;}
    public void setBand(String band) {this.band = band;}

    public String getCca() {return this.cca;}
    public void setCca(String cca) {this.cca = cca;}

    public String getInterests() {return this.interests;}
    public void setInterests(String interests) {this.interests = interests;}

    public Integer getTutorId() {return this.tutorId;}
    public void setTutorId(Integer tutorId) {this.tutorId = tutorId;}

}
