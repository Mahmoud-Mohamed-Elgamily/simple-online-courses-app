import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  IconButton
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import axiosInstance from 'services/serverHandler'
import NewCourseModal from '../NewCourseForm/NewCourseModal';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 200,
    width: 100 + "%",
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const CoursesCard = ({ course:courseData, categories, courses, setCourses }) => {

  const classes = useStyles();
  const history = useHistory();
  const [course, setCourse] = useState(courseData)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCourse = () => {
    setOpen(true);
  }

  useEffect(() => {
    setCourses(courses.map(singleCourse => {
      return singleCourse.id == course.id ? course : singleCourse;
    }))
  }, [course])

  const deleteCourse = () => {
    let deleteConfirmation = window.confirm('sure you want to delete this ?')
    if (deleteConfirmation) {
      axiosInstance(history).delete(`/courses/${course.id}`)
      setCourses(courses.filter(singleCourse => singleCourse.id !== course.id))
    }
  }

  return (
    <Card>
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Course"
            className={classes.image}
            src={`http://localhost:6066/${course.image}`}
          />
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {course.name}
        </Typography>
        <Typography align="center" variant="body1">
          {course.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Created At {moment(course.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
          <Grid>
            <IconButton color="inherit" onClick={editCourse}>
              <EditIcon className={`${classes.statsIcon} ${classes.edit}`} />
            </IconButton>
            <IconButton color="inherit" onClick={deleteCourse}>
              <DeleteForeverIcon className={`${classes.statsIcon} ${classes.delete}`} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <NewCourseModal
        open={open}
        categories={categories}
        setOpen={setOpen}
        setCourses={setCourses}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        course={course}
        setCourse={setCourse}
      />
    </Card>
  );
};

CoursesCard.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired
};

export default CoursesCard;
