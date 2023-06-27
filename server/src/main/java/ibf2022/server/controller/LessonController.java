package ibf2022.server.controller;

import java.util.Optional;

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

import ibf2022.server.models.Lesson;
import ibf2022.server.service.LessonService;

@RestController
@RequestMapping("api/lesson")
public class LessonController {

    @Autowired
    LessonService lessonSvc;

    @GetMapping("/all")
    public ResponseEntity<Lesson> getLessonByStudentId(@RequestParam int studentId) {
        try {
            Optional<Lesson> lessonOptional = lessonSvc.getLessonByStudentId(studentId);
            if (lessonOptional.isPresent()) {
                Lesson lesson = lessonOptional.get();
                return ResponseEntity.ok(lesson);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/details/{lessonId}")
    public ResponseEntity<Lesson> getLesson(@PathVariable String lessonId) {
        Lesson lesson = lessonSvc.getLesson(lessonId);
        if (lesson != null) {
            return ResponseEntity.ok(lesson); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Boolean> insertLesson(@RequestBody Lesson lesson) {
        boolean isInserted = lessonSvc.insertLesson(lesson);
        if (isInserted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);  
        }
    }

    @PutMapping("/update/{lessonId}")
    public ResponseEntity<Boolean> updateLesson(@RequestBody Lesson lesson, @PathVariable String lessonId) {
        boolean isUpdated = lessonSvc.updateLesson(lesson, lessonId);
        if (isUpdated) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }

    @DeleteMapping("/delete/{lessonId}")
    public ResponseEntity<Boolean> deleteLesson(@PathVariable String lessonId) {
        boolean isDeleted = lessonSvc.deleteLesson(lessonId);
        if (isDeleted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }
    
}
