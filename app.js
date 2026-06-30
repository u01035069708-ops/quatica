// app.js
// Client logic cho website Aquatica

// Danh sách sản phẩm mẫu sử dụng khi chưa cấu hình Firebase
const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "Cá Ông Tiên Albino Platinum",
    category: "ca-canh",
    price: 150000,
    status: "in-stock",
    quantity: 15,
    imageUrl: "images/ongtien.jpg",
    description: "Cá ông tiên vây dài uyển chuyển, sắc trắng bạch kim tinh khiết sang trọng cho bể thủy sinh."
  },
  {
    id: "prod-2",
    name: "Cá Vàng Oranda (Ba Đuôi) Siêu Lân",
    category: "ca-canh",
    price: 180000,
    status: "in-stock",
    quantity: 25,
    imageUrl: "images/baduoi.jpg",
    description: "Cá vàng Oranda đuôi to tròn thướt tha, đầu lân phát triển tốt, màu sắc rực rỡ và dễ nuôi."
  },
  {
    id: "prod-3",
    name: "Cá Bảy Màu Guppy Full Gold",
    category: "ca-canh",
    price: 40000,
    status: "in-stock",
    quantity: 50,
    imageUrl: "images/baymau.jpg",
    description: "Cá bảy màu Guppy dòng Full Gold thuần chủng, vây đuôi xòe rộng óng ánh cực kỳ thu hút."
  },
  {
    id: "prod-4",
    name: "Cá Sọc Ngựa Dạ Quang (Đủ Màu)",
    category: "ca-canh",
    price: 15000,
    status: "in-stock",
    quantity: 100,
    imageUrl: "images/socnguadaquang.jpg",
    description: "Cá sọc ngựa dạ quang bơi theo đàn cực đẹp, phản quang rực rỡ dưới ánh đèn LED bể cá."
  },
  {
    id: "prod-5",
    name: "Cá Cánh Buồm Dạ Quang Vây Dài",
    category: "ca-canh",
    price: 25000,
    status: "in-stock",
    quantity: 60,
    imageUrl: "images/vaydaquang.jpg",
    description: "Cá cánh buồm dạ quang vây dài với màu sắc huỳnh quang bắt mắt, bơi lội năng động."
  },
  {
    id: "prod-6",
    name: "Máy Bơm Chìm Periha PB-10000",
    category: "bom-loc",
    price: 1350000,
    status: "in-stock",
    quantity: 8,
    imageUrl: "images/bomchim.jpg",
    description: "Máy bơm chìm siêu êm tiết kiệm điện, tích hợp điều chỉnh 3 chế độ lưu lượng nước linh hoạt."
  },
  {
    id: "prod-7",
    name: "Máy Lọc Nước Bể Cá Vipsun VS-680",
    category: "bom-loc",
    price: 95000,
    status: "in-stock",
    quantity: 30,
    imageUrl: "images/vipsun.jpg",
    description: "Hệ thống lọc nước treo bể cá Vipsun nhỏ gọn hiệu quả, vận hành êm ái tích hợp tạo oxy."
  },
  {
    id: "prod-8",
    name: "Bông Lọc Nước Siêu Mịn 6 Lớp",
    category: "bom-loc",
    price: 35000,
    status: "in-stock",
    quantity: 80,
    imageUrl: "images/bongloc.jpg",
    description: "Bông lọc nước đa lớp siêu mịn, lọc sạch cặn bẩn li ti, tái sử dụng được nhiều lần sau khi giặt."
  },
  {
    id: "prod-9",
    name: "Đèn LED Thủy Sinh Chihiros A2 601",
    category: "phu-kien",
    price: 820000,
    status: "in-stock",
    quantity: 12,
    imageUrl: "images/den.jpg",
    description: "Đèn LED chuyên dụng cho cây thủy sinh, kết nối app chỉnh cường độ và mô phỏng ánh sáng mặt trời."
  },
  {
    id: "prod-10",
    name: "Thức Ăn Cho Cá Cảnh Omega Cảnh Đẹp",
    category: "phu-kien",
    price: 45000,
    status: "in-stock",
    quantity: 120,
    imageUrl: "images/omega.jpg",
    description: "Cám dinh dưỡng cao cấp Omega hạt chìm/nổi thích hợp cho nhiều dòng cá cảnh khác nhau."
  },
  {
    id: "prod-11",
    name: "Cát Nắng Vàng Xe Cát Trải Nền",
    category: "cay-thuy-sinh",
    price: 20000,
    status: "in-stock",
    quantity: 150,
    imageUrl: "images/xecan.jpg",
    description: "Cát vàng tự nhiên trải nền sạch sẽ, không gây ảnh hưởng đến pH nước, lý tưởng cho bể cá cảnh và cây thủy sinh."
  }
];

