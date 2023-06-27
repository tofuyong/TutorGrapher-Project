package ibf2022.server.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf2022.server.models.Report;
import ibf2022.server.models.ReportByTutor;

@Repository
public class ReportRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String GET_ALL_REPORTS_BY_STUDENT_ID_SQL = "SELECT * from report where studentId = ?";
    private static final String GET_REPORT_BY_ID_SQL = "SELECT * from report where reportId = ?";
    private static final String INSERT_REPORT_SQL = """ 
                                                    INSERT INTO report 
                                                    (reportId, date, reportUrl, studentId) 
                                                    VALUES (?, ?, ?, ?)""";
    private static final String DELETE_REPORT_SQL = "DELETE FROM report  WHERE reportId = ?";
    private static final String GET_LAST_REPORT_ID_BY_STUDENT_SQL = "SELECT reportId FROM report WHERE studentId = ? ORDER BY reportId DESC LIMIT 1";
    private static final String GET_ALL_REPORTS_BY_TUTOR_ID_SQL = """
                                                                SELECT report.*, student.firstName AS studentFirstName, student.lastName AS studentLastName
                                                                FROM report 
                                                                INNER JOIN student 
                                                                ON report.studentId = student.studentId
                                                                INNER JOIN tutor
                                                                ON student.tutorId = tutor.tutorId
                                                                WHERE tutor.tutorId = ?""";
    private static final String GET_REPORT_COUNT_BY_TUTOR_SQL = """
                                                                SELECT COUNT(report.reportId) AS reportCount FROM tutor
                                                                LEFT JOIN student 
                                                                ON tutor.tutorId = student.tutorId
                                                                LEFT JOIN report 
                                                                ON student.studentId = report.studentId
                                                                WHERE tutor.tutorId = ?""";

    public List<Report> getAllReportsByStudentId(int studentId) {
        return jdbcTemplate.query(GET_ALL_REPORTS_BY_STUDENT_ID_SQL, BeanPropertyRowMapper.newInstance(Report.class), studentId);
    }

    public Report getReport(String reportId) {
        return jdbcTemplate.queryForObject(GET_REPORT_BY_ID_SQL, BeanPropertyRowMapper.newInstance(Report.class), reportId);
    }

    public Boolean insertReport(Report report) {
        int iCreated = 0;
        iCreated = jdbcTemplate.update(INSERT_REPORT_SQL, report.getReportId(), report.getDate(), report.getReportUrl(), report.getStudentId());
        return iCreated > 0 ? true : false;
    }

    public Boolean deleteReport(String reportId) {
        int iResult = 0;
        iResult = jdbcTemplate.update(DELETE_REPORT_SQL, reportId);
        return iResult > 0 ? true : false;
    }

    public String getLastReportIdByStudentId(Integer studentId) {
        try {
            return jdbcTemplate.queryForObject(GET_LAST_REPORT_ID_BY_STUDENT_SQL, String.class, studentId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<ReportByTutor> getAllReportsByTutorId(Integer tutorId) {
        return jdbcTemplate.query(GET_ALL_REPORTS_BY_TUTOR_ID_SQL, BeanPropertyRowMapper.newInstance(ReportByTutor.class), tutorId);
    }

    public Integer getReportCountByTutor(Integer tutorId) {
        return jdbcTemplate.queryForObject(GET_REPORT_COUNT_BY_TUTOR_SQL, Integer.class, tutorId);
    }

}
