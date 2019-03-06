import * as GarantiaActions from '../Actions/garantia.actions';

import { Garantia } from '../../models/garantia.model';

export interface GarantiaState {
    garantias: Garantia[];
    isLoading: boolean;
    error: string;
    garantia: Garantia;
}

const stateInit: GarantiaState = {
    garantias: [],
    isLoading: false,
    error: null,
    garantia: null
};

export function GarantiaReducer(state = stateInit, action: GarantiaActions.actions): GarantiaState {
    switch (action.type) {
        case GarantiaActions.GarantiaActionTypes.LoadGarantias:
            return { ...state, garantias: [], isLoading: true };
        case GarantiaActions.GarantiaActionTypes.LoadedGarantia:
            return { ...state, garantia: action.payload, isLoading: false };
        case GarantiaActions.GarantiaActionTypes.LoadedGarantias:
            return { ...state, garantias: action.payload, isLoading: false };
        case GarantiaActions.GarantiaActionTypes.CreateGarantia:
            return { ...state, garantia: new Garantia(), error: null };
        case GarantiaActions.GarantiaActionTypes.ShowGarantia:
        case GarantiaActions.GarantiaActionTypes.SaveGarantia:
        case GarantiaActions.GarantiaActionTypes.EditGarantia:
        case GarantiaActions.GarantiaActionTypes.DeleteGarantia:
            return { ...state, isLoading: true, error: null };
        case GarantiaActions.GarantiaActionTypes.ErrorGarantia:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}
