import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/BlogDetail.css';
import { getBlogById } from '../../service/MockBlogService';
import { FaArrowLeft, FaTwitter, FaFacebook, FaLinkedin, FaClock, FaUser, FaTag, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import BlogListSidebar from './BlogListSidebar';

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
      <div className="error-container">
        <div className="error-content">
          <span className="error-icon">⚠️</span>
          <h3>Oops! Something Went Wrong</h3>
          <p>We're having trouble loading this content. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
            aria-label="Refresh page"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
  return children;
};

const Breadcrumbs = ({ title }) => (
  <nav className="breadcrumbs" aria-label="Breadcrumb">
    <div className="breadcrumbs-content">
      <a href="/" className="breadcrumb-link">
        Home
      </a>
      <span className="breadcrumb-separator">→</span>
      <span className="breadcrumb-current">{title}</span>
    </div>
  </nav>
);

const ShareButtons = ({ title, url }) => {
  const shareButtons = [
    {
      icon: <FaTwitter />,
      label: 'Share on Twitter',
      color: '#1da1f2',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      icon: <FaFacebook />,
      label: 'Share on Facebook',
      color: '#4267b2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      icon: <FaLinkedin />,
      label: 'Share on LinkedIn',
      color: '#0077b5',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="share-buttons">
      {shareButtons.map((button, index) => (
        <a
          key={index}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          className="share-button"
          style={{ '--button-color': button.color }}
          aria-label={button.label}
          title={button.label}
        >
          {button.icon}
        </a>
      ))}
    </div>
  );
};

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Load bookmark state from localStorage
    const bookmarked = localStorage.getItem(`bookmark-${blogId}`);
    setIsBookmarked(!!bookmarked);

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(blogId);
        if (!response.data) {
          throw new Error('Blog not found');
        }
        setBlog(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const totalHeight = element.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    navigate('/blog');
  };

  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (newBookmarkState) {
      localStorage.setItem(`bookmark-${blogId}`, 'true');
    } else {
      localStorage.removeItem(`bookmark-${blogId}`);
    }
  };

  const articleUrl = window.location.href;
  const articleTitle = blog?.title || 'Check out this article';

  return (
    <ErrorBoundary>
      <div className="blog-detail-container">
        <div className="reading-progress-bar">
          <div
            className="reading-progress-fill"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>
        <Header />
        <main className="blog-detail-main">
          <div className="blog-detail-content" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <Breadcrumbs title={blog?.title || 'Post Title'} />
              {loading ? (
                <div className="loading-container">
                  <div className="loading-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-meta"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line short"></div>
                      <div className="skeleton-line"></div>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="error-container">
                  <div className="error-content">
                    <span className="error-icon">📝</span>
                    <h3>Content Unavailable</h3>
                    <p>{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="retry-button"
                      aria-label="Retry loading blog"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : blog ? (
                <article className="blog-article" ref={contentRef}>
                  <div className="article-actions">
                    <button
                      onClick={handleBackClick}
                      className="back-button"
                      aria-label="Go back to blog list"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      onClick={handleBookmark}
                      className="bookmark-button"
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>
                  <header className="article-header">
                    <h1 className="article-title">{blog.title}</h1>
                    <div className="article-meta">
                      <div className="meta-item">
                        <FaUser className="meta-icon" />
                        <span>{blog.author || 'Anonymous Author'}</span>
                      </div>
                      <div className="meta-item">
                        <FaTag className="meta-icon" />
                        <span>{blog.category || 'General'}</span>
                      </div>
                      <div className="meta-item">
                        <FaClock className="meta-icon" />
                        <span>
                          {blog.date ? new Date(blog.date).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                    </div>
                  </header>
                  <div className="article-image-container">
                    {blog.imageUrls && blog.imageUrls.length > 0 ? (
                      <img
                        src={blog.imageUrls[0]}
                        alt={blog.title}
                        className="article-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x500';
                        }}
                      />
                    ) : (
                      <div className="article-image-placeholder">
                        <span className="placeholder-icon">📰</span>
                        <p>Featured image coming soon</p>
                      </div>
                    )}
                  </div>
                  <section className="article-content">
                    {blog.content ? (
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    ) : (
                      <p>This article is currently being prepared. Check back soon for the full content!</p>
                    )}
                  </section>
                  <footer className="article-footer">
                    <div className="share-section">
                      <span className="share-label">Share this article</span>
                      <ShareButtons title={articleTitle} url={articleUrl} />
                    </div>
                  </footer>
                </article>
              ) : null}
            </div>
            <BlogListSidebar />
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

BlogDetail.propTypes = {
  blog: PropTypes.shape({
    blogId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    content: PropTypes.string,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    relatedPosts: PropTypes.array,
    headings: PropTypes.array,
    avatar: PropTypes.string,
    bio: PropTypes.string,
  }),
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

ShareButtons.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default BlogDetail;