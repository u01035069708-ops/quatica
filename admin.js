// admin.js
// Logic trang quản trị viên cho Aquatica

let db = null;
let currentProducts = [];
let currentOrders = [];

// Khởi động trang quản trị
document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuth();
});

// ----------------------------------------------------
// KIỂM TRA ĐĂNG NHẬP ADMIN
// ----------------------------------------------------
function checkAdminAuth() {
  const isLoggedIn = sessionStorage.getItem("aquatica_admin_logged_in") === "true";
  const loginWrapper = document.getElementById("admin-login-wrapper");
  const dashboardWrapper = document.getElementById("admin-dashboard-wrapper");
  
  if (isLoggedIn) {
    if (loginWrapper) loginWrapper.style.display = "none";
    if (dashboardWrapper) dashboardWrapper.style.display = "flex";
    
    initFirebaseAdmin();
    loadAdminData();
  } else {
    if (loginWrapper) loginWrapper.style.display = "flex";
    if (dashboardWrapper) dashboardWrapper.style.display = "none";
  }
}

window.handleAdminLogin = function(e) {
  e.preventDefault();
  const user = document.getElementById("admin-username").value.trim();
  const pass = document.getElementById("admin-password").value.trim();
  
  if (user === "admin" && pass === "admin1234") {
    sessionStorage.setItem("aquatica_admin_logged_in", "true");
    showToast("Đăng nhập quyền Admin thành công!", "success");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    showToast("Sai tài khoản hoặc mật khẩu quản trị!", "error");
  }
};

window.handleAdminLogout = function() {
  sessionStorage.removeItem("aquatica_admin_logged_in");
  showToast("Đã đăng xuất quyền quản trị.");
  setTimeout(() => {
    window.location.reload();
  }, 800);
};

// ----------------------------------------------------
// KHỞI TẠO FIREBASE CHO ADMIN
// ----------------------------------------------------
function initFirebaseAdmin() {
  const indicator = document.getElementById("admin-orders-indicator");
  
  if (window.isFirebaseConfigured) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(window.firebaseConfig);
      }
      db = firebase.firestore();
      console.log("Firebase Admin initialized.");
      if (indicator) {
        indicator.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
        indicator.style.color = "var(--success)";
        indicator.innerHTML = `<i class="fa-solid fa-cloud"></i> Firebase Online`;
      }
    } catch (e) {
      console.error(e);
      setupLocalIndicator();
    }
  } else {
    setupLocalIndicator();
  }
}

function setupLocalIndicator() {
  const indicator = document.getElementById("admin-orders-indicator");
  if (indicator) {
    indicator.style.backgroundColor = "rgba(245, 158, 11, 0.12)";
    indicator.style.color = "var(--warning)";
    indicator.innerHTML = `<i class="fa-solid fa-server"></i> Offline Mode (Đọc/Ghi cục bộ)`;
  }
}

// ----------------------------------------------------
// TẢI VÀ ĐỒNG BỘ DỮ LIỆU (REAL-TIME NẾU CÓ FIREBASE)
// ----------------------------------------------------
function loadAdminData() {
  if (window.isFirebaseConfigured && db) {
    // 1. Lắng nghe sản phẩm trên Firebase
    db.collection("products").onSnapshot((snapshot) => {
      currentProducts = [];
      snapshot.forEach((doc) => {
        currentProducts.push({ id: doc.id, ...doc.data() });
      });
      renderAdminProducts();
    }, (error) => {
      console.error(error);
      loadAdminProductsLocal();
    });
    
    // 2. Lắng nghe đơn hàng trên Firebase
    db.collection("orders").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      currentOrders = [];
      snapshot.forEach((doc) => {
        currentOrders.push({ id: doc.id, ...doc.data() });
      });
      renderAdminOrders();
      calculateKPIs();
    }, (error) => {
      console.error(error);
      loadAdminOrdersLocal();
    });
  } else {
    // Chế độ Offline
    loadAdminProductsLocal();
    loadAdminOrdersLocal();
  }
}

function loadAdminProductsLocal() {
  const localProds = localStorage.getItem("aquatica_products");
  currentProducts = localProds ? JSON.parse(localProds) : [];
  renderAdminProducts();
}

function loadAdminOrdersLocal() {
  const localOrders = localStorage.getItem("aquatica_orders");
  currentOrders = localOrders ? JSON.parse(localOrders) : [];
  // Sắp xếp đơn mới lên đầu
  currentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  renderAdminOrders();
  calculateKPIs();
}

