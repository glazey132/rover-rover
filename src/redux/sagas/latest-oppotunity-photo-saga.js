import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchRecentOpportunityPhotos } from '../api/latest-photos-api';
import { receiveLatestOpportunityPhotos } from '../actions/fetch-latest-opportunity-photos';
import * as types from "../actions/actionTypes";

function* fetchLatestOpportunityPhotos(action) {
    try {
        const data = yield call(fetchRecentOpportunityPhotos)
        yield put(receiveLatestOpportunityPhotos(data))
    } catch(error) {
        console.log('error in latest opp photo saga => ', error);
    }
}

export default function* watchRequestLatestOpportunityPhotos() {
    yield takeLatest(types.REQUEST_LATEST_OPPORTUNITY_PHOTOS, fetchLatestOpportunityPhotos)
}