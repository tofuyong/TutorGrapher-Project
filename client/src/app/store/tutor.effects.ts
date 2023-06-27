import { Injectable } from "@angular/core";
import { TutorService } from "../services/tutor.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import * as tutorAction from './tutor.action';

@Injectable()
export class TutorEffects {

    constructor(
        private actions$: Actions,
        private tutorSvc: TutorService
    ) {}

    fetchTutor$ = createEffect(() =>
    this.actions$.pipe(
        ofType(tutorAction.fetchTutor),
        tap(() => console.log('fetchTutor effect received action')), // Add this line
        mergeMap((action) => 
            this.tutorSvc.getTutorOb(action.tutorId).pipe(
                tap(() => console.log('Calling the service from fetchTutor effect')), // Add this line
                map(tutor => tutorAction.fetchTutorSuccess({ tutor })),
                catchError(error => of(tutorAction.fetchTutorFailure({ error })))
            )
        )
    ));

    updateTutor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tutorAction.updateTutor),
            mergeMap((action) => this.tutorSvc.updateTutorOb(action.tutor, action.tutorId.toString(), action.image)
                .pipe(
                    map((updatedTutor) => tutorAction.updateTutorSuccess({ tutor: updatedTutor })),
                    catchError(error => of (tutorAction.updateTutorFailure ({ error })))
                )
            )
        )
    );
}