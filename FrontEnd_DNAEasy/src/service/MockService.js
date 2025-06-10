// src/service/mockService.js

export const getAllServices = async () => {
  // Giả lập độ trễ khi gọi API
  await new Promise(resolve => setTimeout(resolve, 500));

  // Danh sách dịch vụ giả lập
  const services = [
    {
      serviceId: 1,
      serviceName: "Xét nghiệm huyết thống cha - con",
      price: 2000000,
      imageUrls: ["https://example.com/images/legal-test.jpg"],
      type: "civil"
    },
    {
      serviceId: 2,
      serviceName: "Xét nghiệm pháp lý phục vụ tòa án",
      price: 3000000,
      imageUrls: ["https://example.com/images/legal-test.jpg"],
      type: "legal"
    },
    {
      serviceId: 3,
      serviceName: "Xét nghiệm huyết thống ông - cháu",
      price: 2500000,
      imageUrls: ["https://example.com/images/grandparent-test.jpg"],
      type: "civil"
    },
    {
      serviceId: 4,
      serviceName: "Xét nghiệm ADN thai nhi",
      price: 5000000,
      imageUrls: ["https://example.com/images/prenatal-test.jpg"],
      type: "prenatal"
    }
  ];

  // Trả về giống định dạng của Axios: { data: [...] }
  return { data: services };
};
