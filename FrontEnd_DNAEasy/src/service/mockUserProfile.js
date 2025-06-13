// src/service/userApi.js

export const fetchUserProfile = async (userId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock user data
  const mockUsers = {
    "123": {
      id: "123",
      name: "Nguyen Xuan Viet",
      email: "emvietdeptrai@gmail.com",
      streets: "Hai Phong",
      district: "Truong Thanh",
      city: "Ho Chi Minh City",
      contactNumber: "01234678",
      gender: "Male",
      avatarUrl: "https://via.placeholder.com/150"
    },
    "456": {
      id: "456",
      name: "Tran Thi B",
      email: "tranb@example.com",
      streets: "Le Loi",
      district: "District 1",
      city: "Ho Chi Minh City",
      contactNumber: "0987654321",
      gender: "Female",
      avatarUrl: "https://via.placeholder.com/150"
    }
  };

  try {
    if (!userId || !mockUsers[userId]) {
      throw new Error("User not found");
    }

    // Return in Axios-like format: { data: {...} }
    return { data: mockUsers[userId] };
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    throw error;
  }
};