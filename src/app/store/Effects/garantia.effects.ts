import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as garantiaActions from '../Actions/garantia.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, map, catchError, retry } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { ThrowError } from '../Actions/alert.actions';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsuarioComponent } from '../../pages/dashboard/usuarios/usuario/usuario.component';
import { Constants } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Garantia } from 'src/app/models/garantia.model';
import { AppState } from '../app.store';

@Injectable()
export class GarantiaEffects {
    dialogRef: any;
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>
    ) { }

    @Effect()
    LoadGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.LoadGarantias>(garantiaActions.GarantiaActionTypes.LoadGarantias),
        tap(data => console.log(garantiaActions.GarantiaActionTypes.LoadGarantias, data)),
        mergeMap((action) =>
            this.http.get<Garantia[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}`)
                .pipe(
                    retry(1),
                    map((response) => {
                        return new garantiaActions.LoadedGarantias(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    LoadedGarantias$: Observable<Action> = this.actions$.pipe(
        ofType(garantiaActions.GarantiaActionTypes.LoadedGarantias),
        tap((data: garantiaActions.LoadedGarantias) => console.log(garantiaActions.GarantiaActionTypes.LoadedGarantias, data))
    );

    @Effect({ dispatch: false })
    CreateGarantia$: Observable<Action> = this.actions$.pipe(
        ofType(garantiaActions.GarantiaActionTypes.CreateGarantia),
        tap((data: garantiaActions.CreateGarantia) => {
            this.dialogRef = this.dialog.open(UsuarioComponent, { width: '600px', data: false });
            console.log(garantiaActions.GarantiaActionTypes.CreateGarantia, data);
        })
    );

    @Effect()
    ShowGarantia$: Observable<Action> = this.actions$.pipe(
        ofType(garantiaActions.GarantiaActionTypes.ShowGarantia),
        tap(data => console.log(garantiaActions.GarantiaActionTypes.ShowGarantia, data)),
        mergeMap((action: garantiaActions.ShowGarantia) =>
            this.http.get<Garantia>(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}/${action.payload}`)
                .pipe(
                    map((response) => {
                        this.dialogRef = this.dialog.open(UsuarioComponent, { width: '600px', data: true });
                        return new garantiaActions.LoadedGarantia(response);
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );

    @Effect()
    SaveGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.SaveGarantia>(garantiaActions.GarantiaActionTypes.SaveGarantia),
        tap((data: garantiaActions.SaveGarantia) => console.log(garantiaActions.GarantiaActionTypes.SaveGarantia, data)),
        mergeMap((action) =>
            this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}`, action.payload)
                .pipe(
                    map((response) => {
                        this.dialogRef.close();
                        this.snackBar.open(Constants.CREATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new garantiaActions.LoadGarantias();
                    }),
                    catchError((reject) => {
                        this.store.dispatch(new ThrowError(reject));
                        return of(new garantiaActions.ErrorGarantia(reject.error ? reject.error.message : null));
                    })
                )
        )
    );

    @Effect()
    EditGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.EditGarantia>(garantiaActions.GarantiaActionTypes.EditGarantia),
        tap((data: garantiaActions.EditGarantia) => console.log(garantiaActions.GarantiaActionTypes.EditGarantia, data)),
        mergeMap((action) =>
            this.http.put(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}/${action.payload.id}`, action.payload)
                .pipe(
                    map((response) => {
                        this.dialogRef.close();
                        this.snackBar.open(Constants.UPDATE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new garantiaActions.LoadGarantias();
                    }),
                    catchError((reject) => {
                        this.store.dispatch(new ThrowError(reject));
                        return of(new garantiaActions.ErrorGarantia(reject.error ? reject.error.message : null));
                    })
                )
        )
    );

    @Effect()
    DeleteGarantia$: Observable<Action> = this.actions$.pipe(
        ofType<garantiaActions.DeleteGarantia>(garantiaActions.GarantiaActionTypes.DeleteGarantia),
        tap((data: garantiaActions.DeleteGarantia) => console.log(garantiaActions.GarantiaActionTypes.DeleteGarantia, data)),
        mergeMap((action) =>
            this.http.delete(`${Constants.API_ENDPOINT}/${Constants.PATH_GARANTIAS}/${action.payload}`)
                .pipe(
                    map((response) => {
                        this.dialog.closeAll();
                        this.snackBar.open(Constants.DELETE_SUCCES, Constants.BTN_OK, { duration: 3000 });
                        return new garantiaActions.LoadGarantias();
                    }),
                    catchError((reject) => {
                        return of(new ThrowError(reject));
                    })
                )
        )
    );
}
