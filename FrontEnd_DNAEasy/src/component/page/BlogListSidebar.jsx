import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBlogs } from '../../service/MockBlogService';

const BlogListSidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await getAllBlogs();
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
              onClick={() => navigate(`/blog/${blog.blogId}`)}
            >
              {blog.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlogListSidebar;
