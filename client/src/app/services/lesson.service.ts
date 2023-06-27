import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private ADD_LESSON_URL = "api/lesson/add";
  private GET_LESSON_URL = "api/lesson/all";
  private UPDATE_LESSON_URL = "api/lesson/update/{lessonId}";

  constructor(private httpClient: HttpClient) { }

  addLesson(lesson: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.ADD_LESSON_URL, lesson, { responseType: 'json' }));
  }

  getLesson(studentId: string): Promise<any> {
    const params = new HttpParams().set('studentId', studentId);
    return firstValueFrom(this.httpClient.get(this.GET_LESSON_URL, { params, responseType: 'json' }));
  }
  
  updateLesson(lesson: any, lessonId: string): Promise<any> {
    const url = this.UPDATE_LESSON_URL.replace("{lessonId}", lessonId);
    return firstValueFrom(this.httpClient.put(url, lesson, { responseType: 'json' }));
  } 
  
}
