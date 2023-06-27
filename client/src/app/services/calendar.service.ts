import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private GET_HOLIDAYS_URL = "api/calendar/all-holidays";

  constructor(private httpClient: HttpClient) { }

  getAllHolidays(): Promise<any> {
    return firstValueFrom(this.httpClient.get(this.GET_HOLIDAYS_URL, { responseType: 'json' }));
  }

}
