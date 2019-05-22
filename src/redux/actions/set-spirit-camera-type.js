import * as types from "./actionTypes";

export const setSpiritCameraType = (camera) => {
    return {
        type: types.SET_SPIRIT_CAMERA_TYPE,
        payload: { 
            camera
        }
    }
};

export const receiveSpiritCameraPhotos = data => {
    return {
        type: types.RECEIVE_SPIRIT_CAMERA_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}