import { configHeader, https} from "./config"

export const bookServ={
    getBook: () => {
        return https.get("/api/books");
    },
    postBook: (dataForm) => {
        return https.post("/api/books", dataForm,{ headers: configHeader() });
    },

    deleteBook: (id) => {
        return https.delete(`/api/books/${id}`,{ headers: configHeader() });
    },

    getProfile: () =>{
        return https.get("/api/users/profile", { headers: configHeader() });
    },

    getAllUser: () =>{
        return https.get("/api/users", { headers: configHeader() });
    },

    updateBook: (id, data) =>{
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
    postActor: (dataForm) => {
        return https.post("/api/actors", dataForm,{ headers: configHeader() });
    },
    deleteActor: (id) => {
        return https.delete(`/api/actors/${id}`,{ headers: configHeader() });
    },
    updateActor: (id, data) =>{
        return https.put(`/api/actors/${id}`, data, { headers: configHeader() });
    },
    postCate: (dataForm) => {
        return https.post("/api/categories", dataForm,{ headers: configHeader() });
    },
    deleteCate: (id) => {
        return https.delete(`/api/categories/${id}`,{ headers: configHeader() });
    },
    updateCate: (id, data) =>{
        return https.put(`/api/categories/${id}`, data, { headers: configHeader() });
    },
    postOrigin: (dataForm) => {
        return https.post("/api/bookmedias", dataForm,{ headers: configHeader() });
    },
    deleteOrigin: (id) => {
        return https.delete(`/api/bookmedias/${id}`,{ headers: configHeader() });
    },
    updateOrigin: (id, data) =>{
        return https.put(`/api/bookmedias/${id}`, data, { headers: configHeader() });
    },

    getOrder: () =>{
        return https.get("/api/invoices", { headers: configHeader() });
    },

    deleteOrder: (id) =>{
        return https.delete(`/api/invoices/${id}`, { headers: configHeader() });
    },

    deleteAccout: (id) =>{
        return https.delete(`/api/users/${id}`, { headers: configHeader() });
    },
}