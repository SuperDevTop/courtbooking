import { backendUrl } from "../config/url";
import {
  BOOKING_SUCCESS,
  SET_BOOKING_DATE,
  GET_BOOKING_DATA,
  GETPLAYERS_SUCCESS,
} from "./types";
import axios from "axios";

export const createBook = (data, callback) => (dispatch) => {
  axios
    .post(backendUrl + "/api/booking/createBook", data)
    .then((res) => {
      const { booking_data, players } = res.data;

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data },
      });

      dispatch({
        type: GETPLAYERS_SUCCESS,
        payload: { players },
      });

      callback && callback();

      dispatch({
        type: BOOKING_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateBook = (data, callback) => (dispatch) => {
  axios
    .post(backendUrl + "/api/booking/updateBook", data)
    .then((res) => {
      const { booking_data, players } = res.data;

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data },
      });

      dispatch({
        type: GETPLAYERS_SUCCESS,
        payload: { players },
      });

      callback && callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setBookingDate = (date) => (dispatch) => {
  dispatch({
    type: SET_BOOKING_DATE,
    payload: { booking_date: date },
  });
};

export const getBookingData = (data) => (dispatch) => {
  axios
    .post(backendUrl + "/api/booking/getBookingData", data)
    .then((res) => {
      const { booking_data } = res.data;

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteBooking = (data, callback) => (dispatch) => {
  axios
    .post(backendUrl + "/api/booking/deleteBooking", data)
    .then((res) => {
      const { booking_data } = res.data;

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data },
      });

      callback && callback();
    })
    .catch((err) => {
      console.log(err);
    });
};