// Khởi tạo các biến hệ thống
let db = null;
let auth = null;
let currentProducts = [];
let shoppingCart = [];

// Khởi động ứng dụng
document.addEventListener("DOMContentLoaded", () => {
  initFirebase();
  loadProducts();
  initCart();
  setupUserAuthListener();
  setupMobileMenuCloseListener();
});

// Đóng mobile menu khi click chọn link
function setupMobileMenuCloseListener() {
  const navLinks = document.querySelectorAll(".nav-menu.collapsible .nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const navMenu = document.querySelector(".nav-menu.collapsible");
      if (navMenu && navMenu.classList.contains("open")) {
        toggleMobileMenu();
      }
    });
  });
}

// Khởi tạo Firebase
function initFirebase() {
  const indicator = document.getElementById("firebase-indicator");
  
  if (window.isFirebaseConfigured) {
    try {
      firebase.initializeApp(window.firebaseConfig);
      db = firebase.firestore();
      auth = firebase.auth();
      
      window.firebaseApp = firebase.app();
      window.firestoreDb = db;
      window.firebaseAuth = auth;
      window.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      window.facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
      
      console.log("Firebase initialized.");
      if (indicator) {
        indicator.style.display = "block";
        indicator.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
        indicator.style.color = "var(--success)";
        indicator.innerHTML = `<i class="fa-solid fa-cloud"></i> Đang kết nối trực tiếp với Database Firebase`;
      }
    } catch (e) {
      console.error("Firebase init failed: ", e);
      setupLocalFallbackIndicator();
    }
  } else {
    setupLocalFallbackIndicator();
  }
}

