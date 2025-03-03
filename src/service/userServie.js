import axios from "axios"
import { BASE_URL } from "./config"

export const userServ={
    postLogin: (loginForm) => {
        return axios.post(`${BASE_URL}/api/auth/login`, loginForm, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    postSignUp: (signUpForm) => {
        return axios.post(`${BASE_URL}/api/auth/register`, signUpForm, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}