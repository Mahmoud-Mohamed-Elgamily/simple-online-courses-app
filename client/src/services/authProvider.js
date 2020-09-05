import axiosInstance from './serverHandler'
import Alert from '@material-ui/lab/Alert';

export default {
  login: (user, history) => {
    axiosInstance(history)
      .post("/auth/logIn", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 203)
          return alert(res.data.message)
        localStorage.token = `Bearer ${res.data.accessToken}`;
        localStorage.user = JSON.stringify(res.data.user)
        console.log(res.data.user.role);
        res.data.user.role == 'admin' ? history.push('/dashboard') : history.push('/');
      })
      .catch((err) => {
        console.log(err)
      });
  },
  register: user => {
    console.log(user);
    return fetch('/user/register', {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => data);
  },
  logout: (history) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push('/')
  },
}