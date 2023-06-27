import { createAction, props } from "@ngrx/store";
import { Student } from "../models/student";

export const addStudent = createAction(
    '[Student Component] Add Student',
    props<{ student: Student }>()
);

export const addStudentSuccess = createAction(
    '[Student API] Add Student Success',
    props<{ student: Student }>()
);

export const addStudentFailure = createAction(
    '[Student API] Add Student Failure',
    props<{ error: any }>()
);

export const deleteStudent = createAction(
    '[Student Component] Delete Student',
    props<{ studentId: number }>()
);

export const deleteStudentSuccess = createAction(
    '[Student Component] Delete Student Success',
    props<{ studentId: number }>()
);

export const deleteStudentFailure = createAction(
    '[Student Component] Delete Student Failure',
    props<{ error: any }>()
);

export const fetchStudents = createAction(
    '[Student Component] Fetch Students',
    props<{ tutorId: number }>()
);

export const fetchStudentsSuccess = createAction(
    '[Student API] Fetch Students Success',
    props<{ students: Student[] }>()
);

export const fetchStudentsFailure = createAction(
    '[Student API] Fetch Students Failure',
    props<{ error: any }>()
);

export const clearStudents = createAction('[Student] Clear Students');