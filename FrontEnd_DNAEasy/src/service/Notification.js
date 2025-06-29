import api from "./api";

export const GetAllNoti=(page,size)=>{
    return api.get(`/notification?page=${page}&size=${size}`)

}
export const NumberNotification=()=>{
    return api.get("/notification/notinotread")
}
export const Readed=(notiID)=>{
return api.get(`/notification/readed/${notiID}`)
}

export const MarkALLreaded=()=>{
    return api.get("/notification/readedall")
}