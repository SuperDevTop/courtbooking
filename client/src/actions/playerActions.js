import axios from "axios";
import { GETPLAYERS_SUCCESS } from "./types";

// const url = "https://courtbooking.vercel.app";
const url = "http://localhost:5000";

export const getPlayersData = () => (dispatch) => {
    try {
        axios.get(url + '/api/player/getPlayersData')
            .then((res) => {

                const { players } = res.data

                dispatch ({
                    type: GETPLAYERS_SUCCESS,
                    payload: { players }
                })
            })
            .catch((err) => {
                console.log(err);
            })

    } catch (error) {
        console.log(error);
    }
}