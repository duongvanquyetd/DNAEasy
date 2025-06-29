// mockApi.js
let users = JSON.parse(localStorage.getItem('users')) || [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an@example.com",
    phone: "0123456789",
    role: "customers",
    createdAt: "2025-06-15T00:00:00Z",
  }, 
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh@example.com",
    phone: "0987654321",
    role: "staff",
    createdAt: "2025-06-10T00:00:00Z",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "cuong@example.com",
    phone: "0912345678",
    role: "managers",
    createdAt: "2025-06-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Phạm Thị Duyên",
    email: "duyen@example.com",
    phone: "0934567890",
    role: "customers",
    createdAt: "2025-06-20T00:00:00Z",
  },
];

// Save users to localStorage whenever modified
const saveUsers = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockApi = {
  fetchUsers: async (type, page, size, searchQuery = "") => {
    await delay(500); // Simulate network delay
    const filteredUsers = users.filter((user) => {
      const matchesType = type === "all" || user.role === type;
      const matchesSearch = searchQuery
        ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesType && matchesSearch;
    });

    const totalElements = filteredUsers.length;
    const start = (page - 1) * size;
    const end = start + size;
    const paginatedUsers = filteredUsers.slice(start, end);

    return {
      content: paginatedUsers,
      totalPages: Math.ceil(totalElements / size),
      totalElements,
    };
  },

  updateUser: async (id, userData) => {
    await delay(500); // Simulate network delay
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("Không tìm thấy người dùng");
    }
    if (!["customers", "staff", "managers"].includes(userData.role)) {
      throw new Error("Vai trò không hợp lệ");
    }
    users[userIndex] = { ...users[userIndex], role: userData.role };
    saveUsers(); // Save to localStorage after update
    return users[userIndex];
  },

  deleteUser: async (id) => {
    await delay(500); // Simulate network delay
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("Không tìm thấy người dùng");
    }
    users.splice(userIndex, 1);
    saveUsers(); // Save to localStorage after deletion
    return { success: true };
  },

  fetchUserReport: async () => {
    await delay(500); // Simulate network delay
    return {
      totalCustomers: users.filter((user) => user.role === "customers").length,
      totalStaff: users.filter((user) => user.role === "staff").length,
      totalManagers: users.filter((user) => user.role === "managers").length,
    };
  },
};

export default mockApi;