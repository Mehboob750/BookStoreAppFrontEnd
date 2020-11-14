import httpService from "./httpServices.js";

export default {
    register(data) {
        return httpService.post("/user/Registration", data);
    },
    login(data) {
        return httpService.post("/User/Login", data);
    }
};