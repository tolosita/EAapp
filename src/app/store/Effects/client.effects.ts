import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as clientActions from '../Actions/client.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../app.store';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, retry, map, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Client } from '../../models/client.model';
import { ThrowError } from '../Actions/alert.actions';
import { ClienteComponent } from '../../pages/dashboard/clientes/cliente/cliente.component';
import { ShowClient, LoadedClient } from '../Actions/client.actions';

@Injectable()
export class ClientEffects {
    dialogRef: any;
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>
    ) { }

    @Effect()
    LoadClients$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.LoadClients>(clientActions.ClientActionTypes.LoadClients),
        tap(data => console.log(clientActions.ClientActionTypes.LoadClients, data)),
        mergeMap((action) =>
            this.http.get<Client[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_CLIENTES}`)
                .pipe(
                    retry(1),
                    map((response) => {
                        return new clientActions.LoadedClients(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoadedClients$: Observable<Action> = this.actions$.pipe(
        ofType(clientActions.ClientActionTypes.LoadedClients),
        tap((data: clientActions.LoadedClients) => console.log(clientActions.ClientActionTypes.LoadedClients, data))
    );

    @Effect({ dispatch: false })
    CreateClient$: Observable<Action> = this.actions$.pipe(
        ofType(clientActions.ClientActionTypes.CreateClient),
        tap((data: clientActions.CreateClient) => {
            this.dialogRef = this.dialog.open(ClienteComponent, { width: '600px', data: false });
            console.log(clientActions.ClientActionTypes.CreateClient, data);
        })
    );

    @Effect()
    ShowCliente$: Observable<Action> = this.actions$.pipe(
        ofType(clientActions.ClientActionTypes.ShowClient),
        tap(data => console.log(clientActions.ClientActionTypes.ShowClient, data)),
        mergeMap((action: clientActions.ShowClient) =>
            this.http.get<Client>(`${Constants.API_ENDPOINT}/${Constants.PATH_CLIENTES}/${action.payload}`)
                .pipe(
                    map((response) => {
                        this.dialogRef = this.dialog.open(ClienteComponent, { width: '600px', data: true });
                        return new clientActions.LoadedClient(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect()
    SaveClient$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.SaveClient>(clientActions.ClientActionTypes.SaveClient),
        tap((data: clientActions.SaveClient) => console.log(clientActions.ClientActionTypes.SaveClient, data)),
        mergeMap((action) =>
            this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_CLIENTES}`, action.payload)
                .pipe(
                    map((response) => {
                        this.dialogRef.close();
                        this.snackBar.open(Constants.CREATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new clientActions.LoadClients();
                    }),
                    catchError((reject) => {
                        this.store.dispatch(new ThrowError(reject));
                        return of(new clientActions.ErrorClient(reject.error ? reject.error.message : null));
                    })
                )
        )
    );

    @Effect()
    EditClient$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.EditClient>(clientActions.ClientActionTypes.EditClient),
        tap((data: clientActions.EditClient) => console.log(clientActions.ClientActionTypes.EditClient, data)),
        mergeMap((action) =>
            this.http.put(`${Constants.API_ENDPOINT}/${Constants.PATH_CLIENTES}/${action.payload.id}`, action.payload)
                .pipe(
                    map((response) => {
                        this.dialogRef.close();
                        this.snackBar.open(Constants.UPDATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new clientActions.LoadClients();
                    }),
                    catchError((reject) => {
                        this.store.dispatch(new ThrowError(reject));
                        return of(new clientActions.ErrorClient(reject.error ? reject.error.message : null));
                    })
                )
        )
    );

    @Effect()
    DeleteClient$: Observable<Action> = this.actions$.pipe(
        ofType<clientActions.DeleteClient>(clientActions.ClientActionTypes.DeleteClient),
        tap((data: clientActions.DeleteClient) => console.log(clientActions.ClientActionTypes.DeleteClient, data)),
        mergeMap((action) =>
            this.http.delete(`${Constants.API_ENDPOINT}/${Constants.PATH_CLIENTES}/${action.payload}`)
                .pipe(
                    map((response) => {
                        this.dialog.closeAll();
                        this.snackBar.open(Constants.DELETE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new clientActions.LoadClients();
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

}
