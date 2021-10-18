import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory, useParams } from "react-router-dom";
import { getSingleUser, updateUser} from "../redux/Users/UsersActions"
import { useDispatch, useSelector } from "react-redux";

export default function EditUser() {
    const [state, setState] = useState({
        name : "",
        email : "",
        contact : "",
        address : "",
    })

    const [ error, setError ] = useState("");
    let {id} = useParams()
    const { user } = useSelector((state) => state.users);
    

    let history = useHistory();
    let dispatch = useDispatch();
    const {name, email, contact, address} = state;

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, [])

    useEffect(() => {
        if(user) {  
            setState({ ...user })
        }
    }, [user]);

    
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
            
            dispatch(updateUser(state, id))
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

            <h1>Edit User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    
                <div style={{marginTop:10}}><TextField id="name" 
                     label="Name"
                     name="name"
                     type="text"
                     value={name || ""}
                     onChange={handleInputChange}
                     /></div>
                 <div style={{marginTop:10}}><TextField id="email" 
                    name="email" 
                    label="Email" 
                    type="email"
                    value={email || ""}
                    onChange={handleInputChange}
                    /></div>      
                <div style={{marginTop:10}}><TextField id="outlined-basic"
                    name="contact" 
                    label="Contact" 
                    type="text"
                    value={contact || ""}
                    onChange={handleInputChange}
                /></div> 
                <div style={{marginTop:10}}><TextField id="address"
                    name="address" 
                    label="Address" 
                    type="text"
                    value={address || ""}
                    onChange={handleInputChange}
                /></div>
                <div style={{ marginTop: 20 }} >
                    <Button variant="contained" 
                            style={{width:200}}
                            type="submit"
                    >UPDATE</Button>
                </div>
            </form>
        </div>
    )
}
