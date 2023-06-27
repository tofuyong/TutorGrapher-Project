package ibf2022.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf2022.server.models.Observation;
import ibf2022.server.repository.ObservationRepository;

@Service
public class ObservationService {

    @Autowired
    ObservationRepository observationRepo;

    public List<Observation> getObservationsByStudentId(int studentId) {
        return observationRepo.getObservationsByStudentId(studentId);
    }

    public Observation getObservation(String observationId) {
        return observationRepo.getObservation(observationId);
    }

    public Boolean insertObservation(Observation observation) {
        Integer studentId = observation.getStudentId();
         // Create ObservationId
        String lastObservationId = observationRepo.getLastObservationIdByStudentId(studentId);
        String newObservationId;
        if (lastObservationId !=null) {
            int lastSerialNumber = Integer.parseInt(lastObservationId.substring(lastObservationId.lastIndexOf('-') + 1));
            int newSerialNumber = lastSerialNumber + 1;
            newObservationId = String.format("%sOB-%03d", studentId, newSerialNumber);
        } else {
            newObservationId = String.format("%sOB-%03d", studentId, 1);
        }
        observation.setObservationId(newObservationId);
        return observationRepo.insertObservation(observation);
    }

    public Boolean updateObservation(Observation observation, String observationId) {
        return observationRepo.updateObservation(observation, observationId);
    }

    public Boolean deleteObservation(String observationId) {
        return observationRepo.deleteObservation(observationId);
    }

    public Integer getObservationCountByTutor(Integer tutorId) {
        return observationRepo.getObservationCountByTutor(tutorId);
    }
    
}
