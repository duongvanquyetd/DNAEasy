import axios from "axios";


export const GetALlBlog = () => {
    return axios.get("http://localhost:8080/api/blog");
}
export const SearchByTitleAndCatagery = (title) => {
    return axios.post(`http://localhost:8080/api/blog/find`,title);
}

export const GetBlogById = (id) => {
    return axios.get(`http://localhost:8080/api/blog/${id}`);
}