import { backendUrl } from "../config/url";
import { BOOKING_SUCCESS, SET_BOOKING_DATE } from "./types";
import axios from "axios";

export const createBook = (data) => (dispatch) => {
    axios.post(backendUrl + '/api/booking/createBook', data)
    .then((res) => {

        console.log(res.data);
        dispatch ({
            type: BOOKING_SUCCESS,
        })
    }).catch((err) => {
        console.log(err);
    })
}

export const setBookingDate = (date) => (dispatch) => {
    dispatch({
        type: SET_BOOKING_DATE,
        payload: {booking_date: date}
    })
}