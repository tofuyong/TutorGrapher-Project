import { FormControl, ValidationErrors } from "@angular/forms";

export class EmailValidator {
    static ValidEmail(control: FormControl): ValidationErrors | null {
      const email: string = control.value;
      const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!emailPattern.test(email)) {
        return { "ValidEmail": true };
      }
  
      return null;
    }
  }