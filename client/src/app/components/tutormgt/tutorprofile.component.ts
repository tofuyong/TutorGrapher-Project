import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Tutor } from 'src/app/models/tutor';
import { TutorService } from 'src/app/services/tutor.service';
import { fetchTutor, updateTutor } from 'src/app/store/tutor.action';
import { selectTutor } from 'src/app/store/tutor.selector';
import { EmailValidator } from 'src/app/validators/email-validator';
import { PhoneValidator } from 'src/app/validators/phone-validator';


@Component({
  selector: 'app-tutorprofile',
  templateUrl: './tutorprofile.component.html',
  styleUrls: ['./tutorprofile.component.css']
})
export class TutorprofileComponent implements OnInit, OnDestroy {
  tutorForm!: FormGroup;
  tutorId!: number | null;
  savedTutor!: Tutor;
  isFormSubmitted = false;
  tutorPhoto!: string;
  photoRemoved!: boolean;
  imageData = "";
  blob!: Blob | null;
  isPhotoUpdated: boolean = false;
  private tutorSubscription?: Subscription;

  constructor(private fb: FormBuilder, private router: Router,
              private tutorSvc: TutorService, private store: Store) {
                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                }
               }

  ngOnInit(): void { 
    this.tutorId = this.tutorSvc.getTutorId();
    if (this.tutorId !== null) {
      this.store.dispatch(fetchTutor({ tutorId: this.tutorId }));
      this.tutorSubscription = this.store.select(selectTutor).subscribe(
        (response: Tutor | null) => {
          if (response !== null) {
            this.savedTutor = response;
            this.tutorPhoto = response.photo;
            if (this.tutorPhoto == null) {
              this.blob = null;
            } else {
              this.blob = this.convertImageToBlob('data:image/jpeg;base64,' + this.tutorPhoto, 'image/jpeg');
            }
            console.log('blob', this.blob);
            this.photoRemoved = false;
            this.tutorForm = this.createForm();
          }
        },
        error => {
          console.log('Error while retrieving Tutor', error);
        }
      );
    } else {
      console.log('tutorId is null');
    }
  }

  createForm() {
    return this.fb.group({
      firstName: this.fb.control(this.savedTutor.firstName, Validators.required),
      lastName: this.fb.control(this.savedTutor.lastName, Validators.required ),
      salutation: this.fb.control(this.savedTutor.salutation, Validators.required ), 
      phone: this.fb.control(this.savedTutor.phone, [ Validators.required, Validators.minLength(8), Validators.maxLength(8), PhoneValidator.NumbersOnly ]),
      email: this.fb.control(this.savedTutor.email, [ Validators.required, EmailValidator.ValidEmail ])
    }); 
  }

  hasError(input: string): boolean {
    return !!(this.tutorForm.get(input)?.invalid && this.tutorForm.get(input)?.dirty)
  }

  removePhoto() {
    this.photoRemoved = true;
    this.isPhotoUpdated = false;
    this.tutorPhoto = '/assets/images/unknown.png';
    this.blob = null;
  }

  updatePhoto(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const selectedFile = target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onloadend = () => {
        this.tutorPhoto = fileReader.result as string;
        this.blob = this.convertImageToBlob(this.tutorPhoto, selectedFile.type);
        this.isPhotoUpdated = true;
        this.photoRemoved = false;
      }
    }
  }

  convertImageToBlob(base64Image: string, type: string): Blob {
    const byteString = atob(base64Image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: type });
  }

  submitTutorForm() {
    if (this.tutorForm.valid) {
      const tutor = this.tutorForm.value;
        if(this.tutorId !==null) {
          this.tutorSvc.updateTutor(tutor, this.tutorId.toString(), this.blob)  
          .then(
            response => {
              console.log('Successfully updated tutor: ', response);
              this.isFormSubmitted = true;
              alert('Successfully updated tutor profile');
              this.router.navigated = false;
              this.router.navigate(['/tutor', this.tutorId]);
            },
            error => {
              console.log('Error while updating tutor', error);
              alert('Failed to update tutor');
            }
          );
        } 
        else {
          console.log('tutorId is null');
        }
      }
  }

  ngOnDestroy(): void { 
    this.tutorSubscription?.unsubscribe();
  }

}
