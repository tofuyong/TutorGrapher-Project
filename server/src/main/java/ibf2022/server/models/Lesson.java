package ibf2022.server.models;

public class Lesson {
    
    private String lessonId;
    private String subject;
    private String dayOfWeek;
    private String duration;
    private String startTime;
    private String endTime;
    private Integer hourlyRate;
    private String address;
    private Integer postalCode;
    private Integer studentId;

    public String getLessonId() {return this.lessonId;}
    public void setLessonId(String lessonId) {this.lessonId = lessonId;}

    public String getSubject() {return this.subject;}
    public void setSubject(String subject) {this.subject = subject;}

    public String getDayOfWeek() {return this.dayOfWeek;}
    public void setDayOfWeek(String dayOfWeek) {this.dayOfWeek = dayOfWeek;}

    public String getDuration() {return this.duration;}
    public void setDuration(String duration) {this.duration = duration;}

    public String getStartTime() {return this.startTime;}
    public void setStartTime(String startTime) {this.startTime = startTime;}

    public String getEndTime() {return this.endTime;}
    public void setEndTime(String endTime) {this.endTime = endTime;}

    public Integer getHourlyRate() {return this.hourlyRate;}
    public void setHourlyRate(Integer hourlyRate) {this.hourlyRate = hourlyRate;}

    public String getAddress() {return this.address;}
    public void setAddress(String address) {this.address = address;}

    public Integer getPostalCode() {return this.postalCode;}
    public void setPostalCode(Integer postalCode) {this.postalCode = postalCode;}

    public Integer getStudentId() {return this.studentId;}
    public void setStudentId(Integer studentId) {this.studentId = studentId;}

}
