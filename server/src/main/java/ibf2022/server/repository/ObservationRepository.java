package ibf2022.server.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf2022.server.models.Observation;

@Repository
public class ObservationRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String GET_OBSERVATIONS_BY_STUDENT_ID_SQL = "SELECT * from observation where studentId = ?";
    private static final String GET_OBSERVATION_BY_ID_SQL = "SELECT * from observation where observationId = ?";
    private static final String INSERT_OBSERVATION_SQL = """
                                                    INSERT INTO observation (observationId, date, 
                                                    notes, studentId) VALUES (?, ?, ?, ?)""";
    private static final String UPDATE_OBSERVATION_SQL = """
                                                    UPDATE observation SET date = ?, notes = ? 
                                                    WHERE observationId = ?""";
    private static final String DELETE_OBSERVATION_SQL = "DELETE FROM observation WHERE observationId = ?";
    private static final String GET_LAST_OBSERVATION_ID_BY_STUDENT_SQL = "SELECT observationId FROM observation WHERE studentId = ? ORDER BY observationId DESC LIMIT 1";
    private static final String GET_OBSERVATION_COUNT_BY_TUTOR_SQL = """
                                                                SELECT COUNT(*) as TotalObservations
                                                                FROM observation o
                                                                JOIN student s ON o.studentId = s.studentId
                                                                WHERE s.tutorId = ?""";
    

    public List<Observation> getObservationsByStudentId(int studentId) {
        return jdbcTemplate.query(GET_OBSERVATIONS_BY_STUDENT_ID_SQL, BeanPropertyRowMapper.newInstance(Observation.class), studentId);
    }

    public Observation getObservation(String observationId) {
        return jdbcTemplate.queryForObject(GET_OBSERVATION_BY_ID_SQL, BeanPropertyRowMapper.newInstance(Observation.class), observationId);
    }

    public Boolean insertObservation(Observation observation) {
        int iCreated = 0;
        iCreated = jdbcTemplate.update(INSERT_OBSERVATION_SQL, observation.getObservationId(), observation.getDate(), observation.getNotes(), observation.getStudentId());
        return iCreated > 0 ? true : false;
    }

    public Boolean updateObservation(Observation observation, String observationId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(UPDATE_OBSERVATION_SQL, observation.getDate(), observation.getNotes(), observationId); 
        return iResult > 0 ? true : false;
    }

    public Boolean deleteObservation(String observationId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(DELETE_OBSERVATION_SQL, observationId);
        return iResult > 0 ? true : false;
    }

    public String getLastObservationIdByStudentId(Integer studentId) {
        try {
            return jdbcTemplate.queryForObject(GET_LAST_OBSERVATION_ID_BY_STUDENT_SQL, String.class, studentId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Integer getObservationCountByTutor(Integer tutorId) {
        return jdbcTemplate.queryForObject(GET_OBSERVATION_COUNT_BY_TUTOR_SQL, Integer.class, tutorId);
    }

}
