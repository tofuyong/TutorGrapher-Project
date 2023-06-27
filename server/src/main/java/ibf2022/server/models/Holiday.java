package ibf2022.server.models;

import java.sql.Date;

public class Holiday {

    private Integer holidayId;
    private String title;
    private String type;
    private Date start;
    private Date end;
    private Boolean allDay;

    public Integer getHolidayId() {return this.holidayId;}
    public void setHolidayId(Integer holidayId) {this.holidayId = holidayId;}

    public String getTitle() {return this.title;}
    public void setTitle(String title) {this.title = title;}

    public String getType() {return this.type;}
    public void setType(String type) {this.type = type;}

    public Date getStart() {return this.start;}
    public void setStart(Date start) {this.start = start;}

    public Date getEnd() {return this.end;}
    public void setEnd(Date end) {this.end = end;}

    public Boolean isAllDay() {return this.allDay;}
    public Boolean getAllDay() {return this.allDay;}
    public void setAllDay(Boolean allDay) {this.allDay = allDay;}

}
