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
        localStorage.user = res.data.user
        
        res.data.user == 'admin' ? history.push('/dashboard') : history.push('/');
      })
      .catch((err) => {
        console.log(err)
        // alert(err)
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
  logout: () => {
    return fetch('/user/logout')
      .then(res => res.json())
      .then(data => data);
  },
  isAuthenticated: () => {
    return fetch('/user/authenticated')
      .then(res => {
        if (res.status !== 401)
          return res.json().then(data => data);
        else
          return { isAuthenticated: false, user: { username: "", role: "" } };
      });
  }

}