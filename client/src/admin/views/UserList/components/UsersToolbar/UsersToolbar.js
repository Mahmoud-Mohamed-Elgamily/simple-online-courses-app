import React from 'react';
import PropTypes from 'prop-types';
import NewUserModal from '../NewUserForm/NewUserModal';
import axiosInstance from 'services/serverHandler'
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { SearchInput } from 'admin/components';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = ({ users, setUsers, selectUserHandler, searchString, setSearchString }) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const disableSelectedUsers = () => {
    axiosInstance(history).post('/users/disable', {
      ids: selectUserHandler.selectedUsers
    })
      .then(success => {
        setUsers(users.map(user => {
          if (selectUserHandler.selectedUsers.includes(user.id))
            user.disabled = true
          return user
        }))
        selectUserHandler.setSelectedUsers([]);
      })
      .catch(err => {
        console.log(err)
      })
  }


  const enableSelectedUsers = () => {
    axiosInstance(history).post('/users/enable', {
      ids: selectUserHandler.selectedUsers
    })
      .then(success => {
        setUsers(users.map(user => {
          if (selectUserHandler.selectedUsers.includes(user.id))
            user.disabled = false
          return user
        }))
        selectUserHandler.setSelectedUsers([]);
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.exportButton} onClick={enableSelectedUsers} >Enable Selected</Button>
        <Button className={classes.exportButton} onClick={disableSelectedUsers} >Disable Selected</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Add user
        </Button>
        <NewUserModal
          open={open}
          users={users}
          setOpen={setOpen}
          setUsers={setUsers}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search users"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
