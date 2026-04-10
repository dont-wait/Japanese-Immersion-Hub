# Japanese Immersion Hub - Client

Võ đường Ngôn ngữ Hiện đại (Modern Language Dojo). Một hệ thống học tiếng Nhật đắm mình (Immersion) với giao diện được thiết kế theo phong cách Zen-Modern, Zine-inspired và Persona 5.

## ⛩️ Giới thiệu sản phẩm

Ứng dụng giúp người học đắm mình vào ngôn ngữ thông qua:
- **Hệ thống SRS chuyên sâu:** Tối ưu hóa việc ghi nhớ từ vựng.
- **Dashboard Zen:** Bento-grid layout trực quan, theo dõi Streak và XP hàng ngày.
- **Design Persona 5:** Trang chủ bùng nổ cảm hứng game.
- **Võ đường hiện đại:** Không gian học tập tập trung và thẩm mỹ cao.

## 🚀 Hướng dẫn chạy thử (Local Development)

### 1. Yêu cầu hệ thống
- **Node.js** (v18 trở lên)
- **npm** hoặc **pnpm**

### 2. Cài đặt và cấu hình
Di chuyển vào thư mục `client`:
```bash
cd client
```

Cài đặt các thư viện cần thiết:
```bash
npm install
```

Tạo file `.env` dựa trên bản mẫu (nếu cần cấu hình API Endpoint):
```bash
cp .env.example .env
```

### 3. Chạy ứng dụng
Khởi động development server:
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 🛠️ Công nghệ sử dụng

- **React 19 (+ Vite):** Runtime cực nhanh.
- **Tailwind CSS v4:** Styling hiện đại kết hợp design system tùy biến.
- **React Router v7:** Điều hướng mượt mà giữa các "vùng" võ đường.
- **AuthContext:** Quản lý trạng thái đăng nhập, hỗ trợ cả đăng nhập **Guest (Dùng thử)**.
- **Material Symbols:** Hệ thống icon Google tối giản.

## 📂 Cấu trúc thư mục

- `src/pages/auth`: Các trang Đăng ký, Đăng nhập, Quên mật khẩu.
- `src/pages/learner`: Dashboard và các vùng học tập cho người học.
- `src/components/layout`: Layout tổng thể (Topbar, Sidebar, BottomNav).
- `src/contexts`: Quản lý Global State (Auth, Theme).

---
*Chế tác với tinh thần Zen bởi IMMERSION HUB Team.*
