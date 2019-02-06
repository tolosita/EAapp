import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from '../Actions/user.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError, retry } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ThrowError } from '../Actions/alert.actions';
import { MatDialog } from '@angular/material';
import { UsuarioComponent } from '../../pages/shared/dialog/usuario/usuario.component';
import { Constants } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable()
export class UserEffects {
    dialogRef: any;
    constructor(
        private dialog: MatDialog,
        private actions$: Actions,
        private http: HttpClient
    ) { }

    @Effect()
    LoadUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.LoadUsers>(userActions.UserActionTypes.LoadUsers),
        tap(data => console.log(userActions.UserActionTypes.LoadUsers, data)),
        mergeMap((action) =>
            this.http.get<User[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}`)
                .pipe(
                    retry(1),
                    map((response) => {
                        return new userActions.LoadedUsers(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoadedUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoadedUsers),
        tap((data: userActions.LoadedUsers) => console.log(userActions.UserActionTypes.LoadedUsers, data))
    );

    @Effect({ dispatch: false })
    CreateUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.CreateUser),
        tap((data: userActions.CreateUser) => {
            this.dialogRef = this.dialog.open(UsuarioComponent, { width: '600px', data: true });
            console.log(userActions.UserActionTypes.CreateUser, data);
        })
    );

    @Effect()
    SaveUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.SaveUser>(userActions.UserActionTypes.SaveUser),
        tap((data: userActions.SaveUser) => console.log(userActions.UserActionTypes.SaveUser, data)),
        mergeMap((action) =>
            this.http.post<User>(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}`, action.payload)
                .pipe(
                    retry(1),
                    map((response) => {
                        console.log(response);
                        this.dialogRef.close();
                        return new userActions.LoadUsers();
                    }),
                    catchError((reject) => {
                        console.log(reject);
                        return of(new ThrowError(reject));
                    })
                )
        )
    );
}
