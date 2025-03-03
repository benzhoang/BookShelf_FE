import axios from "axios";
import { localUserServ } from "./localService";


export const BASE_URL="https://bookshelf-be.onrender.com";

export const configHeader = () => {
    const accessToken = localUserServ.getAccessToken();
    console.log("Access Token:", accessToken); // In ra Access Token
    return {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
    };
};

export const https = axios.create({
    baseURL: BASE_URL,
})