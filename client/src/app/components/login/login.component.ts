import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;
  errorMessage: string = '';
  
  constructor(private fb: FormBuilder, private router: Router, private tutorSvc: TutorService) { }
  
  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      tutorId: this.fb.control('', Validators.required)
    }); 
  }

  submit() {
    if (this.loginForm.valid) {
      const tutorIdValue = this.loginForm.get('tutorId')?.value;
      this.tutorSvc.getTutor(tutorIdValue)
        .then(response => {
          this.tutorSvc.setTutorId(tutorIdValue);
          this.tutorSvc.setLoginStatus(true);
          this.router.navigate(['/dashboard']);
        })
        .catch(error => {
          this.errorMessage = 'Invalid Tutor ID, please try again';
        });
    }
  }

  ngOnDestroy(): void { }

}
