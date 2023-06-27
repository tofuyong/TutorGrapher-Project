package ibf2022.server.service;

import java.text.DecimalFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf2022.server.models.Grade;
import ibf2022.server.repository.GradeRepository;

@Service
public class GradeService {
    
    @Autowired
    GradeRepository gradeRepo;

    public List<Grade> getAllGradesByStudentId(int studentId) {
        return gradeRepo.getAllGradesByStudentId(studentId);
    }

    public Grade getGrade(String gradeId) {
        return gradeRepo.getGrade(gradeId);
    }

    public Boolean insertGrade (Grade grade) {
        Integer studentId = grade.getStudentId();
        // Create GradeId
        String lastGradeId = gradeRepo.getLastGradeIdByStudentId(studentId);
        String newGradeId;
        if (lastGradeId != null) {
            int lastSerialNumber = Integer.parseInt(lastGradeId.substring(lastGradeId.lastIndexOf('-') + 1));
            int newSerialNumber = lastSerialNumber + 1;
            newGradeId = String.format("%s-%03d", studentId, newSerialNumber);
        } else {
            newGradeId = String.format("%s-%03d", studentId, 1);
        }
        grade.setGradeId(newGradeId);
        float percentageScore = calcPercentageScore(grade);
        grade.setPercentageScore(percentageScore);
        return gradeRepo.insertGrade(grade);
    }

    public Boolean updateGrade(Grade grade, String gradeId) {
        float percentageScore = calcPercentageScore(grade);
        grade.setPercentageScore(percentageScore);
        return gradeRepo.updateGrade(grade, gradeId);
    }

    public Boolean deleteGrade(String gradeId) {
        return gradeRepo.deleteGrade(gradeId);
    }

    // Calculate Percentage Score
    public float calcPercentageScore(Grade grade) {
        float percentageScore = (grade.getScore() / grade.getBaseScore()) * 100; 
        DecimalFormat df = new DecimalFormat("0.0");
        return Float.valueOf(df.format(percentageScore));
    }
    
}

