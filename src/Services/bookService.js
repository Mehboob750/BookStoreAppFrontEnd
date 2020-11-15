import httpService from "./httpServices.js";

export default {
    addBook(data) {
        return httpService.post("/Book", data);
    }
   
};