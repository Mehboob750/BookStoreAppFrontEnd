import httpService from "./httpServices.js";

export default {
    addBook(data) {
        return httpService.post("/Book", data);
    },
    getBooks(){
        return httpService.get("/Book");
    },
    deleteBook(id) {
        return httpService.delete("/Book/"+id);
    },
    updateBook(data,id) {
        return httpService.update("/Book/"+id, data);
    }
};