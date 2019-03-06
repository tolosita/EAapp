import { ActionReducerMap } from '@ngrx/store';

import * as fromGarantia from './Reducers/garantia.reducer';
import { GarantiaEffects } from './Effects/garantia.effects';
import * as fromClient from './Reducers/client.reducer';
import { ClientEffects } from './Effects/client.effects';
import * as fromAuth from './Reducers/auth.reducer';
import { AuthEffects } from './Effects/auth.effects';
import * as fromUser from './Reducers/user.reducer';
import { UserEffects } from './Effects/user.effects';
import * as fromAlert from './Reducers/alert.reducer';

export interface AppState {
    auth: fromAuth.AuthState;
    error: fromAlert.AlertState;
    users: fromUser.UserState;
    clients: fromClient.ClientState;
    garantias: fromGarantia.GarantiaState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    error: fromAlert.AlertReducer,
    users: fromUser.UserReducer,
    clients: fromClient.ClientReducer,
    garantias: fromGarantia.GarantiaReducer
};

export const appEffects = [
    AuthEffects,
    UserEffects,
    ClientEffects,
    GarantiaEffects
];
