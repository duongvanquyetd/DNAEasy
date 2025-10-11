import axios from "axios";
import api from "./api";

const API_URL = "/api/comments/";

export const createComment = (commentData) => {
  return  api.post("/comments/create", commentData);
}

export const getCommentsByServiceId = (serviceId) => {
  return axios.get(API_URL + `${serviceId}`);
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