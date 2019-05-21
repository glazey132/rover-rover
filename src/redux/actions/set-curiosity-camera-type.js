import * as types from "./actionTypes";

export const setCuriosityCameraType = (camera) => {
    console.log("in set camera type actoin here is param => ", camera);
    return {
        type: types.SET_CURIOSITY_CAMERA_TYPE,
        payload: { 
            camera
        }
    }
};

export const receiveCuriosityCameraPhotos = data => {
    console.log('in receive curiosity camera photos => ', data);
    return {
        type: types.RECEIVE_CURIOSITY_CAMERA_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}