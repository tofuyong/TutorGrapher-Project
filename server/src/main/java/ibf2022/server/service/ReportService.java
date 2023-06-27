package ibf2022.server.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf2022.server.models.Report;
import ibf2022.server.models.ReportByTutor;
import ibf2022.server.repository.ReportRepository;

@Service
public class ReportService {
    
    @Autowired
    ReportRepository reportRepo;

    public List<Report> getAllReportsByStudentId(int studentId) {
        return reportRepo.getAllReportsByStudentId(studentId);
    }

    public Report getReport(String reportId) {
        return reportRepo.getReport(reportId);
    }

    public Boolean insertReport(String reportUrl, int studentId) {
        Report report = new Report();
        report.setReportUrl(reportUrl);
        report.setStudentId(studentId);
        report.setDate(new Date());
        // Create ReportId
        String lastReportId = reportRepo.getLastReportIdByStudentId(studentId);
        String newReportId;
        if (lastReportId !=null) {
            int lastSerialNumber = Integer.parseInt(lastReportId.substring(lastReportId.lastIndexOf('-') + 1));
            int newSerialNumber = lastSerialNumber + 1;
            newReportId = String.format("%sRC-%03d", studentId, newSerialNumber);
        } else {
            newReportId = String.format("%sRC-%03d", studentId, 1);
        }
        report.setReportId(newReportId);
        return reportRepo.insertReport(report);
    }

    public Boolean deleteReport(String reportId) {
        return reportRepo.deleteReport(reportId);
    }

    public List<ReportByTutor> getAllReportsByTutorId(Integer tutorId) {
        return reportRepo.getAllReportsByTutorId(tutorId);
    }

    public Integer getReportCountByTutor(Integer tutorId) {
        return reportRepo.getReportCountByTutor(tutorId);
    }

}
