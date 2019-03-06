import { Action } from '@ngrx/store';

export enum GarantiaActionTypes {
    LoadGarantias = '[Garantia] LOAD_GARANTIAS',
    LoadedGarantia = '[Garantia] LOADED_GARANTIA',
    LoadedGarantias = '[Garantia] LOADED_GARANTIAS',
    CreateGarantia = '[Garantia] CREATE_GARANTIA',
    ShowGarantia = '[Garantia] SHOW_GARANTIA',
    SaveGarantia = '[Garantia] SAVE_GARANTIA',
    EditGarantia = '[Garantia] EDIT_GARANTIA',
    DeleteGarantia = '[Garantia] DELETE_GARANTIA',
    ErrorGarantia = '[Garantia] ERROR_GARANTIA'
}

export class LoadGarantias implements Action {
    readonly type = GarantiaActionTypes.LoadGarantias;
}

export class LoadedGarantias implements Action {
    readonly type = GarantiaActionTypes.LoadedGarantias;
    constructor(public payload: any) { }
}

export class CreateGarantia implements Action {
    readonly type = GarantiaActionTypes.CreateGarantia;
}

export class ShowGarantia implements Action {
    readonly type = GarantiaActionTypes.ShowGarantia;
    constructor(public payload: any) { }
}

export class LoadedGarantia implements Action {
    readonly type = GarantiaActionTypes.LoadedGarantia;
    constructor(public payload: any) { }
}

export class SaveGarantia implements Action {
    readonly type = GarantiaActionTypes.SaveGarantia;
    constructor(public payload: any) { }
}

export class EditGarantia implements Action {
    readonly type = GarantiaActionTypes.EditGarantia;
    constructor(public payload: any) { }
}

export class DeleteGarantia implements Action {
    readonly type = GarantiaActionTypes.DeleteGarantia;
    constructor(public payload: any) { }
}

export class ErrorGarantia implements Action {
    readonly type = GarantiaActionTypes.ErrorGarantia;
    constructor(public payload: any) { }
}

export type actions = LoadGarantias | LoadedGarantias | CreateGarantia | ShowGarantia | LoadedGarantia
    | SaveGarantia | EditGarantia | DeleteGarantia | ErrorGarantia;
