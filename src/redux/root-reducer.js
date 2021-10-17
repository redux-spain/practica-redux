import { combineReducers } from "redux";
import usersReducers from "./Users/UsersReducer";

const rootReducer = combineReducers({
    users: usersReducers
});


export default rootReducer;