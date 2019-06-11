import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchLocationImage } from '../api/location-image-api';
import { receiveLocationImage } from '../actions/request-location-image';
import * as types from '../actions/actionTypes';

function* getLocationImage(action) {
    try {
        const data = yield call(fetchLocationImage)
        console.log("TCL: function*getLocationImage -> data", data)
        yield put(receiveLocationImage(data));
    } catch(error) {
        console.log('there was an error while getting location image in saga => ', error);
    }
}

export default function* watchRequestLocationImage() {
    yield takeLatest(types.REQUEST_LOCATION_IMAGE, getLocationImage)
}