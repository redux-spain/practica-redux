import * as types from "../actionType";
import axios from "axios";

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
})

export const loadUsers = () => {
    console.log("loadUsers:1");
    const url = process.env.REACT_APP_API
    console.log("url:", url)
    return function (dispatch) {
        axios.get(url).then((resp)=>{
            console.log("resp", resp);
            dispatch(getUsers(resp.data));
        }).catch(error => console.log(error))
    }
    console.log("loadUsers:2");
};