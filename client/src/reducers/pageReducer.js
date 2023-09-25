import { CHANGE_CURRENT_PAGE } from "../actions/types";

const initialState = {
    currentPage: 1
};

const pageReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.page
            }

        default:
            return state
    }
}

export default pageReducer;