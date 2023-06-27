package ibf2022.server.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ibf2022.server.models.Report;
import ibf2022.server.models.ReportByTutor;
import ibf2022.server.service.ReportService;
import ibf2022.server.service.S3Service;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("api/report")
public class ReportController {

    @Autowired
    private S3Service s3svc;

    @Autowired
    private ReportService reportSvc;

    @GetMapping("/all")
    public ResponseEntity<List<Report>> getAllReportsByStudentId(@RequestParam int studentId) {
        List<Report> reports = reportSvc.getAllReportsByStudentId(studentId);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/details/{reportId}")
    public ResponseEntity<Report> getReport(@PathVariable String reportId) {
        Report report = reportSvc.getReport(reportId);
        if (report != null) {
            return ResponseEntity.ok(report);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/allByTutor")
    public ResponseEntity<List<ReportByTutor>> getAllReportsByTutorId(@RequestParam int tutorId) {
        List<ReportByTutor> reports = reportSvc.getAllReportsByTutorId(tutorId);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/countByTutor")
    public ResponseEntity<Integer> getReportCountByTutor(@RequestParam int tutorId) {
        Integer count = reportSvc.getReportCountByTutor(tutorId);
        if (count != null) {
            return ResponseEntity.ok(count);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "/save/{studentId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> saveReport(@RequestPart MultipartFile report, @RequestPart String studentIdentifier,
            @PathVariable int studentId) {
        String key = "";
        try {
            key = s3svc.saveReport(report, studentIdentifier, studentId);
            String reportUrl = "https://tofuibfb22022.sgp1.digitaloceanspaces.com/reports/" + key;
            reportSvc.insertReport(reportUrl, studentId);
        } catch (IOException e) {
            e.printStackTrace();
        }

        JsonObject payload = Json.createObjectBuilder()
                .add("reportKey", key)
                .build();

        return ResponseEntity.ok(payload.toString());
    }

    @DeleteMapping("/delete/{reportId}")
    public ResponseEntity<Boolean> deleteReport(@PathVariable String reportId) {
        boolean isDeleted = reportSvc.deleteReport(reportId);
        if (isDeleted) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

}
