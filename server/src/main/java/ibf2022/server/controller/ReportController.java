package ibf2022.server.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
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

import com.mongodb.client.gridfs.model.GridFSFile;

import ibf2022.server.models.Report;
import ibf2022.server.models.ReportByTutor;
import ibf2022.server.service.ReportService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("api/report")
public class ReportController {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations gridFsOperations;

    @Autowired
    private ReportService reportSvc;

    @GetMapping("/all")
    public ResponseEntity<List<Report>> getAllReportsByStudentId(@RequestParam int studentId) {
        List<Report> reports = reportSvc.getAllReportsByStudentId(studentId);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/details/{reportId}")
    public ResponseEntity<GridFsResource> getReport(@PathVariable String reportId) {
        Report report = reportSvc.getReport(reportId);
        if (report == null) {
            return ResponseEntity.notFound().build();
        }

        GridFSFile gridFsFile = gridFsOperations.findOne(new Query(Criteria.where("_id").is(report.getReportUrl())));
    
        GridFsResource resource = gridFsOperations.getResource(gridFsFile);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + gridFsFile.getFilename());
        return ResponseEntity.ok()
            .headers(headers)
            .contentType(MediaType.parseMediaType(gridFsFile.getMetadata().getString("_contentType")))
            .body(resource);
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

        String fileId = "";
        try {
            // Convert MultipartFile to InputStream
            InputStream io = new ByteArrayInputStream(report.getBytes());
            // Use GridFsTemplate to save the report in Mongo
            fileId = gridFsTemplate.store(io, report.getOriginalFilename(), report.getContentType()).toString();
            // And save the Mongo fileId in SQL for future retrieval
            reportSvc.insertReport(fileId, studentId);
            } catch (IOException e) {
                e.printStackTrace();
        }

        JsonObject payload = Json.createObjectBuilder()
                .add("fileId", fileId)
                .build();

        return ResponseEntity.ok(payload.toString());
    }

    @DeleteMapping("/delete/{reportId}")
    public ResponseEntity<Boolean> deleteReport(@PathVariable String reportId) {
        Report report = reportSvc.getReport(reportId);
        if (report == null) {
            return ResponseEntity.notFound().build();
        }

        // Delete the file from MongoDB GridFS
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(report.getReportUrl())));

        // Delete the report from mySQL
        boolean isDeleted = reportSvc.deleteReport(reportId);
        if (isDeleted) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

}
