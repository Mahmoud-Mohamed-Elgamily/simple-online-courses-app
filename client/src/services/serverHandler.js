import axios from "axios";

export default (history = null) => {

  let headers = {}
  if (localStorage.token)
    headers.Authorization = localStorage.token;

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || 'http://127.0.0.1:6066',
    headers,
  })

  axiosInstance.interceptors.response.use((response) => new Promise(
    (resolve, reject) => {
      resolve(response)
    }), (error) => {
      if (!error.response)
        return new Promise((resolve, reject) => { reject(error) })

      if (error.response.status === 403) {
        localStorage.removeItem('token');
        history ? history.push('/sign-in') : window.location = "/sign-in";
      } else {
        return new Promise((resolve, reject) => { reject(error) })
      }
    }
  )

  return axiosInstance;
}
