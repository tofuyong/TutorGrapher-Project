import { createReducer, on } from "@ngrx/store";
import { changeTab } from "./tab.action";

export const initialState = 0;

export const TabReducer = createReducer(
    initialState,
    on(changeTab, (state, { tabIndex }) => tabIndex)
);
