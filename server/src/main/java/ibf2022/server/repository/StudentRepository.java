package ibf2022.server.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf2022.server.models.Student;

@Repository
public class StudentRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;
    
    private static final String GET_ALL_STUDENTS_BY_TUTOR_ID_SQL = "SELECT * from student where tutorId = ?";
    private static final String GET_STUDENT_BY_ID_SQL = "SELECT * from student where studentId = ?";
    private static final String INSERT_STUDENT_SQL = """ 
                                                    INSERT INTO student 
                                                    (studentId, isActive, firstName, lastName, gender, dob, phone, 
                                                    email, school, level, year, band, cca, interests, tutorId) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""";
    private static final String UPDATE_STUDENT_SQL = """ 
                                                    UPDATE student SET isActive = ?, firstName = ?, lastName = ?, gender = ?,
                                                    dob = ?, phone = ?, email = ?, school = ?, level = ?, year = ?, 
                                                    band = ?, cca = ?, interests =? WHERE studentId = ?""";
    private static final String UPDATE_STUDENT_PHOTO_SQL = "UPDATE student SET photo = ? WHERE studentId = ?";
    private static final String DELETE_STUDENT_SQL = "DELETE FROM student WHERE studentId = ?";
    private static final String GET_LAST_STUDENT_ID_BY_TUTOR_SQL = "SELECT MAX(studentId) FROM student WHERE tutorId = ?";
    private static final String COUNT_CURRENT_STUDENTS_SQL = "SELECT COUNT(*) FROM student WHERE isActive = TRUE AND tutorId = ?";
    private static final String COUNT_EX_STUDENTS_SQL = "SELECT COUNT(*) FROM student WHERE isActive = FALSE AND tutorId = ?";

    public List<Student> getAllStudentsByTutorId(int tutorId) {
        return jdbcTemplate.query(GET_ALL_STUDENTS_BY_TUTOR_ID_SQL, BeanPropertyRowMapper.newInstance(Student.class), tutorId);
    }

    public Student getStudent(Integer studentId) {
        return jdbcTemplate.queryForObject(GET_STUDENT_BY_ID_SQL, BeanPropertyRowMapper.newInstance(Student.class), studentId);
    }

    public Boolean insertStudent(Student student) {
        int iCreated = 0;
        iCreated = jdbcTemplate.update(INSERT_STUDENT_SQL, student.getStudentId(), student.getIsActive(), student.getFirstName(), 
            student.getLastName(), student.getGender(), student.getDob(), student.getPhone(), student.getEmail(), student.getSchool(), 
            student.getLevel(), student.getYear(), student.getBand(), student.getCca(), student.getInterests(), student.getTutorId());
        return iCreated > 0 ? true : false;
    }

    public Boolean updateStudent(Student student, Integer studentId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(UPDATE_STUDENT_SQL, student.getIsActive(), student.getFirstName(), student.getLastName(), student.getGender(), 
            student.getDob(), student.getPhone(), student.getEmail(), student.getSchool(), student.getLevel(), student.getYear(), student.getBand(),
            student.getCca(), student.getInterests(), studentId); 
        return iResult > 0 ? true : false;
    }

    public Boolean updateStudentPhoto(String photoBase64, Integer studentId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(UPDATE_STUDENT_PHOTO_SQL, photoBase64, studentId);
        return iResult > 0 ? true : false;
    }

    public Boolean deleteStudent(Integer studentId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(DELETE_STUDENT_SQL, studentId);
        return iResult > 0 ? true : false;
    }

    public Integer getLastStudentIdByTutorId(Integer tutorId) {
        return jdbcTemplate.queryForObject(GET_LAST_STUDENT_ID_BY_TUTOR_SQL, Integer.class, tutorId);
    }

    public Integer countCurrentStudents(Integer tutorId) {
        return jdbcTemplate.queryForObject(COUNT_CURRENT_STUDENTS_SQL, Integer.class, tutorId);
    }

    public Integer countExStudents(Integer tutorId) {
        return jdbcTemplate.queryForObject(COUNT_EX_STUDENTS_SQL, Integer.class, tutorId);
    }

}
