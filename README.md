# 🎓 Thiệp Mời Lễ Tốt Nghiệp - Huyền Linh

## 📁 Cấu trúc dự án

```
ThiepTotNghiep/
├── index.html          ← Trang thiệp mời chính
├── admin.html          ← Trang quản trị (dashboard)
├── style.css           ← Stylesheet chính
├── script.js           ← Logic chính + Firebase
├── README.md           ← File này
└── assets/
    ├── avatar.jpg      ← ★ THAY BẰNG ẢNH CỦA BẠN ★
    ├── envelope_bg.jpg ← Ảnh phong bì
    ├── gold_frame.jpg  ← Khung ảnh trang trí
    └── graduation_decor.jpg ← Ảnh trang trí nền
```

---

## 🔥 Hướng dẫn cấu hình Firebase (Bắt buộc)

### Bước 1: Tạo dự án Firebase

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Nhấn **"Add project"** (Thêm dự án)
3. Đặt tên dự án, ví dụ: `thiep-tot-nghiep`
4. Có thể tắt Google Analytics nếu không cần → Nhấn **"Create project"**

### Bước 2: Tạo Web App

1. Trong trang dự án, nhấn biểu tượng **</>** (Web) để thêm ứng dụng web
2. Đặt tên app, ví dụ: `graduation-invitation`
3. **Không cần** tick "Firebase Hosting" (trừ khi bạn muốn host trên Firebase)
4. Nhấn **"Register app"**
5. Bạn sẽ thấy đoạn mã `firebaseConfig` — **Copy lại toàn bộ**

### Bước 3: Dán Firebase Config

Mở 2 file và thay thế phần `firebaseConfig`:

**📄 `script.js` (dòng 7-14):**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",           // ← Dán API Key của bạn
    authDomain: "xxx.firebaseapp.com",
    projectId: "xxx",
    storageBucket: "xxx.appspot.com",
    messagingSenderId: "123...",
    appId: "1:123...:web:abc..."
};
```

**📄 `admin.html` (trong thẻ `<script>`, tìm `firebaseConfig`):**
```javascript
// Dán cùng nội dung firebaseConfig như trên
```

### Bước 4: Tạo Firestore Database

1. Trong Firebase Console → **Build** → **Firestore Database**
2. Nhấn **"Create database"**
3. Chọn **location** gần bạn (ví dụ: `asia-southeast1` cho Việt Nam)
4. Chọn **"Start in test mode"** (chế độ test)
5. Nhấn **"Create"**

### Bước 5: Cấu hình Security Rules

Vào **Firestore** → Tab **"Rules"** → Thay bằng:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvp/{document=**} {
      // Cho phép đọc và ghi từ mọi người (phù hợp cho thiệp mời)
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **Lưu ý**: Rules này cho phép mọi người đọc/ghi. Phù hợp cho mục đích thiệp mời. Sau sự kiện, hãy đổi lại thành `allow read, write: if false;` để khóa database.

---

## 🖼️ Thay ảnh đại diện

Đặt ảnh của bạn vào thư mục `assets/` với tên **`avatar.jpg`**.

Ảnh nên:
- Có tỉ lệ **1:1** (vuông) hoặc gần vuông
- Kích thước tối thiểu **400x400px**
- Nền đơn giản sẽ đẹp hơn (vì ảnh sẽ được bo tròn)

---

## 🔐 Truy cập Admin

### Cách 1: Từ trang thiệp (index.html)
- Click **3 lần** vào **góc phải dưới** cùng của trang
- Nhập mật khẩu: `admin2026`

### Cách 2: Trực tiếp
- Mở `admin.html` trong trình duyệt
- Nhập mật khẩu: `admin2026`

### Đổi mật khẩu
Tìm và sửa trong cả 2 file:
- `script.js` → `const ADMIN_PASSWORD = "admin2026";`
- `admin.html` → `const ADMIN_PASSWORD = "admin2026";`

---

## 🌐 Deploy (Đưa lên mạng)

### Cách 1: Firebase Hosting (Miễn phí)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting    # Chọn thư mục "." là public
firebase deploy
```

### Cách 2: GitHub Pages (Miễn phí)
1. Push code lên GitHub
2. Vào Settings → Pages → Chọn branch `main`
3. Trang sẽ có link dạng: `https://username.github.io/repo-name`

### Cách 3: Netlify / Vercel (Miễn phí)
1. Kéo thả thư mục dự án vào [Netlify Drop](https://app.netlify.com/drop)
2. Trang sẽ được deploy ngay lập tức

---

## ✨ Tính năng

- ✅ Animation phong bì mở thiệp
- ✅ Hiệu ứng confetti khi mở
- ✅ Đếm ngược tới ngày sự kiện
- ✅ Particles nổi nền vàng gold
- ✅ Scroll animations mượt
- ✅ Form RSVP xác nhận tham dự
- ✅ Gửi dữ liệu lên Firebase Firestore
- ✅ Admin dashboard xem thống kê
- ✅ Xuất danh sách CSV
- ✅ Responsive (Mobile + Desktop)
- ✅ Dark luxury theme
- ✅ SEO optimized

---

## 📱 Liên hệ

**Huyền Linh** — 0972 555 178
