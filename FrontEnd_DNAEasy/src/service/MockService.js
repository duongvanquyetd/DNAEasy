export const getAllServices = async () => {
  // Giả lập độ trễ khi gọi API
  await new Promise(resolve => setTimeout(resolve, 500));

  // Danh sách dịch vụ giả lập
  const services = [
    {
      serviceId: '1',
      serviceName: 'Xét nghiệm huyết thống cha - con',
      price: 2000000,
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
      reviews: [
    {
      "userName": "Jane Doe",
      "rating": 5,
      "comment": "Amazing service! Got my results quickly and learned so much about my ancestry.",
      "date": "2025-05-15T10:00:00Z"
    },
    {
      "userName": "John Smith",
      "rating": 4,
      "comment": "Very professional, but I wish the report was more detailed.",
      "date": "2025-04-20T14:30:00Z"
    }
  ]
    },
    {
      serviceId: '2',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án',
      price: 3000000,
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '3',
      serviceName: 'Xét nghiệm huyết thống ông - cháu',
      price: 2500000,
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '4',
      serviceName: 'Xét nghiệm ADN thai nhi',
      price: 5000000,
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
    {
      serviceId: '5',
      serviceName: 'Xét nghiệm huyết thống cha - con (Gói nâng cao)',
      price: 2200000,
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '6',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án (Gói nhanh)',
      price: 3500000,
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '7',
      serviceName: 'Xét nghiệm huyết thống ông - cháu (Gói chi tiết)',
      price: 2700000,
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '8',
      serviceName: 'Xét nghiệm ADN thai nhi (Gói không xâm lấn)',
      price: 5500000,
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
    {
      serviceId: '9',
      serviceName: 'Xét nghiệm huyết thống cha - con (Gói cơ bản)',
      price: 1800000,
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '10',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án (Gói toàn diện)',
      price: 4000000,
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '11',
      serviceName: 'Xét nghiệm huyết thống ông - cháu (Gói nhanh)',
      price: 2600000,
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '12',
      serviceName: 'Xét nghiệm ADN thai nhi (Gói nâng cao)',
      price: 6000000,
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
    {
      serviceId: '13',
      serviceName: 'Xét nghiệm huyết thống cha - con (Gói tiết kiệm)',
      price: 1700000,
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '14',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án (Gói cơ bản)',
      price: 2800000,
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '15',
      serviceName: 'Xét nghiệm huyết thống ông - cháu (Gói tiêu chuẩn)',
      price: 2400000,
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '16',
      serviceName: 'Xét nghiệm ADN thai nhi (Gói toàn diện)',
      price: 6500000,
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
  ];

  // Trả về giống định dạng của Axios: { data: [...] }
  return { data: services };
};

export const getServiceById = async (serviceId) => {
  // Giả lập độ trễ khi gọi API
  await new Promise(resolve => setTimeout(resolve, 500));

  // Danh sách dịch vụ giả lập với mô tả chi tiết
  const services = [
    {
      serviceId: '1',
      serviceName: 'Xét nghiệm huyết thống cha - con',
      price: 2000000,
      description: 'Xét nghiệm huyết thống cha - con cung cấp kết quả chính xác cao để xác định mối quan hệ cha con, phù hợp cho các mục đích cá nhân hoặc pháp lý. Kết quả có trong 3-5 ngày làm việc.',
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '2',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án',
      price: 3000000,
      description: 'Dịch vụ xét nghiệm ADN chuyên biệt được thiết kế để sử dụng trong các vụ kiện pháp lý, đảm bảo tuân thủ các quy định của tòa án với báo cáo chi tiết và chứng nhận.',
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '3',
      serviceName: 'Xét nghiệm huyết thống ông - cháu',
      price: 2500000,
      description: 'Xác định mối quan hệ huyết thống giữa ông/bà và cháu với độ chính xác cao, phù hợp cho các trường hợp cần xác minh quan hệ gia đình.',
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '4',
      serviceName: 'Xét nghiệm ADN thai nhi',
      price: 5000000,
      description: 'Xét nghiệm ADN thai nhi không xâm lấn, an toàn cho cả mẹ và bé, giúp xác định quan hệ huyết thống trước khi sinh với độ chính xác lên đến 99.9%.',
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
    {
      serviceId: '5',
      serviceName: 'Xét nghiệm huyết thống cha - con (Gói nâng cao)',
      price: 2200000,
      description: 'Gói nâng cao cung cấp phân tích chi tiết hơn với thời gian xử lý nhanh hơn, phù hợp cho những ai cần kết quả gấp trong 2-3 ngày.',
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '6',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án (Gói nhanh)',
      price: 3500000,
      description: 'Gói xét nghiệm pháp lý nhanh với thời gian trả kết quả trong 48 giờ, đảm bảo tuân thủ các yêu cầu pháp lý và cung cấp báo cáo chính thức.',
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '7',
      serviceName: 'Xét nghiệm huyết thống ông - cháu (Gói chi tiết)',
      price: 2700000,
      description: 'Gói xét nghiệm chi tiết cung cấp phân tích mở rộng để xác định quan hệ ông/bà - cháu, bao gồm báo cáo khoa học chi tiết.',
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '8',
      serviceName: 'Xét nghiệm ADN thai nhi (Gói không xâm lấn)',
      price: 5500000,
      description: 'Gói xét nghiệm ADN thai nhi không xâm lấn với công nghệ tiên tiến, đảm bảo an toàn và chính xác, phù hợp cho các trường hợp phức tạp.',
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
    {
      serviceId: '9',
      serviceName: 'Xét nghiệm huyết thống cha - con (Gói cơ bản)',
      price: 1800000,
      description: 'Gói cơ bản cung cấp xét nghiệm huyết thống cha - con với chi phí hợp lý, phù hợp cho nhu cầu cá nhân, thời gian trả kết quả 5-7 ngày.',
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '10',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án (Gói toàn diện)',
      price: 4000000,
      description: 'Gói xét nghiệm pháp lý toàn diện với phân tích mở rộng, báo cáo chi tiết và hỗ trợ tư vấn pháp lý, phù hợp cho các vụ kiện phức tạp.',
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '11',
      serviceName: 'Xét nghiệm huyết thống ông - cháu (Gói nhanh)',
      price: 2600000,
      description: 'Gói xét nghiệm nhanh xác định quan hệ ông/bà - cháu với thời gian trả kết quả trong 2-3 ngày, đảm bảo độ chính xác cao.',
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '12',
      serviceName: 'Xét nghiệm ADN thai nhi (Gói nâng cao)',
      price: 6000000,
      description: 'Gói nâng cao cung cấp xét nghiệm ADN thai nhi với phân tích chi tiết và hỗ trợ tư vấn chuyên sâu, đảm bảo an toàn và chính xác.',
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
    {
      serviceId: '13',
      serviceName: 'Xét nghiệm huyết thống cha - con (Gói tiết kiệm)',
      price: 1700000,
      description: 'Gói tiết kiệm cung cấp xét nghiệm huyết thống cha - con với chi phí tối ưu, phù hợp cho các trường hợp cần xác minh cơ bản.',
      imageUrls: ['https://example.com/images/paternity-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '14',
      serviceName: 'Xét nghiệm pháp lý phục vụ tòa án (Gói cơ bản)',
      price: 2800000,
      description: 'Gói xét nghiệm pháp lý cơ bản với chi phí hợp lý, cung cấp báo cáo đáp ứng yêu cầu pháp lý cơ bản của tòa án.',
      imageUrls: ['https://example.com/images/legal-test.jpg'],
      type: 'legal',
    },
    {
      serviceId: '15',
      serviceName: 'Xét nghiệm huyết thống ông - cháu (Gói tiêu chuẩn)',
      price: 2400000,
      description: 'Gói tiêu chuẩn xác định quan hệ ông/bà - cháu với thời gian trả kết quả 4-5 ngày, phù hợp cho các nhu cầu cá nhân.',
      imageUrls: ['https://example.com/images/grandparent-test.jpg'],
      type: 'civil',
    },
    {
      serviceId: '16',
      serviceName: 'Xét nghiệm ADN thai nhi (Gói toàn diện)',
      price: 6500000,
      description: 'Gói toàn diện cung cấp xét nghiệm ADN thai nhi với phân tích mở rộng, báo cáo chi tiết và hỗ trợ tư vấn chuyên sâu.',
      imageUrls: ['https://example.com/images/prenatal-test.jpg'],
      type: 'prenatal',
    },
  ];

  const service = services.find((s) => s.serviceId === serviceId);
  if (!service) throw new Error('Service not found');
  return { data: service };
};