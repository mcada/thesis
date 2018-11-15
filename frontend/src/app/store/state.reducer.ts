import { Action } from '@ngrx/store'
import * as StateActions from './state.actions'
import { State } from '../models/app-state.model';
import { ReviewService } from '../services/review/review.service';
import { Task } from '../models/task.model';
import { Review } from '../models/review.model';

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
    review: {
        _id: "5bdf4f68b6aacc3b533f772a",
        feedback_manager: "",
        feedback_team_lead: "",
        owner: {
            _id: "5bc07de6d2f53d92ff4f484b",
            first_name: "Michael",
            last_name: "Čada",
            rhnick: "mcada",
            manager: "mcada",
            position: "engineer",
            team_lead: "tplevko"
        },
        period: "5bdf4f68b6aacc3b533f7729",
        points_from_team_lead: 0,
        points_from_manager: 0,
        total_points: 0,
        total_points_from_tasks: 0,
    },
    period: {
        _id: "5bdf4f68b6aacc3b533f7729",
        date_from: new Date('2018-07-03T22:00:00.000Z'),
        date_to: new Date("2018-06-04T22:00:00.000Z")
    },
    reviews: [],
    tasks: [],
    configs: []
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
        case StateActions.CHANGE_CONFIGS:
            //probably not the best approach, but should work
            state.configs = action.payload.sort((a, b) => b.date_from > a.date_from ? -1 : 1)
            return state;
        case StateActions.CHANGE_REVIEWS:
            //probably not the best approach, but should work
            console.log('reducer dispatching CHANGE_REVIEWS')
            // TODO: sort by two fields - if points are 0 the position is random :(
            state.reviews = action.payload.sort((a, b) => b.total_points - a.total_points)
            return state;
        case StateActions.CHANGE_REVIEW:
            //probably not the best approach, but should work
            console.log('reducer dispatching CHANGE_REVIEW')
            console.log(action.payload)
            state.review = action.payload

            //remove outdated review
            state.reviews = state.reviews.filter(x => x._id != action.payload._id)
            //add updated review
            state.reviews = [...state.reviews, action.payload].sort((a, b) => b.total_points - a.total_points)
            return state;
        case StateActions.CHANGE_TASKS:
            //probably not the best approach, but should work
            console.log('reducer dispatching CHANGE_TASKS')
            state.tasks = action.payload.sort((a, b) => b.date > a.date ? -1 : 1)
            return state;
        case StateActions.UPDATE_TASK:
            //probably not the best approach, but should work
            console.log('reducer dispatching UPDATE_TASK')
            //remove outdated task
            state.tasks = state.tasks.filter(x => x._id != action.payload._id)
            //add updated task
            state.tasks = [...state.tasks, action.payload].sort((a, b) => b.date > a.date ? -1 : 1)
            return state;
        case StateActions.REMOVE_TASK:
            //probably not the best approach, but should work
            state.tasks = state.tasks.filter(x => !(x._id == action.payload))
            return state;
        default:
            return state;
    }
}