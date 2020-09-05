export default {
  isAuthenticated: () => {
    return localStorage.token ? true : false;
  },
  loggedUser: localStorage.user ? JSON.parse(localStorage.user) : null,

}