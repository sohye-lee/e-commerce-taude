import Axios from 'axios';
import { REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS, REVIEW_LIST_FAIL, REVIEW_LIST_REQUEST, REVIEW_LIST_SUCCESS } from '../constants/reviewConstants';

export const getReviews = () => async(dispatch) => {
    dispatch({ type: REVIEW_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`/api/reviews`);
        dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: REVIEW_LIST_FAIL, payload: message });
    }
};

export const postReview = (review) => async(dispatch, getState) => {
    dispatch({ type: REVIEW_CREATE_REQUEST, payload: review });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post('/api/reviews', review, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data.review });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: REVIEW_CREATE_FAIL, payload: message });
    }
};