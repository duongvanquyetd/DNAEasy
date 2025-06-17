import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/BlogDetail.css'; // CSS file for BlogDetail styling
import { getBlogById } from '../../service/MockBlogService'; // Service for fetching blog by ID
import { FaArrowLeft, FaShare, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

// Mock feedback service (replace with actual API in production)
const GetFeedbacksByBlogId = async (blogId) => {
  // Simulated API response
  return {
    data: [
      { id: '1', name: 'User 1', comment: 'Great post!', createdAt: '2025-06-01' },
      { id: '2', name: 'User 2', comment: 'Very informative.', createdAt: '2025-06-02' }
    ]
  };
};
const SubmitFeedback = async (blogId, feedback) => {
  // Simulated API response
  return { data: { ...feedback, id: Date.now().toString(), createdAt: new Date().toISOString() }};
};

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
      <div className="blogDetailError">
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }
  return children;
};

const Breadcrumbs = ({ title }) => (
  <nav className="blogDetailBreadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      <li> / </li>
      <li>{title}</li>
    </ol>
  </nav>
);

const MorePosts = ({ posts }) => (
  <div className="morePosts">
    <h3>More Posts</h3>
    <div className="morePostsGrid">
      {(posts || [1, 2, 3]).map((post, idx) => (
        <div className="morePostCard" key={idx}>
          <div className="morePostImage" />
          <div className="morePostTitle">Post Title</div>
        </div>
      ))}
    </div>
  </div>
);

