package ibf2022.server.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf2022.server.models.Grade;

@Repository
public class GradeRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String GET_ALL_GRADES_BY_STUDENT_ID_SQL = "SELECT * from grade where studentId = ?";
    private static final String GET_GRADE_BY_ID_SQL = "SELECT * from grade where gradeId = ?";
    private static final String INSERT_GRADE_SQL = """ 
                                                    INSERT INTO grade 
                                                    (gradeId, subject, date, assessment, score, 
                                                    baseScore, percentageScore, format, studentId) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""";
    private static final String UPDATE_GRADE_SQL = """ 
                                                    UPDATE grade SET subject = ?, date = ?, assessment = ?, 
                                                    score = ?, baseScore = ?, percentageScore = ?, format = ? WHERE gradeId = ?""";
    private static final String DELETE_GRADE_SQL = "DELETE FROM grade WHERE gradeId = ?";
    private static final String GET_LAST_GRADE_ID_BY_STUDENT_SQL = "SELECT gradeId FROM grade WHERE studentId = ? ORDER BY gradeId DESC LIMIT 1";

    public List<Grade> getAllGradesByStudentId(int studentId) {
        return jdbcTemplate.query(GET_ALL_GRADES_BY_STUDENT_ID_SQL, BeanPropertyRowMapper.newInstance(Grade.class), studentId);
    }

    public Grade getGrade(String gradeId) {
        return jdbcTemplate.queryForObject(GET_GRADE_BY_ID_SQL, BeanPropertyRowMapper.newInstance(Grade.class), gradeId);
    }

    public Boolean insertGrade(Grade grade) {
        int iCreated = 0;
        iCreated = jdbcTemplate.update(INSERT_GRADE_SQL, grade.getGradeId(), grade.getSubject(), grade.getDate(), grade.getAssessment(), 
            grade.getScore(), grade.getBaseScore(), grade.getPercentageScore(), grade.getFormat(), grade.getStudentId());
        return iCreated > 0 ? true : false;
    }

    public Boolean updateGrade(Grade grade, String gradeId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(UPDATE_GRADE_SQL, grade.getSubject(), grade.getDate(), grade.getAssessment(), grade.getScore(), 
            grade.getBaseScore(), grade.getPercentageScore(), grade.getFormat(), gradeId); 
        return iResult > 0 ? true : false;
    }

    public Boolean deleteGrade(String gradeId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(DELETE_GRADE_SQL, gradeId);
        return iResult > 0 ? true : false;
    }

    public String getLastGradeIdByStudentId(Integer studentId) {
        try {
            return jdbcTemplate.queryForObject(GET_LAST_GRADE_ID_BY_STUDENT_SQL, String.class, studentId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    
}
