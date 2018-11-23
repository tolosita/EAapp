import { Action } from '@ngrx/store';

export enum NavActionTypes {
    setPage = '[Nav] SET_PAGE'
}

export class SetPage implements Action {
    readonly type = NavActionTypes.setPage;
    constructor(public page: string) { }
}

export type actions = SetPage;
