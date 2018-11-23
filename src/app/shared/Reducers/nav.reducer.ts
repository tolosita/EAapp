import * as NavActions from '../Actions/nav.actions';
import { NavActionTypes } from '../Actions/nav.actions';

export interface NavState {
    page: string;
}

const stateInit: NavState = {
    page: ''
};

export function NavReducer(state = stateInit, action: NavActions.actions): NavState {
    switch (action.type) {
        case NavActionTypes.setPage:
            return { page: action.page };
        default:
            return state;
    }
}

