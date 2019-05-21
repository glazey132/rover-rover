import * as types from './actionTypes';

export const setRover = (rover) => {
    return {
        type: types.SET_ROVER,
        rover
    }
}