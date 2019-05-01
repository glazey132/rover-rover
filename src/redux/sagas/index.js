import { take, takeLatest, put, call, fork, select } from 'redux-saga/effects'
import { receiveCmeData } from '../actions/fetch-cme-data';
import { fetchData } from '../api/cme-api';
import * as types from '../actions/actionTypes';

function* fetchCmeData(action) {
    console.log('in fetch cme data in saga ')
    try {
        const data = yield call(fetchData)
        yield put(receiveCmeData(data))
    } catch(error) {
        console.log('error from cme saga => ', error)
    }
    
}



export default function* watchRequestCmeData() {
    yield takeLatest(types.REQUEST_CME_DATA, fetchCmeData);
}