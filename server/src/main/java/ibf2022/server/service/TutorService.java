package ibf2022.server.service;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ibf2022.server.models.Tutor;
import ibf2022.server.repository.TutorRepository;

@Service
public class TutorService {
    
    @Autowired
    TutorRepository tutorRepo;

    public Tutor getTutor(Integer tutorId) {
        return tutorRepo.getTutor(tutorId);
    }

    public Boolean insertTutor(Tutor tutor) {
        return tutorRepo.insertTutor(tutor);
    }

    public Boolean updateTutor(Tutor tutor, MultipartFile image, Integer tutorId) {
        try {
            if (image != null && !image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                String imageBase64 = Base64.getEncoder().encodeToString(imageBytes);
                tutor.setPhoto(imageBase64);
            }
            return tutorRepo.updateTutor(tutor, tutorId);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean deleteTutor(Integer tutorId) {
        return tutorRepo.deleteTutor(tutorId);
    }

    public Boolean deleteTutorPhoto(Integer tutorId) {
        return tutorRepo.deleteTutorPhoto(tutorId);
    }

}
