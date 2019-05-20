import * as types from './actionTypes';

export const setRover = (rover) => {
    console.log('setting rover in action => ', rover);
    return {
        type: types.SET_ROVER,
        rover
    }
}