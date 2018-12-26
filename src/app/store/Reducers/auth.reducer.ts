import * as AuthActions from '../Actions/auth.actions';
import { AuthActionTypes } from '../Actions/auth.actions';

import { User } from '../../models/user.model';

export interface AuthState {
    user: User;
    isLoading: boolean;
    error: string;
}

const stateInit: AuthState = {
    user: null,
    isLoading: false,
    error: null
};

export function AuthReducer(state = stateInit, action: AuthActions.actions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginUser:
            return { ...state, isLoading: true, error: null };
        case AuthActionTypes.LoggedUser:
            return { ...state, user: action.user, isLoading: false };
        case AuthActionTypes.LoginUserError:
            return { ...state, error: action.error, isLoading: false };
        case AuthActionTypes.LogoutUser:
            return { ...state, user: null };
        default:
            return state;
    }
}

