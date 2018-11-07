import { Action } from '@ngrx/store'
import * as StateActions from './state.actions'
import { State } from '../models/app-state.model';
import { ReviewService } from '../services/review/review.service';

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
    },
    period: {
        _id: "5bdf4f68b6aacc3b533f7729",
        date_from: new Date('2018-07-03T22:00:00.000Z'),
        date_to: new Date("2018-06-04T22:00:00.000Z")
    },
    reviews: [],
    tasks: [],
}

// Section 2
export function stateReducer(state: State = initialState, action: StateActions.Actions) {

    // Section 3
    switch (action.type) {
        case StateActions.CHANGE_EMPLOYEE:
            //probably not the best approach, but should work
            console.log('reducer dispatching CHANGE_EMPLOYEE:')
            console.log(action.payload)
            state.employee = action.payload
            return state;
        case StateActions.CHANGE_CONFIG:
            //probably not the best approach, but should work
            state.period = action.payload
            return state;
        case StateActions.CHANGE_REVIEWS:
            //probably not the best approach, but should work
            console.log('reducer dispatching CHANGE_REVIEWS')
            state.reviews = action.payload
            return state;
        case StateActions.CHANGE_TASKS:
            //probably not the best approach, but should work
            console.log('reducer dispatching CHANGE_TASKS')
            state.tasks = action.payload
            return state;
        case StateActions.REMOVE_TASK:
            //probably not the best approach, but should work
            state.tasks = state.tasks.filter(x => !(x._id == action.payload))
            return state;
        default:
            return state;
    }
}