import axios from "axios";
import { Dispatch } from "react-redux";
import * as Actions from "../actions/user";

export const signIn = (email: string, password: string) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:3001/api/signin`, {email, password}).then((res: any) => {
                dispatch(Actions.signInSuccess(res.data));
                return resolve();
            }).catch(e => {
                dispatch(Actions.signInFailed());
                return reject();
            });
        });
    };
};

export const signUp = (email: string, password: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("http://localhost:3001/api/signup", {email, password}).then((res: any) => {
            dispatch(Actions.signUpSuccess());
        }).catch(e => dispatch(Actions.signUpFailed()));
    };
};

export const currentUser = () => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3001/api/current_user").then((res: any) => {
                dispatch(Actions.currentUser(res.data));
                return resolve();
            }).catch((e) => {
                dispatch(Actions.signUpFailed());
                return reject(e);
            });
        });
    };
};