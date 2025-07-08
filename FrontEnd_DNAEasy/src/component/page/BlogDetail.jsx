import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import BlogListSidebar from './BlogListSidebar';
import '../css/BlogDetail.css'; // CSS file for BlogDetail styling
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { GetBlogById } from '../../service/Blog';


const ServiceImageCarousel = ({ imageUrls, serviceName }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [imageUrls.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length)
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "384px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      }}
    >
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url || "/placeholder.svg"}
          alt={`${serviceName} ${index + 1}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      ))}

      <button
        onClick={goToPrevious}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        ‹
      </button>

      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        ›
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: "none",
              background: index === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  )
}
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
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [blogId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

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
          ) : blog ? (
            <>
              <section className="blogDetailContent redesigned" ref={contentRef}>
                <h1 className="blogDetailTitle">{blog.blogTitle}</h1>
                <div className="blogDetailMeta redesigned">
                  <span className="blogDetailAuthor">{blog.author || 'Author'}</span> |
                  <span className="blogDetailCategory">{blog.blogType || 'Category'}</span> |
                  <span className="blogDetailDate">{blog.createDate ? new Date(blog.createDate).toLocaleString() : '1 min ago'}</span>
                </div>
                <div className="blogDetailImageContainer redesigned">
                  {blog.blogimage && blog.blogimage.length > 0 ? (
                    <ServiceImageCarousel imageUrls={blog.blogimage} serviceName={blog.blogTitle} />
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
            </>
          ) : null}
        </div>
        <div className="blogDetailRight">
          <BlogListSidebar />
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