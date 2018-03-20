import { combineReducers } from "redux";
import user from "./user";
import group from "./task-group";
import task from "./task";
import alert from "./alert";

export default combineReducers({user, group, task, alert});
