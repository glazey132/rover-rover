import { all, fork } from 'redux-saga/effects'

import * as cmeSaga from './cme-saga';
import * as latestOpportunityPhotoSaga from './latest-oppotunity-photo-saga';
import * as latestCuriosityPhotoSaga from './latest-curiosity-photo-saga';
import * as latestSpiritPhotoSaga from './latest-spirit-photo-saga';
import * as curiosityCameraPhotoSaga from './curiosity-camera-photos';
import * as opportunityCameraPhotoSaga from './opportunity-camera-photos';
import * as spiritCameraPhotoSaga from './spirit-camera-photos';


export default function* rootSager() {
    yield all([
        ...Object.values(cmeSaga),
        ...Object.values(latestOpportunityPhotoSaga),
        ...Object.values(latestCuriosityPhotoSaga),
        ...Object.values(latestSpiritPhotoSaga),
        ...Object.values(curiosityCameraPhotoSaga),
        ...Object.values(opportunityCameraPhotoSaga),
        ...Object.values(spiritCameraPhotoSaga)
    ].map(fork))
}