
import axios from "axios"
export const RefreshTokenExprie = (token) =>
{
    return axios.post("/api/auth/refreshtoken",token)
}