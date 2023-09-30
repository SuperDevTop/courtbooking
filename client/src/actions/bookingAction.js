import { backendUrl } from "../config/url";
import { BOOKING_SUCCESS } from "./types";
import axios from "axios";

export const createBook = (data) => (dispatch) => {
    console.log(data);
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