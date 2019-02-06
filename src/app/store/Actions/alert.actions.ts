import { Action } from '@ngrx/store';

export enum AlertActionTypes {
    throwError = '[Alert] THROW_ERROR'
}

export class ThrowError implements Action {
    readonly type = AlertActionTypes.throwError;
    constructor(public payload: any) { }
}

export type actions = ThrowError;
