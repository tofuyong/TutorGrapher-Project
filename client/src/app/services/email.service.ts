import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private CONTACT_US_URL = "api/email/contact-admin";

  constructor(private httpClient: HttpClient) { }

  sendContactUsEmail(emailData: any): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.CONTACT_US_URL, emailData, { responseType: 'json' }));
  }
  
}
