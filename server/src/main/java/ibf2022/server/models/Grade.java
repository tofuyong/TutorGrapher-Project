package ibf2022.server.models;

import java.sql.Date;

public class Grade {

    private String gradeId;
    private String subject;
    private Date date;
    private String assessment;
    private float score;
    private float baseScore;
    private float percentageScore;
    private String format;
    private Integer studentId;

    public String getGradeId() {return this.gradeId;}
    public void setGradeId(String gradeId) {this.gradeId = gradeId;}

    public String getSubject() {return this.subject;}
    public void setSubject(String subject) {this.subject = subject;}

    public Date getDate() {return this.date;}
    public void setDate(Date date) {this.date = date;}

    public String getAssessment() {return this.assessment;}
    public void setAssessment(String assessment) {this.assessment = assessment;}

    public String getFormat() {return this.format;}
    public void setFormat(String format) {this.format = format;}

    public float getScore() {return this.score;}
    public void setScore(float score) {this.score = score;}

    public float getBaseScore() {return this.baseScore;}
    public void setBaseScore(float baseScore) {this.baseScore = baseScore;}

    public float getPercentageScore() {return this.percentageScore;}
    public void setPercentageScore(float percentageScore) {this.percentageScore = percentageScore;}

    public Integer getStudentId() {return this.studentId;}
    public void setStudentId(Integer studentId) {this.studentId = studentId;}

}
