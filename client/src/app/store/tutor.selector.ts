import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Tutor } from "../models/tutor";
import { TutorState } from "./tutor.reducer";

export const selectTutorState = createFeatureSelector<TutorState>('tutor');

export const selectTutor = createSelector(
  selectTutorState,
  (state: TutorState) => state.tutor
);