import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tutor } from 'src/app/models/tutor';
import { EmailService } from 'src/app/services/email.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  tutorId!: number;
  tutor!: Tutor;
  contactForm!: FormGroup;
  isFormSubmitted = false;
  successMsg: string = "";
  isLoading = false;
  
  constructor(private tutorSvc: TutorService, private fb: FormBuilder,
              private emailSvc: EmailService){ }
  
  ngOnInit(): void {
    this.tutorId = this.tutorSvc.getTutorId();
    if (this.tutorId !== null) {
      this.tutorSvc.getTutor(this.tutorId)
        .then(
          (response: Tutor) => {
            this.tutor = response;
            this.contactForm = this.createForm();
            console.log('Tutor retrieved successfully.');
          },
        error => {
          console.log('Error while retrieving Tutor', error);
        }
        );
    };
  }

  createForm() {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedDate = formatter.format(currentDate); 
    return this.fb.group({
      name: this.fb.control(this.tutor.firstName + " " + this.tutor.lastName),
      date: this.fb.control(formattedDate),
      email: this.fb.control(this.tutor.email),
      subject: this.fb.control('', Validators.required),
      message: this.fb.control('', Validators.required),
    }); 
  }

  submitContactForm() {
    this.isLoading = true;
    const emailData = {
      name: this.contactForm.value.name,
      userEmail: this.contactForm.value.email,
      date: this.contactForm.value.date,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message,
    }

    this.emailSvc.sendContactUsEmail(emailData)
      .then(
        response => {
          console.log('Email sent to admin successfully', response);
          this.isFormSubmitted = true;
          this.contactForm = this.createForm();
          this.successMsg = "Email has been sent to admin. You will receive a reply within 3 working days.";
          this.isLoading = false;
        },
        error => {
          console.log('Failed to send email to admin', error);
          this.isLoading = false;
        }
      );
  }

  resetSuccessMsg() {
    this.successMsg = '';
  }

}
