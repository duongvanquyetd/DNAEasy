// src/api/userApi.js

const API_BASE_URL = 'https://your-backend-api.com';

// Lấy hồ sơ người dùng theo ID
export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token xác thực
      },
    });

    if (!response.ok) {
      throw new Error('Không thể lấy dữ liệu hồ sơ người dùng');
    }

    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy hồ sơ:', error);
    throw error;
  }
};

// Cập nhật hồ sơ người dùng
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Không thể cập nhật hồ sơ người dùng');
    }

    return await response.json();
  } catch (error) {
    console.error('Lỗi khi cập nhật hồ sơ:', error);
    throw error;
  }
};

// Tải lên avatar
export const uploadAvatar = async (userId, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData, // Không cần Content-Type cho FormData
    });

    if (!response.ok) {
      throw new Error('Không thể tải lên avatar');
    }

    return await response.json();
  } catch (error) {
    console.error('Lỗi khi tải lên avatar:', error);
    throw error;
  }
};