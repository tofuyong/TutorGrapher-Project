package ibf2022.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf2022.server.models.Tutor;

@Repository
public class TutorRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String GET_TUTOR_BY_ID_SQL = "SELECT * from tutor where tutorId = ?";
    private static final String INSERT_TUTOR_SQL = "INSERT INTO tutor (firstName, lastName, salutation, phone, email) VALUES (?, ?, ?, ?, ?)";
    private static final String UPDATE_TUTOR_SQL = "UPDATE tutor SET firstName = ?, lastName = ?, salutation = ?, phone = ?, email = ?, photo = ? WHERE tutorId = ?";
    private static final String DELETE_TUTOR_SQL = "DELETE FROM tutor WHERE tutorId = ?";
    private static final String UPDATE_TUTOR_PHOTO_SQL = "UPDATE tutor SET photo = ? WHERE tutorId = ?";
    private static final String DELETE_TUTOR_PHOTO_SQL = "UPDATE tutor SET photo = NULL WHERE tutorId = ?";

    public Tutor getTutor(Integer tutorId) {
        return jdbcTemplate.queryForObject(GET_TUTOR_BY_ID_SQL, BeanPropertyRowMapper.newInstance(Tutor.class), tutorId);
    }

    public Boolean insertTutor(Tutor tutor) {
        int iCreated = 0;
        iCreated = jdbcTemplate.update(INSERT_TUTOR_SQL, tutor.getFirstName(), 
            tutor.getLastName(), tutor.getSalutation(), tutor.getPhone(), tutor.getEmail());
        return iCreated > 0 ? true : false;
    }

    public Boolean updateTutor(Tutor tutor, Integer tutorId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(UPDATE_TUTOR_SQL, tutor.getFirstName(), tutor.getLastName(), 
            tutor.getSalutation(), tutor.getPhone(), tutor.getEmail(), tutor.getPhoto(), tutorId);
        return iResult > 0 ? true : false;
    }

    public Boolean deleteTutor(Integer tutorId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(DELETE_TUTOR_SQL, tutorId);
        return iResult > 0 ? true : false;
    }

    public Boolean updateTutorPhoto(String photoBase64, Integer tutorId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(UPDATE_TUTOR_PHOTO_SQL, photoBase64, tutorId);
        return iResult > 0 ? true : false;
    }

    public Boolean deleteTutorPhoto(Integer tutorId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(DELETE_TUTOR_PHOTO_SQL, tutorId);
        return iResult > 0 ? true : false;
    }

}
