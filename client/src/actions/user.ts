import { createAction } from "redux-actions";
import *  as Actions from "../constants";
import { User } from "../models/user";

export const signInSuccess = createAction<User, string>(
    Actions.SIGN_IN_SUCCESS,
    (userId: string) => ({userId})
);

export const currentUser = createAction<User, string>(
    Actions.CURRENT_USER,
    // (userId: string) => ({userId: "5aa613f016ef953014fc4a80"})
    (userId: string) => ({userId})
);

export const signInFailed = createAction(
    Actions.SIGN_IN_FAILED
);

export const signUpSuccess = createAction(
    Actions.SIGN_UP_SUCCESS
);

export const signUpFailed = createAction(
    Actions.SIGN_UP_FAILED
);