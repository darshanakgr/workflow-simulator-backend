import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/user";
import { showMessage } from "../actions/alert";
import Auth from "./auth";

export const signIn = (email: string, password: string) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:3001/api/signin`, {email, password}).then((res: any) => {
                dispatch(actions.signIn(res.data));
                Auth.authenticateUser(res.data);
                return resolve();
            }).catch(e => {
                dispatch(showMessage(true, e.message));
                return reject();
            });
        });
    };
};

export const signUp = (email: string, password: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("http://localhost:3001/api/signup", {email, password}).then((res: any) => {
            dispatch(actions.signUp());
            dispatch(showMessage(false, "You've successfully signed up! Please login :)"));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

export const signOut = () => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3001/api/signout").then((res: any) => {
            dispatch(actions.signOut());
                Auth.deauthenticateUser();
                return resolve();
            }).catch(e => {
                dispatch(showMessage(true, e.message));
                return reject();
            });
        });
    };
};

export const currentUser = () => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3001/api/current_user").then((res: any) => {
                dispatch(actions.currentUser(res.data));
                return resolve();
            }).catch((e) => {
                dispatch(showMessage(true, e.message));
                return reject(e);
            });
        });
    };
};