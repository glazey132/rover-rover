import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchData } from '../api/cme-api';
import { receiveCmeData } from '../actions/fetch-cme-data';
import * as types from "../actions/actionTypes";

function* fetchCmeData() {
    try {
        const data = yield call(fetchData)
        yield put(receiveCmeData(data))
    } catch(error) {
        console.log('error from cme saga => ', error);
    }
    
}


export default function* watchRequestCmeData() {
    yield takeLatest(types.REQUEST_CME_DATA, fetchCmeData);
}