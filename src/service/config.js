import axios from "axios";
import { localUserServ } from "./localService";


export const BASE_URL="https://bookshelf-be.onrender.com";

const TokenCyberSoft = "";


export const configHeader = () => {
    return{
        TokenCyberSoft: TokenCyberSoft,
        Authorization: "bearer" + localUserServ.get()?.accessToken,
        // ? là optional chaining
    }   
}

export const https=axios.create({
    baseURL: BASE_URL,
    headers: configHeader(),
})
