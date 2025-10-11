# B02_RT01 - FINAL RELEASE DOCUMENT

## THÔNG TIN DỰ ÁN
**Tên dự án:** DNAEASY - Hệ thống Quản lý Xét nghiệm DNA  
**Phiên bản:** 1.0.0  
**Ngày phát hành:** [Ngày/Tháng/Năm]  
**Nhóm phát triển:** [Tên nhóm/Thành viên]

## MỤC LỤC
1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Kiến trúc hệ thống](#2-kiến-trúc-hệ-thống)
3. [Các chức năng chính](#3-các-chức-năng-chính)
4. [Hướng dẫn sử dụng](#4-hướng-dẫn-sử-dụng)
5. [Công nghệ sử dụng](#5-công-nghệ-sử-dụng)
6. [Hướng dẫn triển khai](#6-hướng-dẫn-triển-khai)
7. [Kết quả kiểm thử](#7-kết-quả-kiểm-thử)
8. [Đánh giá hiệu năng](#8-đánh-giá-hiệu-năng)
9. [Bảo mật](#9-bảo-mật)
10. [Kế hoạch bảo trì](#10-kế-hoạch-bảo-trì)
11. [Tài liệu tham khảo](#11-tài-liệu-tham-khảo)

## 1. TỔNG QUAN DỰ ÁN

### 1.1 Giới thiệu
DNAEASY là một hệ thống quản lý dịch vụ xét nghiệm DNA toàn diện, được phát triển nhằm cung cấp nền tảng trực tuyến cho việc đặt lịch, thanh toán và quản lý các dịch vụ xét nghiệm DNA. Hệ thống hỗ trợ người dùng dễ dàng tiếp cận các dịch vụ xét nghiệm di truyền, đồng thời cung cấp công cụ quản lý hiệu quả cho đội ngũ nhân viên và quản trị viên.

### 1.2 Mục tiêu
- Xây dựng nền tảng trực tuyến cho phép người dùng dễ dàng tìm hiểu và đặt lịch các dịch vụ xét nghiệm DNA
- Cung cấp hệ thống quản lý toàn diện cho việc theo dõi lịch hẹn, thanh toán và kết quả xét nghiệm
- Tạo giao diện quản trị cho phép theo dõi doanh thu, quản lý người dùng và dịch vụ
- Xây dựng nền tảng blog để chia sẻ thông tin về di truyền học và các dịch vụ xét nghiệm

### 1.3 Phạm vi
Hệ thống bao gồm các thành phần chính:
- Trang web dành cho người dùng cuối (đặt lịch, thanh toán, xem kết quả)
- Hệ thống quản trị (quản lý người dùng, dịch vụ, doanh thu)
- API backend kết nối với cơ sở dữ liệu
- Hệ thống thanh toán trực tuyến
- Nền tảng blog và quản lý nội dung

## 2. KIẾN TRÚC HỆ THỐNG

### 2.1 Sơ đồ kiến trúc
Hệ thống được xây dựng theo mô hình client-server với kiến trúc microservices:
- **Frontend:** React.js
- **Backend:** [Công nghệ backend]
- **Cơ sở dữ liệu:** [Loại CSDL]
- **Dịch vụ đám mây:** [Nếu có]

### 2.2 Cấu trúc thư mục
```
FrontEnd_DNAEasy/
  - src/
    - App.jsx                  # Component gốc của ứng dụng
    - component/               # Các component UI
      - page/                  # Các trang chính
        - AdminDashboard.jsx   # Dashboard quản trị
        - AdminRevenue.jsx     # Quản lý doanh thu
        - ServicePage.jsx      # Trang dịch vụ
        - ...
      - css/                   # Style sheets
      - image/                 # Hình ảnh
    - service/                 # Các service gọi API
      - api.js                 # Cấu hình API
      - payment.js             # Xử lý thanh toán
      - revenue.js             # Xử lý doanh thu
      - ...
```

## 3. CÁC CHỨC NĂNG CHÍNH

### 3.1 Quản lý người dùng
- Đăng ký, đăng nhập, quản lý thông tin cá nhân
- Phân quyền: Khách hàng, Nhân viên, Quản lý, Admin
- Quản lý hồ sơ người dùng

### 3.2 Quản lý dịch vụ
- Hiển thị danh sách dịch vụ xét nghiệm DNA
- Chi tiết dịch vụ: mô tả, giá cả, quy trình
- Quản lý dịch vụ (thêm, sửa, xóa)

### 3.3 Đặt lịch và thanh toán
- Đặt lịch xét nghiệm DNA
- Thanh toán trực tuyến
- Quản lý lịch hẹn (xem, hủy, đổi lịch)

### 3.4 Quản lý kết quả xét nghiệm
- Hiển thị kết quả xét nghiệm
- Thông báo khi có kết quả
- Lịch sử xét nghiệm

### 3.5 Quản lý doanh thu
- Thống kê doanh thu theo thời gian (ngày, tháng, năm)
- Biểu đồ doanh thu, chi phí
- Báo cáo tài chính

### 3.6 Blog và nội dung
- Quản lý bài viết
- Bình luận và phản hồi
- Chia sẻ thông tin về di truyền học

### 3.7 Tìm kiếm và thông báo
- Tìm kiếm dịch vụ, bài viết và nội dung
- Hệ thống thông báo cho người dùng
- Cập nhật trạng thái lịch hẹn và kết quả xét nghiệm

## 4. HƯỚNG DẪN SỬ DỤNG

### 4.1 Tổng quan
Nền tảng hỗ trợ các dịch vụ xét nghiệm DNA tại các cơ sở y tế, cung cấp các tính năng từ đặt dịch vụ đến giao kết quả. Người dùng có thể chọn thu thập mẫu tại nhà bằng bộ dụng cụ hoặc yêu cầu thu thập bởi nhân viên y tế. Hệ thống quản lý toàn bộ quy trình xét nghiệm, cho phép người dùng xem kết quả trực tuyến, và hỗ trợ cấu hình dịch vụ, giá cả, quản lý hồ sơ người dùng, đánh giá và phản hồi. Hệ thống bao gồm hai quy trình chính: một cho việc sử dụng bộ dụng cụ tại nhà và một cho việc thu thập mẫu tại cơ sở, đảm bảo trải nghiệm người dùng suôn sẻ và hiệu quả.

### 4.2 Hướng dẫn cho Khách

#### 4.2.1 Xem trang chủ
Chức năng này cho phép người dùng xem thông tin tổng quan về các dịch vụ xét nghiệm DNA và giới thiệu về công ty

- **Bước 1:** Mở dự án với Visual Studio
- **Bước 2:** Hệ thống sẽ chuyển hướng đến trang chủ

#### 4.2.2 Đăng ký
Chức năng này cho phép người dùng tạo tài khoản mới để sử dụng các dịch vụ đầy đủ của hệ thống

- **Bước 1:** Nhấp vào nút Đăng ký trên thanh header
- **Bước 2:** Điền thông tin và nhấp vào Đăng ký để tạo tài khoản hoặc Đăng ký bằng tài khoản Google

#### 4.2.3 Đăng nhập
Chức năng này cho phép người dùng truy cập vào tài khoản đã đăng ký để sử dụng các dịch vụ cá nhân

- **Bước 1:** Nhấp vào nút Đăng nhập trên thanh header
- **Bước 2:** Nhập tên người dùng và mật khẩu và nhấp vào Đăng nhập hoặc Đăng nhập bằng tài khoản Google

#### 4.2.4 Xem Blog
Chức năng này cho phép người dùng đọc các bài viết về xét nghiệm DNA và thông tin liên quan đến di truyền học

- **Bước 1:** Nhấp vào Blog trong menu điều hướng
- **Bước 2:** Duyệt các bài viết và nhấp vào bất kỳ bài viết nào để đọc chi tiết

#### 4.2.5 Xem dịch vụ
Chức năng này cho phép người dùng duyệt các dịch vụ xét nghiệm DNA có sẵn và tìm hiểu chi tiết về từng dịch vụ

- **Bước 1:** Nhấp vào Dịch vụ trong menu điều hướng
- **Bước 2:** Duyệt các dịch vụ có sẵn
- **Bước 3:** Nhấp vào một dịch vụ để xem chi tiết

#### 4.2.6 Tìm kiếm
Chức năng này cho phép người dùng tìm kiếm nhanh chóng các dịch vụ, bài viết blog và nội dung khác trên hệ thống

- **Bước 1:** Nhấp vào biểu tượng tìm kiếm trong thanh điều hướng
- **Bước 2:** Nhập từ khóa liên quan đến nội dung bạn đang tìm kiếm
- **Bước 3:** Nhấn Enter hoặc nhấp vào nút tìm kiếm
- **Bước 4:** Xem kết quả tìm kiếm được tổ chức theo danh mục (Dịch vụ, Blog, v.v.)
- **Bước 5:** Nhấp vào bất kỳ kết quả nào để điều hướng đến trang tương ứng

### 4.3 Hướng dẫn cho Khách hàng

#### 4.3.1 Quản lý thông tin cá nhân
Chức năng này cho phép khách hàng xem và cập nhật thông tin cá nhân của họ

**Xem thông tin cá nhân:**
1. Nhấp vào avatar
2. Chọn "Thông tin cá nhân"

**Chỉnh sửa thông tin:**
1. Nhấp "Chỉnh sửa"
2. Cập nhật thông tin
3. Nhấp "Lưu"

#### 4.3.2 Dịch vụ xét nghiệm DNA
Chức năng này cho phép khách hàng xem các dịch vụ xét nghiệm DNA có sẵn

**Xem danh sách dịch vụ:**
1. Nhấp "Dịch vụ" trên menu
2. Xem các dịch vụ có sẵn với tên, đánh giá và giá tiền

**Đặt dịch vụ và xem chi tiết:**
1. Nhấp "Book Now" trên dịch vụ mong muốn
2. Xem thông tin chi tiết về dịch vụ trong quá trình đặt lịch

#### 4.3.3 Đặt lịch và thanh toán
Chức năng này cho phép khách hàng đặt lịch và thanh toán cho dịch vụ xét nghiệm DNA

**Đặt lịch:**
1. Nhấp "Book Now"
2. Chọn ngày/giờ
3. Chọn phương thức thu mẫu
4. Xác nhận

**Thanh toán:**
1. Chọn phương thức thanh toán
2. Điền thông tin
3. Nhấp "Thanh toán"

#### 4.3.4 Quản lý lịch hẹn
Chức năng này cho phép khách hàng quản lý các lịch hẹn đã đặt

**Xem lịch hẹn sắp tới:**
1. Nhấp "Your Appointment"
2. Xem danh sách lịch hẹn

**Hủy/đổi lịch:**
1. Chọn lịch hẹn
2. Nhấp "Hủy" hoặc "Đổi lịch"
3. Xác nhận

**Xem lịch sử đặt lịch:**
1. Nhấp "History Booking"
2. Xem các lịch đặt trước đây

#### 4.3.5 Kết quả xét nghiệm
Chức năng này cho phép khách hàng xem kết quả xét nghiệm DNA của họ

**Xem kết quả:**
1. Từ "History Booking"
2. Tìm xét nghiệm hoàn thành
3. Nhấp "Xem kết quả"

#### 4.3.6 Tiện ích khác
Các chức năng bổ sung để nâng cao trải nghiệm người dùng

**Thông báo:**
1. Nhấp biểu tượng chuông
2. Xem danh sách thông báo

**Tìm kiếm:**
1. Nhấp biểu tượng tìm kiếm
2. Nhập từ khóa
3. Xem kết quả

**Blog:**
1. Nhấp "Blog"
2. Xem danh sách bài viết
3. Nhấp vào bài để đọc chi tiết

**Đăng xuất:**
1. Nhấp vào avatar
2. Chọn "Đăng xuất"

### 4.4 Hướng dẫn cho Nhân viên

#### 4.4.1 Quản lý lịch hẹn
Chức năng này cho phép nhân viên theo dõi và cập nhật trạng thái lịch hẹn của khách hàng trong quy trình xét nghiệm

- **Bước 1:** Đăng nhập với thông tin đăng nhập của nhân viên
- **Bước 2:** Điều hướng đến phần "Lịch hẹn"
- **Bước 3:** Xem các lịch hẹn sắp tới
- **Bước 4:** Cập nhật trạng thái lịch hẹn (đã xác nhận, đang xử lý, đã hoàn thành)

#### 4.4.2 Xử lý mẫu
Chức năng này cho phép nhân viên theo dõi và cập nhật tiến trình xử lý mẫu xét nghiệm DNA

- **Bước 1:** Đăng nhập với thông tin đăng nhập của nhân viên
- **Bước 2:** Điều hướng đến phần "Xử lý mẫu"
- **Bước 3:** Cập nhật trạng thái mẫu (đã nhận, đang xét nghiệm, đã hoàn thành)
- **Bước 4:** Tải lên kết quả xét nghiệm khi có sẵn

#### 4.4.3 Quản lý kết quả xét nghiệm
Chức năng này cho phép nhân viên tải lên, quản lý và gửi kết quả xét nghiệm DNA cho khách hàng

- **Bước 1:** Đăng nhập với thông tin đăng nhập của nhân viên
- **Bước 2:** Điều hướng đến phần "Kết quả xét nghiệm"
- **Bước 3:** Tải lên kết quả xét nghiệm mới
- **Bước 4:** Thông báo cho khách hàng khi kết quả đã sẵn sàng

### 4.5 Hướng dẫn cho Admin

#### 4.5.1 Tổng quan Dashboard
Chức năng này cung cấp cho quản trị viên cái nhìn tổng quan về hiệu suất hệ thống, số liệu thống kê và các chỉ số quan trọng

- **Bước 1:** Đăng nhập với thông tin đăng nhập của quản trị viên
- **Bước 2:** Xem bảng điều khiển với các số liệu chính (lịch hẹn, doanh thu, người dùng)
- **Bước 3:** Truy cập báo cáo chi tiết và phân tích

#### 4.5.2 Quản lý người dùng
Chức năng này cho phép quản trị viên quản lý tất cả tài khoản người dùng, phân quyền và giám sát hoạt động

- **Bước 1:** Đăng nhập với thông tin đăng nhập của quản trị viên
- **Bước 2:** Điều hướng đến phần "Quản lý người dùng"
- **Bước 3:** Xem, thêm, chỉnh sửa hoặc vô hiệu hóa tài khoản người dùng
- **Bước 4:** Gán vai trò người dùng (khách hàng, nhân viên, quản trị viên)

#### 4.5.3 Quản lý dịch vụ
Chức năng này cho phép quản trị viên tạo, cập nhật và quản lý danh mục dịch vụ xét nghiệm DNA trên hệ thống

- **Bước 1:** Đăng nhập với thông tin đăng nhập của quản trị viên
- **Bước 2:** Điều hướng đến phần "Quản lý dịch vụ"
- **Bước 3:** Xem, thêm, chỉnh sửa hoặc vô hiệu hóa dịch vụ
- **Bước 4:** Cập nhật giá dịch vụ và mô tả

#### 4.5.4 Quản lý doanh thu
Chức năng này cho phép quản trị viên theo dõi, phân tích và báo cáo doanh thu từ các dịch vụ xét nghiệm DNA

- **Bước 1:** Đăng nhập với thông tin đăng nhập của quản trị viên
- **Bước 2:** Điều hướng đến phần "Doanh thu"
- **Bước 3:** Xem báo cáo doanh thu (hàng ngày, hàng tháng, hàng năm)
- **Bước 4:** Phân tích doanh thu theo loại dịch vụ và phương thức thanh toán

#### 4.5.5 Quản lý Blog
Chức năng này cho phép quản trị viên tạo, chỉnh sửa và quản lý nội dung blog để cung cấp thông tin về xét nghiệm DNA

- **Bước 1:** Đăng nhập với thông tin đăng nhập của quản trị viên
- **Bước 2:** Điều hướng đến phần "Quản lý Blog"
- **Bước 3:** Tạo, chỉnh sửa hoặc xóa bài đăng blog
- **Bước 4:** Kiểm duyệt bình luận của người dùng

#### 4.5.6 Quản lý bình luận
Chức năng này cho phép quản trị viên giám sát và kiểm duyệt bình luận của người dùng để đảm bảo nội dung phù hợp

- **Bước 1:** Đăng nhập với thông tin đăng nhập của quản trị viên
- **Bước 2:** Điều hướng đến phần "Quản lý bình luận"
- **Bước 3:** Xem tất cả các bình luận trên nền tảng
- **Bước 4:** Phê duyệt, chỉnh sửa hoặc xóa bình luận

#### 4.5.7 Phân công nhân viên
Chức năng này cho phép quản trị viên phân công nhân viên phù hợp cho các lịch hẹn xét nghiệm DNA

- **Bước 1:** Đăng nhập với thông tin đăng nhập của quản trị viên
- **Bước 2:** Điều hướng đến phần "Lịch hẹn"
- **Bước 3:** Chọn một lịch hẹn cần phân công nhân viên
- **Bước 4:** Chọn nhân viên có sẵn và xác nhận phân công

## 5. CÔNG NGHỆ SỬ DỤNG

### 5.1 Frontend
- **Framework:** React.js
- **Thư viện UI:** Bootstrap, Recharts (biểu đồ)
- **Quản lý state:** [Công cụ quản lý state]
- **Router:** React Router

### 5.2 Backend
- **Framework:** [Framework backend]
- **API:** RESTful API
- **Authentication:** JWT

### 5.3 Cơ sở dữ liệu
- **Loại CSDL:** [Loại CSDL]
- **ORM:** [Nếu có]

### 5.4 DevOps
- **Version Control:** Git
- **CI/CD:** [Công cụ CI/CD nếu có]
- **Hosting:** [Dịch vụ hosting]

## 6. HƯỚNG DẪN TRIỂN KHAI

### 6.1 Yêu cầu hệ thống
- Node.js phiên bản 16.x trở lên
- [Các yêu cầu khác]

### 6.2 Cài đặt
```bash
# Clone repository
git clone [repository_url]

# Di chuyển vào thư mục dự án
cd FrontEnd_DNAEasy

# Cài đặt dependencies
npm install

# Khởi chạy ứng dụng
npm run dev
```

### 6.3 Cấu hình
- Cấu hình API endpoint trong file `src/service/api.js`
- Cấu hình môi trường trong file `.env`

## 7. KẾT QUẢ KIỂM THỬ

### 7.1 Kiểm thử đơn vị
- Tỷ lệ bao phủ: [%]
- Công cụ kiểm thử: [Công cụ]
- Kết quả: [Tóm tắt kết quả]

### 7.2 Kiểm thử tích hợp
- Phương pháp: [Phương pháp]
- Kết quả: [Tóm tắt kết quả]

### 7.3 Kiểm thử người dùng
- Số lượng người tham gia: [Số lượng]
- Phản hồi chính: [Tóm tắt phản hồi]

## 8. ĐÁNH GIÁ HIỆU NĂNG

### 8.1 Thời gian phản hồi
- Trang chủ: [ms]
- Trang dịch vụ: [ms]
- Trang thanh toán: [ms]

### 8.2 Tải trọng
- Số lượng người dùng đồng thời: [Số lượng]
- Thời gian phản hồi trung bình: [ms]

### 8.3 Tối ưu hóa
- Kích thước bundle: [KB]
- Điểm Lighthouse: [Điểm]

## 9. BẢO MẬT

### 9.1 Xác thực và phân quyền
- JWT Authentication
- Role-based Access Control

### 9.2 Bảo vệ dữ liệu
- Mã hóa dữ liệu nhạy cảm
- HTTPS

### 9.3 Kiểm tra bảo mật
- Công cụ kiểm tra: [Công cụ]
- Kết quả: [Tóm tắt kết quả]

## 10. KẾ HOẠCH BẢO TRÌ

### 10.1 Cập nhật định kỳ
- Tần suất cập nhật: [Tần suất]
- Quy trình cập nhật: [Quy trình]

### 10.2 Hỗ trợ kỹ thuật
- Kênh hỗ trợ: [Kênh]
- Thời gian phản hồi: [Thời gian]

### 10.3 Kế hoạch phát triển
- Tính năng sắp tới: [Danh sách tính năng]
- Lộ trình phát triển: [Lộ trình]

## 11. TÀI LIỆU THAM KHẢO

- [Danh sách tài liệu tham khảo] 