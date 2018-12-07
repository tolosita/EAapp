import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
    LoginUser = '[Auth] LOGIN_USER',
    LoggedUser = '[Auth] LOGGED_USER',
    LogoutUser = '[Auth] LOGOUT_USER',
    LoginUserError = '[Auth] LOGIN_USER_ERROR'
}

export class LoginUser implements Action {
    readonly type = AuthActionTypes.LoginUser;
}

export class LoggedUser implements Action {
    readonly type = AuthActionTypes.LoggedUser;
    constructor(public user: User) { }
}

export class LoginUserError implements Action {
    readonly type = AuthActionTypes.LoginUserError;
    constructor(public error: any) { }
}

export class LogoutUser implements Action {
    readonly type = AuthActionTypes.LogoutUser;
}

export type actions = LoginUser | LoggedUser | LogoutUser | LoginUserError;