function setupLocalFallbackIndicator() {
  const indicator = document.getElementById("firebase-indicator");
  if (indicator) {
    indicator.style.display = "block";
    indicator.style.backgroundColor = "rgba(245, 158, 11, 0.15)";
    indicator.style.color = "var(--warning)";
    indicator.innerHTML = `<i class="fa-solid fa-server"></i> Chế độ Offline/Local (Chưa kết nối Firebase, xem HUONG_DAN_CAU_HINH.md để kích hoạt)`;
  }
  // Đồng bộ sản phẩm mẫu vào LocalStorage nếu chưa có hoặc chứa ảnh Unsplash cũ
  const localProds = localStorage.getItem("aquatica_products");
  if (!localProds || localProds.includes("images.unsplash.com")) {
    localStorage.setItem("aquatica_products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("aquatica_orders")) {
    localStorage.setItem("aquatica_orders", JSON.stringify([]));
  }
}

// ----------------------------------------------------
// TẢI VÀ HIỂN THỊ SẢN PHẨM
// ----------------------------------------------------
function loadProducts() {
  const container = document.getElementById("products-container");
  const countText = document.getElementById("product-count-text");
  
  if (window.isFirebaseConfigured && db) {
    // Tải thời gian thực từ Firestore
    db.collection("products").onSnapshot((snapshot) => {
      currentProducts = [];
      snapshot.forEach((doc) => {
        currentProducts.push({ id: doc.id, ...doc.data() });
      });
      
      // Nếu database Firebase trống, hoặc nếu các sản phẩm default dùng ảnh Unsplash, đồng bộ lại dữ liệu mẫu
      const hasOldUnsplashImages = currentProducts.some(prod => prod.id.startsWith("prod-") && prod.imageUrl && prod.imageUrl.includes("images.unsplash.com"));
      
      if (currentProducts.length === 0 || hasOldUnsplashImages) {
        syncMockToFirebase();
      } else {
        renderProducts(currentProducts);
      }
    }, (error) => {
      console.error("Lỗi Firestore:", error);
      loadProductsLocal();
    });
  } else {
    loadProductsLocal();
  }
}

function loadProductsLocal() {
  const localProds = localStorage.getItem("aquatica_products");
  if (!localProds || localProds.includes("images.unsplash.com")) {
    localStorage.setItem("aquatica_products", JSON.stringify(DEFAULT_PRODUCTS));
    currentProducts = DEFAULT_PRODUCTS;
  } else {
    currentProducts = JSON.parse(localProds);
  }
  renderProducts(currentProducts);
}

// Đồng bộ sản phẩm mẫu lên Firebase
async function syncMockToFirebase() {
  if (!db) return;
  const countText = document.getElementById("product-count-text");
  if (countText) countText.textContent = "Đang đồng bộ dữ liệu mẫu lên Firebase...";
  
  try {
    const promises = DEFAULT_PRODUCTS.map(prod => {
      const { id, ...data } = prod;
      return db.collection("products").doc(id).set(data);
    });
    await Promise.all(promises);
    console.log("Đã đồng bộ sản phẩm mẫu lên Firebase.");
  } catch (err) {
    console.error("Đồng bộ thất bại: ", err);
  }
}

function renderProducts(productsList) {
  const container = document.getElementById("products-container");
  const countText = document.getElementById("product-count-text");
  
  if (!container) return;
  container.innerHTML = "";
  
  if (countText) {
    countText.textContent = `Hiển thị ${productsList.length} sản phẩm`;
  }
  
  if (productsList.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
      <i class="fa-solid fa-ban" style="font-size: 40px; margin-bottom: 10px;"></i>
      <p>Không tìm thấy sản phẩm nào phù hợp.</p>
    </div>`;
    return;
  }
  
  productsList.forEach(prod => {
    const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price);
    const isOutOfStock = prod.status === 'out-of-stock' || prod.quantity <= 0;
    const stockClass = isOutOfStock ? 'out-of-stock' : 'in-stock';
    const stockLabel = isOutOfStock ? 'Hết hàng' : 'Còn hàng';
    
    // Icon category mapping
    let catLabel = "Sản phẩm";
    if (prod.category === 'ca-canh') catLabel = "Cá cảnh";
    else if (prod.category === 'cay-thuy-sinh') catLabel = "Cây thủy sinh";
    else if (prod.category === 'bom-loc') catLabel = "Bơm & Lọc";
    else if (prod.category === 'phu-kien') catLabel = "Phụ kiện";

    const unit = prod.category === 'ca-canh' ? 'đôi' : 'cái';

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${prod.imageUrl || 'images/ongtien.jpg'}" alt="${prod.name}" class="product-img" loading="lazy">
        <span class="product-badge">${catLabel}</span>
        <span class="stock-badge ${stockClass}">${stockLabel}</span>
      </div>
      <div class="product-info">
        <span class="product-cat">${catLabel}</span>
        <h3 class="product-name" title="${prod.name}">${prod.name}</h3>
        <p class="product-stock-qty">Kho còn lại: <strong>${prod.quantity}</strong> ${unit}</p>
        <div class="product-footer">
          <span class="product-price">${priceFormatted}</span>
          <button class="add-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
                  onclick="addToCart('${prod.id}')" 
                  ${isOutOfStock ? 'disabled' : ''}
                  title="${isOutOfStock ? 'Sản phẩm tạm thời hết hàng' : 'Thêm vào giỏ hàng'}">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ----------------------------------------------------
// TÌM KIẾM VÀ LỌC SẢN PHẨM
// ----------------------------------------------------
let activeCategory = 'all';
let searchQuery = '';
let currentSortRule = 'default';

window.filterCategory = function(category, element) {
  // Cập nhật giao diện nút
  const buttons = document.querySelectorAll("#category-filters .cat-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  element.classList.add("active");
  
  activeCategory = category;
  applyFilters();
};

window.handleSearch = function() {
  const searchInput = document.getElementById("search-input");
  searchQuery = searchInput.value.trim().toLowerCase();
  applyFilters();
};

window.handleSortChange = function(value) {
  currentSortRule = value;
  applyFilters();
};

// Nhấn Enter để tìm kiếm
document.getElementById("search-input")?.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

function applyFilters() {
  let filtered = [...currentProducts];
  
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      (p.description && p.description.toLowerCase().includes(searchQuery))
    );
  }
  
  // Áp dụng quy tắc sắp xếp
  if (currentSortRule === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSortRule === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSortRule === 'stock-desc') {
    filtered.sort((a, b) => b.quantity - a.quantity);
  } else if (currentSortRule === 'stock-asc') {
    filtered.sort((a, b) => a.quantity - b.quantity);
  } else if (currentSortRule === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' }));
  } else if (currentSortRule === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name, 'vi', { sensitivity: 'base' }));
  } else {
    // Mặc định: Sắp xếp theo tên A-Z
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' }));
  }
  
  renderProducts(filtered);
}

// ----------------------------------------------------
// XỬ LÝ GIỎ HÀNG
// ----------------------------------------------------
function initCart() {
  const localCart = localStorage.getItem("aquatica_cart");
  if (localCart) {
    shoppingCart = JSON.parse(localCart);
  }
  updateCartUI();
}

window.toggleCart = function(isOpen) {
  const sidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("cart-overlay");
  if (isOpen) {
    sidebar.classList.add("open");
    overlay.classList.add("open");
  } else {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }
};

window.addToCart = function(productId) {
  const product = currentProducts.find(p => p.id === productId);
  if (!product) return;
  
  if (product.status === 'out-of-stock' || product.quantity <= 0) {
    showToast("Sản phẩm đã hết hàng!", "error");
    return;
  }
  
  const existingItem = shoppingCart.find(item => item.id === productId);
  
  if (existingItem) {
    // Kiểm tra số lượng tồn kho
    if (existingItem.qty + 1 > product.quantity) {
      showToast(`Không thể thêm! Vượt quá số lượng tồn kho (${product.quantity})`, "warning");
      return;
    }
    existingItem.qty += 1;
  } else {
    shoppingCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      maxQty: product.quantity,
      qty: 1
    });
  }
  
  saveCart();
  updateCartUI();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
};

window.changeCartQty = function(productId, delta) {
  const item = shoppingCart.find(item => item.id === productId);
  if (!item) return;
  
  const product = currentProducts.find(p => p.id === productId);
  const maxLimit = product ? product.quantity : item.maxQty;
  
  const newQty = item.qty + delta;
  
  if (newQty <= 0) {
    shoppingCart = shoppingCart.filter(i => i.id !== productId);
    showToast("Đã xóa sản phẩm khỏi giỏ hàng.");
  } else if (newQty > maxLimit) {
    const unit = product && product.category === 'ca-canh' ? 'đôi' : 'cái';
    showToast(`Chỉ còn lại ${maxLimit} ${unit} trong kho!`, "warning");
    item.qty = maxLimit;
  } else {
    item.qty = newQty;
  }
  
  saveCart();
  updateCartUI();
};

window.removeFromCart = function(productId) {
  shoppingCart = shoppingCart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Đã xóa sản phẩm khỏi giỏ hàng");
};

function saveCart() {
  localStorage.setItem("aquatica_cart", JSON.stringify(shoppingCart));
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartCountBadge = document.getElementById("cart-count");
  const totalPriceLabel = document.getElementById("cart-total-price");
  
  if (!cartItemsContainer || !cartCountBadge || !totalPriceLabel) return;
  
  // Tính tổng số lượng
  const totalItems = shoppingCart.reduce((sum, item) => sum + item.qty, 0);
  cartCountBadge.textContent = totalItems;
  
  // Tính tổng giá trị
  const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  totalPriceLabel.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
  
  cartItemsContainer.innerHTML = "";
  
  if (shoppingCart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-cart-flatbed-suitcases cart-empty-icon"></i>
        <p>Giỏ hàng của bạn đang trống.</p>
        <button class="btn btn-primary" onclick="toggleCart(false)" style="padding: 10px 20px; border-radius: 20px;">Tiếp tục mua hàng</button>
      </div>
    `;
    return;
  }
  
  shoppingCart.forEach(item => {
    const itemPriceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price);
    const itemTotalFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.qty);
    
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.imageUrl || 'images/ongtien.jpg'}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-price">${itemPriceFormatted} &times; ${item.qty} = <strong>${itemTotalFormatted}</strong></div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeCartQty('${item.id}', -1)">-</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart('${item.id}')" title="Xóa sản phẩm này">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    cartItemsContainer.appendChild(div);
  });
}

