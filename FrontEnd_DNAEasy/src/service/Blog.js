import axios from "axios";
import api from "./api";


export const GetALlBlog = () => {
    return axios.get("http://localhost:8080/api/blog");
}
export const SearchByTitleAndCatagery = (data,page,size,active) => {
    return axios.post(`http://localhost:8080/api/blog/find?page=${page}&size=${size}&active=${active}`,data);
}

export const GetBlogById = (id) => {
    return axios.get(`http://localhost:8080/api/blog/${id}`);
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