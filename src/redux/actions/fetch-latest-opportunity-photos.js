import * as types from "./actionTypes";

export const requestLatestOpportunityPhotos = () => {
    return {
        type: types.REQUEST_LATEST_OPPORTUNITY_PHOTOS,
    }
}

export const receiveLatestOpportunityPhotos = data => {
    return {
        type: types.RECEIVE_LATEST_OPPORTUNITY_PHOTOS,
        data,
        receivedAt: new Date().setMilliseconds(0)
    }
}