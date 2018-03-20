import { Action, handleActions } from "redux-actions";
import { SIGN_IN, SIGN_UP, SIGN_OUT, CURRENT_USER } from "../constants";
import { User, UserState } from "../models/user";

const initialState: UserState = {
    status: false,
    user: undefined
};

export default handleActions<UserState, User>({
    [SIGN_IN]: (state: UserState, action: Action<User>): UserState => {
        return {
            status: true,
            user: action.payload
        };
    },
    [CURRENT_USER]: (state: UserState, action: Action<User>): UserState => {
        return {
            status: true,
            user: action.payload
        };
    },
    [SIGN_OUT]: (state: UserState, action: Action<User>): UserState => {
        return {
            status: false,
            user: undefined
        };
    },
    [SIGN_UP]: (state: UserState, action: Action<User>): UserState => {
        return {
            status: false,
            user: undefined
        };
    }
}, initialState);