import * as types from './actionTypes';

export const requestLatestCuriosityPhotos = () => {
    return {
        type: types.REQUEST_LATEST_CURIOSITY_PHOTOS,
    }
}

export const receiveLatestCuriosityPhotos = data => {
    return {
        type: types.RECEIVE_LATEST_CURIOSITY_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}