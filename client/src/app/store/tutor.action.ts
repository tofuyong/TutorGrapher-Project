import { createAction, props } from "@ngrx/store";
import { Tutor } from "../models/tutor";

export const fetchTutor = createAction(
    '[Tutor] Fetch Tutor',
    props<{ tutorId: number }>()
);

export const fetchTutorSuccess = createAction(
    '[Tutor] Fetch Tutor Success',
    props<{ tutor: Tutor }>()
);

export const fetchTutorFailure = createAction(
    '[Tutor] Fetch Tutor Failure',
    props<{ error: any }>()
);

export const updateTutor = createAction(
    '[Tutor] Update Tutor',
    props<{ tutor: Tutor, tutorId: number, image: Blob | null }>()
)

export const updateTutorSuccess = createAction (
    '[Tutor] Update Tutor Success',
    props<{ tutor: Tutor }>()
)

export const updateTutorFailure = createAction (
    '[Tutor] Update Tutor Failure',
    props<{ error: any }>()
)