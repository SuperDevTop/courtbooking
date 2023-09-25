import { CHANGE_CURRENT_PAGE } from "./types";

export const changeCurrentPage = (page) => (dispatch) => {
    try {
        dispatch({
            type: CHANGE_CURRENT_PAGE,
            payload: { page: page }
        })
    } catch(err) {
        console.log(err);
    }
}