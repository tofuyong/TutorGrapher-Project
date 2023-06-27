import { createReducer, on } from "@ngrx/store";
import { Tutor } from "../models/tutor";
import { fetchTutorSuccess, updateTutorFailure, updateTutorSuccess } from "./tutor.action";

export interface TutorState {
    tutor: Tutor | null;
}

export const initialState: TutorState = {
    tutor: null,
};

export const tutorReducer = createReducer(
    initialState,
    on(fetchTutorSuccess, (state, { tutor }) => ({...state, tutor: tutor})),
    on(updateTutorSuccess, (state, { tutor }) => ({...state, tutor: tutor})),
    on(updateTutorFailure, (state, { error }) => ({...state, error: error})),
);