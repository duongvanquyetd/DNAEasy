import React from 'react';
import { Home, Users, Calendar, BarChart2 } from 'lucide-react';
import '../component/css/HeaderManager.css'; // Tận dụng style cũ nếu có
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', icon: <Home size={22} />, path: '/revenue' },
  { label: 'Users', icon: <Users size={22} />, path: '/user-admin-dashboard' },
  { label: 'Appointments', icon: <Calendar size={22} />, path: '/AdminAppoinment' },
  { label: 'Analytics', icon: <BarChart2 size={22} />, path: '/AdminRevenue' },
];

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside
      style={{
        width: 260,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #7b8fff 0%, #7f53c0 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '32px 0 0 0',
        boxShadow: '2px 0 16px rgba(80,80,160,0.08)',
      }}
    >
      {/* Logo + tên */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 32px 32px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 16,
      }}>
        <img 
          src="../../assets/logo/Logo.jpg" 
          alt="DNAEASY Logo"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: 16,
          }}
        />
        <span style={{ fontWeight: 700, fontSize: 22, color: '#1e3a8a', letterSpacing: 1 }}>DNAEASY</span>
      </div>
      {/* Menu */}
      <nav style={{ width: '100%' }}>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => item.path && navigate(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 32px',
              background: location.pathname === item.path ? 'rgba(255,255,255,0.13)' : 'none',
              borderRadius: location.pathname === item.path ? '8px 0 0 8px' : 0,
              color: location.pathname === item.path ? '#fff' : 'rgba(255,255,255,0.85)',
              fontWeight: location.pathname === item.path ? 600 : 400,
              fontSize: 17,
              cursor: item.path ? 'pointer' : 'default',
              marginBottom: 2,
              transition: 'background 0.2s',
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminHeader;