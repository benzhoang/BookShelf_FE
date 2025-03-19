import { BASE_URL, configHeader, https} from "./config"

export const bookServ={
    getBook: () => {
        return https.get("/api/books");
    },
    postBook: (dataForm) => {
        console.log(dataForm)
        return https.post("/api/books", dataForm,{ headers: configHeader() });
    },

    deleteBook: (id) => {
        console.log(id)
        return https.delete(`/api/books/${id}`,{ headers: configHeader() });
    },

    getProfile: () =>{
        return https.get("/api/users/profile", { headers: configHeader() });
    },

    getAllUser: () =>{
        return https.get("/api/users", { headers: configHeader() });
    },

    updateBook: (id, data) =>{
        console.log(id,data)
        return https.put(`/api/books/${id}`, data, { headers: configHeader() });
    },

    getCate: () =>{
        return https.get("/api/categories", { headers: configHeader() });
    },

    getAc: () =>{
        return https.get("/api/actors", { headers: configHeader() });
    },

    getMedia: () =>{
        return https.get("/api/bookmedias", { headers: configHeader() });
    },

    postImg: () =>{
        return https.post("/api/uploadImg", { headers: configHeader() });
    },
}