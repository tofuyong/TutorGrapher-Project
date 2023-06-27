package ibf2022.server.models;

import java.sql.Date;

public class Observation {
    
    private String observationId;
    private Date date;
    private String notes;
    private Integer studentId;

    public String getObservationId() {return this.observationId;}
    public void setObservationId(String observationId) {this.observationId = observationId;}

    public Date getDate() {return this.date;}
    public void setDate(Date date) {this.date = date;}

    public String getNotes() {return this.notes;}
    public void setNotes(String notes) {this.notes = notes;}

    public Integer getStudentId() {return this.studentId;}
    public void setStudentId(Integer studentId) {this.studentId = studentId;}
    
}
