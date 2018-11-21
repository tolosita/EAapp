import * as fromAuth from '../Actions/auth.actions';
import { User } from '../Models/user.model';

export interface AuthState {
    user: User;
}

const estadoInicial: AuthState = {
    user: null
};

export function authReducer(state = estadoInicial, action: fromAuth.acciones): AuthState {

    switch (action.type) {

        case fromAuth.SET_USER:
            return {
                user: { ...action.user }
            };

        case fromAuth.UNSET_USER:
            return {
                user: null
            };

        default:
            return state;

    }


}

