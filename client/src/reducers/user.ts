import { Action, handleActions } from "redux-actions";
import { CURRENT_USER, CLEAR_USER } from "../constants";
import { User, UserState } from "../models/user";

const initialState: UserState = {
    user: undefined
};

export default handleActions<UserState, User>({
    [CURRENT_USER]: (state: UserState, action: Action<User>): UserState => {
        return {
            user: action.payload
        };
    },
    [CLEAR_USER]: (state: UserState, action: Action<User>): UserState => {
        return {
            user: undefined
        };
    }
}, initialState);