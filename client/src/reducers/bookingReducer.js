import { BOOKING_SUCCESS, SET_BOOKING_DATE, GET_BOOKING_DATA } from "../actions/types";

const initialState = {
    booking_date: '',
    booking_data: [[], [], [], [], []],
    courts: []
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
                booking_date: action.payload.booking_date
            }

        case GET_BOOKING_DATA:

            if(action.payload.courts) {
                return {
                    ...state,
                    booking_data: action.payload.booking_data,
                    courts: action.payload.courts
                }
            } else {                
                return {
                    ...state,
                    booking_data: action.payload.booking_data,
                }
            }
        default:
            return state;
    }
}

export default bookingReducer;