import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from '../Actions/auth.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError, retry } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.store';
import { ThrowError } from '../Actions/alert.actions';
import { Constants } from '../../app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthEffects {

    constructor(
        private router: Router,
        private http: HttpClient,
        private actions$: Actions,
        private store: Store<AppState>,
        @Inject('LOCALSTORAGE') private localStorage: any
    ) { }

    @Effect()
    LoginUser$: Observable<Action> = this.actions$.pipe(
        ofType<authActions.LoginUser>(authActions.AuthActionTypes.LoginUser),
        tap(data => console.log(authActions.AuthActionTypes.LoginUser, data)),
        mergeMap((action) =>
            this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_LOGIN}`, action.payload)
                .pipe(
                    retry(1),
                    map((response) => {
                        return new authActions.LoggedUser(response);
                    }),
                    catchError((reject) => {
                        this.store.dispatch(new ThrowError(reject));
                        const error = this.getMessageError(reject.error.message);
                        return of(new authActions.LoginUserError(error));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoggedUser$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LoggedUser),
        tap((data: authActions.LoggedUser) => {
            this.localStorage.setItem('token', data.payload.token);
            this.router.navigate(['/']);
        })
    );

    @Effect({ dispatch: false })
    LogoutUser: Observable<any> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LogoutUser),
        tap((data) => {
            this.router.navigate(['login']);
            this.localStorage.removeItem('token');
        })
    );

    getMessageError(error: String): String {
        return error === 'Bad credentials' ? Constants[402] :
            error === 'User is disabled' ? Constants[401] :
                null;
    }

}
