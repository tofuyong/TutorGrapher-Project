import { createFeatureSelector} from '@ngrx/store';

export const selectTab = createFeatureSelector<number>('tab');