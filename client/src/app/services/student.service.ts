import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private ADD_STUDENT_URL = "api/student/add";
  private GET_ALL_STUDENTS_URL = "api/student/all";
  private GET_STUDENT_URL = "api/student/details/{studentId}";
  private UPDATE_STUDENT_URL = "api/student/update/{studentId}";
  private DELETE_STUDENT_URL = "api/student/delete/{studentId}";
  private COUNT_CURRENT_STUDENT_URL = "api/student/current/count";
  private COUNT_EX_STUDENT_URL = "api/student/past/count";

  constructor(private httpClient: HttpClient) { }

  // Promise
  addStudent(student: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.ADD_STUDENT_URL, student, { responseType: 'json' }));
  }

  // Observable
  addStudentOb(student: any): Observable<any> {
    return this.httpClient.post(this.ADD_STUDENT_URL, student, { responseType: 'json' });
  } 

  // Promise
  getAllStudents(tutorId: number): Promise<any> {
    const params = new HttpParams().set('tutorId', tutorId.toString());
    return firstValueFrom(this.httpClient.get(this.GET_ALL_STUDENTS_URL, { params, responseType: 'json' }));
  } 

  // Observable
  getAllStudentsOb(tutorId: number) {
  const params = new HttpParams().set('tutorId', tutorId.toString());
  return this.httpClient.get<Student[]>(this.GET_ALL_STUDENTS_URL, { params });
  }

  getStudent(studentId: string): Promise<any> {
    const url = this.GET_STUDENT_URL.replace("{studentId}", studentId);
    return firstValueFrom(this.httpClient.get<Student>(url));
  } 

  updateStudent(student: any, studentId: string): Promise<any> {
    const url = this.UPDATE_STUDENT_URL.replace("{studentId}", studentId);
    return firstValueFrom(this.httpClient.put(url, student, { responseType: 'json' }));
  } 

  // Promise
  deleteStudent(studentId: string): Promise<any> {
    const url = this.DELETE_STUDENT_URL.replace("{studentId}", studentId);
    return firstValueFrom(this.httpClient.delete(url, { responseType: 'json' }));
  } 

   // Observable
   deleteStudentOb(studentId: string): Observable<any> {
    const url = this.DELETE_STUDENT_URL.replace("{studentId}", studentId);
    return this.httpClient.delete(url, { responseType: 'json' });
  } 

  countCurrentStudent(tutorId: number): Promise<any> {
    const params = new HttpParams().set('tutorId', tutorId.toString());
    return firstValueFrom(this.httpClient.get(this.COUNT_CURRENT_STUDENT_URL, { params, responseType: 'json' }));
  }

  countExStudent(tutorId: number): Promise<any> {
    const params = new HttpParams().set('tutorId', tutorId.toString());
    return firstValueFrom(this.httpClient.get(this.COUNT_EX_STUDENT_URL, { params, responseType: 'json' }));
  }

}
