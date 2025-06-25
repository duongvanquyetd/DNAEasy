import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeaderManager from './HeaderManager';
import { GetMyInfor } from '../service/user';
// file này dùng để chuyển nhận header tùy theo role của user 
const DynamicHeader = () => {
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (localStorage.getItem("token")) {
        try {
          setIsLoading(true);
          const response = await GetMyInfor();
          console.log("User role from API:", response.data.rolename);
          setUserRole(response.data.rolename);
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  console.log("Current userRole state:", userRole);
  console.log("Is Manager?", userRole === 'MANAGER');

  if (isLoading) {
    return <Header />; // Show default header while loading
  }

  return userRole === 'MANAGER' ? <HeaderManager /> : <Header />;
};

export default DynamicHeader; 