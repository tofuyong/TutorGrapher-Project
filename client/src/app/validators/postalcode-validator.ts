import { FormControl, ValidationErrors } from '@angular/forms';

export class PostalCodeValidator {
    static NumbersOnly(control: FormControl): ValidationErrors | null {
        const postalCode: string = control.value;
        const numberPattern: RegExp = /^[0-9]+$/;

        if (!numberPattern.test(postalCode)) {
            return { "NumbersOnly": true };
        }

        return null;
    }
}