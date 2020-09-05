import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axiosInstance from 'services/serverHandler'
import { useHistory } from 'react-router-dom';
import { Checkbox, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default function NewUserModal({ users, setUsers, open, setOpen, handleClickOpen, handleClose }) {

  const history = useHistory()
  const [newUser, setNewUser] = useState({})

  const handleUserCreation = () => {
    if (newUser.password == newUser.confirmPassword) {
      axiosInstance(history).post('/users/addUser', {
        newUser
      }).then(createdNewUser => {
        console.log(createdNewUser);
        setUsers([
          createdNewUser.data,
          ...users
        ])
        setNewUser({})
        handleClose()
      }).catch(error => {
        console.log(error)
      })
    } else alert("password doesn't match");
  }

  const handleChange = event => {
    event.persist()
    setNewUser(newUser => ({
      ...newUser,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill this form to create new user
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Email Address"
            type="email"
            name="email"
            value={newUser.email || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            type="text"
            name="name"
            value={newUser.name || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={newUser.password || ''}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={newUser.confirmPassword || ''}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup aria-label="role" name="role" value={newUser.role || ''} onChange={handleChange}>
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUserCreation} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
