import * as types from './actionTypes';

export const setCmeTab = (cmeTab) => {
    return {
        type: types.SET_CME_TAB,
        cmeTab
    }
}