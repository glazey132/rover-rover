import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchCuriosityCameraPhotos } from '../api/curiosity-camera-photos-api.js';
import { receiveCuriosityCameraPhotos } from '../actions/set-curiosity-camera-type';
import * as types from '../actions/actionTypes';
import cameraUrlMap from '../../assets/camera-url-values';
import { getRover, getDate, getCamera} from './selectors'

function* getCameraPhotos(action) {
    console.log('actioin in curi cam saga > ', action)
    const cameraUrl = cameraUrlMap.curiosity[`${action.payload.camera}`]
    try {
        const data = yield call(fetchCuriosityCameraPhotos, cameraUrl, action.payload.date)
        yield put(receiveCuriosityCameraPhotos(data));
    } catch(error) {
        console.log('there was an error while getting camera data in curiosity saga => ', error);
    }
}

export default function* watchRequestCuriosityCameraPhotos() {
    yield takeLatest(types.SET_CURIOSITY_CAMERA_TYPE, getCameraPhotos)
}