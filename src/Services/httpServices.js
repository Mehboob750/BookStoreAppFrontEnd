import axios from "axios";
axios.defaults.headers.common = {
  Authorization: `${localStorage.getItem("Token")}`
};
export default {
  post(url, data) {
    return axios.post(url, data);
  }
};