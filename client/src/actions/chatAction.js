import { GET_USERS, GET_CHATCONTENTS, SET_SELECTEDUSERNAME, SAVE_CHATCONTENT } from "./types";
import { backendUrl } from "../config/url";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    axios
      .get(backendUrl + "/api/admin/getUsers")
      .then((res) => {
        const { users } = res.data;

        dispatch({
          type: GET_USERS,
          payload: { users },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const getChatContents = (data) => async (dispatch) => {
  try {
    axios
      .post(backendUrl + "/api/chat/getChatContents", data)
      .then((res) => {
        const { chatContents } = res.data;

        dispatch({
          type: GET_CHATCONTENTS,
          payload: { chatContents },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export const setSelectedUserName = (name) => async (dispatch) => {
  const username = name;

  dispatch({
    type: SET_SELECTEDUSERNAME,
    payload: { username },
  });
};

export const saveChatContent = (data) => async (dispatch) => {
  console.log(data);
  try {
    axios
      .post(backendUrl + "/api/chat/saveChatContent", data)
      .then((res) => {
        dispatch({
          type: SAVE_CHATCONTENT,
          payload: { data },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};