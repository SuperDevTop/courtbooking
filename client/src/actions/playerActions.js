import axios from "axios";
import { GETPLAYERS_SUCCESS } from "./types";
import { backendUrl } from "../config/url";


export const getPlayersData = () => (dispatch) => {
    try {
        axios.get(backendUrl + '/api/player/getPlayersData')
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