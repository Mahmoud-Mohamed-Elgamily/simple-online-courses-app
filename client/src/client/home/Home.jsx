import React, { useState, useEffect } from 'react'
import Navbar from "client/navbar/Navbar";
import { Container, TablePagination, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import coursesProvider from 'services/coursesProvider'
import CoursesCard from 'client/courseCard/CoursesCard';
import './home.css'

const Home = () => {
  const [rowsPerPage, setRowsPerPage] = useState(9);// limit
  const [page, setPage] = useState(0);// offset
  const [category, setCategory] = useState('none')
  const [coursesCount, setCoursesCount] = useState(0)
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const history = useHistory()
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    coursesProvider.all(history, page, rowsPerPage, category, setCourses, setCoursesCount, setCategories, search)
  }, [page, rowsPerPage, category, search])

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <Container maxWidth="lg">
        <header id="home-header">
          <img src="https://www.managementstudyhq.com/wp-content/uploads/2019/07/Leadership.jpg" alt="" />
          <h1>
            “Don't let what you cannot do interfere with what you can do.”
          </h1>
        </header>

        <hr />

        <Grid spacing={3} id='gridParent'>
          <Grid item lg={6} md={6} xs={12}>
            <ul>
              <li className="categories">
                <button className={category == 'none' && 'active'} onClick={(e) => setCategory('none')} >
                  Clear Filter
                </button>
              </li>
              {
                categories.map(cat =>
                  <li className="categories" key={cat.id}>
                    <button className={cat.id == category && 'active'} data-id={cat.id} onClick={(e) => setCategory(e.target.dataset.id)} >
                      {cat.name}
                    </button>
                  </li>
                )
              }
            </ul>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            {coursesCount > rowsPerPage ?
              <>
                <TablePagination
                  component="div"
                  count={coursesCount}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[6, 9, 21]}
                />
              </> : ''}
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
        >
          {courses.length > 0 ? courses.map(course => (
            <Grid item key={course.id} lg={4} md={6} xs={12}>
              <CoursesCard course={course} />
            </Grid>
          )) :
            <Grid item lg={4} md={6} xs={12} style={{ marginTop: 25 }}>
              New courses will be added soon.
            </Grid>
          }
        </Grid>
      </Container>
    </div>
  )
}

export default Home
