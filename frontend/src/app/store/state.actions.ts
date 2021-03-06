// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { State } from '../models/app-state.model';
import { Employee } from '../models/employee.model';
import { Config } from '../models/config.model';
import { Review } from '../models/review.model';
import { Task } from '../models/task.model';

// Section 2
export const CHANGE_EMPLOYEE = '[EMPLOYEE] Change'
export const CHANGE_CONFIG = '[CONFIG] Change'
export const CHANGE_REVIEWS = '[REVIEWS] Reload'
export const CHANGE_REVIEW = '[REVIEW] Change'
export const CHANGE_TASKS = '[TASKS] Reload'
export const UPDATE_TASK = '[TASK] UPDATE'
export const REMOVE_TASK = '[TASK] Remove'
export const REMOVE_TUTORIAL = '[TUTORIAL] Remove'
export const CHANGE_CONFIGS = '[CONFIGS] Change'

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

export class ChangeReview implements Action {
    readonly type = CHANGE_REVIEW

    constructor(public payload: Review) { }
}

export class ChangeTasks implements Action {
    readonly type = CHANGE_TASKS

    constructor(public payload: Task[]) { }
}

export class UpdateTask implements Action {
    readonly type = UPDATE_TASK

    constructor(public payload: Task) { }
}

export class ChangeConfigs implements Action {
    readonly type = CHANGE_CONFIGS

    constructor(public payload: Config[]) { }
}

export class RemoveTask implements Action {
    readonly type = REMOVE_TASK

    constructor(public payload: String) { }
}

export class RemoveTutorial implements Action {
    readonly type = REMOVE_TUTORIAL

    constructor(public payload: number) { }
}

// Section 4
export type Actions = ChangeReview | UpdateTask | ChangeConfigs | RemoveTask | ChangeTasks | ChangeEmployee | ChangeConfig | ChangeReviews | RemoveTutorial