import * as types from "../actions/actionTypes";
import { combineReducers } from 'redux';
import cameraUrlMap from '../../assets/camera-url-values';

const cmeData = (state = { 
    isFetching: false,
    timeReceived: null,
    error: false,
    cmeData: []
}, action) => {
    switch(action.type) {
        case types.RECEIVE_CME_DATA:
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
    switch(action.type) {
        case types.RECEIVE_LATEST_OPPORTUNITY_PHOTOS:
        return {
            ...state,
            isFetching: false,
            latestOpportunityPhotos: action.data.latest_photos,
            timeReceived: action.receivedAt
        }
        case types.RECEIVE_LATEST_CURIOSITY_PHOTOS:
        return {
            ...state,
            isFetching: false,
            latestCuriosityPhotos: action.data.latest_photos,
            timeReceived: action.receivedAt
        }
        case types.RECEIVE_LATEST_SPIRIT_PHOTOS:
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

const roverSelections = (state = {
    camera: null,
    rover: null
}, action) => {
    switch(action.type) {
        case types.SET_CURIOSITY_CAMERA_TYPE:
        return {
            ...state,
            camera: action.payload.camera
        }
        case types.RECEIVE_CURIOSITY_CAMERA_PHOTOS:
        return {
            ...state,
            curiosityCameraPhotos: action.data.latest_photos,
        }
        case types.SET_OPPORTUNITY_CAMERA_TYPE:
        return {
            ...state,
            camera: action.payload.camera
        }
        case types.SET_SPIRIT_CAMERA_TYPE:
        return {
            ...state,
            camera: action.payload.camera
        }
        case types.SET_ROVER:
        return {
            ...state,
            roverFullName: action.rover
        }
        default:
            return state
    }
}

const dateTypeSelection = (state = {
    dateType: 'earth'
}, action) => {
    switch(action.type) {
        case types.SET_DATETYPE:
        return {
            ...state,
            dateType: action.payload.dateType
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cmeData,
    latestPhotos,
    roverSelections,
    dateTypeSelection
})

export default rootReducer;