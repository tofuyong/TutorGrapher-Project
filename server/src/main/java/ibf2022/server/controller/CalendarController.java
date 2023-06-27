package ibf2022.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.server.models.Holiday;
import ibf2022.server.service.CalendarService;

@RestController
@RequestMapping("api/calendar")
public class CalendarController {

    @Autowired
    CalendarService calendarSvc;
    
    @GetMapping("/all-holidays")
    public ResponseEntity<List<Holiday>> getAllHolidays() {
        List<Holiday> holidays = calendarSvc.getAllHolidays();
        return ResponseEntity.ok(holidays);
    }
    
}



