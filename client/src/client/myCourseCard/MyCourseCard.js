import React, { useState } from 'react';
import moment from 'moment';
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
import userProvider from 'services/userProvider'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import coursesProvider from 'services/coursesProvider';
import { useHistory } from 'react-router-dom';

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
  },
  enroll: {
    marginLeft: 7,
    '&:hover': {
      color: 'red'
    },
  }
}));

const MyCourseCard = ({ course }) => {
  const classes = useStyles();
  const history = useHistory()
  const [courseId, setCourseId] = useState(course.id)

  const cancel = () => {
    coursesProvider.enroll(history, courseId, userProvider.loggedUser.id)
  }

  const finish = () => {

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
              {moment(course.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
          <Grid>
            < IconButton color="inherit" onClick={cancel}>
              Cancel ?
              </IconButton>
            < IconButton color="inherit" onClick={finish}>
              Finish ?
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card >
  );
};

export default MyCourseCard;