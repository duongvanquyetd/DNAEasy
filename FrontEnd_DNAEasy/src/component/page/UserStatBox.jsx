import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Globe } from "lucide-react";
import { CountAllUser } from "../../service/user";
import "../../component/css/UserStatBox.css";

const UserStatBox = () => {
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await CountAllUser();
        console.log("user count", userRes.data);
        setCustomerCount(userRes.data);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-stat-box">
    <div className="gradient-bg"></div>
    <div className="content">
      <div className="header">
        <div className="icon-bg">
          <Users size={16} />
        </div>
        <span>Customers</span>
        <div className="trend">
          <TrendingUp size={14} />
          +18.2%
        </div>
      </div>
      <div className="main-number">{customerCount}</div>
      <div className="info">
        <Globe size={12} />
        Worldwide
      </div>
      <div className="info">Feb 1 – Apr 1</div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar"
          style={{ width: `${Math.min((customerCount / 1000) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
    <div className="decor1"></div>
    <div className="decor2"></div>
  </div>
  );
};

export default UserStatBox;
