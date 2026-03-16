# Trip Nest - Nền Tảng Đặt Tour Du Lịch Toàn Diện

Trip Nest là một nền tảng quản lý và đặt tour du lịch hiện đại, được xây dựng dựa trên Next.js (App Router). Hệ thống cung cấp trải nghiệm trơn tru từ việc tìm kiếm, khám phá các điểm đến, đặt vé cho đến quản lý thông tin tài khoản người dùng và hệ thống quản trị (Admin Dashboard) mạnh mẽ.

## Mô tả tổng quan (Project Overview)

Trip Nest hướng tới việc mang lại một giao diện người dùng (UI) tối giản, hiện đại (Flat Design) và tối ưu hóa trải nghiệm người dùng (UX). Gần đây, hệ thống đã được nâng cấp mạnh mẽ về mặt kiến trúc:
- **Tối ưu hóa SEO & Hiệu suất**: Các trang trọng yếu như Trang chủ, Danh sách Tour (`/tour`), và Chi tiết Tour (`/tour/[id]`) đã được chuyển đổi sang lấy dữ liệu từ phía máy chủ (Server-Side Fetching). Điều này giúp trang tải nhanh hơn và công cụ tìm kiếm dễ dàng thu thập dữ liệu.
- **Quản lý linh hoạt rải rác các phiên khởi hành (Tour Sessions)**: Hiển thị thời gian thực các phiên khởi hành sắp tới, số lượng chỗ còn trống và hỗ trợ giá khuyến mãi.
- **Hệ thống xác thực bảo mật**: Quản lý đăng nhập/đăng ký thông qua JWT token (lưu trữ trong HTTP-only cookies) và đã tích hợp đăng nhập Google.
- **Trải nghiệm tìm kiếm thông minh**: Tìm kiếm tour theo điểm đi, điểm đến, và ngày khởi hành với cơ chế SWR caching để đảm bảo dữ liệu luôn mới mà không làm chậm giao diện.

## Các Tính Năng Chính (Features)

### Dành cho Khách Hàng (Customer Portal)
- Khám phá các tour phổ biến, tour trong nước, quốc tế và các ưu đãi đặc biệt.
- Lọc và tìm kiếm tour nâng cao (theo giá, loại hình, địa điểm, v.v.).
- Xem chi tiết tour bao gồm lịch trình, thư viện ảnh (gallery), dịch vụ bao gồm/không bao gồm.
- Đặt vé dựa trên các phiên khởi hành có sẵn (Tour Sessions).
- Quản lý hồ sơ cá nhân, danh sách tour yêu thích và lịch sử đặt chỗ.

### Dành cho Quản Trị Viên (Admin Dashboard)
- Quản lý người dùng và phân quyền.
- Quản lý danh sách tour du lịch, thư viện ảnh và thông tin chi tiết.
- Quản lý lịch khởi hành (Tour Sessions), lịch trình, số lượng vé và giá cả theo từng thời điểm.
- Quản lý các đơn đặt tour (Bookings).

## Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: Next.js 16 (App Router), React 19
- **Ngôn ngữ**: TypeScript
- **State Management**: Redux Toolkit & React-Redux (kết hợp SWR cho data fetching)
- **UI/Styling**: Tailwind CSS, Shadcn UI, Lucide React (Icons)
- **API Communication**: Axios (với interceptors để xử lý Refresh Token)
- **Authentication**: JWT (JSON Web Tokens) qua cookie.

## Hướng Dẫn Cài Đặt (Getting Started)

1. **Cài đặt thư viện:**
   ```bash
   npm install
   # hoặc
   yarn install
   ```

2. **Cấu hình biến môi trường:**
   Tạo file `.env` ở thư mục gốc của dự án với nội dung tham khảo sau:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   ```

3. **Chạy server phát triển (Development):**
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt và truy cập `http://localhost:3000`.

## Cấu Trúc Thư Mục (Project Structure)

- `app/` — Nơi chứa các pages, layouts và routing của Next.js App Router.
- `components/` — Nơi chứa các UI component có thể tái sử dụng, chia theo từng tính năng (`home/`, `tour/`, `admin/`, `auth/`...).
- `services/` & `lib/` — Chứa các hàm giao tiếp API (Axios client, Server Fetch) và các logic tiện ích.
- `types/` — Định nghĩa các interface/type của TypeScript giúp đảm bảo tính chặt chẽ của dữ liệu.
- `data/` — Dữ liệu tĩnh (mock data, cấu hình navigation).

## Triển Khai (Deployment)

Build dự án để tối ưu hóa production:

```bash
npm run build
npm run start
```
