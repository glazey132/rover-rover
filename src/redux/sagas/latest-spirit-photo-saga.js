import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchRecentSpiritPhotos } from '../api/latest-photos-api';
import { receiveLatestSpiritPhotos } from '../actions/fetch-latest-spirit-photos';
import * as types from "../actions/actionTypes";

function* fetchLatestSpiritPhotos(action) {
    console.log('in fetch latest spirit photos')
    try {
        const data = yield call(fetchRecentSpiritPhotos)
        console.log('the data in opp photo saga => ', data)
        yield put(receiveLatestSpiritPhotos(data))
    } catch(error) {
        console.log('error in latest opp photo saga => ', error);
    }
}

export default function* watchRequestLatestSpiritPhotos() {
    yield takeLatest(types.REQUEST_LATEST_SPIRIT_PHOTOS, fetchLatestSpiritPhotos)
}