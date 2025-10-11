import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../component/css/BlogListSidebar.css';
import { GetALlBlog } from '../../service/Blog';

const BlogListSidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await GetALlBlog();
        console.log("Fetching blogs for sidebar...", response.data);
      if (response.data) {
        setBlogs(response.data.filter(blog => blog.blogId !== blogId));
      }
    };
  
    fetchBlogs();
  }, [blogId]);

  return (
    <aside className="blog-list-sidebar">
      <h3>Other Blogs</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.blogId}>
            <button
              className="blog-list-link"
              onClick={() => {
                navigate(`/blog/${blog.blogId}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {blog.blogTitle}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlogListSidebar;
