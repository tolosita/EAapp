import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth/Reducers/auth.reducer';
import * as fromNav from './shared/Reducers/nav.reducer';

export interface AppState {
    auth: fromAuth.AuthState;
    nav: fromNav.NavState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    nav: fromNav.NavReducer
};

