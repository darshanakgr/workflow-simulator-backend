import { createAction } from "redux-actions";
import *  as Actions from "../constants";
import { Message } from "../models/message";

export const showMessage = createAction<Message, boolean, string>(
    Actions.SHOW_MESSAGE,
    (error: boolean, message: string) => ({error, message})
);

