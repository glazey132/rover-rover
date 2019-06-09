import * as types from "./actionTypes";

export const setCuriosityCameraType = (camera, date) => {
    return {
        type: types.SET_CURIOSITY_CAMERA_TYPE,
        payload: { 
            camera,
            date
        }
    }
};

export const receiveCuriosityCameraPhotos = data => {
    return {
        type: types.RECEIVE_CURIOSITY_CAMERA_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}