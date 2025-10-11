// // mockFeedbackAPI.js

// // Danh sách giả lập feedback ban đầu
// let mockFeedbacks = [
//   {
//     id: 1,
//     serviceId: '1',
//     name: 'John Doe',
//     rating: 4,
//     comment: 'This test was very accurate and the results came quickly.',
//     createdAt: new Date('2025-06-15T14:00:00+07:00').toISOString(), // Old feedback
//   },
//   {
//     id: 2,
//     serviceId: '1',
//     name: 'Jane Smith',
//     rating: 5,
//     comment: 'Great customer service and professional staff.',
//     createdAt: new Date('2025-06-16T09:30:00+07:00').toISOString(), // Old feedback
//   },
//   {
//     id: 3,
//     serviceId: '2',
//     name: 'Alex Brown',
//     rating: 3,
//     comment: 'Easy to book and very informative.',
//     createdAt: new Date('2025-06-14T11:15:00+07:00').toISOString(), // Old feedback
//   },
// ];

// // Hàm lấy feedback theo serviceId
// export const GetFeedbacksByServiceId = async (serviceId) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const filtered = mockFeedbacks.filter(f => f.serviceId === serviceId);
//       resolve({ data: filtered });
//     }, 500); // giả lập độ trễ
//   });
// };

// // Hàm thêm mới 1 feedback
// export const AddFeedback = async ({ serviceId, name, rating, comment }) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newFeedback = {
//         id: mockFeedbacks.length + 1,
//         serviceId,
//         name,
//         rating,
//         comment,
//         createdAt: new Date().toISOString(),
//       };
//       mockFeedbacks.unshift(newFeedback); // thêm vào đầu danh sách
//       resolve({ data: newFeedback });
//     }, 300); // giả lập độ trễ
//   });
// };