package ibf2022.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ibf2022.server.models.Student;
import ibf2022.server.service.StudentService;

@RestController
@RequestMapping("api/student")
public class StudentController {
    
    @Autowired
    StudentService studentSvc;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Student>> getAllStudentsByTutorId(@RequestParam int tutorId) {
        List<Student> students = studentSvc.getAllStudentsByTutorId(tutorId);
        if (!students.isEmpty()) {
            return ResponseEntity.ok(students);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/details/{studentId}")
    public ResponseEntity<Student> getStudent(@PathVariable int studentId) {
        Student student = studentSvc.getStudent(studentId);
        if (student != null) {
            return ResponseEntity.ok(student); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PostMapping(path="/add", consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Student> insertStudent(@RequestBody Student student) {
        Student insertedStudent = studentSvc.insertStudent(student);
        if (insertedStudent != null) {
            return ResponseEntity.ok(insertedStudent);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{studentId}")
    public ResponseEntity<Boolean> updateStudent(@RequestBody Student student, @PathVariable int studentId) {
        boolean isUpdated = studentSvc.updateStudent(student, studentId);
        if (isUpdated) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }

    @PutMapping(path="/updatePhoto/{studentId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> updateStudentPhoto(@RequestPart MultipartFile photo, @PathVariable int studentId) {
        boolean isPhotoUpdated = studentSvc.updateStudentPhoto(photo, studentId);
        if (isPhotoUpdated) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }

    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<Boolean> deleteStudent(@PathVariable int studentId) {
        boolean isDeleted = studentSvc.deleteStudent(studentId);
        if (isDeleted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }

    @GetMapping("/current/count")
    public ResponseEntity<Integer> countCurrentStudents(@RequestParam int tutorId) {
        Integer count = studentSvc.countCurrentStudents(tutorId);
        if (count != null) {
            return ResponseEntity.ok(count); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @GetMapping("/past/count")
    public ResponseEntity<Integer> countExStudents(@RequestParam int tutorId) {
        Integer count = studentSvc.countExStudents(tutorId);
        if (count != null) {
            return ResponseEntity.ok(count); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }
    
}
