delete from person where person_id ='P11'
select  username, email,phone from person group by username, email,phone
select  username from person group by username
drop database DNAEasy
create database DNAEasy




INSERT INTO Person (phone, name, password, gender, work_hour, streets, city, district, rolename, avatar_url, username, email)
VALUES 
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




-- 20 dịch vụ loại civil (dân sự) 20 phap ly 
INSERT INTO Service (service_name, service_description, service_price, type_service) VALUES
('Father-Child DNA Test (Civil)', 'DNA test to verify biological father-child relationship for civil matters.', 2500000.00, 'civil'),
('Mother-Child DNA Test (Civil)', 'DNA test to confirm biological mother-child relationship.', 2500000.00, 'civil'),
('Sibling DNA Test (Civil)', 'DNA test to determine whether two individuals share biological parents.', 4000000.00, 'civil'),
('Grandparent DNA Test (Civil)', 'DNA test to establish biological relationship between grandparents and grandchildren.', 4000000.00, 'civil'),
('Uncle-Nephew DNA Test (Civil)', 'DNA test to verify biological link between uncle and nephew.', 4000000.00, 'civil'),
('Aunt-Niece DNA Test (Civil)', 'DNA test to confirm biological relationship between aunt and niece.', 4000000.00, 'civil'),
('Cousin DNA Test (Civil)', 'DNA test to establish biological link between cousins.', 4000000.00, 'civil'),
('Half-Sibling DNA Test (Civil)', 'DNA test to check shared biological parent between half siblings.', 4000000.00, 'civil'),
('Maternity Test (Civil)', 'DNA test to verify biological mother.', 2500000.00, 'civil'),
('Paternity Test for Inheritance (Civil)', 'DNA test to verify father-child relationship for inheritance purposes.', 3000000.00, 'civil'),
('Child Custody DNA Test (Civil)', 'DNA test to support child custody arrangements.', 3500000.00, 'civil'),
('Family Reunion DNA Test (Civil)', 'DNA test to support family reunification.', 3500000.00, 'civil'),
('Grandmother-Grandchild DNA Test (Civil)', 'DNA test to confirm grandmother and grandchild relationship.', 4000000.00, 'civil'),
('Half-Brother DNA Test (Civil)', 'DNA test to verify biological half-brothers.', 4000000.00, 'civil'),
('DNA Test for Social Support (Civil)', 'DNA test to prove family relationships for social support benefits.', 3500000.00, 'civil'),
('DNA Test for Adoption (Civil)', 'DNA test to confirm biological relationship in adoption cases.', 3500000.00, 'civil'),
('Legal Name Change DNA Test (Civil)', 'DNA test required for legal name change procedures.', 3000000.00, 'civil'),
('DNA Test for Marriage Registration (Civil)', 'DNA test to verify relationship status for marriage registration.', 3000000.00, 'civil'),
('DNA Test for Child Identification (Civil)', 'DNA test for official child identification purposes.', 3000000.00, 'civil'),
('DNA Test for Family Benefits (Civil)', 'DNA test to verify eligibility for family-related benefits.', 3500000.00, 'civil'),
('Legal Father-Child DNA Test', 'Court-admissible DNA test to verify father-child biological relationship.', 3000000.00, 'legal'),
('Legal Mother-Child DNA Test', 'Legal DNA test to confirm mother-child biological relationship.', 3000000.00, 'legal'),
('Legal Sibling DNA Test', 'DNA test for siblings used in legal cases.', 4500000.00, 'legal'),
('Legal Grandparent DNA Test', 'Legal DNA test between grandparents and grandchildren for court use.', 4500000.00, 'legal'),
('Legal Uncle-Nephew DNA Test', 'DNA test to verify uncle-nephew relationship in legal disputes.', 4500000.00, 'legal'),
('Legal Aunt-Niece DNA Test', 'DNA test for aunt-niece relationship in legal matters.', 4500000.00, 'legal'),
('Legal Cousin DNA Test', 'DNA test to prove cousin relationship for legal purposes.', 4500000.00, 'legal'),
('Legal Half-Sibling DNA Test', 'DNA test for half siblings in inheritance claims.', 4500000.00, 'legal'),
('Legal Maternity DNA Test', 'Court-approved maternity DNA test.', 3000000.00, 'legal'),
('Legal Paternity DNA Test', 'Legal DNA test for paternity verification.', 3500000.00, 'legal'),
('Legal Child Custody DNA Test', 'DNA test supporting child custody cases.', 4000000.00, 'legal'),
('Legal Immigration DNA Test', 'DNA test for immigration and family reunification cases.', 5000000.00, 'legal'),
('Legal DNA Test for Identity Verification', 'DNA test used for identity verification in legal procedures.', 5500000.00, 'legal'),
('Legal DNA Test for Inheritance Disputes', 'DNA test used in inheritance claims.', 5500000.00, 'legal'),
('Legal DNA Test for Adoption', 'Court-recognized DNA test for adoption procedures.', 4000000.00, 'legal'),
('Legal DNA Test for Name Change', 'DNA test required for legal name change applications.', 3500000.00, 'legal'),
('Legal DNA Test for Marriage Certification', 'DNA test used for marriage registration.', 3500000.00, 'legal'),
('Legal DNA Test for Divorce Proceedings', 'DNA test used in divorce cases.', 4000000.00, 'legal'),
('Legal DNA Test for Child Support', 'DNA test for child support legal cases.', 4000000.00, 'legal'),
('Legal DNA Test for Social Security Claims', 'DNA test supporting social security and welfare claims.', 4500000.00, 'legal');




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
INSERT INTO process_testing (sample_method, status_name, order_process, is_finished) VALUES
('Self-collection', 'Waiting for payment', 1, 0),
('Self-collection', 'Payment completed', 2, 0),
('Self-collection', 'Kit sent', 3, 0),
('Self-collection', 'Kit received', 4, 0),
('Self-collection', 'Sample sent', 5, 0),
('Self-collection', 'Sample received', 6, 0),
('Self-collection', 'Sent to lab', 7, 0),
('Self-collection', 'Result available', 8, 1),
('Home visit', 'Waiting for payment', 1, 0),
('Home visit', 'Payment completed', 2, 0),
('Home visit', 'In transit', 3, 0),
('Home visit', 'Sample collected', 4, 0),
('Home visit', 'Sent to lab', 5, 0),
('Home visit', 'Result available', 6, 1),
('Hospital collection', 'Waiting for payment', 1, 0),
('Hospital collection', 'Payment completed', 2, 0),
('Hospital collection', 'Sample collected', 3, 0),
('Hospital collection', 'Sent to lab', 4, 0),
('Hospital collection', 'Result available', 5, 1);
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

select *from Service

select *from process_testing
select *from person
select *from blog