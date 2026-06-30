# Hướng Dẫn Cấu Hình Firebase & Deploy Website Lên GitHub Pages

Tài liệu này hướng dẫn chi tiết cách kết nối cơ sở dữ liệu Firebase (Firestore + Authentication) và cách đưa trang web Aquatica lên chạy trực tuyến miễn phí trên GitHub Pages.

---

## PHẦN 1: CẤU HÌNH HỆ THỐNG BACKEND FIREBASE

Website đã được tích hợp sẵn cơ chế **Giả lập cục bộ (Offline Mode)**, nghĩa là bạn có thể mở trực tiếp các file và sử dụng đầy đủ tính năng giỏ hàng, đặt hàng, quản trị CRUD sản phẩm ngay lập tức mà không cần kết nối mạng. 

Để đưa trang web hoạt động trực tuyến thực tế với cơ sở dữ liệu dùng chung, hãy làm theo các bước sau:

### Bước 1: Tạo Dự Án Trên Firebase Console
1. Truy cập vào [Firebase Console](https://console.firebase.google.com/) và đăng nhập bằng tài khoản Google của bạn.
2. Nhấn vào **Add Project** (Thêm dự án).
3. Đặt tên dự án là `Aquatica-FishShop` (hoặc tên tùy chọn), nhấn **Continue** (Tiếp tục).
4. (Tùy chọn) Tắt Google Analytics để tạo nhanh hơn, sau đó nhấn **Create Project** (Tạo dự án).

### Bước 2: Kích Hoạt Cơ Sở Dữ Liệu Firestore (Lưu trữ sản phẩm và đơn hàng)
1. Ở menu bên trái Firebase Console, chọn **Build** (Xây dựng) -> **Firestore Database**.
2. Nhấn vào nút **Create Database** (Tạo cơ sở dữ liệu).
3. Chọn vị trí đặt server gần Việt Nam nhất (ví dụ: `asia-southeast1` ở Singapore), nhấn **Next**.
4. Chọn **Start in test mode** (Bắt đầu ở chế độ thử nghiệm) để hệ thống cho phép đọc/ghi dữ liệu ngay lập tức mà không chặn quyền.
5. Nhấn **Create** (Tạo) và chờ hệ thống thiết lập.
6. **Lưu ý về Bảo mật (Security Rules)**: Sau khi tạo, hãy chọn tab **Rules** trên cùng của Firestore. Để website hoạt động lâu dài không bị Firebase khóa quyền sau 30 ngày thử nghiệm, hãy chỉnh sửa luật đọc/ghi như sau rồi nhấn **Publish**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

### Bước 3: Kích Hoạt Đăng Nhập Firebase Authentication (Google & Facebook)
1. Chọn **Build** -> **Authentication** ở menu trái, sau đó nhấn **Get Started**.
2. Chọn tab **Sign-in method** (Phương thức đăng nhập).
3. **Đăng nhập Google**:
   - Chọn nhà cung cấp **Google**, gạt nút **Enable** (Kích hoạt).
   - Điền email hỗ trợ dự án và nhấn **Save**.
4. **Đăng nhập Facebook** (Tùy chọn):
   - Chọn nhà cung cấp **Facebook**, gạt nút **Enable**.
   - Bạn cần điền *App ID* và *App Secret* lấy từ trang đăng ký nhà phát triển [Meta for Developers](https://developers.facebook.com/). Nếu chỉ cần kiểm tra nhanh, bạn chỉ cần kích hoạt Google là đủ.

### Bước 4: Lấy Thông Tin Cấu Hình Nhập Vào Website
1. Nhấp vào biểu tượng hình bánh răng ở góc trên bên trái menu (Project settings).
2. Tại tab **General**, cuộn xuống phần **Your apps** và nhấp vào biểu tượng Web `</>` (dấu lớn dấu bé).
3. Đăng ký tên ứng dụng (ví dụ: `aquatica-web`), sau đó nhấn **Register app**.
4. Firebase sẽ hiển thị đoạn mã cấu hình. Tìm đối tượng `const firebaseConfig = { ... }`.
5. Hãy sao chép nội dung cấu hình này và dán đè vào file `firebase-db-config.js` trong thư mục code của bạn:
   ```javascript
   const firebaseConfig = {
     apiKey: "MÃ_API_KEY_CỦA_BẠN",
     authDomain: "TÊN_MIỀN_AUTH.firebaseapp.com",
     projectId: "ID_DỰ_ÁN_CỦA_BẠN",
     storageBucket: "TÊN_MIỀN_STORAGE.appspot.com",
     messagingSenderId: "MÃ_SENDER_ID",
     appId: "MÃ_APP_ID"
   };
   ```
6. Lưu file lại. Bây giờ, khi mở trang `index.html` lên, bạn sẽ thấy thông báo màu xanh lá cây: **"Đang kết nối trực tiếp với Database Firebase"**.
7. Lần đầu tiên chạy chế độ Firebase Online, hệ thống sẽ tự động tạo và tải lên các sản phẩm cá cảnh mẫu vào cơ sở dữ liệu Firestore của bạn.

---

## PHẦN 2: DEPLOY WEBSITE LÊN GITHUB PAGES (Chạy online miễn phí)

GitHub Pages cho phép bạn host website tĩnh (HTML/CSS/JS) hoàn toàn miễn phí.

### Bước 1: Chuẩn Bị Tài Khoản GitHub & Công Cụ Git
1. Đăng ký tài khoản trên [GitHub](https://github.com/) nếu chưa có.
2. Tải và cài đặt phần mềm quản lý mã nguồn [Git](https://git-scm.com/) cho máy tính của bạn.

### Bước 2: Tạo Kho Chứa (Repository) Mới Trên GitHub
1. Sau khi đăng nhập vào GitHub, nhấn vào nút **New** (ở cột bên trái hoặc menu dấu cộng góc trên bên phải) để tạo repo mới.
2. Đặt tên Repo là `cacanh` hoặc `aquatica`.
3. Chọn trạng thái **Public** (Công khai - Bắt buộc để dùng được GitHub Pages miễn phí).
4. Các phần khác để mặc định, nhấn **Create repository**.

### Bước 3: Đẩy Code Lên GitHub
Mở phần mềm **Git Bash** hoặc **PowerShell** trong thư mục dự án của bạn (`c:\Users\hoang\OneDrive\Desktop\cacanh`) và chạy lần lượt các lệnh sau:

```bash
# Khởi tạo Git trong thư mục dự án
git init

# Thêm tất cả các file dự án vào danh sách chuẩn bị commit
git add .

# Tạo commit đầu tiên
git commit -m "Initial commit for Aquatica shop"

# Đặt tên nhánh chính là main
git branch -M main

# Liên kết với kho chứa trên GitHub (Thay URL bằng link Repository của bạn)
git remote add origin https://github.com/TÊN_TÀI_KHOẢN_GITHUB_CỦA_BẠN/TÊN_REPO_CỦA_BẠN.git

# Đẩy code lên GitHub
git push -u origin main
```

### Bước 4: Kích Hoạt GitHub Pages
1. Truy cập vào Repository của bạn trên website GitHub.
2. Chọn tab **Settings** (Cấu hình) ở menu ngang phía trên.
3. Cuộn xuống và chọn mục **Pages** ở cột menu bên trái.
4. Tại mục **Build and deployment** -> **Branch**, chọn nhánh là `main` và thư mục là `/ (root)`.
5. Nhấn nút **Save**.
6. Chờ khoảng 1 - 2 phút, GitHub sẽ xử lý và cung cấp cho bạn một đường dẫn chạy website trực tuyến ở đầu trang. Đường dẫn sẽ có dạng: 
   `https://TÊN_TÀI_KHOẢN.github.io/TÊN_REPO/`

---

## THÔNG TIN TÀI KHOẢN QUẢN TRỊ TRANG ADMIN

Bạn có thể quản lý sản phẩm và đơn hàng thông qua trang quản trị bằng cách truy cập file `admin.html` (hoặc nhấn vào liên kết "Trang Admin" ở thanh menu trên đầu website):

* **Tên đăng nhập**: `admin`
* **Mật khẩu**: `admin1234`

### Các chức năng nổi bật trong trang Admin:
- **Duyệt đơn hàng**: Khi khách vãng lai hoặc khách đăng nhập đặt hàng, thông tin lập tức cập nhật vào bảng đơn hàng. Bạn có thể nhấn **Duyệt** hoặc **Hủy**.
- **Tự động hoàn trả kho**: Nếu bạn chọn **Hủy** đơn hàng, hệ thống thông minh sẽ tự động cộng ngược số lượng sản phẩm của đơn hàng đó vào kho để người khác có thể đặt mua tiếp.
- **Quản lý Sản phẩm (CRUD)**:
  - Nút **+ Thêm Sản Phẩm Mới** hiển thị popup để nhập tên, giá, số lượng, mô tả sản phẩm.
  - Nút **Chỉnh sửa** hình bút chì giúp sửa đổi thông số sản phẩm đang có.
  - Nút **Xóa** hình thùng rác để gỡ bỏ sản phẩm khỏi cửa hàng.
