import * as types from './actionTypes';

export const setDateType = (dateType) => {
    return {
        type: types.SET_DATETYPE,
        payload: dateType
    }
}