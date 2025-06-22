
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/ServiceDetail.css';
import { GetFeedbacksByServiceId, AddFeedback } from '../../service/mockFeedbackAPI';
import { getServiceById } from '../../service/service';
import { CanComment, createComment, getCommentsByServiceId } from '../../service/Comment';




 const FeedbackImages = ({ feedback }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <>
      {feedback.imgUrls && feedback.imgUrls.length > 0 && (
        feedback.imgUrls.map((img) => (
          <img
            key={img}
            src={img}
            alt="Feedback"
            className="feedback-image"
            loading="lazy"
            style={{ width: "100px", cursor: "pointer" }}
            onClick={() => setSelectedImg(img)}
          />
        ))
      )}

      {/* Overlay hiển thị ảnh lớn */}
      {selectedImg && (
        <div className="image-overlay" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Zoomed" className="zoomed-image" />
        </div>
      )}
    </>
  );
};

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
      <div className="detail-errorState">
        <p>Something went wrong. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="detail-retryBtn"
          aria-label="Retry loading service"
        >
          Retry
        </button>
      </div>
    );
  }
  return children;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    comment: ''
  });
  const [fileArray, setFileArray] = useState([]);
  const [cancomment, setCanComment] = useState('');

  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);

  const [isvalid, setIsvalid] = useState('');
  const features = [
    "Ancestry composition analysis across 2000+ regions",
    "Health predisposition reports for 200+ conditions",
    "Carrier status screening for genetic disorders",
    "Pharmacogenetics insights for medication response",
    "Trait analysis for 50+ physical characteristics",
    "Family tree connections and DNA relatives",
    "Neanderthal ancestry percentage",
    "Maternal and paternal haplogroup analysis",
  ];
  const testDetails = {
    sampleType: "Saliva (2ml)",
    processingTime: "4-6 weeks",
    accuracy: "99.9%",
    markers: "700,000+ genetic markers",
    reports: "150+ health and trait reports",
    technology: "Illumina Global Screening Array",
    coverage: "Whole genome analysis"
  }


  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);

        if (localStorage.getItem('token')) {
          const resonse = await CanComment(serviceId);
          setCanComment(resonse.data);
        } else {
          setCanComment(false);
        }


        const response = await getServiceById(serviceId);
        console.log('Fetched service:', response.data); // Log the fetched data for debugging
        if (!response.data) {
          throw new Error('Service not found');
        }
        setService(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to load service details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        setFeedbackLoading(true);
        const response = await getCommentsByServiceId(serviceId);
        setFeedbacks(response.data || []);
        console.log('Fetched feedbacks:', response.data); // Log the fetched data for debugging
        setFeedbackError(null);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setFeedbackError('Failed to load feedbacks. Please try again later.');
      } finally {
        setFeedbackLoading(false);
      }
    };

    fetchService();
    fetchFeedbacks();
  }, [serviceId]);

  const handleBookingClick = () => {
    navigate(`/booking/${serviceId}`);
  };

  const handleBackClick = useCallback(() => {
    navigate('/service');
  }, [navigate]);

  const testSteps = [
    { label: 'Sample Collection', icon: '🧪' },
    { label: 'Lab Analysis', icon: '🔬' },
    { label: 'Results Delivery', icon: '📄' },
  ];

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setNewFeedback(prev => ({
      ...prev,
      rating
    }));
  };
  function handleImageChange(e) {
    const file = Array.from(e.target.files);

    setFileArray(file);
  }
  function handleCommentSubmit(e) {
    e.preventDefault();
    if (newFeedback.rating === 0 || !newFeedback.comment.trim()) { setIsvalid('Please chooose star and input your feedback') }
    else {


      setIsvalid('');
      console.log('Submitting file:', fileArray);
      const formdata = new FormData();
      const feedbackData = {
        serviceId: serviceId,
        commentContent: newFeedback.comment,
        rating: newFeedback.rating,
      };
     console.log('Feedback data:', feedbackData);
     console.log('File array:', fileArray);
      formdata.append('comment', new Blob([JSON.stringify(feedbackData)], { type: 'application/json' }));

      fileArray.forEach((file) => {
        formdata.append("file", file);
      });
     
      createComment(formdata).then((response) => {
        console.log('Feedback submitted successfully:', response.data);
        window.location.reload(); // Reload the page to fetch new feedbacks
      }).catch((error) => {


        console.error('Error adding feedback:', error);
        setFeedbackError('Failed to add feedback. Please try again.');
      });
    }

    // Assume user info is fetched from context or session

  };

  return (
    <ErrorBoundary>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          top: "150px",
          padding: "0px 50px",

        }}
      >
        <Header />
        {loading ? (
          <div className="detail-serviceDetailLoading">
            <div className="detail-bannerSkeleton pulse">
              <div className="detail-skeletonImage"></div>
            </div>
            <div className="detail-detailContent">
              <div className="detail-skeletonText detail-skeletonTitle pulse"></div>
              <div className="detail-skeletonText detail-skeletonPrice pulse"></div>
              <div className="detail-skeletonText detail-skeletonDescription pulse"></div>
              <div className="detail-skeletonButton pulse"></div>
            </div>
          </div>
        ) : error ? (
          <div className="detail-errorState">
            <p>{error}</p>
            <button
              onClick={handleBackClick}
              className="detail-retryBtn"
              aria-label="Back to services"
            >
              Back to Services
            </button>
          </div>
        ) : (
          <>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                gap: "32px",
                marginBottom: "48px",
              }}
            >
              {/* Image Carousel */}
              <div style={{ position: "relative", width: "100%", height: "384px" }}>
                <ServiceImageCarousel imageUrls={service.imageUrls} serviceName={service.serviceName} />
              </div>

              {/* Service Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span className="badge">{service.type}</span>

                  </div>
                  <h1
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#1e40af",
                      marginBottom: "16px",
                      lineHeight: "1.2"
                    }}
                  >
                    {service.serviceName}
                  </h1>
                  {/* <p
                    style={{
                      fontSize: "18px",
                      color: "#6b7280",
                      lineHeight: "1.6",
                    }}
                  >
                    {service.serviceDescription || "No description available."}
                  </p> */}
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    color: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    padding: "45px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {new Intl.NumberFormat("vi-VN").format(service.price)} VND
                  </div>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      marginBottom: "16px",
                    }}
                  >
                    Complete analysis package
                  </p>
                  <button className='button' type='button' onClick={handleBookingClick}
                    style={{

                      backgroundColor: "white",
                      color: "#3b82f6",
                      width: "100%",
                      justifyContent: "center",
                    }}

                  >
                    📅 Book Now
                  </button>
                </div>


              </div>


            </div>
            {/* Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "24px",
                marginBottom: "48px",
              }}
            >
              <div className='card'>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#1e40af",
                  }}
                >
                  What's Included
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "25px",
                        marginBottom: "25px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          marginTop: "6px",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "14px", lineHeight: "1.5" }}>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>


              {/* Test Details */}
              <div className='card'>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    color: "#1e40af",
                  }}
                >
                  Test Specifications
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "[16px]" }}>
                  {Object.entries(testDetails).map(([key, value]) => (
                    <div key={key}>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#6b7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "4px",
                        }}
                      >
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </div>
                      <div style={{ fontWeight: "600" }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {cancomment && (

              <div className="detail-commentSection">


                <div className="detail-feedbackForm">
                  <h2>Submit Feedback</h2>
                  <form >
                    <div>
                      <label>Your service rating</label>
                      <div className="detail-starRating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= newFeedback.rating ? 'detail-star filled' : 'detail-star'}
                            onClick={() => handleRatingChange(star)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label>Additional feedback</label>
                      <textarea
                        name="comment"
                        value={newFeedback.comment}
                        onChange={handleFeedbackChange}
                        placeholder="If you have any additional feedback, please type it in here..."
                      />
                    </div>
                    <div>
                      <label>Upload images (optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        
                        onChange={handleImageChange}
                      />
                    </div>
                    {isvalid && <p className="text-danger">{isvalid}</p>}



                    <button type="submit" className="detail-submitBtn" onClick={handleCommentSubmit}>Submit feedback</button>
                  </form>
                </div>
              </div>

            )}

            {/* comment */}
            <section className="detail-commentSection">

              <div className="detail-feedbackComments">
                <h2>Comments</h2>
                {feedbackLoading ? (
                  <div className="detail-loadingState">
                    <p>Loading feedbacks...</p>
                  </div>
                ) : feedbackError ? (
                  <div className="detail-errorState">
                    <p>{feedbackError}</p>
                    <button
                      onClick={() => {
                        const fetchFeedbacks = async () => {
                          try {
                            setFeedbackLoading(true);
                            const response = await GetFeedbacksByServiceId(serviceId);
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
                      className="detail-retryBtn"
                      aria-label="Retry loading feedbacks"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <div>
                    {feedbacks.map((feedback, index) => (
                      <div key={index} className="feedback-card">
                        <div className="feedback-header">
                          <img
                            src={feedback.avatarUrl}
                            alt={feedback.name}
                            className="feedback-avatar"
                          />
                          <div className="feedback-info">
                            <div className="feedback-name">{feedback.name}</div>
                            <div className="feedback-date">
                              {new Date(feedback.commentDate).toLocaleDateString()}
                            </div>
                            <div className="feedback-rating">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span
                                  key={i}
                                  className={i < feedback.rating ? 'star filled' : 'star'}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="feedback-comment">{feedback.commentContent}</div>


                        <FeedbackImages feedback={feedback} />

                      </div>
                    ))}

                   
                  </div>
                )}
              </div>
            </section>
          </>

        )}
      </div>
      <Footer />

    </ErrorBoundary>
  );
};

ServiceDetail.propTypes = {
  service: PropTypes.shape({
    serviceId: PropTypes.string.isRequired,
    serviceName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    testDetails: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ServiceDetail;