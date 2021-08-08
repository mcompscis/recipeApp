import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../reducers/userReducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetail = () => {
  let dispatch = useDispatch()
  let user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
    toast.error('Successfully Logged Out', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <Container component="main">
      <CssBaseline />
        <h1>{"Welcome " + user.username}</h1>
        <Button color="secondary" variant="contained" onClick={() => handleLogout()}>
            Logout
        </Button>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
    </Container>
  )
}

export default UserDetail