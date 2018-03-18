import { Action, handleActions } from "redux-actions";
import { SIGN_IN_SUCCESS, SIGN_IN_FAILED, SIGN_UP_FAILED, SIGN_UP_SUCCESS, CURRENT_USER } from "../constants";
import { User, UserState } from "../models/user";

const initialState: UserState = {
    status: false,
    userId: undefined
};

export default handleActions<UserState, User>({
    [SIGN_IN_SUCCESS]: (state: UserState, action: Action<User>): UserState => {
        return {
            status: true,
            userId: action.payload ? action.payload.userId : undefined
        };
    },
    [CURRENT_USER]: (state: UserState, action: Action<User>): UserState => {
        return {
            status: true,
            userId: action.payload ? action.payload.userId : undefined
        };
    },
    [SIGN_IN_FAILED]: (state: UserState, action: Action<User>): UserState => {
        return {
            status: false,
            userId: undefined
        };
    },
    [SIGN_UP_SUCCESS]: (state: UserState, action: Action<User>): UserState => {
        return state;
    },
    [SIGN_UP_FAILED]: (state: UserState, action: Action<User>): UserState => {
        return state;
    }
}, initialState);