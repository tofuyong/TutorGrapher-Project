import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private tutorId!: number;
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  private GET_TUTOR_URL = "api/tutor/details/{tutorId}";
  private UPDATE_TUTOR_URL = "api/tutor/update/{tutorId}";
  private DELETE_TUTOR_PHOTO_URL = "api/tutor/deletePhoto/{tutorId}";

  constructor(private httpClient: HttpClient) { }

  setTutorId(tutorId: number) { this.tutorId = tutorId; }
  getTutorId() { return this.tutorId; }
  setLoginStatus(status: boolean) { this.isLoggedIn.next(status); }
  getLoginStatus() { return this.isLoggedIn.asObservable(); }

  // Promise
  getTutor(tutorId: number): Promise<any> {
    const url = this.GET_TUTOR_URL.replace('{tutorId}', tutorId.toString());
    return firstValueFrom(this.httpClient.get(url, { responseType: 'json' }));
  }

  // Observable
  getTutorOb(tutorId: number): Observable<any> {
    const url = this.GET_TUTOR_URL.replace('{tutorId}', tutorId.toString());
    return this.httpClient.get(url, { responseType: 'json' });
  }

  // Promise
  updateTutor(tutor: any, tutorId: string, image: Blob | null): Promise<any> {
    const url = this.UPDATE_TUTOR_URL.replace("{tutorId}", tutorId);
    const formData: FormData = new FormData();
    formData.append('tutor', JSON.stringify(tutor));
    // Append image if it exists
    if (image !== null) {
      formData.append('image', image);
    }
    return firstValueFrom(this.httpClient.put(url, formData, { responseType: 'json' }));
  }

  // Observable
  updateTutorOb(tutor: any, tutorId: string, image: Blob | null): Observable<any> {
    const url = this.UPDATE_TUTOR_URL.replace("{tutorId}", tutorId.toString());
    const formData: FormData = new FormData();
    formData.append('tutor', JSON.stringify(tutor));
    // Append image if it exists
    if (image !== null) {
      formData.append('image', image);
    } 
    // else???
    return this.httpClient.put(url, formData, { responseType: 'json' });
  }
  
  deleteTutorPhoto(tutorId: string): Promise<any> {
    const url = this.DELETE_TUTOR_PHOTO_URL.replace("{tutorId}", tutorId);
    return firstValueFrom(this.httpClient.delete(url, { responseType: 'json' }));
  } 

  logout() {
    this.tutorId = 0;
    this.setLoginStatus(false);
    // add on
    localStorage.removeItem('tutorId');
    localStorage.removeItem('isLoggedIn');
  }
  
}
