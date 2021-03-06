import * as types from "./actionTypes";

export const requestCmeData = date => {
    return {
        type: types.REQUEST_CME_DATA,
        payload: { date }
    }
}; 

export const receiveCmeData = data => {
    return {
        type: types.RECEIVE_CME_DATA,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
};

    


