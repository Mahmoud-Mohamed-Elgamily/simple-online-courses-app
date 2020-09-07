import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { SearchInput } from 'admin/components';
import NewCategoriesModal from '../NewCategoryForm/NewCategoryModal';

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

const CategoriesToolbar = ({ categories, setCategories, searchString, setSearchString }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Category
        </Button>
        <NewCategoriesModal
          open={open}
          categories={categories}
          setOpen={setOpen}
          setCategories={setCategories}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </div>
      <div className={classes.row}>
        <SearchInput
          placeholder="Search Categories"
          className={classes.searchInput}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
    </div>
  );
};

CategoriesToolbar.propTypes = {
  className: PropTypes.string
};

export default CategoriesToolbar;
