import * as types from "../actions/actionTypes";
import { combineReducers } from 'redux';
import cameraUrlMap from '../../assets/camera-url-values';
import moment from 'moment';

const cmeData = (state = { 
    isCMEFetching: true,
    timeReceived: null,
    error: false,
    cmeData: []
}, action) => {
    switch(action.type) {
        case types.RECEIVE_CME_DATA:
        return {
            ...state,
            isCMEFetching: false,
            cmeData: action.data,
            timeReceived: action.receivedAt
        }
        default:
            return state
    }
}

const latestPhotos = (state = {
    isPhotoFetching: true,
    timeReceived: null,
    error: false,
    latestOpportunityPhotos: [],
    latestCuriosityPhotos: [],
}, action) => {
    switch(action.type) {
        case types.RECEIVE_LATEST_OPPORTUNITY_PHOTOS:
        return {
            ...state,
            isPhotoFetching: false,
            latestOpportunityPhotos: action.data.latest_photos,
            timeReceived: action.receivedAt
        }
        case types.RECEIVE_LATEST_CURIOSITY_PHOTOS:
        return {
            ...state,
            isPhotoFetching: false,
            latestCuriosityPhotos: action.data.latest_photos,
            timeReceived: action.receivedAt
        }
        case types.RECEIVE_LATEST_SPIRIT_PHOTOS:
        return {
            ...state,
            isPhotoFetching: false,
            latestSpiritPhotos: action.data.latest_photos,
            timeReceived: action.receivedAt
        }
        default:
            return state
    }
}

const roverSelections = (state = {
    camera: "All",
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

const dates = (state = {
    dateType: 'earth_date',
    isCameraPhotosFetching: false
}, action) => {
    switch(action.type) {
        case types.SET_DATETYPE:
        return {
            ...state,
            dateType: action.payload
        }
        case types.SET_SEARCH_DATE:
        return {
            ...state,
            solDate: action.payload.solDate || null,
            date: moment(action.payload.date).format("YYYY-MM-DD") || null,
            isCameraPhotosFetching: true
        }
        case types.RECEIVE_DATE_PHOTOS:
        return {
            ...state,
            datePhotos: action.data.photos,
            isCameraPhotosFetching: false
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cmeData,
    latestPhotos,
    roverSelections,
    dates
})

export default rootReducer;