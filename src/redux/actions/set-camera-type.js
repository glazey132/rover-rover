import * as types from "./actionTypes";

export const setCameraType = camera => {
    console.log("in set camera type actoin here is param => ", camera)
    return {
        type: types.SET_CAMERA_TYPE,
        payload: { camera }
    }
};