import axiosInstance from './serverHandler'
import userProvider from './userProvider'

export default {
  all: (history, page, rows, category, setCourses, setCoursesCount, setCategories, search) => {
    axiosInstance(history).get(`/client/courses/${page}/${rows}/${category}/${search}`)
      .then(response => {
        setCategories(response.data.categories)
        setCoursesCount(response.data.courses.count)
        setCourses(response.data.courses.rows)
      })
      .catch(error => console.log(error))
  },
  userCourses: (history, setCourses, userId) => {
    axiosInstance(history).get(`/client/${userId}/courses/`)
      .then(response => {
        console.log(response);
        setCourses(response.data.courses)
      })
      .catch(error => console.log(error))
  },
  enroll: (history, courseId, userId) => {
    axiosInstance(history).post(`/client/enrollToCourse`, {
      userId, courseId
    })
      .then(response => {
        localStorage.setItem('courses', response.data)
      })
      .catch(error => console.log(error))
  },
  cancel: (history, courseId, userId) => {
    axiosInstance(history).post(`/client/cancel`, {
      userId, courseId
    })
      .then(response => {
        localStorage.setItem('courses', response.data)
      })
      .catch(error => console.log(error))
  },
  finish: (history, courseId, userId) => {
    axiosInstance(history).post(`/client/finish`, {
      userId, courseId
    })
      .then(response => {
        let x = JSON.parse(localStorage.user)
        x.points = response.data.points
        
        localStorage.user = JSON.stringify(x)
        localStorage.setItem('courses', response.data.courses)
      })
      .catch(error => console.log(error))
  }
}