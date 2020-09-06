import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
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
import NewCategoriesModal from '../NewCategoryForm/NewCategoryModal';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
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
    marginRight: theme.spacing(1),
    '&:hover': {
      cursor: "pointer",
    },
  },
  edit: {
    '&:hover': {
      color: '#3f51b5'
    },
  },
  delete: {
    '&:hover': {
      color: 'red'
    },
  }
}));

const CategoriesCard = ({ category: categoryData, categories, setCategories }) => {

  const classes = useStyles();
  const history = useHistory();
  const [category, setCategory] = useState(categoryData)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCategory = () => {
    setOpen(true);
  }

  useEffect(() => {
    setCategories(categories.map(singleCategory => {
      return singleCategory.id == category.id ? category : singleCategory;
    }))
  }, [category])

  const deleteCategory = () => {
    let deleteConfirmation = window.confirm('sure you want to delete this ?')
    if (deleteConfirmation) {
      axiosInstance(history).delete(`/categories/${category.id}`)
      setCategories(categories.filter(singleCategory => singleCategory.id !== category.id))
    }
  }
  return (
    <Card>
      <CardContent>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {category.name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Created At {moment(category.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
          <Grid>
            <IconButton color="inherit" onClick={editCategory}>
              <EditIcon className={`${classes.statsIcon} ${classes.edit}`} />
            </IconButton>
            <IconButton color="inherit" onClick={deleteCategory}>
              <DeleteForeverIcon className={`${classes.statsIcon} ${classes.delete}`} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <NewCategoriesModal
        open={open}
        categories={categories}
        setOpen={setOpen}
        setCategories={setCategories}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        category={category}
        setCategory={setCategory}
      />
    </Card>
  );
};

CategoriesCard.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object.isRequired
};

export default CategoriesCard;
