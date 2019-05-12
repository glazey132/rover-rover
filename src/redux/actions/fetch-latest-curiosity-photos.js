import * as types from "./actionTypes";

export const requestLatestCuriosityPhotos = () => {
    console.log('requestions curii photos in action creator')
    return {
        type: types.REQUEST_LATEST_CURIOSITY_PHOTOS,
    }
}

export const receiveLatestCuriosityPhotos = data => {
    console.log('latest curiosity photos received => ', data)
    return {
        type: types.RECEIVE_LATEST_CURIOSITY_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}