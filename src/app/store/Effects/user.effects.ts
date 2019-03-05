import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from '../Actions/user.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError, retry } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { ThrowError } from '../Actions/alert.actions';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsuarioComponent } from '../../pages/dashboard/usuarios/usuario/usuario.component';
import { Constants } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { AppState } from '../app.store';

@Injectable()
export class UserEffects {
    dialogRef: any;
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>
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
    LoadedUsers$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoadedUsers),
        tap((data: userActions.LoadedUsers) => console.log(userActions.UserActionTypes.LoadedUsers, data))
    );

    @Effect({ dispatch: false })
    CreateUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.CreateUser),
        tap((data: userActions.CreateUser) => {
            this.dialogRef = this.dialog.open(UsuarioComponent, { width: '600px', data: false });
            console.log(userActions.UserActionTypes.CreateUser, data);
        })
    );

    @Effect()
    ShowUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.ShowUser),
        tap(data => console.log(userActions.UserActionTypes.ShowUser, data)),
        mergeMap((action: userActions.ShowUser) =>
            this.http.get<User>(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}/${action.payload}`)
                .pipe(
                    map((response) => {
                        this.dialogRef = this.dialog.open(UsuarioComponent, { width: '600px', data: true });
                        return new userActions.LoadedUser(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect()
    SaveUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.SaveUser>(userActions.UserActionTypes.SaveUser),
        tap((data: userActions.SaveUser) => console.log(userActions.UserActionTypes.SaveUser, data)),
        mergeMap((action) =>
            this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}`, action.payload)
                .pipe(
                    map((response) => {
                        this.dialogRef.close();
                        this.snackBar.open(Constants.CREATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new userActions.LoadUsers();
                    }),
                    catchError((reject) => {
                        this.store.dispatch(new ThrowError(reject));
                        return of(new userActions.ErrorUser(reject.error ? reject.error.message : null));
                    })
                )
        )
    );

    @Effect()
    EditUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.EditUser>(userActions.UserActionTypes.EditUser),
        tap((data: userActions.EditUser) => console.log(userActions.UserActionTypes.EditUser, data)),
        mergeMap((action) =>
            this.http.put(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}/${action.payload.id}`, action.payload)
                .pipe(
                    map((response) => {
                        this.dialogRef.close();
                        this.snackBar.open(Constants.UPDATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new userActions.LoadUsers();
                    }),
                    catchError((reject) => {
                        this.store.dispatch(new ThrowError(reject));
                        return of(new userActions.ErrorUser(reject.error ? reject.error.message : null));
                    })
                )
        )
    );

    @Effect()
    DeleteUser$: Observable<Action> = this.actions$.pipe(
        ofType<userActions.DeleteUser>(userActions.UserActionTypes.DeleteUser),
        tap((data: userActions.DeleteUser) => console.log(userActions.UserActionTypes.DeleteUser, data)),
        mergeMap((action) =>
            this.http.delete(`${Constants.API_ENDPOINT}/${Constants.PATH_USUARIOS}/${action.payload}`)
                .pipe(
                    map((response) => {
                        this.dialog.closeAll();
                        this.snackBar.open(Constants.DELETE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new userActions.LoadUsers();
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );
}
