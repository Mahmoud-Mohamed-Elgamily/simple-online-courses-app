import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { CoursesToolbar, CoursesCard } from './components';
import { TablePagination } from '@material-ui/core';
import axiosInstance from 'services/serverHandler'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const CourseList = () => {
  const classes = useStyles();
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(9);// limit
  const [page, setPage] = useState(0);// offset
  const [searchString, setSearchString] = useState('')
  const [coursesCount, setCoursesCount] = useState(0)

  useEffect(() => {
    axiosInstance(history).get(`/courses/allCourses/${page}/${rowsPerPage}/${searchString}`)
      .then(response => {
        setCategories(response.data.categories)
        setCoursesCount(response.data.courses.count)
        setCourses(response.data.courses.rows)
      })
      .catch(error => console.log(error))
  }, [page, rowsPerPage, searchString])

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  return (
    <div className={classes.root}>
      <CoursesToolbar
        categories={categories}
        courses={courses}
        setCourses={setCourses}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {courses.length > 0 ? courses.map(course => (
            <Grid item key={course.id} lg={4} md={6} xs={12}>
              <CoursesCard course={course} courses={courses} setCourses={setCourses}  categories={categories} />
            </Grid>
          )) :
            <Grid item lg={4} md={6} xs={12} style={{ marginTop: 25 }}>
              Add Some Courses
            </Grid>
          }
        </Grid>
      </div>
      {coursesCount > rowsPerPage ?
        <div className={classes.pagination}>
          <TablePagination
            component="div"
            count={coursesCount}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[6, 9, 21]}
          />
        </div> : ''}
    </div>
  );
};

export default CourseList;
