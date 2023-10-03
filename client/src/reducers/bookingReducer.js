import { BOOKING_SUCCESS, SET_BOOKING_DATE } from "../actions/types";

const initialState = {
    bookingDate: new Date()
};

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case BOOKING_SUCCESS:
            return {
                ...state
            }
        
        case SET_BOOKING_DATE:
            return {
                ...state,
                bookingDate: action.payload.booking_date
            }

        default:
            return state;
    }
}

export default bookingReducer;