import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestCourses = ({ courses, coursesCount }) => {

  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        subtitle={`${courses.length} in total`}
        title="Latest courses"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {courses.length > 0 ? courses.map((course, i) => (
            <ListItem
              divider={i < courses.length - 1}
              key={course.id}
            >
              <ListItemAvatar>
                <img
                  alt="Course"
                  className={classes.image}
                  src={`http://localhost:6066/${course.image}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={course.name}
                secondary={`Added At ${moment(course.createdAt).format('DD/MM/YYYY')}`}
              />
            </ListItem>
          )) : 'Add Some Courses !'}
        </List>
      </CardContent>
      <Divider />
      {coursesCount > 5 &&
        <CardActions className={classes.actions}>
          <Link to='/courses'>
            <Button
              color="primary"
              size="small"
              variant="text"
            >
              View all <ArrowRightIcon />
            </Button>
          </Link>
        </CardActions>}
    </Card>
  );
};

LatestCourses.propTypes = {
  className: PropTypes.string
};

export default LatestCourses;
