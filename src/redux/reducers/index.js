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

const latestPhotos = (state = {
    isFetching: false,
    timeReceived: null,
    error: false,
    latestOpportunityPhotos: [],
    latestCuriosityPhotos: [],
}, action) => {
    console.log('action in latest photos reducer => ', action)
    switch(action.type) {
        case types.RECEIVE_LATEST_OPPORTUNITY_PHOTOS:
        console.log('receive opportunity photos in reducer. action => ', action.data.latest_photos)
        return {
            ...state,
            isFetching: false,
            latestOpportunityPhotos: action.data.latest_photos,
            timeReceived: action.receivedAt
        }
        case types.RECEIVE_LATEST_CURIOSITY_PHOTOS:
        console.log('receive latests curiosity photos in reducer. action -> ', action.data.latest_photos)
        return {
            ...state,
            isFetching: false,
            latestCuriosityPhotos: action.data.latest_photos,
            timeReceived: action.receivedAt
        }
        case types.RECEIVE_LATEST_SPIRIT_PHOTOS:
        console.log('receive latests curiosity photos in reducer. action -> ', action.data.latest_photos)
        return {
            ...state,
            isFetching: false,
            latestSpiritPhotos: action.data.latest_photos,
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
    latestPhotos,
    selectedRoverCamera
})

export default rootReducer;