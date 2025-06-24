import axios from "axios";


export const GetALlBlog = () => {
    return axios.get("http://localhost:8080/api/blog");
}
export const SearchByTitleAndCatagery = (title,page,size) => {
    return axios.post(`http://localhost:8080/api/blog/find?page=`+page+"&size="+size,title);
}

export const GetBlogById = (id) => {
    return axios.get(`http://localhost:8080/api/blog/${id}`);
}