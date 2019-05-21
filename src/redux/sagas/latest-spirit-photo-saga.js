import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchRecentSpiritPhotos } from '../api/latest-photos-api';
import { receiveLatestSpiritPhotos } from '../actions/fetch-latest-spirit-photos';
import * as types from "../actions/actionTypes";

function* fetchLatestSpiritPhotos(action) {
    try {
        const data = yield call(fetchRecentSpiritPhotos)
        yield put(receiveLatestSpiritPhotos(data))
    } catch(error) {
        console.log('error in latest opp photo saga => ', error);
    }
}

export default function* watchRequestLatestSpiritPhotos() {
    yield takeLatest(types.REQUEST_LATEST_SPIRIT_PHOTOS, fetchLatestSpiritPhotos)
}