package ibf2022.server.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import ibf2022.server.models.Holiday;

@Repository
public class CalendarRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String GET_ALL_HOLIDAYS_SQL = "SELECT * from holidays";

    public List<Holiday> getAllHolidays() {
        return jdbcTemplate.query(GET_ALL_HOLIDAYS_SQL, BeanPropertyRowMapper.newInstance(Holiday.class));
    }
    
}
