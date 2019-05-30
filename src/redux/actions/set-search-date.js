import * as types from './actionTypes';

export const setSearchDate = (date, solDate) => {
    if (typeof date === 'string') {
        return {
            type: types.SET_SEARCH_DATE,
            payload: {
                solDate: date
            }
        }
    } else {
        return {
            type: types.SET_SEARCH_DATE,
            payload: date
        }
    }
}

export const receiveDatePhotos = data => {
    return {
        type: types.RECEIVE_DATE_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}