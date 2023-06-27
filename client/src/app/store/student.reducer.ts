import { createReducer, on } from "@ngrx/store";
import { addStudentSuccess, clearStudents, deleteStudent, fetchStudentsSuccess } from "./student.action";
import { Student } from "../models/student";

export const initialState: ReadonlyArray<Student> = [];

export const StudentReducer = createReducer (
    initialState,
    on(fetchStudentsSuccess, (state, { students }) => [...students]),
    on(addStudentSuccess, (state, { student }) => [...state, student]),
    on(deleteStudent, (state, { studentId }) => state.filter(student => student.studentId !== studentId)),
    on(clearStudents, state => [])
);

