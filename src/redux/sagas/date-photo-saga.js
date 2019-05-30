import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchDatePhotos } from '../api/date-photos-api.js';
import { receiveDatePhotos } from '../actions/set-search-date';
import * as types from '../actions/actionTypes';
import cameraUrlMap from '../../assets/camera-url-values';
import { getRover, getDate, getCamera, getDateType, getSolDate } from './selectors'
function* getDatePhotos() {
    try {
        const rover = yield select(getRover);
        const date = yield select(getDate);
        const solDate = yield select(getSolDate);
        const camera = yield select(getCamera);
        const dateType = yield select(getDateType);
        const roverUrl = cameraUrlMap[`${rover}`];
        const cameraUrl = roverUrl[`${camera}`];
        
        const data = yield call(fetchDatePhotos, rover, date, cameraUrl, dateType, solDate)
        yield put(receiveDatePhotos(data));
    } catch(error) {
        console.log('there was an error while getting camera data in opportunity saga => ', error);
    }
}

export default function* watchRequestDatePhotos() {
    yield takeLatest(types.SET_SEARCH_DATE, getDatePhotos)
}