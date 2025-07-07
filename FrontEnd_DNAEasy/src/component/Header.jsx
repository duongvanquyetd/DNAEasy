
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Logo from "./image/logo/Logo.jpg"
import { BellOutlined } from "@ant-design/icons"
import { Logout } from "../service/login"
import { GetMyInfor } from "../service/user"
import { GetAllNoti, MarkALLreaded, NumberNotification, Readed } from "../service/Notification"

const Header = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState("")

  // Notification state
  const [showNotification, setShowNotification] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const [totalPages, setTotalPages] = useState(0)
  const rolename = localStorage.getItem("rolename");
  useEffect(() => {
    if (rolename) {
      GetMyInfor()
        .then((response) => {
          setUser(response.data)
          console.log("response infor user", response.data)
        })
        .catch((error) => {
          console.log("Error load my infor", error)
        })
    }
  }, [])

  useEffect(() => {
    if (rolename) {
      GetAllNoti(currentPage, pageSize).then((response) => {
        console.log("Response data", response.data)
        setNotifications(response.data.content)
        setTotalPages(response.data.totalPages)
      })

      NumberNotification().then((response) => {
        console.log("response number ", response.data)
        setUnreadCount(response.data)
      })
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentPage])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".avatar-container")) {
        setIsDropdownOpen(false)
      }
      if (!event.target.closest(".notification-container")) {
        setShowNotification(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleViewProfile = () => {
    navigate("/user/profile")
    setIsDropdownOpen(false)
  }

  const handleAdminDashboard = () => {
    navigate("/AdminDashboard")
    setIsDropdownOpen(false)
  }

  const handleLogout = () => {
    const token = { token: localStorage.getItem("token") }
    Logout(token).then(() => {
      localStorage.clear()
      navigate("/user/login")
    })
    setIsDropdownOpen(false)
  }

  // Mark notification as read
  const handleMarkAsRead = (id) => {
    Readed(id).then((response) => {
      console.log("Response readed", response.data)
      // Refresh notifications after marking as read
      GetAllNoti(currentPage, pageSize).then((response) => {
        setNotifications(response.data.content)

      })
      NumberNotification().then((response) => {
        setUnreadCount(response.data)
      })
    })
  }
  const handleMarkAsReadAll = () => {
    MarkALLreaded().then((response) => {
      console.log("Response readed", response.data)
      // Refresh notifications after marking as read
      GetAllNoti(currentPage, pageSize).then((response) => {

        setNotifications(response.data.content)
      })
      NumberNotification().then((response) => {
        setUnreadCount(response.data)
      })
    })
  }


  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  const renderPagination = (total, current, setPage) => (
    <div style={styles.paginationContainer}>
      <div style={styles.paginationInfo}>
        Page {current} / {total}
      </div>
      <div style={styles.paginationButtons}>
        <button
          style={{
            ...styles.paginationButton,
            ...(current === 1 ? styles.paginationButtonDisabled : {}),
          }}
          onClick={() => setPage(Math.max(1, current - 1))}
          disabled={current === 1}
        >
          ‹ Prev
        </button>

        {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            style={{
              ...styles.paginationButton,
              ...(i === current ? styles.paginationButtonActive : {}),
            }}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        ))}

        <button
          style={{
            ...styles.paginationButton,
            ...(current === total ? styles.paginationButtonDisabled : {}),
          }}
          onClick={() => setPage(Math.min(total, current + 1))}
          disabled={current === total}
        >
          Next ›
        </button>
      </div>
    </div>
  )

  return (
    <header
      style={{
        ...styles.header,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "#ffffff",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "0 2px 20px rgba(0, 0, 0, 0.05)",
        transform: isScrolled ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100px",
      }}
    >
      <div style={styles.logo}>
        <Link to="/">
          <img src={Logo || "/placeholder.svg"} alt="DNAEASY Logo" style={styles.image} />
        </Link>
      </div>

      <nav style={styles.nav}>
        {[
          ...(rolename === "CUSTOMER" ? [{ name: "Home", path: "/" }] : []),
          ...(rolename === "CUSTOMER" || rolename === "STAFF_RECEPTION" ? [{ name: "Service", path: "/service" }] : []),
          { name: "Blog", path: "/blog" },
          { name: "Your Appointment", path: "/yourappointment" },
          { name: "History Booking", path: "/historybooking" },


        ].map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              ...styles.navLink,
              animationDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#0066cc"
              e.target.style.transform = "translateY(-2px)"
              e.target.style.textShadow = "0 2px 8px rgba(0, 102, 204, 0.3)"
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#333"
              e.target.style.transform = "translateY(0)"
              e.target.style.textShadow = "none"
            }}
          >
            {item.name}
            <span style={styles.navUnderline}></span>
          </Link>
        ))}
      </nav>

      {user && user.rolename !== "GUEST" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {/* Notification Icon */}
          <div className="notification-container" style={{ position: "relative", marginRight: 8 }}>
            <span
              style={{ position: "relative", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation()
                setShowNotification(!showNotification)
              }}
            >
              <BellOutlined
                style={{
                  fontSize: 26,
                  color: unreadCount > 0 ? "#ff9800" : "#888",
                  verticalAlign: "middle",
                  transition: "all 0.3s ease",
                  transform: showNotification ? "scale(1.1)" : "scale(1)",
                }}
              />
              {unreadCount > 0 && (
                <span style={styles.notificationBadge}>{unreadCount > 99 ? "99+" : unreadCount}</span>
              )}
            </span>

            {showNotification && (
              <div style={styles.notificationPopup}>
                {/* Header */}
                <div style={styles.notificationHeader}>
                  <div style={styles.notificationTitle}>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc" }}>Notifications</span>
                    {unreadCount > 0 && <span style={styles.unreadBadge}>{unreadCount} new</span>}
                    {unreadCount > 0 && <button style={styles.unreadBadge} onClick={() => handleMarkAsReadAll()}> Mark Readed ALL</button>}
                  </div>
                </div>

                {/* Notifications List */}
                <div style={styles.notificationList}>
                  {notifications.length === 0 ? (
                    <div style={styles.emptyState}>
                      <div style={styles.emptyIcon}>🔔</div>
                      <div style={styles.emptyText}>No notifications</div>
                      <div style={styles.emptySubtext}>You have read all notifications!</div>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.notiID}
                        style={{
                          ...styles.notificationItem,
                          backgroundColor: !n.readed ? "#f0f8ff" : "#ffffff",
                          borderLeft: !n.readed ? "4px solid #1890ff" : "4px solid transparent",
                        }}
                        onClick={() => handleMarkAsRead(n.notiID)}
                      >
                        <div style={styles.notificationContent}>
                          <div style={styles.notificationText}>
                            <span
                              style={{
                                fontWeight: !n.readed ? "600" : "400",
                                color: !n.readed ? "#1a1a1a" : "#666",
                                fontSize: "14px",
                                lineHeight: "1.4",
                              }}
                            >
                              {n.content}
                            </span>
                          </div>
                          <div style={styles.notificationMeta}>
                            <span style={styles.notificationTime}>{formatTimeAgo(n.time)}</span>
                            {!n.readed && <span style={styles.unreadDot}></span>}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={styles.notificationFooter}>
                    {renderPagination(totalPages, currentPage, setCurrentPage)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Avatar */}
          <div style={styles.avatarContainer} className="avatar-container">
            <div style={styles.avatarWrapper}>
              <img
                src={user.avatarUrl || "/placeholder.svg"}
                alt="User Avatar"
                style={styles.avatar}
                onClick={handleAvatarClick}
              />
              <div style={styles.onlineIndicator}></div>
            </div>

            {isDropdownOpen && (
              <div style={{ ...styles.dropdown, animation: "fadeInUp 0.3s ease" }}>
                <div style={styles.dropdownHeader}>
                  <img src={user.avatarUrl || "/placeholder.svg"} alt="User" style={styles.dropdownAvatar} />
                  <div style={styles.userInfo}>
                    <div style={styles.userName}>{user.name}</div>
                    <div style={styles.userRole}>{user.rolename}</div>
                  </div>
                </div>
                <div style={styles.dropdownDivider}></div>
                <button style={styles.dropdownItem} onClick={handleViewProfile}>
                  👤 View Profile
                </button>
                {user.rolename === "ADMIN" && (
                  <button style={styles.dropdownItem} onClick={handleAdminDashboard}>
                    ⚙️ Admin Dashboard
                  </button>
                )}
                <button style={styles.dropdownItem} onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div style={styles.authButtons}>
            <Link to="/user/login" style={styles.loginBtn}>
              Login
            </Link>
            <Link to="/user/register" style={styles.registerBtn}>
              Register
            </Link>
          </div>
        </>
      )}
    </header>
  )
}

const styles = {
  // ... keeping all your existing styles ...
  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  loginBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    backgroundColor: "#0066cc",
    color: "#fff",
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 102, 204, 0.2)",
  },
  registerBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    backgroundColor: "#00b894",
    color: "#fff",
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 184, 148, 0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    fontFamily: "'Inter', 'Poppins', sans-serif",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "0 0 20px 20px",
  },
  image: {
    width: "120px",
    height: "90px",
    objectFit: "contain",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
    transition: "transform 0.3s ease",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
    fontSize: "18px",
    fontWeight: "600",
    position: "relative",
    paddingBottom: "8px",
    letterSpacing: "0.5px",
  },
  navUnderline: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    width: "0",
    height: "3px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "2px",
    transform: "translateX(-50%)",
    transition: "all 0.3s",
  },
  avatarContainer: {
    position: "relative",
  },
  avatarWrapper: {
    position: "relative",
    display: "inline-block",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    border: "3px solid transparent",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundClip: "padding-box",
    transition: "all 0.3s",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "14px",
    height: "14px",
    backgroundColor: "#00d4aa",
    borderRadius: "50%",
    border: "2px solid #fff",
    boxShadow: "0 2px 8px rgba(0, 212, 170, 0.4)",
  },
  dropdown: {
    position: "absolute",
    top: "65px",
    right: "0",
    backgroundColor: "#ffffff",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    borderRadius: "16px",
    minWidth: "280px",
    zIndex: 1000,
    overflow: "hidden",
    border: "1px solid rgba(0, 0, 0, 0.05)",
  },
  dropdownHeader: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  },
  dropdownAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "12px",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  userRole: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "500",
  },
  dropdownDivider: {
    height: "1px",
    background: "rgba(0, 0, 0, 0.1)",
    margin: "0 20px",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "15px 20px",
    background: "none",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    cursor: "pointer",
    transition: "all 0.3s",
    gap: "12px",
  },

  // NEW NOTIFICATION STYLES
  notificationBadge: {
    position: "absolute",
    top: -8,
    right: -10,
    background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
    color: "#fff",
    borderRadius: "12px",
    minWidth: 20,
    height: 20,
    fontSize: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
    zIndex: 2,
    padding: "0 6px",
    border: "2px solid #fff",
  },

  notificationPopup: {
    position: "absolute",
    top: 45,
    right: 0,
    width: 420,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    zIndex: 2000,
    overflow: "hidden",
    maxHeight: 600,
    display: "flex",
    flexDirection: "column",
    animation: "slideInDown 0.3s ease-out",
  },

  notificationHeader: {
    padding: "20px 24px 16px",
    borderBottom: "1px solid #f0f0f0",
    background: "linear-gradient(135deg,rgb(15, 56, 237) 0%,rgb(37, 62, 255) 100%)",

    color: "#f8fafc"
  },

  notificationTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  unreadBadge: {
    background: "rgba(255, 255, 255, 0.2)",
    color: "#f8fafc",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backdropFilter: "blur(10px)",
  },

  notificationList: {
    flex: 1,
    overflowY: "auto",
    maxHeight: 400,
  },

  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    opacity: 0.5,
  },

  emptyText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#666",
    marginBottom: "8px",
  },

  emptySubtext: {
    fontSize: "14px",
    color: "#999",
  },

  notificationItem: {
    padding: "16px 24px",
    borderBottom: "1px solid #f8f9fa",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
  },

  notificationContent: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  notificationText: {
    lineHeight: "1.5",
  },

  notificationMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  notificationTime: {
    fontSize: "12px",
    color: "#999",
    fontWeight: "500",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#1890ff",
    boxShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
  },

  notificationFooter: {
    borderTop: "1px solid #f0f0f0",
    background: "#fafbfc",
    padding: "16px 24px",
  },

  // PAGINATION STYLES
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },

  paginationInfo: {
    fontSize: "13px",
    color: "#666",
    fontWeight: "500",
  },

  paginationButtons: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  paginationButton: {
    padding: "6px 12px",
    border: "1px solid #e1e5e9",
    background: "#fff",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paginationButtonActive: {
    background: "linear-gradient(135deg,rgb(15, 56, 237) 0%,rgb(37, 62, 255) 100%)",
    color: "#fff",
    border: "1px solid transparent",
    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
  },

  paginationButtonDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    background: "#f8f9fa",
  },
}

// Add CSS animations
const globalCSS = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInDown {
    from { 
      opacity: 0; 
      transform: translateY(-20px) scale(0.95); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1); 
    }
  }
  
  /* Custom scrollbar for notification list */
  .notification-container div[style*="overflowY: auto"]::-webkit-scrollbar {
    width: 6px;
  }
  
  .notification-container div[style*="overflowY: auto"]::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  .notification-container div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg,rgb(15, 37, 240) 0%,rgb(41, 28, 228) 100%) !important;
    border-radius: 3px;
  }
  
  .notification-container div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg,rgb(15, 37, 240) 0%,rgb(41, 28, 228) 100%) !important;
  }
  
  /* Hover effects */
  .notification-container div[style*="cursor: pointer"]:hover {
    background-color: #f8f9fa !important;
    transform: translateX(4px);
  }
  
  .notification-container button:hover:not(:disabled) {
    background: linear-gradient(135deg,rgb(15, 37, 240) 0%,rgb(41, 28, 228) 100%) !important;
    color: #fff !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
  }
`

// Inject CSS to head
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.innerHTML = globalCSS
  document.head.appendChild(style)
}

export default Header
