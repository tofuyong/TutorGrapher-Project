import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentService } from "../services/student.service";
import { mergeMap } from "rxjs/internal/operators/mergeMap";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";
import * as studentActions from './student.action';

@Injectable()
export class StudentEffects {

    constructor(
        private actions$: Actions,
        private studentSvc: StudentService
    ) {}

    loadStudents$ = createEffect(() => 
        this.actions$.pipe(
            ofType(studentActions.fetchStudents),
            mergeMap((action) => this.studentSvc.getAllStudentsOb(action.tutorId)
                .pipe(
                    map(students => studentActions.fetchStudentsSuccess({ students })),
                    catchError(error => of(studentActions.fetchStudentsFailure({ error })))
                )
            )
    ));

    addStudent$ = createEffect(() => 
        this.actions$.pipe(
            ofType(studentActions.addStudent),
            mergeMap((action) => this.studentSvc.addStudentOb(action.student)
                .pipe(
                    map(student => studentActions.addStudentSuccess({ student })),
                    catchError(error => {
                        return of(studentActions.addStudentFailure({ error }));
                    })
                )
            )
    ));

    deleteStudent$ = createEffect(() => 
        this.actions$.pipe(
            ofType(studentActions.deleteStudent),
            mergeMap((action: any) => {
                const { studentId } = action;
                return this.studentSvc.deleteStudentOb(studentId)
                    .pipe(
                        map(() => studentActions.deleteStudentSuccess({ studentId })),
                        catchError(error => {
                            return of(studentActions.deleteStudentFailure({ error }));
                        })
                    )
            })
    ));
}

