import { handleActions, Action } from "redux-actions";
import { AlertState, Message } from "../models/message";
import { SHOW_MESSAGE } from "../constants";

const initialState: AlertState = {};

export default handleActions<AlertState, Message>({
    [SHOW_MESSAGE]: (state: AlertState, action: Action<Message>): AlertState => {
        return {
            message: action.payload
        };
    }
}, initialState);