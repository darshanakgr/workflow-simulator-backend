import { createAction } from "redux-actions";
import { CURRENT_USER, CLEAR_USER } from "../constants";
import { User } from "../models/user";

export const currentUser = createAction<User, string>(
    CURRENT_USER,
    (userId?: string) => ({userId})
);

export const clearUser = createAction(
    CLEAR_USER
);