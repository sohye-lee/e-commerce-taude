import { 
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_RESET,
    REVIEW_CREATE_SUCCESS,
    REVIEW_LIST_FAIL, 
    REVIEW_LIST_REQUEST, 
    REVIEW_LIST_SUCCESS 
} from "../constants/reviewConstants";

export const reviewListReducer = (
    state = { reviews: [] }, 
    action
) => 
    {
    switch(action.type) {
        case REVIEW_LIST_REQUEST:
            return { loading: true };
        case REVIEW_LIST_SUCCESS:
            return { loading: false, success: true, reviews: action.payload };
        case REVIEW_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const reviewCreateReducer = (state ={}, action) => {
    switch(action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true };
        case REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true, review: action.payload };
        case REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case REVIEW_CREATE_RESET:
            return {};
        default:
            return state;
    }
};