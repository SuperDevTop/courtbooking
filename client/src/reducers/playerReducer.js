import { GETPLAYERS_SUCCESS, UPDATE_SEARCHINGPLAYER } from "../actions/types";

const initialState = {
  players: [],
  searchingPlayer: "",
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETPLAYERS_SUCCESS:
      return {
        ...state,
        players: action.payload.players,
      };

    case UPDATE_SEARCHINGPLAYER:
      const { name } = action.payload;

      return {
        ...state,
        searchingPlayer: name
      }

    default:
      return state;
  }
};

export default playerReducer;
