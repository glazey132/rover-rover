import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchSpiritCameraPhotos } from '../api/spirit-camera-photos-api.js';
import { receiveSpiritCameraPhotos } from '../actions/set-spirit-camera-type';
import * as types from '../actions/actionTypes';
import cameraUrlMap from '../../assets/camera-url-values';

function* getCameraPhotos(action) {
    const cameraUrl = cameraUrlMap.spirit[`${action.payload.camera}`]
    try {
        const data = yield call(fetchSpiritCameraPhotos, cameraUrl)
        yield put(receiveSpiritCameraPhotos(data));
    } catch(error) {
        console.log('there was an error while getting camera data in spirit saga => ', error);
    }
}

export default function* watchRequestSpiritCameraPhotos() {
    yield takeLatest(types.SET_SPIRIT_CAMERA_TYPE, getCameraPhotos)
}