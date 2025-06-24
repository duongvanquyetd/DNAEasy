import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/Blog.css'; // Ensure this points to the CSS file with the new class names
import { GetALlBlog, SearchByTitleAndCatagery } from '../../service/Blog';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error('ErrorBoundary caught:', error);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="blogError">
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }
  return children;
};

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pagesize = 5;
  const [totalpage, setTotalPages] = useState(0);


// Reset page về 1 khi thay đổi keyword / category
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, category]);

// Gọi API khi có thay đổi trang / filter
useEffect(() => {
  setLoading(true);
  SearchByTitleAndCatagery(
    { keywordSearch: searchQuery, keywordType: category },
    currentPage,
    pagesize
  )
    .then((response) => {
      setBlogs(response.data.content);
      setTotalPages(response.data.totalPages);
      setError(null);
    })
    .catch((error) => {
      console.error('Error searching blogs:', error);
      setError('Failed to search blogs. Please try again later.');
    })
    .finally(() => setLoading(false));
}, [searchQuery, category, currentPage]);


  // const fetchBlogs = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await GetALlBlog(); // Fetch blogs from the service
  //     setBlogs(response.data || []); // Handle potential undefined data

  //     console.log('Fetched blogs:', response.data); // Log the fetched data for debugging
  //     setError(null);
  //   } catch (error) {
  //     console.error('Error fetching blogs:', error);
  //     setError('Failed to load blogs. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const handleBlogClick = useCallback(
    (blogId) => {
      navigate(`/blog/${blogId}`);
    },
    [navigate]
  );



  const renderPagination = (total, current) => (
    <div className="pagination">
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          className={`page-button ${i === current ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );
  return (
    <ErrorBoundary>
      <div className="blogContainer">
        <Header />
        <section className="blogBanner">
          <div className="blogBannerContent">
            <div className="blogBannerText">
              <h1>Our Blog</h1>
              <p>Explore our latest articles and insights on various topics</p>
            </div>
            <img
              src="https://cdn.stocksnap.io/img-thumbs/280h/happy-couple_SDVOWDFSDD.jpg"
              alt="Blog Banner"
              className="blogBannerImage"
              loading="lazy"
            />
          </div>
        </section>

        <section className="blogFilter">
          <form className="blogSearchBar" onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(1);
          }}>
            <input
              type="text"
              placeholder="Search blog posts..."
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blog posts"
            />
            <select
              name="category"
              aria-label="Select blog category"
              onChange={(e) => { setCategory(e.target.value); }}
              value={category || ''}
            >
              <option value="">All Categories</option>
              {blogs.length > 0 && (
                blogs.map((blog) => (
                  <option key={blog.blogType} value={blog.blogType}>
                    {blog.blogType}
                  </option>
                ))

              )}


            </select>
            <button type="submit" className="blogSearchBar button" aria-label="Search">
              Search
            </button>
          </form>
        </section>

        {loading ? (
          <div className="blogLoading">
            {Array.from({ length: totalpage }).map((_, index) => (
              <div key={index} className="blogSkeleton">
                <div className="blogSkeletonImage"></div>
                <div className="blogSkeletonText"></div>
                <div className="blogSkeletonText"></div>
                <div className="blogSkeletonButton"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="blogError">
            <p>{error}</p>
            <button

              className="blogRetry"
              aria-label="Retry loading blogs"
            >
              Retry
            </button>
          </div>
        ) : (
          <section className="blogPosts">
            {blogs.map((blog) => (
              <div key={blog.blogId} className="blogPost">
                <img
                  src={blog.blogimage?.[0] || 'https://via.placeholder.com/320x220?text=Blog+Image'}
                  alt={blog.blogTitle}
                  className="blogImage"
                  loading="lazy"
                />
                <h3>{blog.blogTitle}</h3>
                <p className="blogSummary">{blog.excerpt}</p>
                <button
                  className="blogLinkButton"
                  onClick={() => handleBlogClick(blog.blogId)}
                  aria-label={`Read more about ${blog.blogTitle}`}
                >
                  Read More
                </button>
              </div>
            ))}
          </section>
        )}

        <section className="blogPageNav">{renderPagination(totalpage, currentPage)}</section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

Blog.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      blogId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string),
      category: PropTypes.string,
    })
  ),
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Blog;