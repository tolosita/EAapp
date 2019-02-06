import * as AlertActions from '../Actions/alert.actions';

export interface AlertState {
    reject: any;
}

const stateInit: AlertState = {
    reject: {}
};

export function AlertReducer(state = stateInit, action: AlertActions.actions): AlertState {
    switch (action.type) {
        case AlertActions.AlertActionTypes.throwError:
            return { reject: action.payload };
        default:
            return state;
    }
}

