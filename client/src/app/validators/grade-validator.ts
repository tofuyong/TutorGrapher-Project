import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class GradeValidator {
    static WholeOrHalfPoint(control: FormControl): ValidationErrors | null {
        const value: number = control.value;

        if (value < 0) {
            return { "NegativeValue": true };
        }

        const isHalfPoint = (value * 2) % 1 === 0;
        if (!isHalfPoint) {
            return { "NotWholeOrHalfPoint": true };
        }

        return null;
    }

    static ScoreLessThanOrEqualBase(control: FormGroup): ValidationErrors | null {
        const score = control.get('score')?.value;
        const baseScore = control.get('baseScore')?.value;

        if (score > baseScore) {
            return { "ScoreHigherThanBase": true };
        }

        return null;
    }
}