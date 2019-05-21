import * as types from "./actionTypes";

export const requestLatestSpiritPhotos = () => {
    return {
        type: types.REQUEST_LATEST_SPIRIT_PHOTOS,
    }
}

export const receiveLatestSpiritPhotos = data => {
    return {
        type: types.RECEIVE_LATEST_SPIRIT_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}