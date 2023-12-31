import { backendUrl } from "../config/url";
import {
  BOOKING_SUCCESS,
  SET_BOOKING_DATE,
  GET_BOOKING_DATA,
  GETPLAYERS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  GET_COMMENT,
  DELETE_COMMENT,
} from "./types";
import axios from "axios";

import { socket } from "../utils/socketService";

export const createBook = (data, callback) => (dispatch) => {
  axios
    .post(backendUrl + "/api/booking/createBook", data)
    .then((res) => {
      // send notification
      const user = JSON.parse(localStorage.getItem("user"));
      socket.emit("book_created", { name: user.name });
      //
      const { booking_data, players, total_booking_data } = res.data;

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data, total_booking_data },
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
      socket.emit("book_updated");
      const { booking_data, total_booking_data } = res.data;

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data, total_booking_data },
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
      const { booking_data, courts, total_booking_data } = res.data;

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data, total_booking_data, courts },
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
      const { booking_data, total_booking_data } = res.data;
      socket.emit("book_deleted");

      dispatch({
        type: GET_BOOKING_DATA,
        payload: { booking_data, total_booking_data },
      });

      callback && callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addComment = (data) => (dispatch) => {
  axios
    .post(backendUrl + "/api/booking/addComment", data)
    .then((res) => {
      const { comments, updatedBooking, permanentComments } = res.data;
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          updatedComments: comments,
          updatedBooking,
          permanentComments,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getComment = (data) => (dispatch) => {
  axios
    .post(backendUrl + "/api/booking/getComment", data)
    .then((res) => {
      const { comments, permanentComments } = res.data;

      dispatch({
        type: GET_COMMENT,
        payload: { comments, permanent_comments: permanentComments },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteComment = (data) => (dispatch) => {
  axios
    .delete(
      backendUrl +
        "/api/booking/deleteComment/" +
        data.bookingId +
        "/" +
        data.commentId +
        "/" +
        (data.isPermanent ? 'true' : 'false')
    )
    .then((res) => {
      const { comments, updatedBooking, permanentComments } = res.data;
      dispatch({
        type: DELETE_COMMENT,
        payload: {
          commentsUpdated: comments,
          bookingUpdated: updatedBooking,
          permanent: permanentComments,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
