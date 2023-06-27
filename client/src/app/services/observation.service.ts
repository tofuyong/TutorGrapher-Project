import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  private ADD_OBSERVATION_URL = "api/observation/add";
  private GET_ALL_OBSERVATIONS_URL = "api/observation/all";
  private GET_OBSERVATION_URL = "api/observation/details/{observationId}";
  private UPDATE_OBSERVATION_URL = "api/observation/update/{observationId}";
  private DELETE_OBSERVATION_URL = "api/observation/delete/{observationId}";
  private GET_OBSERVATION_COUNT_BY_TUTOR_URL = "api/observation/count/{tutorId}";

  constructor(private httpClient: HttpClient) { }

  addObservation(observation: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.ADD_OBSERVATION_URL, observation, { responseType: 'json' }));
  }

  getAllObservations(studentId: string): Promise<any> {
    const params = new HttpParams().set('studentId', studentId);
    return firstValueFrom(this.httpClient.get(this.GET_ALL_OBSERVATIONS_URL, { params, responseType: 'json' }));
  }

  getObservation(observationId: string): Promise<any> {
    const url = this.GET_OBSERVATION_URL.replace("{observationId}", observationId);
    return firstValueFrom(this.httpClient.get(url, { responseType: 'json' }));
  }

  getObservationCountByTutor(tutorId: number): Promise<any> {
    const url = this.GET_OBSERVATION_COUNT_BY_TUTOR_URL.replace("{tutorId}", tutorId.toString());
    return firstValueFrom(this.httpClient.get(url, { responseType: 'json' }));
  }
  
  updateObservation(observation: any, observationId: string): Promise<any> {
    const url = this.UPDATE_OBSERVATION_URL.replace("{observationId}", observationId);
    return firstValueFrom(this.httpClient.put(url, observation, { responseType: 'json' }));
  } 

  deleteObservation(observationId: string): Promise<any> {
    const url = this.DELETE_OBSERVATION_URL.replace("{observationId}", observationId);
    return firstValueFrom(this.httpClient.delete(url, { responseType: 'json' }));
  } 

}
