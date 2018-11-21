import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth/Reducers/auth.reducer';

export interface AppState {
    auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer
};

