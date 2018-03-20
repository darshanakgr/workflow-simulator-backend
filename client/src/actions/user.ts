import { createAction } from "redux-actions";
import { SIGN_IN, SIGN_OUT, SIGN_UP, CURRENT_USER } from "../constants";
import { User } from "../models/user";

export const signIn = createAction<User, string>(
    SIGN_IN,
    (userId: string) => ({userId})
);

export const currentUser = createAction<User, string>(
    CURRENT_USER,
    (userId: string) => ({userId: "5aa613f016ef953014fc4a80"})
    // (userId: string) => ({userId})
);

export const signUp = createAction(
    SIGN_UP
);

export const signOut = createAction(
    SIGN_OUT
);