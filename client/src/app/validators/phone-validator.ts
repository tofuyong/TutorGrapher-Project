import { FormControl, ValidationErrors } from '@angular/forms';

export class PhoneValidator {
    static NumbersOnly(control: FormControl): ValidationErrors | null {
        const phoneNumber: string = control.value;
        const numberPattern: RegExp = /^[89][0-9]+$/;

        if (!numberPattern.test(phoneNumber)) {
            return { "NumbersOnly": true };
        }

        return null;
    }
}