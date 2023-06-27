import { createAction, props } from "@ngrx/store";

export const changeTab = createAction(
    '[Tab] Change',
    props<{ tabIndex: number }>()
);
