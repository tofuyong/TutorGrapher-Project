package ibf2022.server.service;

import java.io.IOException;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ibf2022.server.models.Student;
import ibf2022.server.repository.StudentRepository;
import ibf2022.server.repository.TutorRepository;

@Service
public class StudentService {
    
    @Autowired
    StudentRepository studentRepo;

    @Autowired
    TutorRepository tutorRepo;

    public List<Student> getAllStudentsByTutorId(int tutorId) {
        return studentRepo.getAllStudentsByTutorId(tutorId);
    }

    public Student getStudent(Integer studentId) {
        return studentRepo.getStudent(studentId);
    }

    public Student insertStudent(Student student) {
        Integer tutorId = student.getTutorId();
        Integer lastStudentId = studentRepo.getLastStudentIdByTutorId(tutorId);
        Integer studentId = lastStudentId != null ? lastStudentId + 1 : tutorId * 1000 + 1;
        student.setStudentId(studentId);
        if(studentRepo.insertStudent(student)) {
            return student;
        } else {
            return null;
        }
    }
    
    public Boolean updateStudent(Student student, Integer studentId) {
        return studentRepo.updateStudent(student, studentId);
    }

    public Boolean updateStudentPhoto(MultipartFile photo, Integer studentId) {
        try {
            byte[] photoBytes = photo.getBytes();
            String photoBase64 = Base64.encodeBase64String(photoBytes);
            return studentRepo.updateStudentPhoto(photoBase64, studentId);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean deleteStudent(Integer studentId) {
        return studentRepo.deleteStudent(studentId);
    }

    public Integer countCurrentStudents(Integer tutorId) {
        return studentRepo.countCurrentStudents(tutorId);
    }

    public Integer countExStudents(Integer tutorId) {
        return studentRepo.countExStudents(tutorId);
    }

}
