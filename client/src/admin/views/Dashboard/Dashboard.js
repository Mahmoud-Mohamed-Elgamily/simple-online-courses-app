import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  HeaderCard,
  LatestCourses
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <HeaderCard title="USERS" count="2" image="https://image.flaticon.com/icons/svg/900/900783.svg" />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <HeaderCard title="ADMINS" count="2" image="https://img.icons8.com/dotty/2x/admin-settings-male.png" />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <HeaderCard title="CATEGORIES" count="2" image="https://image.flaticon.com/icons/svg/151/151917.svg" />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <HeaderCard title="COURSES" count="2" image="https://image.flaticon.com/icons/svg/2963/2963006.svg" />
        </Grid>

        <Grid
          item
          lg={3}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestCourses />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
