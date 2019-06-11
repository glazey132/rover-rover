import * as types from "./actionTypes";

export const requestLocationImage = (latitude, longitude) => {
console.log("TCL: requestLocationImage -> latitude, longitude", latitude, longitude)
    return {
        type: types.REQUEST_LOCATION_IMAGE,
        coords: {latitude, longitude}
    }
}; 

export const receiveLocationImage = image => {
    return {
        type: types.RECEIVE_LOCATION_IMAGE,
        image,
        receivedAt: new Date().setMilliseconds(0)
    }
};