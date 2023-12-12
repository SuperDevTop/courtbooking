import axios from "axios";
import { GETPLAYERS_SUCCESS, UPDATE_SEARCHINGPLAYER } from "./types";
import { backendUrl } from "../config/url";

export const getPlayersData = () => (dispatch) => {
  try {
    axios
      .get(backendUrl + "/api/player/getPlayersData")
      .then((res) => {
        const { players } = res.data;

        dispatch({
          type: GETPLAYERS_SUCCESS,
          payload: { players },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateSearchingPlayer = (name) => (dispatch) => {
  dispatch({
    type: UPDATE_SEARCHINGPLAYER,
    payload: { name },
  });
};
