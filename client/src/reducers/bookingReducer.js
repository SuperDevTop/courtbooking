import { BOOKING_SUCCESS } from "../actions/types";

const initialState = {

};

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case BOOKING_SUCCESS:
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default bookingReducer;