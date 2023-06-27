import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private ADD_GRADE_URL = "api/grade/add";
  private GET_ALL_GRADES_URL = "api/grade/all";
  private GET_GRADE_URL = "api/grade/details/{gradeId}";
  private UPDATE_GRADE_URL = "api/grade/update/{gradeId}";
  private DELETE_GRADE_URL = "api/grade/delete/{gradeId}";

  constructor(private httpClient: HttpClient) { }

  addGrade(grade: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.ADD_GRADE_URL, grade, { responseType: 'json' }));
  }

  getAllGrades(studentId: string): Promise<any> {
    const params = new HttpParams().set('studentId', studentId);
    return firstValueFrom(this.httpClient.get(this.GET_ALL_GRADES_URL, { params, responseType: 'json' }));
  }

  getGrade(gradeId: string): Promise<any> {
    const url = this.GET_GRADE_URL.replace("{gradeId}", gradeId);
    return firstValueFrom(this.httpClient.get<Grade>(url));
  }

  updateGrade(grade: any, gradeId: string): Promise<any> {
    const url = this.UPDATE_GRADE_URL.replace("{gradeId}", gradeId);
    return firstValueFrom(this.httpClient.put(url, grade, { responseType: 'json' }));
  } 
  
  deleteGrade(gradeId: string): Promise<any> {
    const url = this.DELETE_GRADE_URL.replace("{gradeId}", gradeId);
    return firstValueFrom(this.httpClient.delete(url, { responseType: 'json' }));
  } 
  
}
