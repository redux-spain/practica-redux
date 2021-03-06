import React, {useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUsers  } from '../redux/Users/UsersActions';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import {useHistory} from "react-router-dom";


export default function Home() {

    let dispatch = useDispatch();
    const {  users  } = useSelector(state => state.users)
    let history = useHistory();


    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteUsers(id))
        }
    }

    return (
        <>
        
        <Container>
        <h1>CRUD</h1>
        <div style={{ marginBottom: 20 }} align="left">
            <Button variant="contained" onClick={()=>history.push("addUser")}  >CREATE</Button>
        </div>


            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.id}>
             <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.contact}</StyledTableCell>
              <StyledTableCell align="center">{row.address}</StyledTableCell>
              <StyledTableCell align="center">
                
                <IconButton  color="secondary"  
                             aria-label="delete" 
                             size="large"
                             onClick={()=>handleDelete(row.id)}
                             >
                    <DeleteIcon />
                </IconButton>

                <IconButton  color="primary" aria-label="delete" size="large"
                            onClick={() => history.push(`/editUser/${row.id}`)}
                >
                    <EditIcon />
                </IconButton>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
        </>
    )
}
