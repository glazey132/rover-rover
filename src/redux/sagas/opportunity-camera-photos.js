import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchOpportunityCameraPhotos } from '../api/opportunity-camera-photos-api.js';
import { receiveOpportunityCameraPhotos } from '../actions/set-opportunity-camera-type';
import * as types from '../actions/actionTypes';
import cameraUrlMap from '../../assets/camera-url-values';

function* getCameraPhotos(action) {
    const cameraUrl = cameraUrlMap.opportunity[`${action.payload.camera}`]
    try {
        const data = yield call(fetchOpportunityCameraPhotos, cameraUrl)
        yield put(receiveOpportunityCameraPhotos(data));
    } catch(error) {
        console.log('there was an error while getting camera data in opportunity saga => ', error);
    }
}

export default function* watchRequestOpportunityCameraPhotos() {
    yield takeLatest(types.SET_OPPORTUNITY_CAMERA_TYPE, getCameraPhotos)
}