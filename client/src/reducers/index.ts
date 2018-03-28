import { combineReducers } from "redux";
import user from "./user";
import group from "./task-group";
import task from "./task";
import alert from "./alert";
import permission from "./permission";
import notification from "./notification";

export default combineReducers({user, group, task, alert, permission, notification});
