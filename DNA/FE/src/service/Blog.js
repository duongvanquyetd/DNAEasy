import axios from "axios";
import api from "./api";

const baseUrl = import.meta.env.VITE_API_URL
export const GetALlBlog = () => {
    return axios.get(baseUrl+"/blog");
}
export const SearchByTitleAndCatagery = (data, page, size, active, sortcolumn, modesort) => {
    let url = baseUrl+`/blog/find?page=${page}&size=${size}`;
    if (typeof active === 'boolean') url += `&active=${active}`;
    url += `&sortcolumn=${sortcolumn}&sortmode=${modesort}`;
    return axios.post(url, data);
}

export const GetBlogById = (id) => {
    return axios.get(baseUrl+`/blog/${id}`);
}

export const MangerReportBlog=()=>{
    return api.get("/blog/report")
}

export const DeleteBlogs =(id)=>{
    return api.get(`/blog/delete/${id}`)
}
export const ActiveBlog =(id)=>{
    return api.get(`/blog/active/${id}`)
}
export const CreateBlog =(data)=>{
 return api.post("/blog/create",data)
}

export const UpdateBlog =(id,data) =>{

    return api.post(`/blog/update/${id}`,data)
}

export const BLogType=()=>{
    return api.get("/blog/typeblog")
}
