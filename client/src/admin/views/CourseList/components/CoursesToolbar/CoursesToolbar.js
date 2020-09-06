import React from 'react';
import PropTypes from 'prop-types';
import axiosInstance from 'services/serverHandler'
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { SearchInput } from 'admin/components';
import { useHistory } from 'react-router-dom';
import NewCourseModal from '../NewCourseForm/NewCourseModal';

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

const CoursesToolbar = ({ courses, categories, setCourses, searchString, setSearchString }) => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const deleteCourses = () => {
  //   axiosInstance(history).post('/users/disable', {
  //     ids: selectUserHandler.selectedUsers
  //   })
  //     .then(success => {
  //       setUsers(users.map(user => {
  //         if (selectUserHandler.selectedUsers.includes(user.id))
  //           user.disabled = true
  //         return user
  //       }))
  //       selectUserHandler.setSelectedUsers([]);
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  return (
    <div>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Course
        </Button>
        <NewCourseModal
          open={open}
          courses={courses}
          categories={categories}
          setOpen={setOpen}
          setCourses={setCourses}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </div>
      <div className={classes.row}>
        <SearchInput
          placeholder="Search Course"
          className={classes.searchInput}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
    </div>
  );
};

CoursesToolbar.propTypes = {
  className: PropTypes.string
};

export default CoursesToolbar;