const ShareButtons = () => {
  const shareButtons = [
    { icon: <FaTwitter />, label: 'Share on Twitter' },
    { icon: <FaFacebook />, label: 'Share on Facebook' },
    { icon: <FaLinkedin />, label: 'Share on LinkedIn' },
  ];

  return (
    <div className="blogDetailShare">
      {shareButtons.map((button, index) => (
        <button
          key={index}
          className="shareButton"
          aria-label={button.label}
          title={button.label}
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
};

const AuthorBio = ({ author, avatar, bio }) => (
  <div className="authorBio">
    <img src={avatar} alt={author} className="authorAvatar" />
    <div className="authorInfo">
      <h3>{author}</h3>
      <p>{bio}</p>
    </div>
  </div>
);

const TableOfContents = ({ headings }) => {
  if (!headings || headings.length === 0) return null;

  return (
    <div className="tableOfContents">
      <h3>Table of Contents</h3>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#heading-${index}`}>{heading}</a>
          </li>
        ))}
      </ul>
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
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);
  const [newFeedback, setNewFeedback] = useState({ comment: '' });
  const contentRef = useRef(null);

  useEffect(() => {
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

    const fetchFeedbacks = async () => {
      try {
        setFeedbackLoading(true);
        const response = await GetFeedbacksByBlogId(blogId);
        setFeedbacks(response.data || []);
        setFeedbackError(null);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setFeedbackError('Failed to load feedbacks. Please try again later.');
      } finally {
        setFeedbackLoading(false);
      }
    };

    fetchBlog();
    fetchFeedbacks();
  }, [blogId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFeedbackChange = (e) => {
    setNewFeedback((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.comment.trim()) {
      alert('Please provide a comment.');
      return;
    }
    try {
      const response = await SubmitFeedback(blogId, {
        ...newFeedback,
        name: 'Anonymous', // Replace with actual user data in production
      });
      setFeedbacks((prev) => [response.data, ...prev]);
      setNewFeedback({ comment: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    }
  };

  const handleLoadMore = () => {
    // Placeholder for pagination logic
    console.log('Load more feedbacks for blogId:', blogId);
  };

  const handleBackClick = () => {
    navigate('/blog');
  };

  return (
    <ErrorBoundary>
      <div className="blogDetailContainer redesigned">
        <Header />
        <div className="blogDetailMain redesigned">
          <div className="blogDetailLeft">
            <Breadcrumbs title={blog?.title || 'Post Title'} />
            {loading ? (
              <div className="blogDetailLoading">
                <div className="blogDetailSkeletonImage"></div>
                <div className="blogDetailSkeletonTitle"></div>
                <div className="blogDetailSkeletonMeta"></div>
                <div className="blogDetailSkeletonContent"></div>
              </div>
            ) : error ? (
              <div className="blogDetailError">
                <p>{error}</p>
                <button onClick={fetchBlog} className="blogDetailRetry" aria-label="Retry loading blog">Retry</button>
              </div>
            ) : blog ? (
              <>
                <section className="blogDetailContent redesigned" ref={contentRef}>
                  <h1 className="blogDetailTitle">{blog.title}</h1>
                  <div className="blogDetailMeta redesigned">
                    <span className="blogDetailAuthor">{blog.author || 'Author'}</span> |
                    <span className="blogDetailCategory">{blog.category || 'Category'}</span> |
                    <span className="blogDetailDate">{blog.date ? new Date(blog.date).toLocaleString() : '1 min ago'}</span>
                  </div>
                  <div className="blogDetailImageContainer redesigned">
                    {blog.imageUrls && blog.imageUrls.length > 0 ? (
                      <img
                        src={blog.imageUrls[0]}
                        alt={blog.title}
                        className="blogDetailImage"
                        loading="lazy"
                        onError={(e) => console.log('Image failed to load:', e.target.src)}
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <div className="blogDetailBody redesigned">
                    <div className="blogDetailFullContent">
                      {blog.content ? (
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                      ) : (
                        <p>No additional content available.</p>
                      )}
                    </div>
                  </div>
                  <div className="blogDetailShare redesigned">
                    <span>Share this</span>
                    <ShareButtons />
                  </div>
                </section>
                <MorePosts posts={blog.relatedPosts || []} />
                {/* Feedback Section */}
                <section className="blog-commentSection two-column-layout">
                  <div className="blog-feedbackForm">
                    <h2>Submit Feedback</h2>
                    <form onSubmit={handleCommentSubmit}>
                      <div>
                        <label>Your feedback</label>
                        <textarea
                          name="comment"
                          value={newFeedback.comment}
                          onChange={handleFeedbackChange}
                          placeholder="If you have any feedback, please type it in here..."
                          aria-label="Feedback comment"
                        />
                      </div>
                      <button type="submit" className="blog-submitBtn" aria-label="Submit feedback">
                        Submit feedback
                      </button>
                    </form>
                  </div>
                  <div className="blog-feedbackComments">
                    <h2>Comments</h2>
                    {feedbackLoading ? (
                      <div className="blog-loadingState">
                        <p>Loading feedbacks...</p>
                      </div>
                    ) : feedbackError ? (
                      <div className="blog-errorState">
                        <p>{feedbackError}</p>
                        <button
                          onClick={() => {
                            const fetchFeedbacks = async () => {
                              try {
                                setFeedbackLoading(true);
                                const response = await GetFeedbacksByBlogId(blogId);
                                setFeedbacks(response.data || []);
                                setFeedbackError(null);
                              } catch (error) {
                                console.error('Error fetching feedbacks:', error);
                                setFeedbackError('Failed to load feedbacks. Please try again later.');
                              } finally {
                                setFeedbackLoading(false);
                              }
                            };
                            fetchFeedbacks();
                          }}
                          className="blog-retryBtn"
                          aria-label="Retry loading feedbacks"
                        >
                          Retry
                        </button>
                      </div>
                    ) : (
                      <div>
                        {feedbacks.length === 0 ? (
                          <p>No feedback yet. Be the first to comment!</p>
                        ) : (
                          feedbacks.map((feedback) => (
                            <div key={feedback.id} className="blog-feedbackCard">
                              <div className="blog-commentHeader">
                                <img
                                  src={feedback.avatar || 'https://via.placeholder.com/40'}
                                  alt={feedback.name}
                                  className="blog-commentAvatar"
                                  loading="lazy"
                                />
                                <div className="blog-commentInfo">
                                  <strong>{feedback.name}</strong>
                                  <span className="blog-commentDate">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <p>{feedback.comment}</p>
                            </div>
                          ))
                        )}
                        <button
                          className="blog-loadMoreBtn"
                          onClick={handleLoadMore}
                          aria-label="Load more feedbacks"
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </>
            ) : null}
          </div>
          <div className="blogDetailRight">
            {blog && <TableOfContents headings={blog.headings || ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]} />}
          </div>
        </div>
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
  }),
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogDetail;