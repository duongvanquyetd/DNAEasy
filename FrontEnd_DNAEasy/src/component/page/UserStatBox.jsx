import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Globe, Briefcase, Shield, User } from "lucide-react";
import { GetUserRoleStats } from "../../service/user";
import "../../component/css/UserStatBox.css";

const UserStatBox = () => {
  const [userStats, setUserStats] = useState({
    total: 0,
    staff: 0,
    manager: 0,
    admin: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetUserRoleStats();
        console.log("User role stats API response:", response);
        console.log("User role stats data structure:", JSON.stringify(response.data));
        
        if (response && response.data) {
          // Directly use the response data without any transformation
          console.log("Setting user stats to:", response.data);
          setUserStats(response.data);
          
          // Log each individual value for debugging
          console.log("Total users:", response.data.total);
          console.log("Staff count:", response.data.staff);
          console.log("Manager count:", response.data.manager);
          console.log("Admin count:", response.data.admin);
        }
      } catch (error) {
        console.error("API error:", error);
        setError("Failed to load user statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // User role data - log values when creating this array
  console.log("Creating userRoleData with values:", {
    staff: userStats.staff,
    manager: userStats.manager,
    admin: userStats.admin
  });
  
  const userRoleData = [
    { 
      name: "Staff", 
      value: userStats.staff || 0,
      color: "#3b82f6", 
      icon: Briefcase
    },
    { 
      name: "Manager", 
      value: userStats.manager || 0,
      color: "#10b981", 
      icon: Shield
    },
    { 
      name: "Admin", 
      value: userStats.admin || 0,
      color: "#f59e0b", 
      icon: User
    }
  ];

  // Get current month and year
  const getCurrentMonthYear = () => {
    const date = new Date();
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return <div className="user-stat-box loading">Loading user statistics...</div>;
  }

  if (error) {
    return <div className="user-stat-box error">Error: {error}</div>;
  }

  // Log the current state when rendering
  console.log("Rendering UserStatBox with state:", userStats);

  return (
    <div className="user-stat-box">
      <div className="gradient-bg"></div>
      <div className="content">
        <div className="header">
          <div className="icon-bg">
            <Users size={16} />
          </div>
          <span>Users</span>
          <div className="trend">
            <TrendingUp size={14} />
            +18.2%
          </div>
        </div>
        <div className="main-number">{formatNumber(userStats.total || 0)}</div>
        <div className="info">
          <Globe size={12} />
          Worldwide
        </div>
        <div className="info">{getCurrentMonthYear()}</div>
        
        <div className="stat-user-roles">
          {userRoleData.map((item, index) => (
            <div key={index} className="role-item">
              <item.icon size={16} color={item.color} />
              <span>
                {item.name} <strong>{item.value}</strong>
              </span>
            </div>
          ))}
        </div>
        
        <div className="progress-bar-bg">
          <div
            className="progress-bar"
            style={{ width: `${Math.min((userStats.total / 100) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
      <div className="decor1"></div>
      <div className="decor2"></div>
    </div>
  );
};

export default UserStatBox;
