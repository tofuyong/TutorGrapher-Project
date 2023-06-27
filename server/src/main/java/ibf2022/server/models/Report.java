package ibf2022.server.models;

import java.util.Date;

public class Report {
    
    private String reportId;
    private Date date;
    private String reportUrl;
    private Integer studentId;

    public String getReportId() {return this.reportId;}
    public void setReportId(String reportId) {this.reportId = reportId;}

    public Date getDate() {return this.date;}
    public void setDate(Date date) {this.date = date;}

    public String getReportUrl() {return this.reportUrl;}
    public void setReportUrl(String reportUrl) {this.reportUrl = reportUrl;}

    public Integer getStudentId() {return this.studentId;}
    public void setStudentId(Integer studentId) {this.studentId = studentId;}

}
