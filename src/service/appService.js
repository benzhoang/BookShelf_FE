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
    }


}