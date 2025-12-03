
import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL
export const RefreshTokenExprie = (token) =>
{
    return axios.post(baseUrl+"/auth/refreshtoken",token)
}