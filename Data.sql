

-- Chèn dữ liệu vào bảng Person
INSERT INTO person  (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email) VALUES 
('0900000011', 'Admin', 'password123', 'F', NULL, 'Đường A', 'Hà Nội', 'Ba Đình', 'ADMIN',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'Admin', 'ADMIN@example.com'),

('0900000001', 'Nguyễn Thị Mai', 'password123', 'F', NULL, 'Đường A', 'Hà Nội', 'Ba Đình', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthimai', 'mai1@example.com'),

('0900000002', 'Hoàng Thị Lan', 'password123', 'F', NULL, 'Đường B', 'HCM', 'Quận 1', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'hoangthilan', 'lan2@example.com'),

('0900000003', 'Lê Thị Hồng', 'password123', 'F', NULL, 'Đường C', 'Huế', 'Phú Hội', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'lethihong', 'hong3@example.com'),

('0900000004', 'Phạm Thị Hoa', 'password123', 'F', NULL, 'Đường D', 'Đà Nẵng', 'Hải Châu', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'phamthihoa', 'hoa4@example.com'),

('0900000005', 'Trần Thị Kim', 'password123', 'F', NULL, 'Đường E', 'Cần Thơ', 'Ninh Kiều', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'tranthikim', 'kim5@example.com'),

('0900000006', 'Nguyễn Văn An', 'password123', 'M', NULL, 'Đường F', 'Hà Nội', 'Thanh Xuân', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'nguyenvanan', 'an6@example.com'),

('0900000007', 'Lê Văn Bình', 'password123', 'M', NULL, 'Đường G', 'HCM', 'Quận 3', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'levanbinh', 'binh7@example.com'),

('0900000008', 'Phạm Văn Cường', 'password123', 'M', NULL, 'Đường H', 'Hải Phòng', 'Lê Chân', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvancuong', 'cuong8@example.com'),

('0900000009', 'Trần Văn Dũng', 'password123', 'M', NULL, 'Đường I', 'Nam Định', 'Trường Thi', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvandung', 'dung9@example.com'),

('0900000010', 'Hoàng Văn Em', 'password123', 'M', NULL, 'Đường J', 'Bình Dương', 'Thủ Dầu Một', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'hoangvanem', 'em10@example.com');

 -- ca_1
INSERT INTO person  (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email) VALUES 
('0910000001', 'Nguyễn Thị Ánh', 'pass123', 'F', 'ca_1', 'Đường A1', 'Hà Nội', 'Ba Đình', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthianh', 'anh1@example.com'),

('0910000002', 'Lê Thị Ngọc', 'pass123', 'F', 'ca_1', 'Đường A2', 'HCM', 'Quận 1', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'lethingoc', 'ngoc2@example.com'),

('0910000003', 'Phạm Văn Minh', 'pass123', 'M', 'ca_1', 'Đường A3', 'Đà Nẵng', 'Hải Châu', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvanminh', 'minh3@example.com'),

('0910000004', 'Hoàng Văn Long', 'pass123', 'M', 'ca_1', 'Đường A4', 'Huế', 'Phú Hội', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'hoangvanlong', 'long4@example.com'),

('0910000005', 'Trần Văn Quang', 'pass123', 'M', 'ca_1', 'Đường A5', 'Cần Thơ', 'Ninh Kiều', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvanquang', 'quang5@example.com'),

-- ca_2
('0910000006', 'Nguyễn Thị Hạnh', 'pass123', 'F', 'ca_2', 'Đường B1', 'Bình Dương', 'Thủ Dầu Một', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthihanh', 'hanh6@example.com'),

('0910000007', 'Lê Thị Hương', 'pass123', 'F', 'ca_2', 'Đường B2', 'Hải Phòng', 'Lê Chân', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'lethihuong', 'huong7@example.com'),

('0910000008', 'Phạm Văn Toàn', 'pass123', 'M', 'ca_2', 'Đường B3', 'Nam Định', 'Trường Thi', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvantoan', 'toan8@example.com'),

('0910000009', 'Trần Văn Sơn', 'pass123', 'M', 'ca_2', 'Đường B4', 'Nghệ An', 'TP Vinh', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvanson', 'son9@example.com'),

('0910000010', 'Lý Văn Khánh', 'pass123', 'M', 'ca_2', 'Đường B5', 'Thái Nguyên', 'Sông Công', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'lyvankhanh', 'khanh10@example.com'),

-- ca_3
('0910000011', 'Trịnh Thị Nhung', 'pass123', 'F', 'ca_3', 'Đường C1', 'Bắc Ninh', 'Từ Sơn', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'trinhthin hung', 'nhung11@example.com'),

('0910000012', 'Đặng Thị Thu', 'pass123', 'F', 'ca_3', 'Đường C2', 'Ninh Bình', 'TP Ninh Bình', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'dangthithu', 'thu12@example.com'),

('0910000013', 'Bùi Văn Duy', 'pass123', 'M', 'ca_3', 'Đường C3', 'Thanh Hóa', 'Đông Sơn', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'buivanduy', 'duy13@example.com'),

('0910000014', 'Ngô Văn Hà', 'pass123', 'M', 'ca_3', 'Đường C4', 'Hà Tĩnh', 'TP Hà Tĩnh', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'ngovanha', 'ha14@example.com'),

('0910000015', 'Vũ Văn Lâm', 'pass123', 'M', 'ca_3', 'Đường C5', 'Hưng Yên', 'Văn Lâm', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'vuvanlam', 'lam15@example.com'),

-- ca_4
('0910000016', 'Phan Thị Thảo', 'pass123', 'F', 'ca_4', 'Đường D1', 'Tuyên Quang', 'TP Tuyên Quang', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'phanthithao', 'thao16@example.com'),

('0910000017', 'Đoàn Thị Mai', 'pass123', 'F', 'ca_4', 'Đường D2', 'Phú Thọ', 'Việt Trì', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'doanthimai', 'mai17@example.com'),

('0910000018', 'Đào Văn Thịnh', 'pass123', 'M', 'ca_4', 'Đường D3', 'Quảng Ninh', 'Uông Bí', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'daovanthinh', 'thinh18@example.com'),

('0910000019', 'Kiều Văn Huy', 'pass123', 'M', 'ca_4', 'Đường D4', 'Lào Cai', 'Sa Pa', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'kieuvanhuy', 'huy19@example.com'),

('0910000020', 'Chu Văn Phúc', 'pass123', 'M', 'ca_4', 'Đường D5', 'Cao Bằng', 'TP Cao Bằng', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'chuvanphuc', 'phuc20@example.com');

-- ca_1
INSERT INTO person  (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email) VALUES 
('0910000021', 'Nguyễn Thị Tuyết', 'pass123', 'F', 'ca_1', 'Đường E1', 'Hà Nội', 'Thanh Xuân', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthituyet', 'tuyet21@example.com'),

('0910000022', 'Trịnh Thị Hòa', 'pass123', 'F', 'ca_1', 'Đường E2', 'HCM', 'Bình Thạnh', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'trinhthihoa', 'hoa22@example.com'),

('0910000023', 'Phạm Văn Cường', 'pass123', 'M', 'ca_1', 'Đường E3', 'Huế', 'Vỹ Dạ', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvancuong2', 'cuong23@example.com'),

('0910000024', 'Lê Văn Thắng', 'pass123', 'M', 'ca_1', 'Đường E4', 'Quảng Trị', 'Đông Hà', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'levanthang', 'thang24@example.com'),

('0910000025', 'Đinh Văn Đức', 'pass123', 'M', 'ca_1', 'Đường E5', 'Thừa Thiên Huế', 'Hương Thủy', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'dinhvanduc', 'duc25@example.com'),

-- ca_2
('0910000026', 'Nguyễn Thị Thanh', 'pass123', 'F', 'ca_2', 'Đường F1', 'Hải Dương', 'Nam Sách', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthithanh', 'thanh26@example.com'),

('0910000027', 'Huỳnh Thị Mỹ', 'pass123', 'F', 'ca_2', 'Đường F2', 'TP.HCM', 'Tân Bình', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'huynhthimy', 'my27@example.com'),

('0910000028', 'Nguyễn Văn Hiếu', 'pass123', 'M', 'ca_2', 'Đường F3', 'Nghệ An', 'Hưng Nguyên', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'nguyenvanhieu', 'hieu28@example.com'),

('0910000029', 'Trần Văn Hải', 'pass123', 'M', 'ca_2', 'Đường F4', 'Hải Phòng', 'Lê Chân', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvanhai', 'hai29@example.com'),

('0910000030', 'Đoàn Văn Tài', 'pass123', 'M', 'ca_2', 'Đường F5', 'Bình Định', 'Tây Sơn', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'doanvantai', 'tai30@example.com'),

-- ca_3
('0910000031', 'Trần Thị Kiều', 'pass123', 'F', 'ca_3', 'Đường G1', 'Khánh Hòa', 'Nha Trang', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'tranthikieu', 'kieu31@example.com'),

('0910000032', 'Phạm Thị Trang', 'pass123', 'F', 'ca_3', 'Đường G2', 'Đắk Lắk', 'Buôn Ma Thuột', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'phamthitrang', 'trang32@example.com'),

('0910000033', 'Hoàng Văn Hùng', 'pass123', 'M', 'ca_3', 'Đường G3', 'Gia Lai', 'Pleiku', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'hoangvanhung', 'hung33@example.com'),

('0910000034', 'Vũ Văn Thái', 'pass123', 'M', 'ca_3', 'Đường G4', 'Kon Tum', 'TP Kon Tum', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'vuvanthai', 'thai34@example.com'),

('0910000035', 'Bùi Văn Lộc', 'pass123', 'M', 'ca_3', 'Đường G5', 'An Giang', 'Long Xuyên', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'buivanloc', 'loc35@example.com'),

-- ca_4
('0910000036', 'Nguyễn Thị Như', 'pass123', 'F', 'ca_4', 'Đường H1', 'Sóc Trăng', 'TP Sóc Trăng', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthinh u', 'nhu36@example.com'),

('0910000037', 'Hồ Thị Thắm', 'pass123', 'F', 'ca_4', 'Đường H2', 'Cà Mau', 'TP Cà Mau', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'hothitham', 'tham37@example.com'),

('0910000038', 'Ngô Văn Lợi', 'pass123', 'M', 'ca_4', 'Đường H3', 'Vĩnh Long', 'TP Vĩnh Long', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'ngovanloi', 'loi38@example.com'),

('0910000039', 'Lý Văn Hưng', 'pass123', 'M', 'ca_4', 'Đường H4', 'Kiên Giang', 'Rạch Giá', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'lyvanhung', 'hung39@example.com'),

('0910000040', 'Phan Văn Hậu', 'pass123', 'M', 'ca_4', 'Đường H5', 'Bạc Liêu', 'TP Bạc Liêu', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phanvanhau', 'hau40@example.com');

INSERT INTO person (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email) VALUES
('0900000100', 'Nguyen Thi Hanh', '123456', 'F', 'ca_1', '434 Duong K', 'Ha Noi', 'Dong Da', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0',
 'hanh.nguyen1', 'hanh.nguyen1@lab.com'),
('0900000101', 'Le Thi Thanh', '123456', 'F', 'ca_2', '123 Duong L', 'Hue', 'Dong Da', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0',
 'thanh.le1', 'thanh.le1@lab.com'),
('0900000102', 'Phan Thi Ngoc', '123456', 'F', 'ca_3', '100 Duong M', 'Can Tho', 'Quan 1', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0',
 'ngoc.phan', 'ngoc.phan@lab.com'),
('0900000103', 'Hoang Thi Yen', '123456', 'F', 'ca_4', '393 Duong N', 'Da Nang', 'Ninh Kieu', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0',
 'yen.hoang', 'yen.hoang@lab.com'),
('0900000104', 'Dang Thi Trang', '123456', 'F', 'ca_1', '881 Duong O', 'HCM', 'Hai Chau', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0',
 'trang.dang', 'trang.dang@lab.com'),
('0900000105', 'Vu Van Long', '123456', 'M', 'ca_2', '156 Duong P', 'Hue', 'Quan 1', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'long.vu1', 'long.vu1@lab.com'),
('0900000106', 'Tran Van Dung', '123456', 'M', 'ca_3', '399 Duong Q', 'Da Nang', 'Quan 3', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'dung.tran1', 'dung.tran1@lab.com'),
('0900000107', 'Nguyen Huu Phuoc', '123456', 'M', 'ca_4', '478 Duong R', 'Can Tho', 'Dong Da', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'phuoc.nguyen', 'phuoc.nguyen@lab.com'),
('0900000108', 'Pham Van Cuong', '123456', 'M', 'ca_1', '420 Duong S', 'Da Nang', 'Hai Chau', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'cuong.pham', 'cuong.pham@lab.com'),
('0900000109', 'Ly Anh Khoa', '123456', 'M', 'ca_2', '158 Duong T', 'HCM', 'Hai Chau', 'STAFF_LAB',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'khoa.ly', 'khoa.ly@lab.com');

INSERT INTO person (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email)
VALUES 
('0900000110', 'Nguyen Thi Lan', '123456', 'F', 'ca_1', '12 Tran Phu', 'HCM', 'Quan 1', 'STAFF_RECEPTION',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'lan.nguyen', 'lan.nguyen@reception.com'),

('0900000111', 'Pham Van Minh', '123456', 'M', 'ca_2', '45 Nguyen Trai', 'HCM', 'Quan 3', 'STAFF_RECEPTION',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'minh.pham', 'minh.pham@reception.com'),

('0900000112', 'Tran Thi Mai', '123456', 'F', 'ca_3', '78 Le Loi', 'HCM', 'Quan 5', 'STAFF_RECEPTION',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'mai.tran', 'mai.tran@reception.com'),

('0900000113', 'Le Hoang Nam', '123456', 'M', 'ca_4', '99 Vo Van Tan', 'HCM', 'Quan 10', 'STAFF_RECEPTION',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0',
 'nam.le', 'nam.le@reception.com'),
 
('0900000114', 'Manager', 'password123', 'F', NULL, 'Đường A', 'Hà Nội', 'Ba Đình', 'MANAGER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'manager', 'manager@example.com');

-- Cập nhật role và password
UPDATE person SET rolename = 'STAFF_TEST' WHERE rolename = 'Staff_TEST';
UPDATE person SET password='$2a$10$kL9m/vyvZnnvvA2sp9IIq.H7cq/nJmq0GJ4g6KlsbuuYLgBuNNOtu' WHERE username != 'tttdmin';
UPDATE person SET active = 1;
UPDATE person SET created_date = NOW();









-- 20 dịch vụ loại civil (dân sự) 20 phap ly 
INSERT INTO service (service_name, service_description, service_price, type_service, sample_count) VALUES
('Father-Child DNA Test', 'DNA test to verify biological father-child relationship for civil matters.', 2500000.00, 'civil', 2),
('Mother-Child DNA Test', 'DNA test to confirm biological mother-child relationship.', 2500000.00, 'civil', 2),
('Sibling DNA Test', 'DNA test to determine whether two individuals share biological parents.', 4000000.00, 'civil', 2),
('Grandparent DNA Test', 'DNA test to establish biological relationship between grandparents and grandchildren.', 4000000.00, 'civil', 2),
('Uncle-Nephew DNA Test', 'DNA test to verify biological link between uncle and nephew.', 4000000.00, 'civil', 2),
('Aunt-Niece DNA Test', 'DNA test to confirm biological relationship between aunt and niece.', 4000000.00, 'civil', 2),
('Cousin DNA Test', 'DNA test to establish biological link between cousins.', 4000000.00, 'civil', 2),
('Half-Sibling DNA Test', 'DNA test to check shared biological parent between half siblings.', 4000000.00, 'civil', 2),
('Maternity Test', 'DNA test to verify biological mother.', 2500000.00, 'civil', 2),
('Paternity Test for Inheritance', 'DNA test to verify father-child relationship for inheritance purposes.', 3000000.00, 'civil', 2),
('Child Custody DNA Test', 'DNA test to support child custody arrangements.', 3500000.00, 'civil', 2),
('Family Reunion DNA Test', 'DNA test to support family reunification.', 3500000.00, 'civil', 2),
('Grandmother-Grandchild DNA Test', 'DNA test to confirm grandmother and grandchild relationship.', 4000000.00, 'civil', 2),
('Half-Brother DNA Test', 'DNA test to verify biological half-brothers.', 4000000.00, 'civil', 2),
('DNA Test for Social Support', 'DNA test to prove family relationships for social support benefits.', 3500000.00, 'civil', 2),
('DNA Test for Adoption', 'DNA test to confirm biological relationship in adoption cases.', 3500000.00, 'civil', 2),
('Legal Name Change DNA Test', 'DNA test required for legal name change procedures.', 3000000.00, 'civil', 2),
('DNA Test for Marriage Registration', 'DNA test to verify relationship status for marriage registration.', 3000000.00, 'civil', 2),
('DNA Test for Child Identification', 'DNA test for official child identification purposes.', 3000000.00, 'civil', 1),
('DNA Test for Family Benefits', 'DNA test to verify eligibility for family-related benefits.', 3500000.00, 'civil', 2),
('Legal Father-Child DNA Test', 'Court-admissible DNA test to verify father-child biological relationship.', 3000000.00, 'legal', 2),
('Legal Mother-Child DNA Test', 'Legal DNA test to confirm mother-child biological relationship.', 3000000.00, 'legal', 2),
('Legal Sibling DNA Test', 'DNA test for siblings used in legal cases.', 4500000.00, 'legal', 2),
('Legal Grandparent DNA Test', 'Legal DNA test between grandparents and grandchildren for court use.', 4500000.00, 'legal', 2),
('Legal Uncle-Nephew DNA Test', 'DNA test to verify uncle-nephew relationship in legal disputes.', 4500000.00, 'legal', 2),
('Legal Aunt-Niece DNA Test', 'DNA test for aunt-niece relationship in legal matters.', 4500000.00, 'legal', 2),
('Legal Cousin DNA Test', 'DNA test to prove cousin relationship for legal purposes.', 4500000.00, 'legal', 2),
('Legal Half-Sibling DNA Test', 'DNA test for half siblings in inheritance claims.', 4500000.00, 'legal', 2),
('Legal Maternity DNA Test', 'Court-approved maternity DNA test.', 3000000.00, 'legal', 2),
('Legal Paternity DNA Test', 'Legal DNA test for paternity verification.', 3500000.00, 'legal', 2),
('Legal Child Custody DNA Test', 'DNA test supporting child custody cases.', 4000000.00, 'legal', 2),
('Legal Immigration DNA Test', 'DNA test for immigration and family reunification cases.', 5000000.00, 'legal', 2),
('Legal DNA Test for Identity Verification', 'DNA test used for identity verification in legal procedures.', 5500000.00, 'legal', 1),
('Legal DNA Test for Inheritance Disputes', 'DNA test used in inheritance claims.', 5500000.00, 'legal', 2),
('Legal DNA Test for Adoption', 'Court-recognized DNA test for adoption procedures.', 4000000.00, 'legal', 2),
('Legal DNA Test for Name Change', 'DNA test required for legal name change applications.', 3500000.00, 'legal', 2),
('Legal DNA Test for Marriage Certification', 'DNA test used for marriage registration.', 3500000.00, 'legal', 2),
('Legal DNA Test for Divorce Proceedings', 'DNA test used in divorce cases.', 4000000.00, 'legal', 2),
('Legal DNA Test for Child Support', 'DNA test for child support legal cases.', 4000000.00, 'legal', 2),
('Legal DNA Test for Social Security Claims', 'DNA test supporting social security and welfare claims.', 4500000.00, 'legal', 2);




-- Self-collection method
INSERT INTO process_testing (sample_method, status_name, order_process, is_finished, person_confirm, formfor) VALUES
('Self_collection', 'Kit sent', 1, 0, 'STAFF_TEST', NULL),
('Self_collection', 'Kit received', 2, 0, 'CUSTOMER', NULL),
('Self_collection', 'Sample sent', 3, 0, 'CUSTOMER', 'Sample'),
('Self_collection', 'Sample received', 4, 0, 'STAFF_LAB', NULL),
('Self_collection', 'Is analyzing', 5, 0, 'STAFF_LAB', NULL),
('Self_collection', 'Result available', 6, 1, 'STAFF_LAB', 'Result'),

-- HOME_COLLECTION
('Home_collection', 'on the move', 1, 0, 'STAFF_TEST', NULL),
('Home_collection', 'Sample collected', 2, 0, 'STAFF_TEST', 'Sample'),
('Home_collection', 'Sent to lab', 3, 0, 'STAFF_TEST', NULL),
('Home_collection', 'Is analyzing', 4, 0, 'STAFF_LAB', NULL),
('Home_collection', 'Result available', 5, 1, 'STAFF_LAB', 'Result'),

-- HOSPITAL_COLLECTION
('Hospital_collection', 'has been present', 1, 0, 'STAFF_TEST', NULL),
('Hospital_collection', 'Sample collected', 2, 0, 'STAFF_TEST', 'Sample'),
('Hospital_collection', 'Sent to lab', 3, 0, 'STAFF_TEST', NULL),
('Hospital_collection', 'Is analyzing', 4, 0, 'STAFF_LAB', NULL),
('Hospital_collection', 'Result available', 5, 1, 'STAFF_LAB', 'Result');

INSERT INTO system_config(name, value) VALUES 
('hourclose', '17'),
('houropen', '7');

UPDATE service SET service_description = 'Consultation & Registration
Clients are guided to choose the appropriate DNA test and provide essential information. A personal profile is created in the system for tracking and updates.

Sample Collection
Depending on the selected method, samples can be collected:

At home (self-collection kit)

By a technician at the client''s location (home collection)

At our lab or partner facility (on-site collection)
Accepted sample types include oral swabs, blood, hair with root, nails, etc.

Sample Submission & Transport
The collected samples are securely sealed, labeled, and delivered to our laboratory for analysis.

DNA Extraction & Analysis

DNA is extracted from the sample

Specific regions are amplified using PCR techniques

Results are processed and interpreted using industry-standard methods

Result Verification
Data is reviewed by senior laboratory technicians to ensure accuracy before being finalized.

Result Delivery
Results are provided to the client through secure methods (online portal, email, or sealed envelope). Consultation is available to help interpret the findings.

Data Storage & Privacy
Client information and results are stored securely and handled with strict confidentiality, in compliance with applicable regulations.';

INSERT INTO process_ship_result(order_process, permision, status_name, type)
VALUES
(1, 'STAFF_LAB', 'Result sent', 'AT_HOME'),
(2, 'CUSTOMER', 'Result receive', 'AT_HOME'),
(1, 'STAFF_LAB', 'Result receive', 'AT_HOSPITAL');

-- Chèn service_image
INSERT INTO service_image (service_image_name, service_image_path, service_id) VALUES
('DNA Helix Analysis', 'https://th.bing.com/th/id/OIP.2G6puRqr2qcbzxoMVpdVHwHaEO?r=0&o=7&rm=3&rs=1&pid=ImgDetMain', 1),
('Genetic Sequencing', 'https://www.relialabtest.com/wp-content/uploads/2023/06/best-dna-test-.jpeg', 1),
('Ancestry Report', 'https://endeavordna.com/wp-content/uploads/2022/09/AdobeStock_319612966-scaled.jpeg', 1);

INSERT INTO comment (comment_content, comment_date, rating, customer_id, service_id) VALUES
('Dịch vụ rất tốt, nhân viên nhiệt tình.', '2025-06-01', 5, 2, 1),
('Kết quả nhanh và chính xác.', '2025-06-02', 4, 3, 2),
('Cần cải thiện khâu tư vấn.', '2025-06-03', 3, 4, 3),
('Quá trình lấy mẫu hơi chậm.', '2025-06-04', 3, 5, 4),
('Mọi thứ đều ổn, sẽ giới thiệu bạn bè.', '2025-06-05', 5, 6, 5);

INSERT INTO blog (active, blog_content, blog_title, blog_type, create_date, staff_id)
VALUES 
(1, 'DNA testing has revolutionized personalized healthcare. This blog explores how genetic profiling can identify predispositions to diseases like cancer or diabetes, enabling early intervention. We discuss the science behind DNA sequencing, including next-generation sequencing techniques, and how they provide accurate results. The post also covers ethical considerations, such as privacy concerns and informed consent, which are critical in genetic testing. At DNAEasy, our services ensure secure handling of your genetic data, with results delivered through our user-friendly platform. Learn how to interpret your DNA report and take actionable steps toward better health. We also highlight real-life case studies where DNA testing has transformed lives by guiding personalized treatment plans.', 
'The Power of DNA Testing in Healthcare', 'DNA Testing', NOW(), 66),

(1, 'Advancements in genetic technology are reshaping medical diagnostics. This article dives into the latest innovations, such as CRISPR-based diagnostics and liquid biopsies, which allow for non-invasive detection of genetic markers. We explore how these technologies improve accuracy in identifying hereditary conditions and tailoring treatments. Additionally, we address the role of AI in analyzing genetic data, speeding up result processing, and enhancing precision. DNAEasy leverages these cutting-edge tools to provide fast, reliable results. The blog also discusses challenges, including accessibility to advanced testing and the need for regulatory oversight to ensure quality. Discover how these breakthroughs are making genetic testing more accessible and impactful for everyone.', 
'Innovations in Genetic Testing Technology', 'Technology', NOW(), 66),

(1, 'Understanding your genetic makeup can unlock insights into your health. This blog explains how DNA testing identifies risks for conditions like heart disease or Alzheimer''s, empowering individuals to make informed lifestyle choices. We cover the science of genomics, including how genes influence traits and disease susceptibility. The post also explores the emotional and psychological aspects of receiving genetic results, offering tips for coping with unexpected findings. At DNAEasy, we provide comprehensive support, including counseling, to help you navigate your results. Learn how to use your genetic insights to optimize diet, exercise, and preventive care for a healthier future.', 
'How DNA Testing Can Improve Your Health', 'Health', NOW(), 66),

(0, 'This draft blog explores the future of DNA testing in personalized medicine. We discuss emerging trends, such as polygenic risk scores, which assess multiple genetic variants to predict disease risk. The article examines how these scores can guide preventive healthcare and inform drug development. We also cover challenges, like ensuring diversity in genetic databases to avoid biased results. DNAEasy is committed to advancing inclusive testing practices. The blog includes practical advice for individuals considering DNA testing, such as choosing the right test type and understanding result implications. Stay tuned for the final version with expert insights from our geneticists.', 
'The Future of Personalized Medicine', 'Science', NOW(), 66),

(1, 'Genetic testing is not just for health—it can reveal your ancestry and heritage. This blog delves into how DNA analysis traces your lineage, connecting you to distant relatives and ethnic origins. We explain the science behind autosomal, Y-DNA, and mitochondrial testing, and how these methods uncover your family history. The post also addresses privacy concerns, ensuring your data is protected with DNAEasy''s secure platform. Discover how to interpret your ancestry results and use them to build a family tree. Real-life stories highlight the emotional impact of reconnecting with lost heritage through DNA testing.', 
'Discover Your Roots with DNA Testing', 'Ancestry', NOW(), 66),

(1, 'The integration of AI in DNA testing is transforming the industry. This blog explores how machine learning algorithms analyze vast genetic datasets to identify patterns and predict outcomes with unprecedented accuracy. We discuss applications in diagnostics, drug discovery, and personalized treatment plans. The post also examines challenges, such as ensuring AI models are free from bias and maintaining data privacy. At DNAEasy, we use AI to streamline result delivery while prioritizing security. Learn how AI-driven insights can empower you to make informed health decisions and what the future holds for this technology in genetic testing.', 
'AI and DNA Testing: A New Frontier', 'Technology', NOW(), 66),

(1, 'Ethical considerations are paramount in genetic testing. This blog examines key issues, including informed consent, data privacy, and the potential for genetic discrimination. We discuss how DNAEasy ensures compliance with regulations like GDPR and HIPAA, safeguarding your information. The post also explores the societal impact of widespread genetic testing, such as its role in reducing health disparities. Practical advice is provided for individuals to understand their rights and make informed decisions about testing. Learn how ethical practices in DNA testing can build trust and promote responsible use of genetic information.', 
'Ethics in Genetic Testing', 'Ethics', NOW(), 66);

INSERT INTO blog (active,blog_title, blog_content, blog_type, staff_id, create_date)
VALUES
(1,'DNA Technology', 
'DNA technology refers to the wide range of techniques and methods used to analyze, manipulate, and utilize DNA molecules for various purposes. Since the discovery of the DNA double helix structure in 1953, advances in molecular biology have revolutionized the ability to study genetic material. DNA technology encompasses processes such as DNA sequencing, polymerase chain reaction (PCR), gene cloning, and genetic engineering. It plays a pivotal role in medical diagnostics, forensic science, agriculture, and biotechnology.

The development of PCR in the 1980s allowed scientists to amplify specific DNA sequences exponentially, enabling detailed study even from minute samples. DNA sequencing technologies have rapidly evolved from the first-generation Sanger sequencing to high-throughput next-generation sequencing (NGS), which provides massive amounts of data and insight into genomes and genetic variation. Genetic engineering techniques, such as CRISPR-Cas9, have opened doors to targeted gene editing with potential applications in curing genetic diseases and improving crop traits.

DNA technology is essential for personalized medicine, where treatments are tailored based on an individual''s genetic profile, and for forensic investigations, where DNA evidence helps identify suspects or exonerate the innocent. Moreover, DNA technology facilitates genealogical research and ancestry tracing by comparing DNA markers among individuals.

Despite its benefits, DNA technology raises ethical and privacy concerns, including data security, consent, and potential misuse of genetic information. Ongoing debates focus on regulation, accessibility, and equitable use of these powerful tools.

In conclusion, DNA technology is a cornerstone of modern biology and medicine, continuously evolving and impacting many facets of science and society. Understanding its capabilities and limitations is crucial for harnessing its potential responsibly.', 'DNA Technology', 66, NOW())

INSERT INTO blog (active,blog_title, blog_content, blog_type, staff_id, create_date)
VALUES
(1,'DNA Test Sample', 
'A DNA test sample is a biological specimen collected from an individual for the purpose of analyzing their genetic material. The most common types of samples include saliva, blood, hair follicles, skin cells, or other bodily fluids. Proper sample collection is critical to ensure the integrity and reliability of the DNA test results.

Saliva samples are popular due to their non-invasive collection method and ease of transportation. Typically, an individual will spit into a sterile tube or use a swab to collect cells from the inside of the cheek. Blood samples, collected by a healthcare professional, provide high-quality DNA and are often used in clinical settings. Hair follicles containing the root can also be used, though the amount of DNA is smaller and may affect test accuracy.

The sample must be handled and stored properly to avoid contamination or degradation. Once collected, the sample is labeled and sent to a laboratory where DNA is extracted and purified. The DNA is then analyzed using various techniques depending on the test purpose, such as STR profiling for forensic identification or SNP analysis for ancestry.

Chain of custody procedures are crucial in legal or forensic contexts to maintain the sample''s authenticity and admissibility in court. The laboratory typically issues a report detailing the results and conclusions based on the DNA analysis.

In summary, the DNA test sample is the foundation for genetic testing, and its quality directly impacts the accuracy and validity of the results. Proper collection, handling, and documentation are essential components of any DNA testing process.', 'DNA Test Sample', 66, NOW()),

(1,'Civil DNA', 
'Civil DNA testing is a type of genetic testing used in non-criminal legal matters, often involving family law and civil disputes. It includes tests such as paternity/maternity testing, sibling testing, grandparentage testing, and immigration DNA testing. These tests help establish biological relationships and are frequently used in cases related to child custody, inheritance claims, and citizenship applications.

The process typically involves collecting DNA samples from the individuals involved, usually through buccal swabs. The samples are analyzed to identify genetic markers that indicate biological relationships. The results provide a probability of relatedness that courts and agencies use as evidence.

Civil DNA testing must follow strict chain of custody and documentation protocols to ensure the results are admissible in legal proceedings. The accuracy and reliability of the tests make them a valuable tool for resolving disputes and verifying claims.

Aside from legal use, civil DNA testing also has applications in genealogy and personal knowledge about family history.

In conclusion, civil DNA testing is an important service for individuals seeking legal resolution and personal clarity on biological relationships.', 'Civil DNA', 66, NOW()),

(1,'DNA Legal', 
'DNA legal testing is focused on providing scientifically validated genetic evidence for use in legal cases. It covers a broad spectrum of applications, including criminal investigations, child support cases, immigration verification, and identification of remains. Legal DNA testing requires strict adherence to regulatory standards, such as chain of custody, certified laboratories, and validated methodologies.

This type of testing is often performed in accredited forensic laboratories that meet national and international standards. The results must be defensible in court, requiring detailed documentation, expert testimony, and reliable analytical techniques.

Common legal DNA tests include STR analysis for identity matching, mitochondrial DNA testing for maternal lineage, and Y-chromosome testing for paternal lineage. These tests provide strong evidence to support or refute claims in court.

Legal DNA testing has transformed the justice system by improving accuracy in suspect identification, reducing wrongful convictions, and assisting in victim identification.

Despite its power, legal DNA testing must balance privacy concerns and ethical considerations, ensuring individuals'' genetic data is protected.

Overall, DNA legal testing is a critical component of the intersection between science and law, providing trustworthy evidence to uphold justice.', 'DNA Legal', 66, NOW()),

(1,'DNA Testing Process', 
'The DNA testing process involves multiple steps that ensure accurate and reliable genetic analysis. It begins with sample collection, where biological materials such as saliva, blood, or hair are obtained. Proper collection techniques are essential to prevent contamination and preserve sample quality.

Once collected, the sample undergoes DNA extraction and purification in the laboratory. This step isolates the DNA molecules from other cellular components, producing clean genetic material for analysis.

The extracted DNA is then quantified and amplified using techniques like polymerase chain reaction (PCR), allowing for the detection of specific genetic markers.

Next, DNA profiling or sequencing is performed depending on the purpose of the test. In forensic cases, STR markers are analyzed to create a genetic fingerprint. For medical or ancestry testing, sequencing might reveal genetic variants or mutations.

Data interpretation follows, where geneticists or bioinformaticians analyze the results to draw conclusions related to identity, health risks, or biological relationships.

Finally, a report is generated and delivered to the requester, often accompanied by counseling to explain the findings and implications.

Throughout the process, strict quality control measures and chain of custody protocols ensure test validity and legal admissibility.

In summary, the DNA testing process is a complex, multi-step procedure requiring precision, expertise, and ethical responsibility to provide meaningful and trustworthy results.', 'DNA Testing Process',66	 , NOW());

INSERT INTO blog (blog_title, blog_content, blog_type, staff_id, create_date)
VALUES (
    'DNA Technology: Unlocking the Mysteries of Life',
    'DNA technology has revolutionized the world of science and medicine over the past several decades. At the heart of this transformation lies the remarkable molecule deoxyribonucleic acid, or DNA, which encodes the genetic instructions that govern all living organisms. Understanding DNA''s structure, function, and manipulation techniques has opened the door to unprecedented advances in healthcare, forensic science, agriculture, and many other fields.

The discovery of the double helix structure by James Watson and Francis Crick in 1953 was a pivotal moment in biology. This elegant spiral staircase-like structure revealed how genetic information is stored and copied, setting the stage for modern molecular biology. Following this discovery, scientists developed a series of laboratory techniques that allowed them to isolate, amplify, sequence, and edit DNA.

One of the cornerstone technologies is the Polymerase Chain Reaction (PCR), developed by Kary Mullis in the 1980s. PCR enables the rapid amplification of specific DNA segments, making it possible to analyze minute quantities of genetic material. This technique is foundational for numerous applications, from diagnosing genetic diseases to identifying suspects in criminal investigations.

DNA sequencing technologies have also evolved dramatically. The Sanger sequencing method, introduced in the 1970s, allowed for reading the order of nucleotides in small DNA fragments. However, the real breakthrough came with Next-Generation Sequencing (NGS), which enables the simultaneous sequencing of millions of DNA fragments, drastically reducing cost and time. This has led to the rise of genomics, where entire genomes can be analyzed to understand complex diseases, evolutionary biology, and personalized medicine.

In medicine, DNA technology plays a crucial role in early diagnosis, treatment planning, and monitoring of genetic disorders. For example, prenatal genetic screening can detect chromosomal abnormalities before birth, while cancer genomics helps identify mutations driving tumor growth. Gene therapy, which involves correcting defective genes, is an emerging field with the potential to cure previously untreatable diseases.

Forensic science also relies heavily on DNA profiling. The ability to match DNA samples from crime scenes to individuals has revolutionized law enforcement, providing powerful evidence that can confirm guilt or innocence. This technology also aids in identifying victims of disasters and resolving missing person cases.

In agriculture, genetic engineering has been used to create crops that are more resistant to pests, diseases, and environmental stressors. This contributes to food security and sustainability, especially as the global population continues to grow.

Despite these benefits, the rapid advancement of DNA technology raises important ethical and privacy concerns. Issues such as genetic discrimination, data security, and the implications of editing human embryos require careful consideration. Laws and regulations are essential to ensure that genetic information is used responsibly and that individual rights are protected.

Looking to the future, innovations like CRISPR-Cas9 gene editing offer incredible promise but also pose significant challenges. CRISPR allows precise editing of DNA sequences, enabling potential cures for genetic diseases, but also raises fears about designer babies and unintended consequences.

In summary, DNA technology has dramatically expanded our ability to understand and manipulate the blueprint of life. Its impact spans healthcare, justice, agriculture, and beyond, holding enormous promise for the future of humanity. As this technology continues to evolve, balancing scientific progress with ethical responsibility will be critical.',
    'DNA Technology',
    66, NOW()
);

INSERT INTO blog_image(blog_id, blog_image_name, blog_image_path) VALUES
(12, 'Blog_DNAtesting', 'https://thelifesciencesmagazine.com/wp-content/uploads/2025/06/1.1.-TLM-How-Genetic-Testing-Can-Improve-Your-Health-Decisions-Image-by-jarun011-from-Getty-Images.jpg'),
(13, 'Blog_DNAtesting', 'https://www.indushealthplus.com/front/media/article_img/importace-of-dnawise.jpg'),
(13, 'Blog_Technology', 'https://smartclinix.net/wp-content/uploads/2023/10/The-Future-of-Personalized-Medicine-with-Electronic-Health-Records.jpg'),
(12, 'Blog_Technology', 'https://images.unsplash.com/photo-1659353888477-6e6aab941b55?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(13, 'Blog_Health', 'https://education.myheritage.com/wp-content/uploads/2025/05/DNA-testing-for-genealogy-feature-image-2.png'),
(11, 'Blog_Health', 'https://cdn.prod.website-files.com/5cdafe18a28089d0b3d79559/685511d16c6af94f71716225_dna%20ethnic%20test_500-p-2000.jpg'),
(11, 'Blog_Ancestry', 'https://images.unsplash.com/photo-1724525646997-5bf1621e6184?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(10, 'Blog_Ancestry', 'https://images.unsplash.com/photo-1748280933446-c9be297ec3be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(9, 'Blog_Technology', 'https://images.unsplash.com/photo-1716436330152-a58390897652?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(8, 'Blog_Ethics', 'https://images.unsplash.com/photo-1604538406338-d41ddc825eb3?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');


INSERT INTO service_image (service_image_name, service_image_path, service_id) VALUES
-- Service 1
('DNA Helix Analysis', 'https://th.bing.com/th/id/OIP.2G6puRqr2qcbzxoMVpdVHwHaEO?r=0&o=7&rm=3&rs=1&pid=ImgDetMain', 1),
('Genetic Sequencing', 'https://www.relialabtest.com/wp-content/uploads/2023/06/best-dna-test-.jpeg', 1),
('Ancestry Report', 'https://endeavordna.com/wp-content/uploads/2022/09/AdobeStock_319612966-scaled.jpeg', 1),
-- Service 2
('Paternity Test Result', 'https://www.malwarebytes.com/wp-content/uploads/sites/2/2024/11/DNA_test.png?w=1200', 2),
('Mitochondrial DNA', 'https://clpmag.com/wp-content/uploads/2022/03/DNA-Test.jpg', 2),
('Genetic Health Scan', 'https://oritain.com/assets/Uploads/sample-scientific-testing__ExtRewriteWyJqcGciLCJ3ZWJwIl0_ScaleWidthWzEyMDBd.webp', 2),
-- Service 3
('DNA Profile', 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474285IVd/trung-tam-xet-nghiem-adn-gentis-379468.jpg', 3),
('Gene Mutation Test', 'https://endeavordna.com/wp-content/uploads/2022/09/AdobeStock_319612966-scaled.jpeg', 3),
('Hereditary Traits', 'https://www.dnaforensics.in/wp-content/uploads/2020/09/Acredited-DNA-Testing.jpg', 3),
-- Service 4
('Genomic Mapping', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxnOmVkGx1-FQU0Dc0UhtUTTp-c-YhlmsWPCZNKreh80SgH1fgD-f7mjDbECwC2NXCkI&usqp=CAU', 4),
('DNA Strand Visualization', 'https://dnatesting.com/wp-content/uploads/2014/07/lab-photo-1000x562.jpg', 4),
('Ancestral Lineage', 'https://5.imimg.com/data5/JP/HH/MY-1908678/dna-testing-services.jpg', 4),
-- Service 5
('Genetic Risk Assessment', 'https://dnatesting.com/wp-content/uploads/2014/08/dna-paternity-testing-lab.jpg', 5),
('DNA Test Kit', 'https://online.maryville.edu/wp-content/uploads/sites/97/2023/10/dna-sampling-500x333-1.jpg', 5),
('Heredity Analysis', 'https://static01.nyt.com/images/2017/09/06/nyregion/06DNA1/29DNA1-articleLarge.jpg?quality=75&auto=webp&disable=upscale', 5),
-- Service 6
('Chromosome Analysis', 'https://forensicscience.ufl.edu/wordpress/files/2015/04/ms-forensic-drug-chemistry-processed.jpg', 6),
('Genetic Marker Test', 'https://img.freepik.com/premium-photo/blood-science-senior-man-laboratory-with-sample-research-medical-study-forensic-investigation-healthcare-pharmaceutical-scientist-with-vial-dna-test-biology-rna-exam_590464-158570.jpg', 6),
('Family Tree DNA', 'https://dnatesting.com/wp-content/uploads/2014/08/pipetting-lab-photo-1024x682.jpg', 6),
-- Service 7
('DNA Health Insights', 'https://dnatesting.com/wp-content/uploads/2014/08/pipetting-lab-photo-1024x682.jpg', 7),
('Genotype Profiling', 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/481258geN/anh-mo-ta.png', 7),
('Ancestry DNA Map', 'https://www.laborteam.ch/_Resources/Persistent/2/3/3/0/2330dd399846f2dd931afb4e58ee4b52f08c797a/genetische-diagnostik.jpg', 7),
-- Service 8
('Paternal Lineage', 'https://www.crystal-health.co.uk/uploads/transforms/bc9e33244d2d8a7bebbefa89bb319b9f/6393/Drug-and-Alcohol-Testing-in-Lab_e7c665d712ec67dfe3f3524f4c64cbe9.webp', 8),
('Maternal Lineage', 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/481258geN/anh-mo-ta.png', 8),
('Genetic Wellness', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_GnzDvo7Z7g_uUr3joXTL8z8u8qWtiyIJwTyKRPxslWjfa5ruqPBAiZBpW9W4ebN5TDk&usqp=CAU', 8),
-- Service 9
('DNA Ethnicity Report', 'https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/tumblr_inline_niel9vCQmf1sgr4d3.png?itok=GersSTtR', 9),
('Genealogy Test', 'https://www.owlguru.com/wp-content/uploads/wpallimport/files/dna-analysts/__(1).jpg', 9),
('DNA Health Check', 'https://www.verifiedmarketreports.com/images/blogs/07-24/top-7-trends-in-the-dna-vaccination-market-in-2024.jpg', 9),
-- Service 10
('Genetic Ancestry', 'https://static.toiimg.com/thumb/msid-52395070,imgsize-18416,width-400,resizemode-4/52395070.jpg', 10),
('DNA Sequence Analysis', 'https://genincode.com/wp-content/uploads/2021/10/gettyimages-1027139762.jpg', 10),
('Hereditary Disease Test', 'https://www.laborteam.ch/_Resources/Persistent/2/3/3/0/2330dd399846f2dd931afb4e58ee4b52f08c797a/genetische-diagnostik.jpg', 10),
-- Service 11
('DNA Origins', 'https://www.raincoast.org/wp-content/uploads/2023/12/Geneticslab-1200x630.jpg', 11),
('Genetic Screening', 'https://www.raincoast.org/wp-content/uploads/2023/12/Lab2-1200x800.jpg', 11),
('Ancestry Breakdown', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxP24mOAOMQc6GK25xEiDuHb4-k6GvczwPQ&s', 11),
-- Service 12
('DNA Trait Analysis', 'https://cdn.prod.website-files.com/647888ca92d03e3fca3f1ea0/647888ca92d03e3fca3f242c_shutterstock_537098116.jpg', 12),
('Genomic Health', 'https://i0.wp.com/biztechcollege.com/wp-content/uploads/2020/10/Career-Outlook-Medical-Lab-Technician.jpg', 12),
('Family DNA Match', 'https://i0.wp.com/biztechcollege.com/wp-content/uploads/2024/03/Medical-Lab-Technician-Course.png', 12),
-- Service 13
('Genetic Heritage', 'https://www.worldskillsuk.org/wp-content/uploads/2024/02/Laboratory-Technician-7.jpg', 13),
('DNA Wellness Report', 'https://images.worldskillsusercontent.org/ws68/ws85/32877/ws688566ad-e44d-4d42-b86f-3fc24725619a_medium', 13),
('Paternity DNA Test', 'https://www.weber.edu/wsuimages/chemistry/chem%20degrees%20medium/DegreeBox4.jpg?1509375264755&1534268697775', 13),
-- Service 14
('Ancestral DNA Insights', 'https://0utwqfl7.cdn.imgeng.in/explore-academics/programs/images/undergraduate/chhs/MedLabScienceMajorMH.jpg', 14),
('Gene Expression Test', 'https://www.chitkara.edu.in/blogs/wp-content/uploads/2024/08/Laboratory-Science.jpg', 14),
('DNA Health Profile', 'https://cdn-cjlhn.nitrocdn.com/MDbIaQnHgvYrWdlkNlAApgMXaoLyMZQw/assets/images/optimized/rev-727df5c/www.brooklinecollege.edu/wp-content/uploads/2022/10/shutterstock_1902917350-scaled.jpg', 14),
-- Service 15
('Genetic Ancestry Map', 'https://img.freepik.com/premium-photo/research-medical-dna-lab-science-biotechnology-scientist-laboratory-clinic-medicine-chemistry_1117469-11873.jpg', 15),
('DNA Test Results', 'https://www.crystal-health.co.uk/uploads/images/_1200x630_crop_center-center_82_none/Laboratory-DNA-testing-medium.jpg?mtime=1737457391', 15),
('Hereditary Risk', 'https://dnatesting.com/wp-content/uploads/2014/08/pipetting-lab-photo-1000x562.jpg', 15),
-- Service 16
('DNA Lineage Analysis', 'https://www.shutterstock.com/image-photo/science-blood-black-man-laboratory-600nw-2267180953.jpg', 16),
('Genomic Sequencing', 'https://static.wixstatic.com/media/db6e66c11cf24c1aa7aa0b93a17bbb2f.jpg/v1/fill/w_640,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/db6e66c11cf24c1aa7aa0b93a17bbb2f.jpg', 16),
('Family Heritage DNA', 'https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/0AB4/production/_108104720_gettyimages-499085898.jpg.webp', 16),
-- Service 17
('Genetic Trait Report', 'https://media.istockphoto.com/id/904315482/photo/young-attractive-female-scientist-researching-in-the-laboratory.jpg?s=612x612&w=0&k=20&c=0wCH_mE3ZwC3GTthS-m9SZTNC5kMKnq8EOHEl82sHNE=', 17),
('DNA Health Analysis', 'https://www.shutterstock.com/image-photo/woman-geneticist-dna-chain-near-260nw-2380296457.jpg', 17),
('Ancestry DNA Test', 'https://geneticsdigest.com/best_ancestry_genealogy_dna_test/images/basic-genetics_large.jpg', 17),
-- Service 18
('Paternal DNA Insights', 'https://www.theregreview.org/wp-content/uploads/2019/06/genetics-.jpg', 18),
('Maternal DNA Insights', 'https://endeavordna.com/wp-content/uploads/2022/09/AdobeStock_319612966-scaled.jpeg', 18),
('Genetic Profile', 'https://5.imimg.com/data5/JP/HH/MY-1908678/dna-testing-services.jpg', 18),
-- Service 19
('DNA Ethnicity Analysis', 'https://scx2.b-cdn.net/gfx/news/2017/dnalabtechni.jpg', 19),
('Genealogy DNA Report', 'https://www.uaf.edu/museum/collections/genomics/ancient-dna-laboratory/Photo-on-2013-02-13-at-07.51-3_s.jpg', 19),
('Health DNA Insights', 'https://www.signaturescience.com/wp-content/uploads/2022/07/MicrosoftTeams-image-57-1024x565.jpg', 19),
-- Service 20
('Ancestral Heritage', 'https://media.defense.gov/2023/Dec/07/2003353669/825/780/0/180824-F-BH656-0065Y.JPG', 20),
('DNA Wellness Test', 'https://media.defense.gov/2023/Dec/07/2003353670/825/780/0/180824-F-BH656-0095Y.JPG', 20),
('Genetic Risk Profile', 'https://i2-prod.themirror.com/article797329.ece/ALTERNATES/s1200/1_scientist-in-a-clean-room.jpg', 20),
-- Service 21
('DNA Ancestry Breakdown', 'https://img77.uenicdn.com/image/upload/v1728073933/business/5814d99566454c37957cc0582019ce6b.jpg', 21),
('Genetic Health Report', 'https://img1.wsimg.com/isteam/stock/pYYrAR7/:/', 21),
('Family Lineage DNA', 'https://images.squarespace-cdn.com/content/v1/6664cf1899bc3d14730d3bdf/6024c35b-1e6b-4fe1-b27b-7aa744ccf1c3/IMG_0078.JPG', 21),
-- Service 22
('Paternity DNA Analysis', 'https://www.dna-testing-nyc.com/wp-content/uploads/2020/12/Accredited-DNA-Testing-Lab-01.png', 22),
('Mitochondrial Analysis', 'https://dnatesting.com/wp-content/uploads/2014/08/pipetting-lab-photo-1000x562.jpg', 22),
('DNA Trait Insights', 'https://techblog.cosmobc.com/wp-content/uploads/sites/8/2023/10/Lab-Equipment-for-Your-Next-Experiment.jpg', 22),
-- Service 23
('Genetic Mapping', 'https://www.shutterstock.com/image-photo/modern-laboratory-research-scientist-conducts-600nw-685086586.jpg', 23),
('DNA Health Screening', 'https://www.weber.edu/wsuimages/chemistry/chem%20degrees%20medium/DegreeBox4.jpg?1509375264755&1534268697775', 23),
('Ancestry DNA Profile', 'https://www.worldskillsuk.org/wp-content/uploads/2024/02/Laboratory-Technician-7.jpg', 23),
-- Service 24
('DNA Heritage Report', 'https://c8.alamy.com/comp/ERKA4Y/scientists-with-microscope-making-test-in-lab-ERKA4Y.jpg', 24),
('Genetic Wellness Insights', 'https://example.com/images/dna-testing/wellness-insights-24.jpg', 24),
('Family DNA Analysis', 'https://c8.alamy.com/comp/2JA4CXB/scientists-working-in-the-lab-looking-throught-the-microscope-and-working-in-the-flow-cabinet-2JA4CXB.jpg', 24),
-- Service 25
('DNA Ethnicity Insights', 'https://c8.alamy.com/comp/2GF9J06/team-of-focused-scientists-working-together-on-sample-analyzes-while-working-in-a-lab-2GF9J06.jpg', 25),
('Genomic Health Test', 'https://c8.alamy.com/comp/J27Y7P/scientists-working-with-chemicals-and-equipment-in-pharmaceuticals-J27Y7P.jpg', 25),
('Ancestral DNA Report', 'https://www.shutterstock.com/image-photo/laboratory-work-three-close-portrait-260nw-632422565.jpg', 25),
-- Service 26
('Genetic Lineage Test', 'https://endeavordna.com/wp-content/uploads/2022/09/AdobeStock_319612966-scaled.jpeg', 26),
('DNA Health Insights', 'https://www.shutterstock.com/image-photo/science-blood-black-man-laboratory-600nw-2267180953.jpg', 26),
('Paternity Test Insights', 'https://www.shutterstock.com/image-photo/scientist-dropper-working-laboratory-260nw-119738182.jpg', 26),
-- Service 27
('DNA Trait Profile', 'https://smartdna.com.ng/wp-content/uploads/2023/07/african-woman-biochemist-researcher-checking-manifestations-vaccine-working-modern-equipped-laboratory-multiethnic-doctors-examining-virus-evolution-using-high-tech-researching-diagnosis-1024x576.jpg', 27),
('Ancestry DNA Analysis', 'https://www.theregreview.org/wp-content/uploads/2019/06/genetics-.jpg', 27),
('Genetic Risk Test', 'https://lirp.cdn-website.com/cf5e6ced/dms3rep/multi/opt/scientist-examining-the-new-virus-with-microscope-2022-03-04-03-17-22-utc-min-640w.png', 27),
-- Service 28
('DNA Wellness Profile', 'https://static.wixstatic.com/media/9db117_402ca0c2cfb0481d8f7fa49e97167db0~mv2.jpg/v1/fill/w_1000,h_563,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9db117_402ca0c2cfb0481d8f7fa49e97167db0~mv2.jpg', 28),
('Family Heritage Test', 'https://www.choicedna.com/wp-content/uploads/2https897899516.onlinehome.uscan-you-be-forced-to-take-a-dna-test.webp', 28),
('Genetic Screening Report', 'https://cmsasset.ancestrycdn.com/content/dam/ancestry/magnolia-dam/SEO-LP-Images/seo-dna-learning-hub-images/dna-tests-differ.jpg', 28),
-- Service 29
('DNA Ancestry Insights', 'https://paragonroad.com/wp-content/uploads/2021/05/what-DNA-test-can-tell-you-1024x683.jpg', 29),
('Genomic Analysis', 'https://genego-mobile.com/wp-content/uploads/2025/03/hohzisuoble-1.jpg', 29),
('Hereditary DNA Test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeaQE9BlFkW6b6_evKoW3sqM7fEK77szzNSrOd56FcobQfxvzBXxESU2ShDNKkDM1ATMQ&usqp=CAU', 29),
-- Service 30
('Genetic Health Profile', 'https://static.wixstatic.com/media/9db117_4282fbc9efdd4a0f982ace412e6fb2aa~mv2.jpg/v1/fill/w_1000,h_500,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9db117_4282fbc9efdd4a0f982ace412e6fb2aa~mv2.jpg', 30),
('DNA Lineage Report', 'https://t3.ftcdn.net/jpg/12/87/83/44/360_F_1287834429_XM051L8vggpnQOdasR0THKzxVFXvCgSY.jpg', 30),
('Ancestry DNA Mapping', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCG0ZGXv7UeMUqvohkM6mMK2N388C7D3q64ToQPNQ-QE9w7hXJjViPcJz9IldnjntbQUg&usqp=CAU', 30),
-- Service 31
('DNA Trait Analysis', 'https://smartdna.com.ng/wp-content/uploads/2023/07/african-woman-biochemist-researcher-checking-manifestations-vaccine-working-modern-equipped-laboratory-multiethnic-doctors-examining-virus-evolution-using-high-tech-researching-diagnosis.jpg', 31),
('Genetic Wellness Report', 'https://regene.ai/_next/image?url=%2Fimages%2Flanding%2Flab.webp&w=1200&q=100', 31),
('Family DNA Insights', 'https://www.hiro-clinic.or.jp/gene/wp-content/uploads/2024/11/31968313_m-1024x683.jpg', 31),
-- Service 32
('Paternity DNA Report', 'https://apicms.thestar.com.my/uploads/images/2024/01/04/2473521.webp', 32),
('Mitochondrial DNA Test', 'https://smartdna.com.ng/wp-content/uploads/2022/03/image-67-5-compressed.jpg', 32),
('Ancestral Heritage DNA', 'https://www.theshoremom.com/wp-content/uploads/2021/02/dna-test.jpg', 32),
-- Service 33
('DNA Health Analysis', 'https://dnatesting.com/wp-content/uploads/2011/06/iStock_000017106094Medium.jpg', 33),
('Genetic Trait Test', 'https://cdn.dev.glasspress.io/health-street.net/blog/paternity-test-kit-image-featured.jpg', 33),
('Ancestry DNA Results', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZiVwnLGBs0B1MHQqV11BDSUNJ_PUbMYyuEp5BeED0BUr5H_7H06nBqrJgXF_yvMhOqaw&usqp=CAU', 33),
-- Service 34
('DNA Ethnicity Profile', 'https://www.choicedna.com/wp-content/uploads/chemistry-researcher-looking-substance-test-tube-experiment-science-laboratory-woman-scientist-analyzing-dna-sample-glass-flask-working-biology-development-lab-min-scaled.jpg', 34),
('Genomic Health Insights', 'https://cloudfront-eu-central-1.images.arcpublishing.com/irishtimes/VLV2V5YLVHFPSKWUTLEGDSDCRA.jpg', 34),
('Family Lineage Report', 'https://dnacenter.com/wp-content/uploads/2025/03/Myth-or-Reality-Can-a-DNA-Test-Show-Drug-Use.webp', 34),
-- Service 35
('Genetic Risk Analysis', 'https://danaimediwellness.com/wp-content/uploads/2021/01/team-of-doctors-studying-dna-mutation-QB4VYQ5-scaled.jpg', 35),
('DNA Wellness Analysis', 'https://static1.straitstimes.com.sg/s3fs-public/articles/2022/05/15/fhswab150522.jpg?VersionId=nnUxgq_uEOMov5mcap_xDjNmX_rI4CGP', 35),
('Ancestral DNA Test', 'https://dnalabpakistan.com/static/images/dna-hero-2.jpg', 35),
-- Service 36
('DNA Heritage Insights', 'https://lifelinehospitalkerala.com/wp-content/uploads/2024/10/scientist-looking-through-window-with-blue-background-scaled-1-1024x574.jpg', 36),
('Genetic Screening Test', 'https://clpmag.com/wp-content/uploads/2022/03/DNA-Test.jpg', 36),
('Family DNA Profile', 'https://www.shutterstock.com/shutterstock/videos/3704427627/thumb/8.jpg?ip=x480', 36),
-- Service 37
('DNA Ancestry Report', 'https://dnatestingcentre.com/wp-content/uploads/2022/06/4-scaled.jpg', 37),
('Genomic Wellness Test', 'https://qflp.com.au/wp-content/uploads/2021/09/dna-testing-orders-523-423.jpg', 37),
('Hereditary Trait Analysis', 'https://cdn.health-street.net/9/1/images/1d4343e7cee1/drug-testing-400.jpg', 37),
-- Service 38
('Paternity DNA Insights', 'https://www.dnapaternitylondon.com/wp-content/uploads/2017/09/cropped-DNA-Front-Cover.jpg', 38),
('Mitochondrial DNA Report', 'https://i0.wp.com/nigerianfact.com/wp-content/uploads/2020/06/dna-tes-in-nigeria.jpg', 38),
('Genetic Health Test', 'https://careerprooccupationalexpress.com/wp-content/uploads/2022/12/virustests.jpg', 38),
-- Service 39
('DNA Ethnicity Test', 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i9y6m3dwVdnw/v0/-1x-1.webp', 39),
('Ancestral Lineage Report', 'https://img.jakpost.net/c/2017/10/25/2017_10_25_34641_1508913948._large.jpg', 39),
('Genetic Wellness Profile', 'https://img2.chinadaily.com.cn/images/201812/07/5c09d600a310eff36909eabb.jpeg', 39),
-- Service 40
('DNA Health Report', 'https://resources.selfdecode.com/app/uploads/2021/03/mufid-majnun-aNEaWqVoT0g-unsplash.jpg', 40),
('Family Heritage Insights', 'https://geneway.co.za/wp-content/uploads/2022/07/Where-Can-I-Do-a-DNA-Test-.png', 40),
('Genetic Trait Report', 'https://i2-prod.bristolpost.co.uk/article9070991.ece/ALTERNATES/s615/1_GettyImages-1157314129.jpg', 40);

