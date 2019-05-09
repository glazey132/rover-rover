import { all, fork } from 'redux-saga/effects'

import * as cmeSaga from './cme-saga';
import * as photoSaga from './rover-photo-saga';


export default function* rootSager() {
    yield all([
        ...Object.values(cmeSaga),
        ...Object.values(photoSaga)
    ].map(fork))
}