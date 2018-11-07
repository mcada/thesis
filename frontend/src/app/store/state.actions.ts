// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { State } from '../models/app-state.model';

// Section 2
export const CHANGE_STATE       = '[STATE] Change'
export const REMOVE_TUTORIAL    = '[TUTORIAL] Remove'

// Section 3
export class ChangeState implements Action {
    readonly type = CHANGE_STATE
    
    constructor(public payload: State) {}
}

export class RemoveTutorial implements Action {
    readonly type = REMOVE_TUTORIAL

    constructor(public payload: number) {}
}

// Section 4
export type Actions = ChangeState | RemoveTutorial