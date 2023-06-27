package ibf2022.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ibf2022.server.models.Grade;
import ibf2022.server.service.GradeService;

@RestController
@RequestMapping("api/grade")
public class GradeController {
    
    @Autowired
    GradeService gradeSvc;

    @GetMapping("/all")
    public ResponseEntity<List<Grade>> getAllGradesByStudentId(@RequestParam int studentId) {
        List<Grade> grades = gradeSvc.getAllGradesByStudentId(studentId);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/details/{gradeId}")
    public ResponseEntity<Grade> getGrade(@PathVariable String gradeId) {
        Grade grade = gradeSvc.getGrade(gradeId);
        if (grade != null) {
            return ResponseEntity.ok(grade); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Boolean> insertGrade(@RequestBody Grade grade) {
        boolean isInserted = gradeSvc.insertGrade(grade);
        if (isInserted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);  
        }
    }

    @PutMapping("/update/{gradeId}")
    public ResponseEntity<Boolean> updateGrade(@RequestBody Grade grade, @PathVariable String gradeId) {
        boolean isUpdated = gradeSvc.updateGrade(grade, gradeId);
        if (isUpdated) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }

    @DeleteMapping("/delete/{gradeId}")
    public ResponseEntity<Boolean> deleteGrade(@PathVariable String gradeId) {
        boolean isDeleted = gradeSvc.deleteGrade(gradeId);
        if (isDeleted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }
    
}
