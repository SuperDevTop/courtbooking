import { backendUrl } from "../config/url";
import { BOOKING_SUCCESS, SET_BOOKING_DATE, GET_BOOKING_DATA } from "./types";
import axios from "axios";

export const createBook = (data) => (dispatch) => {
    axios.post(backendUrl + '/api/booking/createBook', data)
    .then((res) => {
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
        payload: { booking_date: date }
    })
}

export const getBookingData = (data) => (dispatch) => {
    axios.post(backendUrl + '/api/booking/getBookingData', data)
    .then((res) => {
        const { booking_data } = res.data
        console.log(booking_data);
        
        dispatch({
            type: GET_BOOKING_DATA,
            payload: { booking_data }
        })
    })
    .catch((err) => {
        console.log(err);
    })

}