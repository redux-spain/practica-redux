import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { addUsers } from "../redux/Users/UsersActions"
import { useDispatch, useSelector } from "react-redux";

export default function AddUser() {
    const [state, setState] = useState({
        name : "",
        email : "",
        contact : "",
        address : "",
    })

    let dispatch = useDispatch();

    const {name, email, contact, address} = state; 

    const [ error, setError ] = useState("");

    let history = useHistory();
    const goHome = () => {
        history.push("/")
    }

    const handleInputChange = (e) => {
        let {name, value } = e.target;
        setState({...state, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !email || !contact) {
            setError("Please input all input Field")
        } else {
            
            dispatch(addUsers(state))
            history.push("/");
            setError("");
        }
    }

    return (
        <div>
            <div style={{ marginTop: 20 }} >
                    <Button variant="contained" 
                            style={{width:100}}
                            color="secondary"
                            onClick={()=>goHome()}
                    >Home</Button>
                </div>

            <h1>Add User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    
                <div style={{marginTop:10}}><TextField id="name" 
                     label="Name"
                     name="name"
                     type="text"
                     value={name}
                     onChange={handleInputChange}
                     /></div>
                 <div style={{marginTop:10}}><TextField id="email" 
                    name="email" 
                    label="Email" 
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    /></div>      
                <div style={{marginTop:10}}><TextField id="outlined-basic"
                    name="contact" 
                    label="Contact" 
                    type="text"
                    value={contact}
                    onChange={handleInputChange}
                /></div> 
                <div style={{marginTop:10}}><TextField id="address"
                    name="address" 
                    label="Address" 
                    type="text"
                    value={address}
                    onChange={handleInputChange}
                /></div>
                <div style={{ marginTop: 20 }} >
                    <Button variant="contained" 
                            style={{width:200}}
                            type="submit"
                    >ADD USER</Button>
                </div>
            </form>
        </div>
    )
}