// ----------------------------------------------------
// THỰC HIỆN ĐẶT HÀNG (CHECKOUT)
// ----------------------------------------------------
window.handleCheckout = async function() {
  if (shoppingCart.length === 0) {
    showToast("Giỏ hàng rỗng, vui lòng thêm sản phẩm!", "warning");
    return;
  }
  
  const name = document.getElementById("checkout-name").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const address = document.getElementById("checkout-address").value.trim();
  
  if (!name || !phone || !address) {
    showToast("Vui lòng điền đầy đủ Họ tên, SĐT và Địa chỉ giao hàng!", "error");
    return;
  }
  
  // Tạo đơn hàng mới
  const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const newOrder = {
    customerName: name,
    customerPhone: phone,
    customerAddress: address,
    items: shoppingCart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty
    })),
    totalPrice: totalPrice,
    status: "pending", // pending (chờ xử lý), completed (chấp nhận), cancelled (đã hủy)
    createdAt: new Date().toISOString()
  };
  
  if (window.isFirebaseConfigured && db) {
    try {
      showToast("Đang gửi đơn hàng của bạn...", "warning");
      
      // Thêm vào Firestore
      const docRef = await db.collection("orders").add(newOrder);
      
      // Trừ bớt số lượng sản phẩm trong kho trên Firestore
      const batch = db.batch();
      for (const item of shoppingCart) {
        const prodRef = db.collection("products").doc(item.id);
        const currentProd = currentProducts.find(p => p.id === item.id);
        if (currentProd) {
          const newQty = Math.max(0, currentProd.quantity - item.qty);
          const newStatus = newQty === 0 ? "out-of-stock" : "in-stock";
          batch.update(prodRef, {
            quantity: newQty,
            status: newStatus
          });
        }
      }
      await batch.commit();

      showToast("Đặt hàng thành công! Đơn hàng của bạn đang chờ phê duyệt.", "success");
      clearCart();
      toggleCart(false);
    } catch (err) {
      console.error("Lỗi đặt hàng Firebase: ", err);
      showToast("Đã xảy ra lỗi khi gửi đơn hàng. Vui lòng thử lại.", "error");
    }
  } else {
    // Lưu vào LocalStorage
    try {
      const localOrders = JSON.parse(localStorage.getItem("aquatica_orders") || "[]");
      newOrder.id = "ord-" + Date.now();
      localOrders.push(newOrder);
      localStorage.setItem("aquatica_orders", JSON.stringify(localOrders));
      
      // Cập nhật số lượng sản phẩm local
      const localProds = JSON.parse(localStorage.getItem("aquatica_products") || "[]");
      shoppingCart.forEach(cartItem => {
        const prod = localProds.find(p => p.id === cartItem.id);
        if (prod) {
          prod.quantity = Math.max(0, prod.quantity - cartItem.qty);
          if (prod.quantity <= 0) {
            prod.status = "out-of-stock";
          }
        }
      });
      localStorage.setItem("aquatica_products", JSON.stringify(localProds));
      
      // Tải lại sản phẩm và UI
      loadProductsLocal();
      
      showToast("Đặt hàng thành công (Chế độ Offline)! Đơn hàng đã lưu trên máy của bạn.", "success");
      clearCart();
      toggleCart(false);
    } catch (err) {
      console.error(err);
      showToast("Không thể đặt hàng cục bộ.", "error");
    }
  }
};

