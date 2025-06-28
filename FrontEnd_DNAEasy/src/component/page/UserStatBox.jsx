import React, { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react";
import { CountAllUser } from "../../service/user";

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
    <div className="w-1/6 bg-white rounded-2xl shadow-md border border-gray-200 p-4">
      <div className="bg-blue-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-800">Customers</h2>
        <p className="text-2xl">{customerCount}</p>
        <p className="text-sm text-gray-600">Feb 1 – Apr 1, 🌐 WorldWide</p>
        <p className="text-sm text-blue-600">🔼 18.2% Since last month</p>
      </div>
    </div>
  );
};

export default UserStatBox;
