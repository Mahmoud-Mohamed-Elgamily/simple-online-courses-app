import axiosInstance from './serverHandler'

export default {
  login: (user, history) => {
    axiosInstance(history)
      .post("/auth/logIn",  {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 203)
          return alert(res.data.message)
        localStorage.token = `Bearer ${res.data.accessToken}`;
        localStorage.user = JSON.stringify(res.data.user)
        console.log(res.data);
        localStorage.courses = res.data.courses.map(course => course.id)

        res.data.user.role == 'admin' ? history.push('/dashboard') : history.push('/');
      })
      .catch((err) => {
        console.log(err)
      });
  },
  register: (user, history) => {
    axiosInstance(history)
      .post("/auth/signUp", user)
      .then((res) => {
        if (res.status === 203)
          return alert(res.data.message)
        localStorage.token = `Bearer ${res.data.accessToken}`;
        localStorage.user = JSON.stringify(res.data.user);
        localStorage.courses = [];
        history.push('/');
      })
      .catch((err) => {
        console.log(err)
      });
  },
  logout: (history) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("courses");
    history.push('/')
  },
}