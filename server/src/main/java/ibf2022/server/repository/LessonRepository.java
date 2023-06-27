package ibf2022.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf2022.server.models.Lesson;

@Repository
public class LessonRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String GET_LESSON_BY_STUDENT_ID_SQL = "SELECT * from lesson where studentId = ? LIMIT 1";
    private static final String GET_LESSON_BY_ID_SQL = "SELECT * from lesson where lessonId = ?";
    private static final String INSERT_LESSON_SQL = """
                                                    INSERT INTO lesson (lessonId, subject, 
                                                    dayOfWeek, duration, startTime, endTime, 
                                                    hourlyRate, address, postalCode, studentId)
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""";
    private static final String UPDATE_LESSON_SQL = """
                                                    UPDATE lesson SET subject = ?, dayOfWeek = ?, 
                                                    duration = ?, startTime = ?, endTime = ?, 
                                                    hourlyRate = ?, address =?, postalCode = ? 
                                                    WHERE lessonId = ?""";
    private static final String DELETE_LESSON_SQL = "DELETE FROM lesson WHERE lessonId = ?";

    public Optional<Lesson> getLessonByStudentId(int studentId) {
        List<Lesson> lessons = jdbcTemplate.query(GET_LESSON_BY_STUDENT_ID_SQL, 
        BeanPropertyRowMapper.newInstance(Lesson.class), studentId);
        return lessons.isEmpty() ? Optional.empty() : Optional.of(lessons.get(0));
    }

    public Lesson getLesson(String lessonId) {
        return jdbcTemplate.queryForObject(GET_LESSON_BY_ID_SQL, BeanPropertyRowMapper.newInstance(Lesson.class), lessonId);
    }

    public Boolean insertLesson(Lesson lesson) {
        int iCreated = 0;
        iCreated = jdbcTemplate.update(INSERT_LESSON_SQL, lesson.getLessonId(), lesson.getSubject(), lesson.getDayOfWeek(), lesson.getDuration(), 
            lesson.getStartTime(), lesson.getEndTime(), lesson.getHourlyRate(), lesson.getAddress(), lesson.getPostalCode(), lesson.getStudentId());
        return iCreated > 0 ? true : false;
    }

    public Boolean updateLesson(Lesson lesson, String lessonId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(UPDATE_LESSON_SQL, lesson.getSubject(), lesson.getDayOfWeek(), lesson.getDuration(), 
        lesson.getStartTime(), lesson.getEndTime(), lesson.getHourlyRate(), lesson.getAddress(), lesson.getPostalCode(), lessonId); 
        return iResult > 0 ? true : false;
    }

    public Boolean deleteLesson(String lessonId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(DELETE_LESSON_SQL, lessonId);
        return iResult > 0 ? true : false;
    }
    
}
