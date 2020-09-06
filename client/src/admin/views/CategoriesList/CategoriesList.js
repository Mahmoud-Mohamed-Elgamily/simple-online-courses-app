import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { CategoriesToolbar, CategoriesCard } from './components';
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

const CategoriesList = () => {
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(9);// limit
  const [page, setPage] = useState(0);// offset
  const [searchString, setSearchString] = useState('')
  const [categoriesCount, setCategoriesCount] = useState(0)

  useEffect(() => {
    axiosInstance(history).get(`/categories/allCategories/${page}/${rowsPerPage}/${searchString}`)
      .then(categoriesResponse => {
        setCategoriesCount(categoriesResponse.data.count)
        setCategories(categoriesResponse.data.rows)
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
      <CategoriesToolbar
        categories={categories}
        setCategories={setCategories}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {categories.length > 0 ? categories.map(category => (
            <Grid item key={category.id} lg={4} md={6} xs={12}>
              <CategoriesCard category={category} categories={categories} setCategories={setCategories} />
            </Grid>
          )) :
            <Grid item lg={4} md={6} xs={12} style={{ marginTop: 25 }}>
              Add Some Categories
            </Grid>
          }
        </Grid>
      </div>
      {categoriesCount > rowsPerPage ?
        <div className={classes.pagination}>
          <TablePagination
            component="div"
            count={categoriesCount}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[6,9,21]}
          />
        </div> : ''}
    </div>
  );
};

export default CategoriesList;
