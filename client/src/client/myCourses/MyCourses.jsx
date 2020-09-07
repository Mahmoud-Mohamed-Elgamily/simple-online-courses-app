import React, { useEffect, useState } from 'react'
import Navbar from 'client/navbar/Navbar'
import { Container, Grid } from '@material-ui/core'
import coursesProvider from 'services/coursesProvider'
import { useHistory } from 'react-router-dom'
import userProvider from 'services/userProvider'
import MyCourseCard from 'client/myCourseCard/MyCourseCard'
import './MyCourses.css'

const MyCourses = () => {
  const [courses, setCourses] = useState([])
  const history = useHistory()
  useEffect(() => {
    coursesProvider.userCourses(history, setCourses, userProvider.loggedUser.id)
  }, [])
  // console.log(userProvider.loggedUser.id);
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" className={'page-start'}>
        <h3>Points : {userProvider.loggedUser.points}</h3>
        <Grid
          container
          spacing={3}
        >
          {courses.length > 0 ? courses.map(course => (
            <Grid item key={course.id} lg={4} md={6} xs={12}>
              <MyCourseCard course={course} />
            </Grid>
          )) :
            <Grid item lg={4} md={6} xs={12} style={{ marginTop: 25 }}>
              Enroll to some courses first !
            </Grid>
          }
        </Grid>
      </Container>
    </div>
  )
}

export default MyCourses
