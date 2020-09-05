import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import axiosInstance from 'services/serverHandler'
import { useHistory } from 'react-router-dom';
// import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);// limit
  const [page, setPage] = useState(0);// offset
  const [searchString, setSearchString] = useState('')
  const [usersCount, setUsersCount] = useState(0)

  useEffect(() => {
    axiosInstance(history).get(`/users/allUsers/${page}/${rowsPerPage}/${searchString}`)
      .then(usersResponse => {
        setUsersCount(usersResponse.data.count)
        setUsers(usersResponse.data.rows)
      })
      .catch(error => console.log(error))
  }, [page, rowsPerPage, searchString])

  return (
    <div className={classes.root}>
      <UsersToolbar
        users={users}
        setUsers={setUsers}
        selectUserHandler={{ selectedUsers, setSelectedUsers }}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <div className={classes.content}>
        <UsersTable
          users={users}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          usersCount={usersCount}
          selectUserHandler={{ selectedUsers, setSelectedUsers }} />
      </div>
    </div>
  );
};

export default UserList;
