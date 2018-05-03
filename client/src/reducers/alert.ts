import { handleActions, Action } from "redux-actions";
import { AlertState, Message } from "../models/message";
import { SHOW_MESSAGE, CLOSE_MESSAGE } from "../constants";

const initialState: AlertState = {
    message: {
        error: false,
        message: "",
        show: false
    }
};

export default handleActions<AlertState, Message>({
    [SHOW_MESSAGE]: (state: AlertState, action: Action<Message>): AlertState => {
        return {
            message: action.payload ? action.payload : initialState.message
        };
    },
    [CLOSE_MESSAGE]: (state: AlertState, action: Action<Message>): AlertState => {
        return {
            message: initialState.message
        };
    }
}, initialState);