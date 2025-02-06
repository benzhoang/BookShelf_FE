import axios from "axios"
import { BASE_URL, configHeader } from "./config"

export const userServ={
    postLogin :(loginForm)=>{
        return axios({
            url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
            method: "POST",
            headers: configHeader(),
            data: loginForm,
        })
    },
    postSignUp :(signUpForm)=>{
        return axios({
            url: `${BASE_URL}/api/QuanLyNguoiDung/DangKy`,
            method: "POST",
            headers: configHeader(),
            data: signUpForm,
        })
    }
}