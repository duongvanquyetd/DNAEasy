import axios from "axios";
import api from "./api";
const baseUrl = import.meta.env.VITE_API_URL
export const createComment = (commentData) => {
  return  api.post("/comments/create", commentData);
}

export const getCommentsByServiceId = (serviceId) => {
  return axios.get(baseUrl+"/comments/"+ `${serviceId}`);
}

export const CanComment = (serviceId) => {

  return api.get(`/comments/cancomment/${serviceId}`);
}

export const ManageCommentReport=(page,size,datasearch)=>{
  return api.post(`/comments/managercomment?page=${page}&size=${size}`,datasearch)
}

export const CommentReport = ()=>{
  return api.get("/comments/commentReport")
}