// ----------------------------------------------------
// CHUYỂN ĐỔI TAB GIAO DIỆN
// ----------------------------------------------------
window.switchTab = function(tabId, element) {
  // Bỏ active của menu link
  const links = document.querySelectorAll(".admin-menu-link");
  links.forEach(l => l.classList.remove("active"));
  element.classList.add("active");
  
  // Ẩn tất cả section
  const sections = document.querySelectorAll(".admin-section");
  sections.forEach(s => s.classList.remove("active"));
  
  // Hiển thị section mong muốn
  document.getElementById(`tab-${tabId}`).classList.add("active");
};

// ----------------------------------------------------
// HIỂN THỊ DANH SÁCH ĐƠN HÀNG & THỐNG KÊ (KPI)
// ----------------------------------------------------
function calculateKPIs() {
  const totalSpan = document.getElementById("stat-total-orders");
  const pendingSpan = document.getElementById("stat-pending-orders");
  const revenueSpan = document.getElementById("stat-revenue");
  
  if (!totalSpan || !pendingSpan || !revenueSpan) return;
  
  const total = currentOrders.length;
  const pending = currentOrders.filter(o => o.status === "pending").length;
  
  // Tính tổng tiền các đơn đã chấp nhận (completed)
  const revenue = currentOrders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + o.totalPrice, 0);
  
  totalSpan.textContent = total;
  pendingSpan.textContent = pending;
  revenueSpan.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(revenue);
}