function clearCart() {
  shoppingCart = [];
  saveCart();
  updateCartUI();
  
  // Xóa các trường checkout
  document.getElementById("checkout-name").value = "";
  document.getElementById("checkout-phone").value = "";
  document.getElementById("checkout-address").value = "";
}

// ----------------------------------------------------
// AUTHENTICATION CHO KHÁCH HÀNG (FIREBASE AUTH)
// ----------------------------------------------------
function setupUserAuthListener() {
  const userNavItem = document.getElementById("user-nav-item");
  if (!userNavItem) return;
  
  if (window.isFirebaseConfigured && auth) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Người dùng đã đăng nhập thật qua Firebase
        renderLoggedInUser(user.displayName, user.photoURL, user.phoneNumber);
      } else {
        // Chưa đăng nhập
        userNavItem.innerHTML = `<a href="login.html" class="nav-link"><i class="fa-solid fa-user"></i> Đăng Nhập</a>`;
      }
    });
  } else {
    // Chế độ Offline: Kiểm tra xem có user giả lập lưu ở localStorage không
    const mockUserStr = localStorage.getItem("aquatica_mock_user");
    if (mockUserStr) {
      const mockUser = JSON.parse(mockUserStr);
      renderLoggedInUser(mockUser.displayName, mockUser.photoURL, null);
    } else {
      userNavItem.innerHTML = `<a href="login.html" class="nav-link"><i class="fa-solid fa-user"></i> Đăng Nhập</a>`;
    }
  }
}

