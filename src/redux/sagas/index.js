import { all, fork } from 'redux-saga/effects'

import * as cmeSaga from './cme-saga';
import * as latestOpportunityPhotoSaga from './latest-oppotunity-photo-saga';
import * as latestCuriosityPhotoSaga from './latest-curiosity-photo-saga';
import * as latestSpiritPhotoSaga from './latest-spirit-photo-saga';


export default function* rootSager() {
    yield all([
        ...Object.values(cmeSaga),
        ...Object.values(latestOpportunityPhotoSaga),
        ...Object.values(latestCuriosityPhotoSaga),
        ...Object.values(latestSpiritPhotoSaga)
    ].map(fork))
}