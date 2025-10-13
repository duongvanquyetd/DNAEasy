

create database DNAEasy;

use DNAEasy;


INSERT INTO Person (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email)
VALUES 
('0900000011', N'Admin', 'password123', 'F', NULL, N'Đường A', N'Hà Nội', N'Ba Đình', 'ADMIN',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'Admin', 'ADMIN@example.com'),


('0900000001', N'Nguyễn Thị Mai', 'password123', 'F', NULL, N'Đường A', N'Hà Nội', N'Ba Đình', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthimai', 'mai1@example.com'),

('0900000002', N'Hoàng Thị Lan', 'password123', 'F', NULL, N'Đường B', N'HCM', N'Quận 1', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'hoangthilan', 'lan2@example.com'),

('0900000003', N'Lê Thị Hồng', 'password123', 'F', NULL, N'Đường C', N'Huế', N'Phú Hội', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'lethihong', 'hong3@example.com'),

('0900000004', N'Phạm Thị Hoa', 'password123', 'F', NULL, N'Đường D', N'Đà Nẵng', N'Hải Châu', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'phamthihoa', 'hoa4@example.com'),

('0900000005', N'Trần Thị Kim', 'password123', 'F', NULL, N'Đường E', N'Cần Thơ', N'Ninh Kiều', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'tranthikim', 'kim5@example.com'),

('0900000006', N'Nguyễn Văn An', 'password123', 'M', NULL, N'Đường F', N'Hà Nội', N'Thanh Xuân', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'nguyenvanan', 'an6@example.com'),

('0900000007', N'Lê Văn Bình', 'password123', 'M', NULL, N'Đường G', N'HCM', N'Quận 3', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'levanbinh', 'binh7@example.com'),

('0900000008', N'Phạm Văn Cường', 'password123', 'M', NULL, N'Đường H', N'Hải Phòng', N'Lê Chân', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvancuong', 'cuong8@example.com'),

('0900000009', N'Trần Văn Dũng', 'password123', 'M', NULL, N'Đường I', N'Nam Định', N'Trường Thi', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvandung', 'dung9@example.com'),

('0900000010', N'Hoàng Văn Em', 'password123', 'M', NULL, N'Đường J', N'Bình Dương', N'Thủ Dầu Một', 'CUSTOMER',
 'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'hoangvanem', 'em10@example.com');

 -- ca_1
INSERT INTO Person (phone, name, password, gender, work_hour, streets, city, district, rolename,  avatar_url, username, email) VALUES
('0910000001', N'Nguyễn Thị Ánh', 'pass123', 'F', 'ca_1', N'Đường A1', N'Hà Nội', N'Ba Đình', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthianh', 'anh1@example.com'),

('0910000002', N'Lê Thị Ngọc', 'pass123', 'F', 'ca_1', N'Đường A2', N'HCM', N'Quận 1', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'lethingoc', 'ngoc2@example.com'),

('0910000003', N'Phạm Văn Minh', 'pass123', 'M', 'ca_1', N'Đường A3', N'Đà Nẵng', N'Hải Châu', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvanminh', 'minh3@example.com'),

('0910000004', N'Hoàng Văn Long', 'pass123', 'M', 'ca_1', N'Đường A4', N'Huế', N'Phú Hội', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'hoangvanlong', 'long4@example.com'),

('0910000005', N'Trần Văn Quang', 'pass123', 'M', 'ca_1', N'Đường A5', N'Cần Thơ', N'Ninh Kiều', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvanquang', 'quang5@example.com'),

-- ca_2
('0910000006', N'Nguyễn Thị Hạnh', 'pass123', 'F', 'ca_2', N'Đường B1', N'Bình Dương', N'Thủ Dầu Một', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthihanh', 'hanh6@example.com'),

('0910000007', N'Lê Thị Hương', 'pass123', 'F', 'ca_2', N'Đường B2', N'Hải Phòng', N'Lê Chân', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'lethihuong', 'huong7@example.com'),

('0910000008', N'Phạm Văn Toàn', 'pass123', 'M', 'ca_2', N'Đường B3', N'Nam Định', N'Trường Thi', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvantoan', 'toan8@example.com'),

('0910000009', N'Trần Văn Sơn', 'pass123', 'M', 'ca_2', N'Đường B4', N'Nghệ An', N'TP Vinh', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvanson', 'son9@example.com'),

('0910000010', N'Lý Văn Khánh', 'pass123', 'M', 'ca_2', N'Đường B5', N'Thái Nguyên', N'Sông Công', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'lyvankhanh', 'khanh10@example.com'),

-- ca_3
('0910000011', N'Trịnh Thị Nhung', 'pass123', 'F', 'ca_3', N'Đường C1', N'Bắc Ninh', N'Từ Sơn', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'trinhthin hung', 'nhung11@example.com'),

('0910000012', N'Đặng Thị Thu', 'pass123', 'F', 'ca_3', N'Đường C2', N'Ninh Bình', N'TP Ninh Bình', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'dangthithu', 'thu12@example.com'),

('0910000013', N'Bùi Văn Duy', 'pass123', 'M', 'ca_3', N'Đường C3', N'Thanh Hóa', N'Đông Sơn', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'buivanduy', 'duy13@example.com'),

('0910000014', N'Ngô Văn Hà', 'pass123', 'M', 'ca_3', N'Đường C4', N'Hà Tĩnh', N'TP Hà Tĩnh', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'ngovanha', 'ha14@example.com'),

('0910000015', N'Vũ Văn Lâm', 'pass123', 'M', 'ca_3', N'Đường C5', N'Hưng Yên', N'Văn Lâm', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'vuvanlam', 'lam15@example.com'),

-- ca_4
('0910000016', N'Phan Thị Thảo', 'pass123', 'F', 'ca_4', N'Đường D1', N'Tuyên Quang', N'TP Tuyên Quang', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'phanthithao', 'thao16@example.com'),

('0910000017', N'Đoàn Thị Mai', 'pass123', 'F', 'ca_4', N'Đường D2', N'Phú Thọ', N'Việt Trì', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'doanthimai', 'mai17@example.com'),

('0910000018', N'Đào Văn Thịnh', 'pass123', 'M', 'ca_4', N'Đường D3', N'Quảng Ninh', N'Uông Bí', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'daovanthinh', 'thinh18@example.com'),

('0910000019', N'Kiều Văn Huy', 'pass123', 'M', 'ca_4', N'Đường D4', N'Lào Cai', N'Sa Pa', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'kieuvanhuy', 'huy19@example.com'),

('0910000020', N'Chu Văn Phúc', 'pass123', 'M', 'ca_4', N'Đường D5', N'Cao Bằng', N'TP Cao Bằng', 'Staff_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'chuvanphuc', 'phuc20@example.com');
-- ca_1
INSERT INTO Person (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email) VALUES
('0910000021', N'Nguyễn Thị Tuyết', 'pass123', 'F', 'ca_1', N'Đường E1', N'Hà Nội', N'Thanh Xuân', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthituyet', 'tuyet21@example.com'),

('0910000022', N'Trịnh Thị Hòa', 'pass123', 'F', 'ca_1', N'Đường E2', N'HCM', N'Bình Thạnh', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'trinhthihoa', 'hoa22@example.com'),

('0910000023', N'Phạm Văn Cường', 'pass123', 'M', 'ca_1', N'Đường E3', N'Huế', N'Vỹ Dạ', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phamvancuong2', 'cuong23@example.com'),

('0910000024', N'Lê Văn Thắng', 'pass123', 'M', 'ca_1', N'Đường E4', N'Quảng Trị', N'Đông Hà', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'levanthang', 'thang24@example.com'),

('0910000025', N'Đinh Văn Đức', 'pass123', 'M', 'ca_1', N'Đường E5', N'Thừa Thiên Huế', N'Hương Thủy', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'dinhvanduc', 'duc25@example.com'),

-- ca_2
('0910000026', N'Nguyễn Thị Thanh', 'pass123', 'F', 'ca_2', N'Đường F1', N'Hải Dương', N'Nam Sách', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthithanh', 'thanh26@example.com'),

('0910000027', N'Huỳnh Thị Mỹ', 'pass123', 'F', 'ca_2', N'Đường F2', N'TP.HCM', N'Tân Bình', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'huynhthimy', 'my27@example.com'),

('0910000028', N'Nguyễn Văn Hiếu', 'pass123', 'M', 'ca_2', N'Đường F3', N'Nghệ An', N'Hưng Nguyên', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'nguyenvanhieu', 'hieu28@example.com'),

('0910000029', N'Trần Văn Hải', 'pass123', 'M', 'ca_2', N'Đường F4', N'Hải Phòng', N'Lê Chân', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'tranvanhai', 'hai29@example.com'),

('0910000030', N'Đoàn Văn Tài', 'pass123', 'M', 'ca_2', N'Đường F5', N'Bình Định', N'Tây Sơn', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'doanvantai', 'tai30@example.com'),

-- ca_3
('0910000031', N'Trần Thị Kiều', 'pass123', 'F', 'ca_3', N'Đường G1', N'Khánh Hòa', N'Nha Trang', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'tranthikieu', 'kieu31@example.com'),

('0910000032', N'Phạm Thị Trang', 'pass123', 'F', 'ca_3', N'Đường G2', N'Đắk Lắk', N'Buôn Ma Thuột', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'phamthitrang', 'trang32@example.com'),

('0910000033', N'Hoàng Văn Hùng', 'pass123', 'M', 'ca_3', N'Đường G3', N'Gia Lai', N'Pleiku', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'hoangvanhung', 'hung33@example.com'),

('0910000034', N'Vũ Văn Thái', 'pass123', 'M', 'ca_3', N'Đường G4', N'Kon Tum', N'TP Kon Tum', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'vuvanthai', 'thai34@example.com'),

('0910000035', N'Bùi Văn Lộc', 'pass123', 'M', 'ca_3', N'Đường G5', N'An Giang', N'Long Xuyên', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'buivanloc', 'loc35@example.com'),

-- ca_4
('0910000036', N'Nguyễn Thị Như', 'pass123', 'F', 'ca_4', N'Đường H1', N'Sóc Trăng', N'TP Sóc Trăng', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'nguyenthinh u', 'nhu36@example.com'),

('0910000037', N'Hồ Thị Thắm', 'pass123', 'F', 'ca_4', N'Đường H2', N'Cà Mau', N'TP Cà Mau', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/db11418a-7874-4286-91c8-40b2c618d25c_male.jpg?_a=DAGAACAYZAA0', 'hothitham', 'tham37@example.com'),

('0910000038', N'Ngô Văn Lợi', 'pass123', 'M', 'ca_4', N'Đường H3', N'Vĩnh Long', N'TP Vĩnh Long', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'ngovanloi', 'loi38@example.com'),

('0910000039', N'Lý Văn Hưng', 'pass123', 'M', 'ca_4', N'Đường H4', N'Kiên Giang', N'Rạch Giá', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'lyvanhung', 'hung39@example.com'),

('0910000040', N'Phan Văn Hậu', 'pass123', 'M', 'ca_4', N'Đường H5', N'Bạc Liêu', N'TP Bạc Liêu', 'STAFF_TEST',
'https://res.cloudinary.com/dy3uhobsq/image/upload/ba8f8801-97bb-4d7c-8bb2-1464ae1e309c_Female.png?_a=DAGAACAYZAA0', 'phanvanhau', 'hau40@example.com');

INSERT INTO Person (
    phone, name, password, gender, work_hour,
    streets, city, district, rolename,
    avatar_url, username, email
) VALUES
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
-- Bạn có muốn mình tạo tiếp 10 người nữa không? Hoặc mình có thể tạo toàn bộ script cho 100 người nếu cần.

update person set rolename = 'STAFF_TEST' where rolename = 'Staff_TEST'
update person set password='$2a$10$kL9m/vyvZnnvvA2sp9IIq.H7cq/nJmq0GJ4g6KlsbuuYLgBuNNOtu' where username != 'tttdmin';

-- 20 dịch vụ loại civil (dân sự) 20 phap ly 
INSERT INTO Service (service_name, service_description, service_price, type_service, sample_count) VALUES
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



INSERT INTO Blog (blog_title, blog_content, blog_status, blog_type, staff_id) VALUES
('DNA Technology', 
'DNA technology refers to the wide range of techniques and methods used to analyze, manipulate, and utilize DNA molecules for various purposes. Since the discovery of the DNA double helix structure in 1953, advances in molecular biology have revolutionized the ability to study genetic material. DNA technology encompasses processes such as DNA sequencing, polymerase chain reaction (PCR), gene cloning, and genetic engineering. It plays a pivotal role in medical diagnostics, forensic science, agriculture, and biotechnology.

The development of PCR in the 1980s allowed scientists to amplify specific DNA sequences exponentially, enabling detailed study even from minute samples. DNA sequencing technologies have rapidly evolved from the first-generation Sanger sequencing to high-throughput next-generation sequencing (NGS), which provides massive amounts of data and insight into genomes and genetic variation. Genetic engineering techniques, such as CRISPR-Cas9, have opened doors to targeted gene editing with potential applications in curing genetic diseases and improving crop traits.

DNA technology is essential for personalized medicine, where treatments are tailored based on an individual’s genetic profile, and for forensic investigations, where DNA evidence helps identify suspects or exonerate the innocent. Moreover, DNA technology facilitates genealogical research and ancestry tracing by comparing DNA markers among individuals.

Despite its benefits, DNA technology raises ethical and privacy concerns, including data security, consent, and potential misuse of genetic information. Ongoing debates focus on regulation, accessibility, and equitable use of these powerful tools.

In conclusion, DNA technology is a cornerstone of modern biology and medicine, continuously evolving and impacting many facets of science and society. Understanding its capabilities and limitations is crucial for harnessing its potential responsibly.', 
1, 'DNA Technology', 21),

('DNA Test Sample', 
'A DNA test sample is a biological specimen collected from an individual for the purpose of analyzing their genetic material. The most common types of samples include saliva, blood, hair follicles, skin cells, or other bodily fluids. Proper sample collection is critical to ensure the integrity and reliability of the DNA test results.

Saliva samples are popular due to their non-invasive collection method and ease of transportation. Typically, an individual will spit into a sterile tube or use a swab to collect cells from the inside of the cheek. Blood samples, collected by a healthcare professional, provide high-quality DNA and are often used in clinical settings. Hair follicles containing the root can also be used, though the amount of DNA is smaller and may affect test accuracy.

The sample must be handled and stored properly to avoid contamination or degradation. Once collected, the sample is labeled and sent to a laboratory where DNA is extracted and purified. The DNA is then analyzed using various techniques depending on the test purpose, such as STR profiling for forensic identification or SNP analysis for ancestry.

Chain of custody procedures are crucial in legal or forensic contexts to maintain the sample’s authenticity and admissibility in court. The laboratory typically issues a report detailing the results and conclusions based on the DNA analysis.

In summary, the DNA test sample is the foundation for genetic testing, and its quality directly impacts the accuracy and validity of the results. Proper collection, handling, and documentation are essential components of any DNA testing process.', 
1, 'DNA Test Sample', 22),

('Civil DNA', 
'Civil DNA testing is a type of genetic testing used in non-criminal legal matters, often involving family law and civil disputes. It includes tests such as paternity/maternity testing, sibling testing, grandparentage testing, and immigration DNA testing. These tests help establish biological relationships and are frequently used in cases related to child custody, inheritance claims, and citizenship applications.

The process typically involves collecting DNA samples from the individuals involved, usually through buccal swabs. The samples are analyzed to identify genetic markers that indicate biological relationships. The results provide a probability of relatedness that courts and agencies use as evidence.

Civil DNA testing must follow strict chain of custody and documentation protocols to ensure the results are admissible in legal proceedings. The accuracy and reliability of the tests make them a valuable tool for resolving disputes and verifying claims.

Aside from legal use, civil DNA testing also has applications in genealogy and personal knowledge about family history.

In conclusion, civil DNA testing is an important service for individuals seeking legal resolution and personal clarity on biological relationships.', 
1, 'Civil DNA', 23),

('DNA Legal', 
'DNA legal testing is focused on providing scientifically validated genetic evidence for use in legal cases. It covers a broad spectrum of applications, including criminal investigations, child support cases, immigration verification, and identification of remains. Legal DNA testing requires strict adherence to regulatory standards, such as chain of custody, certified laboratories, and validated methodologies.

This type of testing is often performed in accredited forensic laboratories that meet national and international standards. The results must be defensible in court, requiring detailed documentation, expert testimony, and reliable analytical techniques.

Common legal DNA tests include STR analysis for identity matching, mitochondrial DNA testing for maternal lineage, and Y-chromosome testing for paternal lineage. These tests provide strong evidence to support or refute claims in court.

Legal DNA testing has transformed the justice system by improving accuracy in suspect identification, reducing wrongful convictions, and assisting in victim identification.

Despite its power, legal DNA testing must balance privacy concerns and ethical considerations, ensuring individuals’ genetic data is protected.

Overall, DNA legal testing is a critical component of the intersection between science and law, providing trustworthy evidence to uphold justice.', 
1, 'DNA Legal', 24),

('DNA Testing Process', 
'The DNA testing process involves multiple steps that ensure accurate and reliable genetic analysis. It begins with sample collection, where biological materials such as saliva, blood, or hair are obtained. Proper collection techniques are essential to prevent contamination and preserve sample quality.

Once collected, the sample undergoes DNA extraction and purification in the laboratory. This step isolates the DNA molecules from other cellular components, producing clean genetic material for analysis.

The extracted DNA is then quantified and amplified using techniques like polymerase chain reaction (PCR), allowing for the detection of specific genetic markers.

Next, DNA profiling or sequencing is performed depending on the purpose of the test. In forensic cases, STR markers are analyzed to create a genetic fingerprint. For medical or ancestry testing, sequencing might reveal genetic variants or mutations.

Data interpretation follows, where geneticists or bioinformaticians analyze the results to draw conclusions related to identity, health risks, or biological relationships.

Finally, a report is generated and delivered to the requester, often accompanied by counseling to explain the findings and implications.

Throughout the process, strict quality control measures and chain of custody protocols ensure test validity and legal admissibility.

In summary, the DNA testing process is a complex, multi-step procedure requiring precision, expertise, and ethical responsibility to provide meaningful and trustworthy results.', 
1, 'DNA Testing Process', 25);

-- Self-collection method

-- Self-collection method
-- Self_collection
-- Xóa 2 bước đầu cho mỗi phương thức (payment)

-- Xóa bảng cũ nếu muốn làm lại hoàn toàn
-- DROP TABLE process_testing;

-- Tạo lại bảng (nếu cần)


-- INSERT lại dữ liệu chuẩn hoá

-- SELF_COLLECTION
INSERT INTO process_testing (sample_method, status_name, order_process, is_finished, person_confirm,formfor) VALUES
('Self_collection', 'Kit sent', 1, 0, 'STAFF_TEST',null),
('Self_collection', 'Kit received', 2, 0, 'CUSTOMER',null),
('Self_collection', 'Sample sent', 3, 0, 'CUSTOMER','Sample'),
('Self_collection', 'Sample received', 4, 0, 'STAFF_LAB',null),
('Self_collection', 'Is analyzing', 5, 0, 'STAFF_LAB',null),
('Self_collection', 'Result available', 6, 1, 'STAFF_LAB','Result');

-- HOME_COLLECTION
INSERT INTO process_testing (sample_method, status_name, order_process, is_finished, person_confirm,formfor) VALUES
('Home_collection', 'on the move', 1, 0, 'STAFF_TEST',null),
('Home_collection', 'Sample collected', 2, 0, 'STAFF_TEST','Sample'),
('Home_collection', 'Sent to lab', 3, 0, 'STAFF_TEST',null),
('Home_collection', 'Is analyzing', 4, 0, 'STAFF_LAB',null),
('Home_collection', 'Result available', 5, 1, 'STAFF_LAB','Result');

-- HOSPITAL_COLLECTION
INSERT INTO process_testing (sample_method, status_name, order_process, is_finished, person_confirm,formfor) VALUES
('Hospital_collection', 'has been present', 1, 0, 'CUSTOMER',null),
('Hospital_collection', 'Sample collected', 2, 0, 'STAFF_TEST','Sample'),
('Hospital_collection', 'Sent to lab', 3, 0, 'STAFF_TEST',null),
('Hospital_collection', 'Is analyzing', 4, 0, 'STAFF_LAB',null),
('Hospital_collection', 'Result available', 5, 1, 'STAFF_LAB','Result');



INSERT INTO Blog (blog_title, blog_content, blog_status, blog_type, staff_id)
VALUES (
    'DNA Technology: Unlocking the Mysteries of Life',
    'DNA technology has revolutionized the world of science and medicine over the past several decades. At the heart of this transformation lies the remarkable molecule deoxyribonucleic acid, or DNA, which encodes the genetic instructions that govern all living organisms. Understanding DNA’s structure, function, and manipulation techniques has opened the door to unprecedented advances in healthcare, forensic science, agriculture, and many other fields.

The discovery of the double helix structure by James Watson and Francis Crick in 1953 was a pivotal moment in biology. This elegant spiral staircase-like structure revealed how genetic information is stored and copied, setting the stage for modern molecular biology. Following this discovery, scientists developed a series of laboratory techniques that allowed them to isolate, amplify, sequence, and edit DNA.

One of the cornerstone technologies is the Polymerase Chain Reaction (PCR), developed by Kary Mullis in the 1980s. PCR enables the rapid amplification of specific DNA segments, making it possible to analyze minute quantities of genetic material. This technique is foundational for numerous applications, from diagnosing genetic diseases to identifying suspects in criminal investigations.

DNA sequencing technologies have also evolved dramatically. The Sanger sequencing method, introduced in the 1970s, allowed for reading the order of nucleotides in small DNA fragments. However, the real breakthrough came with Next-Generation Sequencing (NGS), which enables the simultaneous sequencing of millions of DNA fragments, drastically reducing cost and time. This has led to the rise of genomics, where entire genomes can be analyzed to understand complex diseases, evolutionary biology, and personalized medicine.

In medicine, DNA technology plays a crucial role in early diagnosis, treatment planning, and monitoring of genetic disorders. For example, prenatal genetic screening can detect chromosomal abnormalities before birth, while cancer genomics helps identify mutations driving tumor growth. Gene therapy, which involves correcting defective genes, is an emerging field with the potential to cure previously untreatable diseases.

Forensic science also relies heavily on DNA profiling. The ability to match DNA samples from crime scenes to individuals has revolutionized law enforcement, providing powerful evidence that can confirm guilt or innocence. This technology also aids in identifying victims of disasters and resolving missing person cases.

In agriculture, genetic engineering has been used to create crops that are more resistant to pests, diseases, and environmental stressors. This contributes to food security and sustainability, especially as the global population continues to grow.

Despite these benefits, the rapid advancement of DNA technology raises important ethical and privacy concerns. Issues such as genetic discrimination, data security, and the implications of editing human embryos require careful consideration. Laws and regulations are essential to ensure that genetic information is used responsibly and that individual rights are protected.

Looking to the future, innovations like CRISPR-Cas9 gene editing offer incredible promise but also pose significant challenges. CRISPR allows precise editing of DNA sequences, enabling potential cures for genetic diseases, but also raises fears about designer babies and unintended consequences.

In summary, DNA technology has dramatically expanded our ability to understand and manipulate the blueprint of life. Its impact spans healthcare, justice, agriculture, and beyond, holding enormous promise for the future of humanity. As this technology continues to evolve, balancing scientific progress with ethical responsibility will be critical.',
    1, -- blogStatus (true)
    'DNA Technology',
    20 -- staff_id (có thể là số trong khoảng 20 đến 50)
);
insert into service_image 	(service_image_id,service_image_name,	service_image_path,	service_id) values 
(2,'Anh','data:image/jpeg;base64,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'
,2)




select *from   Service;
select *from service_image

select *from person  
select *from process_testing where sample_method ='Self_collection' and order_process = 4

select *from sample


select *from blog;
select *from blog_image

select *from appoinment
select *from appointment_tracking
select *from payment
select *from  sample

select *from sample_tracking
select *from person_test 
select *from Sample_result
select *from notification
select *from  appoinment
select *from result
cure_status_sample
alter table Sample drop column result_id
delete result where  result_id >= 47 and result_id <= 39
delete sample  where sampleid  >= 29
delete sample_tracking  where sample_id  >= 17

delete sample_result   where sample_id in (11,12,13,14) 
delete person_test where cccd = null

delete sample
delete payment  where apppointment_id = 2
delete appointment_tracking  where appointment_id =2
delete appoinment where appointment_id = 2
delete person_test
delete process_testing





drop table person
drop table sample_tracking  
drop table appoinment
drop table payment
drop table appointment_tracking
drop table sample
drop table result
drop table process_testing
select *from process_testing
select *from blog b where b.blog_title like '% (NGS)%' or b.blog_type like '%(NGS)%'
update  sample set cure_status_sample ='Is analyzing' where appointment_id = 11
update Sample set cure_status_sample =null
update appoinment set curent_status_appointment='COMPLETE' where appointment_id in (15)
update payment set payment_amount =1500000.00 where payment_id = 11
set 

delete result

drop table app