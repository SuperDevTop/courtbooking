import { BOOKING_SUCCESS, SET_BOOKING_DATE, GET_BOOKING_DATA } from "../actions/types";

const initialState = {
    bookingDate: new Date(),
    booking_data: [[], [], [], [], []],
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

        case GET_BOOKING_DATA:
            return {
                ...state,
                booking_data: action.payload.booking_data
            }
        default:
            return state;
    }
}

export default bookingReducer;