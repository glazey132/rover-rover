import * as types from "../actions/actionTypes";
import { combineReducers } from 'redux';

const cmeData = (state = { 
    isFetching: false,
    timeReceived: null,
    error: false,
    cmeData: []
}, action) => {
    console.log('action in cmedata reducer => ', action)
    switch(action.type) {
        case types.RECEIVE_CME_DATA:
        console.log('receive cme data in reducer. action => ', action)
        return {
            ...state,
            isFetching: false,
            cmeData: action.data,
            timeReceived: action.receivedAt
        }
        default:
            return state
    }
}

const selectedRoverCamera = (state = { }, action) => {
    switch(action.type) {
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cmeData,
    selectedRoverCamera
})

export default rootReducer;