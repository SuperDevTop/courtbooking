import { GETPLAYERS_SUCCESS } from "../actions/types";

const initialState = {
    players: []
};

const playerReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case GETPLAYERS_SUCCESS:
            return {
                ...state,
                players: action.payload.players
            }

        default:
            return state;
    }
}

export default playerReducer;
