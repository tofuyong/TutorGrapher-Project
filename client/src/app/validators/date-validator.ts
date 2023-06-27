import { FormControl, ValidationErrors } from '@angular/forms';

export class DateValidator {
    static LaterThanToday(control: FormControl): ValidationErrors | null {
        let today: Date = new Date();

        if (new Date(control.value) > today) {
            return { "LaterThanToday": true };
        }
            
        return null;
    }

    static BeforeTwoZero(control: FormControl): ValidationErrors | null {
        const dateToCompare: Date = new Date(2020, 0, 1);

        if (new Date(control.value) < dateToCompare) {
            return { "BeforeTwoZero": true };
        }

        return null;
    }
}