function renderAdminOrders() {
  const tbody = document.getElementById("admin-orders-tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  
  if (currentOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">Chưa có đơn hàng nào được ghi nhận.</td></tr>`;
    return;
  }
  
  currentOrders.forEach(order => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice);
    
    // Status pill
    let statusPillClass = "pending";
    let statusText = "Chờ xử lý";
    if (order.status === "completed") {
      statusPillClass = "completed";
      statusText = "Đã duyệt";
    } else if (order.status === "cancelled") {
      statusPillClass = "cancelled";
      statusText = "Đã hủy";
    }
    
    // Danh sách sản phẩm mua
    let itemsHTML = "<ul class='order-items-list'>";
    order.items.forEach(it => {
      itemsHTML += `<li>${it.name} &times; <strong>${it.qty}</strong></li>`;
    });
    itemsHTML += "</ul>";
    
    const formattedDate = new Date(order.createdAt).toLocaleString('vi-VN');

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong style="color: var(--primary); font-size: 13px;">${order.id.substring(0, 8)}</strong><br>
        <span style="font-size: 11px; color: var(--text-muted);">${formattedDate}</span>
      </td>
      <td>
        <strong>${order.customerName}</strong><br>
        <span style="font-size: 12px; color: var(--text-muted);"><i class="fa-solid fa-phone"></i> ${order.customerPhone}</span><br>
        <span style="font-size: 12px; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${order.customerAddress}</span>
      </td>
      <td>${itemsHTML}</td>
      <td><strong style="color: var(--primary);">${formattedPrice}</strong></td>
      <td><span class="status-pill ${statusPillClass}">${statusText}</span></td>
      <td>
        <div class="action-btn-group">
          ${order.status === 'pending' ? `
            <button class="btn btn-success" onclick="processOrder('${order.id}', 'approve')" title="Chấp nhận đơn hàng">
              <i class="fa-solid fa-check"></i> Duyệt
            </button>
            <button class="btn btn-danger" onclick="processOrder('${order.id}', 'cancel')" title="Hủy bỏ đơn hàng">
              <i class="fa-solid fa-xmark"></i> Hủy
            </button>
          ` : `
            <span style="color: var(--text-muted); font-size: 12px; font-style: italic;">Đã xử lý</span>
          `}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Xử lý Duyệt hoặc Hủy đơn hàng
window.processOrder = async function(orderId, action) {
  const isConfirm = confirm(`Bạn có chắc chắn muốn ${action === 'approve' ? 'DUYỆT' : 'HỦY'} đơn hàng này không?`);
  if (!isConfirm) return;
  
  const targetStatus = action === 'approve' ? 'completed' : 'cancelled';
  
  if (window.isFirebaseConfigured && db) {
    try {
      showToast("Đang cập nhật trạng thái đơn...", "warning");
      
      const orderRef = db.collection("orders").doc(orderId);
      
      // Nếu hủy đơn hàng, trả số lượng về lại kho
      if (action === 'cancel') {
        const orderDoc = await orderRef.get();
        if (orderDoc.exists) {
          const orderData = orderDoc.data();
          const batch = db.batch();
          
          for (const item of orderData.items) {
            const prodRef = db.collection("products").doc(item.id);
            const prodDoc = await prodRef.get();
            if (prodDoc.exists) {
              const currentQty = prodDoc.data().quantity || 0;
              const newQty = currentQty + item.qty;
              batch.update(prodRef, {
                quantity: newQty,
                status: "in-stock"
              });
            }
          }
          await batch.commit();
        }
      }
      
      // Cập nhật trạng thái đơn hàng
      await orderRef.update({ status: targetStatus });
      showToast(`Đã ${action === 'approve' ? 'duyệt' : 'hủy'} đơn hàng thành công!`);
    } catch (err) {
      console.error(err);
      showToast("Lỗi khi xử lý đơn hàng trên Firebase.", "error");
    }
  } else {
    // Chế độ Offline
    try {
      const orders = JSON.parse(localStorage.getItem("aquatica_orders") || "[]");
      const orderIndex = orders.findIndex(o => o.id === orderId);
      
      if (orderIndex !== -1) {
        orders[orderIndex].status = targetStatus;
        
        // Nếu hủy, cộng trả kho
        if (action === 'cancel') {
          const products = JSON.parse(localStorage.getItem("aquatica_products") || "[]");
          orders[orderIndex].items.forEach(orderItem => {
            const prod = products.find(p => p.id === orderItem.id);
            if (prod) {
              prod.quantity += orderItem.qty;
              prod.status = "in-stock";
            }
          });
          localStorage.setItem("aquatica_products", JSON.stringify(products));
          loadAdminProductsLocal(); // refresh table sản phẩm
        }
        
        localStorage.setItem("aquatica_orders", JSON.stringify(orders));
        loadAdminOrdersLocal(); // refresh table đơn hàng
        showToast(`Đã ${action === 'approve' ? 'duyệt' : 'hủy'} đơn hàng cục bộ!`);
      }
    } catch (err) {
      console.error(err);
      showToast("Không thể cập nhật cục bộ.", "error");
    }
  }
};

// ----------------------------------------------------
// QUẢN LÝ SẢN PHẨM (CRUD)
// ----------------------------------------------------
function renderAdminProducts() {
  const tbody = document.getElementById("admin-products-tbody");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  
  if (currentProducts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">Không có sản phẩm nào. Hãy thêm sản phẩm mới.</td></tr>`;
    return;
  }
  
  currentProducts.forEach(prod => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price);
    const isOutOfStock = prod.status === 'out-of-stock' || prod.quantity <= 0;
    const stockText = isOutOfStock ? "Hết hàng" : "Còn hàng";
    const stockClass = isOutOfStock ? "cancelled" : "completed";
    
    let catLabel = "Sản phẩm";
    if (prod.category === 'ca-canh') catLabel = "Cá cảnh";
    else if (prod.category === 'cay-thuy-sinh') catLabel = "Cây thủy sinh";
    else if (prod.category === 'bom-loc') catLabel = "Bơm & Lọc";
    else if (prod.category === 'phu-kien') catLabel = "Phụ kiện";

    const unit = prod.category === 'ca-canh' ? 'đôi' : 'cái';

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <img src="${prod.imageUrl || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=100'}" 
             alt="${prod.name}" 
             style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd;">
      </td>
      <td>
        <strong>${prod.name}</strong><br>
        <span style="font-size: 11px; color: var(--text-muted); max-width: 250px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${prod.description || 'Không có mô tả.'}
        </span>
      </td>
      <td><span style="font-size: 13px; font-weight: 500;">${catLabel}</span></td>
      <td><strong>${formattedPrice}</strong></td>
      <td><strong>${prod.quantity}</strong> ${unit}</td>
      <td><span class="status-pill ${stockClass}">${stockText}</span></td>
      <td>
        <div class="action-btn-group">
          <button class="btn btn-warning" onclick="editProduct('${prod.id}')" title="Sửa thông tin">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger" onclick="deleteProduct('${prod.id}')" title="Xóa sản phẩm">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Điều khiển Modal sản phẩm
window.openProductModal = function(productId = null) {
  const modal = document.getElementById("product-modal");
  const form = document.getElementById("product-form");
  const title = document.getElementById("modal-title");
  
  if (!modal || !form || !title) return;
  
  form.reset();
  document.getElementById("form-product-id").value = "";
  
  if (productId) {
    // SỬA SẢN PHẨM
    title.textContent = "Chỉnh Sửa Thông Tin Sản Phẩm";
    const prod = currentProducts.find(p => p.id === productId);
    if (prod) {
      document.getElementById("form-product-id").value = prod.id;
      document.getElementById("form-name").value = prod.name;
      document.getElementById("form-category").value = prod.category;
      document.getElementById("form-price").value = prod.price;
      document.getElementById("form-quantity").value = prod.quantity;
      document.getElementById("form-status").value = prod.status;
      document.getElementById("form-image-url").value = prod.imageUrl || "";
      document.getElementById("form-description").value = prod.description || "";
    }
  } else {
    // THÊM MỚI
    title.textContent = "Thêm Sản Phẩm Mới";
  }
  
  modal.classList.add("open");
};

window.closeProductModal = function() {
  const modal = document.getElementById("product-modal");
  if (modal) modal.classList.remove("open");
};

// Sửa sản phẩm từ bảng
window.editProduct = function(productId) {
  openProductModal(productId);
};

// Xử lý Lưu sản phẩm (Add/Edit)
window.saveProduct = async function(e) {
  e.preventDefault();
  
  const id = document.getElementById("form-product-id").value;
  const name = document.getElementById("form-name").value.trim();
  const category = document.getElementById("form-category").value;
  const price = parseInt(document.getElementById("form-price").value, 10);
  const quantity = parseInt(document.getElementById("form-quantity").value, 10);
  const status = document.getElementById("form-status").value;
  let imageUrl = document.getElementById("form-image-url").value.trim();
  const description = document.getElementById("form-description").value.trim();
  

  const productData = {
    name,
    category,
    price,
    quantity,
    status: (quantity <= 0) ? 'out-of-stock' : status,
    imageUrl,
    description
  };
  
  if (window.isFirebaseConfigured && db) {
    try {
      showToast("Đang đồng bộ dữ liệu với Firebase...", "warning");
      
      if (id) {
        // Cập nhật sản phẩm cũ
        await db.collection("products").doc(id).update(productData);
        showToast("Đã cập nhật sản phẩm thành công!");
      } else {
        // Thêm sản phẩm mới
        await db.collection("products").add(productData);
        showToast("Đã thêm sản phẩm mới thành công!");
      }
      closeProductModal();
    } catch (err) {
      console.error(err);
      showToast("Không thể đồng bộ dữ liệu lên Firebase.", "error");
    }
  } else {
    // Chế độ Offline
    try {
      const localProds = JSON.parse(localStorage.getItem("aquatica_products") || "[]");
      
      if (id) {
        // Edit local
        const index = localProds.findIndex(p => p.id === id);
        if (index !== -1) {
          localProds[index] = { id, ...productData };
          localStorage.setItem("aquatica_products", JSON.stringify(localProds));
          showToast("Đã cập nhật sản phẩm cục bộ!");
        }
      } else {
        // Add new local
        const newProd = {
          id: "prod-" + Date.now(),
          ...productData
        };
        localProds.push(newProd);
        localStorage.setItem("aquatica_products", JSON.stringify(localProds));
        showToast("Đã thêm sản phẩm mới cục bộ!");
      }
      
      closeProductModal();
      loadAdminProductsLocal(); // tải lại bảng
    } catch (err) {
      console.error(err);
      showToast("Lỗi khi ghi sản phẩm cục bộ.", "error");
    }
  }
};

// Xử lý Xóa sản phẩm
window.deleteProduct = async function(productId) {
  const isConfirm = confirm("Bạn có chắc chắn muốn XÓA sản phẩm này không?");
  if (!isConfirm) return;
  
  if (window.isFirebaseConfigured && db) {
    try {
      showToast("Đang xóa sản phẩm trên Firebase...", "warning");
      await db.collection("products").doc(productId).delete();
      showToast("Đã xóa sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      showToast("Không thể xóa sản phẩm khỏi Firebase.", "error");
    }
  } else {
    // Chế độ Offline
    try {
      const localProds = JSON.parse(localStorage.getItem("aquatica_products") || "[]");
      const filtered = localProds.filter(p => p.id !== productId);
      localStorage.setItem("aquatica_products", JSON.stringify(filtered));
      showToast("Đã xóa sản phẩm cục bộ!");
      loadAdminProductsLocal(); // tải lại bảng
    } catch (err) {
      console.error(err);
      showToast("Không thể xóa sản phẩm cục bộ.", "error");
    }
  }
};

// ----------------------------------------------------
// TIỆN ÍCH TOAST NOTIFICATION
// ----------------------------------------------------
function showToast(message, type = 'success') {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = '<i class="fa-solid fa-circle-check"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation"></i>';
  else if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
  
  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);
  
  // Tự động xóa sau 3.5 giây
  setTimeout(() => {
    toast.style.animation = 'slideInLeft 0.3s reverse';
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3500);
}
