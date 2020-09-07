export default {
  isAuthenticated: () => {
    return !!localStorage.token;
  },
  loggedUser: localStorage.user ? JSON.parse(localStorage.user) : null,
  courses: localStorage.courses.split(','),
}