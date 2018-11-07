// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { State } from '../models/app-state.model';
import { Employee } from '../models/employee.model';
import { Config } from '../models/config.model';
import { Review } from '../models/review.model';

// Section 2
export const CHANGE_EMPLOYEE = '[EMPLOYEE] Change'
export const CHANGE_CONFIG = '[CONFIG] Change'
export const CHANGE_REVIEWS = '[REVIEWS] Reload'

export const REMOVE_TUTORIAL = '[TUTORIAL] Remove'


// Section 3
export class ChangeEmployee implements Action {
    readonly type = CHANGE_EMPLOYEE

    constructor(public payload: Employee) { }
}

export class ChangeConfig implements Action {
    readonly type = CHANGE_CONFIG

    constructor(public payload: Config) { }
}

export class ChangeReviews implements Action {
    readonly type = CHANGE_REVIEWS

    constructor(public payload: Review[]) { }
}

export class RemoveTutorial implements Action {
    readonly type = REMOVE_TUTORIAL

    constructor(public payload: number) { }
}

// Section 4
export type Actions = ChangeEmployee | ChangeConfig | ChangeReviews | RemoveTutorial