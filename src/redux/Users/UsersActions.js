import * as types from "./UsersActionType";
import axios from "axios";

// READ ALL
const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
})

export const loadUsers = () => {
    const url = process.env.REACT_APP_API
    return function (dispatch) {
        axios.get(url).then((resp)=>{
            dispatch(getUsers(resp.data));
        }).catch(error => console.log(error))
    };
};

// DELETE
const userDeleted = () =>({
    type: types.DELETE_USER
})

export const deleteUsers = (id) => {
    const url = process.env.REACT_APP_API+"/"+id
    return function (dispatch) {
        axios.delete(url).then((resp)=>{
            dispatch(userDeleted());
            dispatch(loadUsers());
        }).catch(error => console.log(error))
    };
};


export const addUsers = (user) => {
    const url = process.env.REACT_APP_API
    return function (dispatch) {
        axios.post(url, user)
        .then((resp)=>{
            dispatch(userAdded());
            dispatch(loadUsers());
        }).catch(error => console.log(error))
    };
};


const userAdded = () =>({
    type: types.ADD_USER,
})


export const getSingleUser = (id) => {
    const url = process.env.REACT_APP_API+"/"+id
    return function (dispatch) {
        axios
        .get(url)
        .then((resp)=>{
            dispatch(getUser(resp.data));
        })
        .catch(error => console.log(error))
    };
};

const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
})


const userUpdated = () =>({
    type: types.UPDATE_USER,
})


export const updateUser = (user, id) => {
    const url = process.env.REACT_APP_API+"/"+id
    return function (dispatch) {
        axios
        .put(url, user)
        .then((resp)=>{
            dispatch(userUpdated());
        })
        .catch(error => console.log(error))
    };
};