function renderLoggedInUser(displayName, photoURL, phoneNumber) {
  const userNavItem = document.getElementById("user-nav-item");
  if (!userNavItem) return;
  
  const avatarUrl = photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100";
  userNavItem.innerHTML = `
    <div class="user-info-nav">
      <img src="${avatarUrl}" class="user-avatar" title="${displayName || 'Khách quen'}">
      <span>Chào, ${displayName ? displayName.split(" ").pop() : 'Khách'}</span>
      <a href="#" onclick="handleLogout(event)" class="nav-link" style="padding: 2px 8px; font-size: 13px; color: var(--danger);"><i class="fa-solid fa-right-from-bracket"></i> Thoát</a>
    </div>
  `;
  
  // Tự động điền form checkout
  const checkoutName = document.getElementById("checkout-name");
  if (checkoutName && !checkoutName.value) {
    checkoutName.value = displayName || "";
  }
  
  const checkoutPhone = document.getElementById("checkout-phone");
  if (checkoutPhone && phoneNumber && !checkoutPhone.value) {
    checkoutPhone.value = phoneNumber;
  }
}

window.handleLogout = function(e) {
  e.preventDefault();
  
  // Xử lý logout cho Firebase Auth
  if (window.isFirebaseConfigured && auth) {
    auth.signOut().then(() => {
      showToast("Đã đăng xuất tài khoản.");
      window.location.reload();
    }).catch(err => {
      console.error(err);
    });
  } else {
    // Xử lý logout cho Local mock user
    localStorage.removeItem("aquatica_mock_user");
    showToast("Đã đăng xuất tài khoản giả lập.");
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
};

// ----------------------------------------------------
// TIỆN ÍCH TOAST NOTIFICATION
// ----------------------------------------------------
window.showToast = function(message, type = 'success') {
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
};

// Điều khiển đóng mở Mobile Menu
window.toggleMobileMenu = function() {
  const navMenu = document.querySelector(".nav-menu.collapsible");
  const menuIcon = document.querySelector(".menu-toggle-btn i");
  if (navMenu) {
    navMenu.classList.toggle("open");
    if (menuIcon) {
      if (navMenu.classList.contains("open")) {
        menuIcon.className = "fa-solid fa-xmark";
      } else {
        menuIcon.className = "fa-solid fa-bars";
      }
    }
  }
};
