import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/BlogDetail.css'; // CSS file for BlogDetail styling
import { getBlogById } from '../../service/MockBlogService'; // Mock service for fetching blog by ID
import { FaArrowLeft, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaHeart, FaReply, FaBookmark } from 'react-icons/fa';

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

const CommentSection = ({ comments = [] }) => {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: 'Current User',
      avatar: 'https://ui-avatars.com/api/?name=Current+User',
      content: newComment,
      date: new Date().toISOString(),
      likes: 0
    };

    setLocalComments([comment, ...localComments]);
    setNewComment('');
  };

  return (
    <div className="blogDetailComments">
      <div className="commentsHeader">
        <h2>Comments</h2>
        <span className="commentsCount">{localComments.length} comments</span>
      </div>

      <form className="commentForm" onSubmit={handleSubmitComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          aria-label="Comment input"
        />
        <button type="submit">Post Comment</button>
      </form>

      <div className="commentsList">
        {localComments.map((comment) => (
          <div key={comment.id} className="commentCard">
            <div className="commentHeader">
              <img src={comment.avatar} alt={comment.author} className="commentAvatar" />
              <div>
                <div className="commentAuthor">{comment.author}</div>
                <div className="commentDate">
                  {new Date(comment.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="commentContent">{comment.content}</div>
            <div className="commentActions">
              <button className="commentAction">
                <FaHeart /> Like
              </button>
              <button className="commentAction">
                <FaReply /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const { blogId } = useParams(); // Get blogId from URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    fetchBlog();
  }, [blogId]); // Re-fetch if blogId changes

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

  const handleBackClick = () => {
    navigate('/blog'); // Navigate back to blog list
  };

  return (
    <ErrorBoundary>
      <div className="blogDetailContainer">
        <div 
          className="readingProgress" 
          style={{ transform: `scaleX(${readingProgress / 100})` }}
        />
        <Header />
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
            <button
              onClick={fetchBlog}
              className="blogDetailRetry"
              aria-label="Retry loading blog"
            >
              Retry
            </button>
          </div>
        ) : blog ? (
          <>
            <section className="blogDetailContent" ref={contentRef}>
              <div className="blogDetailHeader">
                <h1>{blog.title}</h1>
                <div className="blogDetailMeta">
                  <span className="blogDetailCategory">{blog.category}</span>
                  <span className="blogDetailDate">{new Date(blog.date).toLocaleDateString()}</span>
                  <span className="blogDetailAuthor">By {blog.author || 'Unknown Author'}</span>
                </div>
              </div>
              {blog.imageUrls?.[0] && (
                <div className="blogDetailImageContainer">
                  {/* Decorative SVG or background can be added here */}
                  <img
                    src={blog.imageUrls[0]}
                    alt={blog.title}
                    className="blogDetailImage"
                    loading="lazy"
                  />
                  {blog.imageCaption && (
                    <div className="imageCaption">{blog.imageCaption}</div>
                  )}
                </div>
              )}
              <div className="blogDetailBody">
                <p className="blogDetailExcerpt">{blog.excerpt}</p>
                <div className="blogDetailFullContent">
                  {blog.content ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    <p>No additional content available.</p>
                  )}
                </div>
              </div>
              <AuthorBio
                author={blog.author}
                avatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author)}`}
                bio="Passionate writer and content creator with expertise in technology and innovation."
              />
              <button
                className="blogDetailBackButton"
                onClick={handleBackClick}
                aria-label="Back to blog list"
              >
                <FaArrowLeft /> Back to Blogs
              </button>
            </section>
            <CommentSection comments={blog.comments || []} />
            <ShareButtons />
          </>
        ) : null}
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
  }),
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogDetail;