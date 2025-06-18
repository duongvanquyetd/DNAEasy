import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';

import '../css/BlogDetail.css'; // CSS file for BlogDetail styling
import { getBlogById } from '../../service/MockBlogService'; // Service for fetching blog by ID
import { FaArrowLeft, FaShare, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { GetBlogById } from '../../service/Blog';

// Mock feedback service (replace with actual API in production)



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

  const contentRef = useRef(null);

  useEffect(() => {


    GetBlogById(blogId)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
        console.log('Blog fetched successfully:', response.data);
      }

      ).catch((err) => {
        console.error('Error fetching blog:', err);
      })
  }, []);


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



  const articleUrl = window.location.href;
  const articleTitle = blog?.title || 'Check out this article';

  return (


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
                <h1 className="blogDetailTitle">{blog.blogTitle}</h1>
                <div className="blogDetailMeta redesigned">
                  <span className="blogDetailAuthor">{blog.staffName || 'Author'}</span> |
                  <span className="blogDetailCategory">{blog.blogType || 'Category'}</span> |
                  <span className="blogDetailDate">{blog.createDate ? new Date(blog.createDate).toLocaleString() : '1 min ago'}</span>
                </div>
                <div className="blogDetailImageContainer redesigned">
                  {blog.blogimage && blog.blogimage.length > 0 ? (
                    <img
                      src={blog.blogimage[0]}
                      alt={blog.blogTitle}
                      className="blogDetailImage"
                      loading="lazy"
                      onError={(e) => console.log('Image failed to load:', e.target.src)}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="blog-detail-body">
                  <div className="blog-detail-content">
                    {blog.blogContent ? (
                      <article dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
                    ) : (
                      <p className="no-content">No additional content available.</p>
                    )}
                  </div>
                </div>
                <div className="blogDetailShare redesigned">
                  <span>Share this</span>
                  <ShareButtons />
                </div>
              </section>
              <MorePosts posts={blog.relatedPosts || []} />




            </>
          ) : null}
        </div>
        <div className="blogDetailRight">
          {blog && <TableOfContents headings={blog.headings || ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]} />}
        </div>

      </div>
      <Footer />
    </div>

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



ShareButtons.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default BlogDetail;