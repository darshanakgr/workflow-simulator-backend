import axios from "axios";
import * as actions from "../actions/permission";
import { Dispatch } from "react-redux";
import { showMessage } from "../actions/alert";

export const getPermission = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/taskgroup/secret/${groupId}`).then((res) => {
            dispatch(actions.getPermission(res.data.secretKey));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

export const shareTaskGroup = (email: string, groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post(`http://localhost:3001/api/taskgroup/share/${email}/${groupId}`).then((res) => {
            dispatch(showMessage(false, `Task shared with ${email} successfully!`));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

export const getSharedTaskGroups = () => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/taskgroup/share`).then((res) => {
            dispatch(actions.getSharedTaskGroups(res.data));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};





