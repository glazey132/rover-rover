import * as types from "./actionTypes";

export const setOpportunityCameraType = (camera) => {
    return {
        type: types.SET_OPPORTUNITY_CAMERA_TYPE,
        payload: { 
            camera
        }
    }
};

export const receiveOpportunityCameraPhotos = data => {
    return {
        type: types.RECEIVE_OPPORTUNITY_CAMERA_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}