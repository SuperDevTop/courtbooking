import {
  BOOKING_SUCCESS,
  SET_BOOKING_DATE,
  GET_BOOKING_DATA,
  ADD_COMMENT_SUCCESS,
  GET_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  booking_date: "",
  booking_data: [[], [], [], [], []],
  courts: [],
  total_booking_data: [],
  comments: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_SUCCESS:
      return {
        ...state,
      };

    case SET_BOOKING_DATE:
      return {
        ...state,
        booking_date: action.payload.booking_date,
      };

    case GET_BOOKING_DATA:
      if (action.payload.courts) {
        return {
          ...state,
          booking_data: action.payload.booking_data,
          courts: action.payload.courts,
          total_booking_data: action.payload.total_booking_data,
        };
      } else {
        return {
          ...state,
          booking_data: action.payload.booking_data,
          total_booking_data: action.payload.total_booking_data,
        };
      }

    case ADD_COMMENT_SUCCESS:
      const { updatedComments, updatedBooking } = action.payload;
      const { indexToUpdate1, indexToUpdate2 } = state.booking_data.reduce(
        (accumulator, data, ind) => {
          const innerIndex = data.findIndex(
            (one) => one._id === updatedBooking._id
          );
          if (innerIndex !== -1) {
            accumulator.indexToUpdate1 = ind;
            accumulator.indexToUpdate2 = innerIndex;
          }
          return accumulator;
        },
        { indexToUpdate1: -1, indexToUpdate2: -1 }
      );

      if (indexToUpdate2 !== -1) {
        const updatedBookingData = [...state.booking_data];
        updatedBookingData[indexToUpdate1][indexToUpdate2] = updatedBooking;

        return {
          ...state,
          comments: updatedComments,
          booking_data: updatedBookingData,
        };
      } else {
        return {
          ...state,
          comments: updatedComments,
        };
      }

    case DELETE_COMMENT:
      const { commentsUpdated, bookingUpdated } = action.payload;
      const { indexToUpdate11, indexToUpdate12 } = state.booking_data.reduce(
        (accumulator, data, ind) => {
          const innerIndex = data.findIndex(
            (one) => one._id === bookingUpdated._id
          );
          if (innerIndex !== -1) {
            accumulator.indexToUpdate11 = ind;
            accumulator.indexToUpdate12 = innerIndex;
          }
          return accumulator;
        },
        { indexToUpdate11: -1, indexToUpdate12: -1 }
      );

      if (indexToUpdate12 !== -1) {
        const updatedBookingData = [...state.booking_data];
        updatedBookingData[indexToUpdate11][indexToUpdate12] = bookingUpdated;

        return {
          ...state,
          comments: commentsUpdated,
          booking_data: updatedBookingData,
        };
      } else {
        return {
          ...state,
          comments: commentsUpdated,
        };
      }

    case GET_COMMENT:
      const { comments } = action.payload;
      return {
        ...state,
        comments: comments,
      };

    default:
      return state;
  }
};

export default bookingReducer;
