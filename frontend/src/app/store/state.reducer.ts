import { Action } from '@ngrx/store'
import * as StateActions from './state.actions'
import { State } from '../models/app-state.model';

// Section 1
const initialState: State = {
    employee: { 
        _id: "5bc07de6d2f53d92ff4f484b",
        first_name: "Michael",
        last_name: "Čada",
        rhnick: "mcada",
        manager: "mcada",
        position: "engineer",
        team_lead: "tplevko"
    }
}

// Section 2
export function stateReducer(state: State = initialState, action: StateActions.Actions) {

    // Section 3
    switch(action.type) {
        case StateActions.CHANGE_STATE:
            state = action.payload
            return state;
        default:
            return state;
    }
}