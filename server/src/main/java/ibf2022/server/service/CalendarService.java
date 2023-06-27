package ibf2022.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf2022.server.models.Holiday;
import ibf2022.server.repository.CalendarRepository;

@Service
public class CalendarService {

    @Autowired
    CalendarRepository calendarRepo;

    public List<Holiday> getAllHolidays() {
        return calendarRepo.getAllHolidays();
    }
      
}
