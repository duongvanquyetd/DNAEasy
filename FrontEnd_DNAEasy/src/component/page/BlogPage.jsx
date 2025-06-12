import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/Blog.css'; // Ensure this points to the CSS file with the new class names
import { getAllBlogs } from '../../service/MockBlogService'; // Mock service for blog posts

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
  const { category } = useParams(); // Get category from URL
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []); // Run once on mount, data is static

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      setBlogs(response.data || []); // Handle potential undefined data
      setError(null);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSetSearchQuery = useCallback(
    (value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    clearTimeout(searchInputRef.current);
    searchInputRef.current = setTimeout(() => debouncedSetSearchQuery(value), 300);
  };

  const handleBlogClick = useCallback(
    (blogId) => {
      navigate(`/blog/${blogId}`);
    },
    [navigate]
  );

  const handleCategoryChange = useCallback((e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'all') {
      navigate('/blog'); // Navigate to all blogs page
    } else if (selectedCategory) {
      navigate(`/blog/${selectedCategory}`);
    }
    setCurrentPage(1); // Reset to first page
  }, [navigate]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setCurrentPage(1);
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!category || category === 'all' || blog.category === category)
    );
  }, [blogs, searchQuery, category]);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + blogsPerPage);
  }, [filteredBlogs, currentPage]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="blogPageBtn"
          onClick={() => setCurrentPage(1)}
          aria-label="Go to first page"
        >
          1
        </button>
      );
      if (startPage > 2) pages.push(<span key="start-ellipsis" className="blogPageEllipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`blogPageBtn ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
          aria-label={`Go to page ${i}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="end-ellipsis" className="blogPageEllipsis">...</span>);
      pages.push(
        <button
          key={totalPages}
          className="blogPageBtn"
          onClick={() => setCurrentPage(totalPages)}
          aria-label="Go to last page"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

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
          <form className="blogSearchBar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search blog posts..."
              onChange={handleSearchChange}
              aria-label="Search blog posts"
            />
            <select
              name="category"
              aria-label="Select blog category"
              onChange={handleCategoryChange}
              value={category || 'all'}
            >
              <option value="all">All Categories</option>
              <option value="tech">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="health">Health</option>
            </select>
            <button type="submit" className="blogSearchBar button" aria-label="Search">
              Search
            </button>
          </form>
        </section>

        {loading ? (
          <div className="blogLoading">
            {Array.from({ length: blogsPerPage }).map((_, index) => (
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
              onClick={fetchBlogs}
              className="blogRetry"
              aria-label="Retry loading blogs"
            >
              Retry
            </button>
          </div>
        ) : (
          <section className="blogPosts">
            {paginatedBlogs.map((blog) => (
              <div key={blog.blogId} className="blogPost">
                <img
                  src={blog.imageUrls?.[0] || 'https://via.placeholder.com/320x220?text=Blog+Image'}
                  alt={blog.title}
                  className="blogImage"
                  loading="lazy"
                />
                <h3>{blog.title}</h3>
                <p className="blogSummary">{blog.excerpt}</p>
                <button
                  className="blogLinkButton"
                  onClick={() => handleBlogClick(blog.blogId)}
                  aria-label={`Read more about ${blog.title}`}
                >
                  Read More
                </button>
              </div>
            ))}
          </section>
        )}

        <section className="blogPageNav">{renderPagination()}</section>

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