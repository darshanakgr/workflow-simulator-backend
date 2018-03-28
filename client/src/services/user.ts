import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/user";
import { showMessage } from "../actions/alert";
import Auth from "./auth";

export const signIn = (email: string, password: string) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.post(`/api/signin`, {email, password}).then((res: any) => {
                dispatch(actions.currentUser(res.data.userId));
                Auth.authenticateUser(res.data.token);
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
        axios.post("/api/signup", {email, password}).then((res: any) => {
            dispatch(actions.clearUser());
            dispatch(showMessage(false, "You've successfully signed up! Please login :)"));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

export const signOut = () => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            Auth.deauthenticateUser();
            dispatch(actions.clearUser());
            resolve();
        });
    };
};

export const currentUser = () => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            if (Auth.isUserAuthenticated()) {
                Auth.initializeHeader();
                return axios.get("/api/current_user").then((res: any) => {
                    dispatch(actions.currentUser(res.data));
                    return resolve();
                }).catch((e) => {
                    dispatch(actions.clearUser());
                    return reject(e);
                });
            }
            dispatch(actions.clearUser());
            return reject();
        });
    };
};