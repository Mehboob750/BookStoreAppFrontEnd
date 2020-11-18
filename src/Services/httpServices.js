import axios from "axios";
axios.defaults.headers.common = {
  Authorization: 'Bearer '+ `${localStorage.getItem("Token")}`
};
export default {
  post(url, data) {
    return axios.post(url, data);
  },
  get(url) {
    return axios.get(url);
  },
  delete(url) {
    return axios.delete(url);
  },
  update(url, data) {
    return axios.put(url, data);
  }
};