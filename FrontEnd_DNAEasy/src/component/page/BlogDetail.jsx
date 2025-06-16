import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/BlogDetail.css'; // CSS file for BlogDetail styling
import { getBlogById } from '../../service/MockBlogService'; // Service for fetching blog by ID
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

const RedesignedCommentSection = ({ comments = [] }) => {
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim()) return;
    const comment = {
      id: Date.now(),
      author: username,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`,
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
    };
    setLocalComments([comment, ...localComments]);
    setNewComment('');
    setUsername('');
  };

  return (
    <div className="blogDetailComments">
      <div className="commentsHeader">
        <h2>Comments</h2>
        <span className="commentsCount">{localComments.length} comments</span>
      </div>
      <form className="commentForm redesigned" onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username..."
          aria-label="Username"
        />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Your Comment..."
          aria-label="Comment input"
        />
        <button type="submit">Comment</button>
      </form>
      <div className="commentsList redesigned">
        {localComments.map((comment) => (
          <div key={comment.id} className="commentCard redesigned">
            <img src={comment.avatar} alt={comment.author} className="commentAvatar" />
            <div className="commentBody">
              <div className="commentMeta">
                <span className="commentAuthor">{comment.author}</span>
                <span className="commentDate">{new Date(comment.date).toLocaleDateString()}</span>
              </div>
              <div className="commentContent">{comment.content}</div>
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
      console.log('Fetched blog data:', response.data); // Debug: Log the fetched data
      if (!response.data) {
        throw new Error('Blog not found');
      }
      setBlog(response.data); // Use the fetched data directly
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
                        onError={(e) => console.log('Image failed to load:', e.target.src)} // Debug image load errors
                      />
                    ) : (
                      <p>No image available</p> // Fallback if no image
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
                <RedesignedCommentSection comments={blog.comments || []} />
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
    relatedPosts: PropTypes.array, // Optional: for MorePosts
    comments: PropTypes.array,    // Optional: for comments
    headings: PropTypes.array,    // Optional: for TableOfContents
  }),
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogDetail;