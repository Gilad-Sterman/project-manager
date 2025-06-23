import { userService } from "../services/user.service";

export const SET_TASKS = 'SET_TASKS'

const initialState = {
    tasks: [],
}

export function taskReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_TASKS:
            newState = { ...state, user: action.user }
            break
        default:
    }
    return newState
}