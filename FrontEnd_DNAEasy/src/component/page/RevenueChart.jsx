import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { GetAppointmentStatistics } from "../../service/appointment";
import { CountAllUser } from "../../service/user";
import UserStatBox from "./UserStatBox";

const RevenueChart = () => {
const [data, setData] = useState([]);


useEffect(() => {
    const fetchData = async () => {
      const res = await GetAppointmentStatistics("2025-06-19", "2025-06-30");
      console.log("revenue data", res.data); // check log
      const chartData = res.data;
      setData(chartData);

      const userRes = await CountAllUser(); 
      console.log("user count", userRes.data); // check log
      setUserCount(userRes.data);

  };

  fetchData();
}, []);

// const [userCount, setUserCount] = useState(0);

  return (
    <div className="p-6 bg-gradient-to-br from-white to-slate-100 shadow-lg rounded-2xl border border-gray-200">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      📈 Biểu đồ doanh thu theo ngày
    </h2>

    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value) => `${Number(value).toLocaleString()} VNĐ`}
          contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px', borderColor: '#e5e7eb' }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#6366f1"
          strokeWidth={3}
          dot={{ r: 5, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>

      <div className="flex flex-wrap gap-6 px-4 py-6">
      <UserStatBox />
      </div>

  </div>
  );
};

export default RevenueChart;
