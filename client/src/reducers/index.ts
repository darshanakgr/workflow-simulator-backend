import { combineReducers } from "redux";
import user from "./user";
import group from "./task-group";
import task from "./task";

export default combineReducers({user, group, task});
