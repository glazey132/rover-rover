import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchRecentCuriosityPhotos } from '../api/latest-photos-api';
import { receiveLatestCuriosityPhotos } from '../actions/fetch-latest-curiosity-photos';
import * as types from "../actions/actionTypes";

function* fetchLatestCuriosityPhotos(action) {
    try {
        const data = yield call(fetchRecentCuriosityPhotos)
        yield put(receiveLatestCuriosityPhotos(data))
    } catch(error) {
        console.log('error in latest opp photo saga => ', error);
    }
}

export default function* watchRequestLatestCuriosityPhotos() {
    yield takeLatest(types.REQUEST_LATEST_CURIOSITY_PHOTOS, fetchLatestCuriosityPhotos)
}