import { createFeatureSelector} from '@ngrx/store';
import { Student } from '../models/student';

export const selectStudents = createFeatureSelector<Student[]>('students');

