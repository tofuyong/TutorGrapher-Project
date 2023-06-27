package ibf2022.server.controller;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ibf2022.server.models.Tutor;
import ibf2022.server.service.TutorService;

@RestController
@RequestMapping("api/tutor")
public class TutorController {
    
    @Autowired
    TutorService tutorSvc;

    @GetMapping("/details/{tutorId}")
    public ResponseEntity<Tutor> getTutor(@PathVariable int tutorId) {
        Tutor tutor = tutorSvc.getTutor(tutorId);
        if (tutor != null) {
            return ResponseEntity.ok(tutor); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Boolean> insertTutor(@RequestBody Tutor tutor) {
        boolean isInserted = tutorSvc.insertTutor(tutor);
        if (isInserted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);  
        }
    }

    @PutMapping(value = "/update/{tutorId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> updateTutor
        (@RequestPart("tutor") String tutorJson, 
        @RequestPart(required = false) MultipartFile image, 
        @PathVariable int tutorId) throws JsonMappingException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Tutor tutor = objectMapper.readValue(tutorJson, Tutor.class);

        boolean isUpdated = tutorSvc.updateTutor(tutor, image, tutorId);
        if (isUpdated) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }

    @DeleteMapping(path="/deletePhoto/{tutorId}")
    public ResponseEntity<Boolean> deleteTutorPhoto(@PathVariable int tutorId) {
        boolean isPhotoDeleted = tutorSvc.deleteTutorPhoto(tutorId);
        if (isPhotoDeleted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }

    @DeleteMapping("/delete/{tutorId}")
    public ResponseEntity<Boolean> deleteTutor(@PathVariable int tutorId) {
        boolean isDeleted = tutorSvc.deleteTutor(tutorId);
        if (isDeleted) {
            return ResponseEntity.ok(true);  
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false); 
        }
    }
    
}
