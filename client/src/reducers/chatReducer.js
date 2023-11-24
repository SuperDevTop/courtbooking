import {
  GET_USERS,
  GET_CHATCONTENTS,
  SET_SELECTEDUSERNAME,
  SAVE_CHATCONTENT,
} from "../actions/types";

const initialState = {
  users: [],
  chatContents: [],
  selectedUserName: "",
  selectedChatContents: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      const user = JSON.parse(localStorage.getItem("user"));
      const users = action.payload.users.filter(
        (one) => one.name !== user.name
      );

      return {
        ...state,
        users: users,
      };

    case GET_CHATCONTENTS:
      return {
        ...state,
        chatContents: action.payload.chatContents,
      };

    case SAVE_CHATCONTENT:
      const { data } = action.payload;
      const newChatContents = [...state.chatContents, data]

      return {
        ...state,
        chatContents: newChatContents,
      };

    case SET_SELECTEDUSERNAME:
      const selectedUserName = action.payload.username;
      const contents = [...state.chatContents].filter(
        (one) =>
          one.receiver === selectedUserName || one.sender === selectedUserName
      );

      return {
        ...state,
        selectedUserName: selectedUserName,
        selectedChatContents: contents,
      };

    default:
      return state;
  }
};

export default chatReducer;
