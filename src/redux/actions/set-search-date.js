import * as types from './actionTypes';

export const setSearchDate = (date) => {
    return {
        type: types.SET_SEARCH_DATE,
        payload: date
    }
}