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
    description: "Dòng cá ông tiên (Pterophyllum scalare) cao cấp nhập khẩu từ Thái Lan. Sở hữu bộ vây dài thướt tha, uyển chuyển bơi lội nhẹ nhàng. Sắc trắng bạch kim óng ánh (Platinum) kết hợp mắt đỏ đặc trưng của dòng Albino tạo nên vẻ đẹp hoàng gia, sang trọng bậc nhất cho bể thủy sinh của bạn.\n- Kích thước: 6 - 8 cm\n- Tính cách: Ôn hòa, thích hợp nuôi chung với các dòng cá nhỏ không hung dữ\n- Thức ăn: Cám hạt, trùng chỉ, tim bò đông lạnh\n- Nhiệt độ nước: 24 - 28 °C\n- Độ pH lý tưởng: 6.0 - 7.5"
  },
  {
    id: "prod-2",
    name: "Cá Vàng Oranda (Ba Đuôi) Siêu Lân",
    category: "ca-canh",
    price: 180000,
    status: "in-stock",
    quantity: 25,
    imageUrl: "images/baduoi.jpg",
    description: "Dòng cá Oranda nhập khẩu nguyên con sở hữu phần đầu lân (gù) phát triển tròn trịa, cân đối và phủ đầy. Thân hình bầu bĩnh đáng yêu kết hợp cùng bộ đuôi xòe rộng 3-4 cánh thướt tha như làn lụa khi di chuyển. Màu sắc pha trộn tuyệt đẹp từ đỏ cam rực rỡ đến trắng bạc.\n- Kích thước: 9 - 12 cm\n- Tính cách: Rất hiền lành, năng động\n- Thức ăn: Cám chuyên dụng cho cá vàng chìm/nổi, trùn huyết\n- Nhiệt độ nước: 18 - 25 °C\n- Độ pH lý tưởng: 7.0 - 8.0"
  },
  {
    id: "prod-3",
    name: "Cá Bảy Màu Guppy Full Gold",
    category: "ca-canh",
    price: 40000,
    status: "in-stock",
    quantity: 50,
    imageUrl: "images/baymau.jpg",
    description: "Dòng cá bảy màu Guppy Full Gold thuần chủng với sắc vàng kim óng ánh phủ kín toàn thân, bao gồm cả vây lưng và vây đuôi. Dưới ánh sáng đèn led, chúng lấp lánh như những thỏi vàng di động siêu nhỏ. Rất thích hợp cho các bể cá mini để bàn hoặc bể thủy sinh nhỏ.\n- Kích thước: 3 - 5 cm\n- Tính cách: Rất năng động, hòa đồng\n- Thức ăn: Cám mịn cám thái Inve, artemia, trùng chỉ\n- Nhiệt độ nước: 22 - 28 °C\n- Độ pH lý tưởng: 6.5 - 7.5"
  },
  {
    id: "prod-4",
    name: "Cá Sọc Ngựa Dạ Quang (Đủ Màu)",
    category: "ca-canh",
    price: 15000,
    status: "in-stock",
    quantity: 100,
    imageUrl: "images/socnguadaquang.jpg",
    description: "Cá sọc ngựa (Danio rerio) biến đổi gen dạ quang với nhiều sắc màu đa dạng: đỏ, xanh lá, vàng, hồng, tím. Chúng nổi tiếng với tốc độ bơi nhanh nhẹn và tập tính đi theo đàn tạo thành những dải màu sắc rực rỡ đan xen vô cùng bắt mắt. Cá cực kỳ khỏe mạnh và dễ chăm sóc, thích hợp cho người mới bắt đầu chơi.\n- Kích thước: 3 - 4 cm\n- Tính cách: Hoạt bát, năng động, đi đàn mạnh mẽ\n- Thức ăn: Cám hạt mịn, trùn huyết, cám dán\n- Nhiệt độ nước: 20 - 28 °C\n- Độ pH lý tưởng: 6.5 - 7.5"
  },
  {
    id: "prod-5",
    name: "Cá Cánh Buồm Dạ Quang Vây Dài",
    category: "ca-canh",
    price: 25000,
    status: "in-stock",
    quantity: 60,
    imageUrl: "images/vaydaquang.jpg",
    description: "Cá cánh buồm dạ quang vây dài có thân hình dẹt dẹp đặc trưng với bộ vây lưng và vây bụng kéo dài mềm mại như những cánh buồm căng gió. Màu sắc huỳnh quang phát sáng rực rỡ dưới ánh đèn LED màu xanh. Đây là dòng cá có sức sống dẻo dai, dễ thích nghi với nhiều điều kiện môi trường nước.\n- Kích thước: 4 - 5 cm\n- Tính cách: Ôn hòa nhưng có thể rỉa vây nhẹ cá khác (tránh nuôi cùng cá vây quá dài như bảy màu)\n- Thức ăn: Cám tổng hợp dạng viên chìm hoặc nổi\n- Nhiệt độ nước: 22 - 28 °C\n- Độ pH lý tưởng: 6.0 - 7.5"
  },
  {
    id: "prod-6",
    name: "Máy Bơm Chìm Periha PB-10000",
    category: "bom-loc",
    price: 1350000,
    status: "in-stock",
    quantity: 8,
    imageUrl: "images/bomchim.jpg",
    description: "Máy bơm chìm Periha PB-10000 là dòng bơm phân khúc cao cấp cho hồ cá Koi hoặc bể thủy sinh lớn. Sử dụng công nghệ động cơ ba pha không chổi than giúp tiết kiệm điện năng lên đến 60% so với bơm thông thường, vận hành siêu êm ái. Tích hợp hộp điều khiển ngoài với 3 chế độ công suất khác nhau.\n- Công suất: 20W - 32W\n- Lưu lượng nước: 8000 - 10000 L/H\n- Chiều cao cột áp tối đa: 4.5m - 5.5m\n- Đường ống ra: Phi 27, 34, 42, 48\n- Tính năng an toàn: Tự động ngắt điện khi cạn nước hoặc bị kẹt cánh quạt"
  },
  {
    id: "prod-7",
    name: "Máy Lọc Nước Bể Cá Vipsun VS-680",
    category: "bom-loc",
    price: 95000,
    status: "in-stock",
    quantity: 30,
    imageUrl: "images/vipsun.jpg",
    description: "Máy lọc máng treo Vipsun VS-680 là giải pháp lọc nước cơ học và sinh học cơ bản, tiện lợi cho các bể cá cảnh mini từ 30cm đến 60cm. Thiết kế gọn nhẹ đặt gác trực tiếp trên thành bể, nước được hút lên máng lọc đi qua các lớp bông lọc giúp giữ lại cặn bẩn, đồng thời dòng thác nước chảy xuống tạo oxy tự nhiên cho bể.\n- Công suất điện: 5W\n- Lưu lượng nước tối đa: 500 L/H\n- Bộ sản phẩm gồm: Đầu bơm hút nước, máng nhựa đựng vật liệu lọc, ống dẫn nước\n- Phù hợp bể: 30 - 60 cm"
  },
  {
    id: "prod-8",
    name: "Bông Lọc Nước Siêu Mịn 6 Lớp",
    category: "bom-loc",
    price: 35000,
    status: "in-stock",
    quantity: 80,
    imageUrl: "images/bongloc.jpg",
    description: "Bông lọc nước thế hệ mới tích hợp 6 lớp lọc cấu trúc vật lý cải tiến: lớp bông thô giữ chất thải lớn, lớp bông mịn lọc bụi, và các lớp lưới sợi sinh học hỗ trợ giữ cặn bẩn li ti cực tốt. Bông lọc dai, không bị mục nát, có thể dễ dàng giặt sạch tái sử dụng từ 5-10 lần giúp tiết kiệm chi phí vận hành bể cá.\n- Kích thước: 30 x 40 cm hoặc 11 x 50 cm (có thể cắt nhỏ linh hoạt)\n- Chất liệu: Sợi polyester sinh học thân thiện với nguồn nước\n- Công dụng: Giúp nước bể trong suốt vắt, loại bỏ 99% bụi thô trong nước"
  },
  {
    id: "prod-9",
    name: "Đèn LED Thủy Sinh Chihiros A2 601",
    category: "phu-kien",
    price: 820000,
    status: "in-stock",
    quantity: 12,
    imageUrl: "images/den.jpg",
    description: "Đèn LED Chihiros A2 601 là dòng đèn thủy sinh chuyên dụng cao cấp cho bể dài 60cm. Sử dụng chip LED quang phổ rộng (RGB) giúp kích thích sự phát triển tối đa và lên màu rực rỡ cho các dòng cây thủy sinh (như rêu, ráy, tiêu thảo, trân châu đỏ). Tích hợp sẵn bộ điều khiển Bluetooth qua ứng dụng My Chihiros trên điện thoại để hẹn giờ tắt/mở, mô phỏng hiệu ứng bình minh/hoàng hôn thực tế.\n- Công suất điện: 26W\n- Quang thông: 2450lm\n- Số lượng bóng LED: 60 bóng\n- Phù hợp kích thước bể: Dài 60cm, kính dày từ 5-10mm"
  },
  {
    id: "prod-10",
    name: "Thức Ăn Cho Cá Cảnh Omega Cảnh Đẹp",
    category: "phu-kien",
    price: 45000,
    status: "in-stock",
    quantity: 120,
    imageUrl: "images/omega.jpg",
    description: "Thức ăn hỗn hợp dạng viên cám Omega Cảnh Đẹp cung cấp dinh dưỡng cân đối toàn diện giúp thúc đẩy sự phát triển khỏe mạnh và cải thiện sắc tố tự nhiên cho cá cảnh. Sản phẩm bổ sung vitamin tổng hợp, tảo Spirulina tăng đề kháng, men vi sinh hỗ trợ tiêu hóa tốt, giúp cá hấp thụ dinh dưỡng triệt để và hạn chế làm đục nước.\n- Thành phần: Bột cá chất lượng cao, bột tôm, tảo Spirulina, vitamin A, D3, E, B12...\n- Độ đạm: ≥ 40%\n- Quy cách đóng gói: Hũ nhựa 100g tiện lợi\n- Dạng hạt: Hạt nổi chậm phù hợp cho đa số cá tầng trung và tầng mặt"
  },
  {
    id: "prod-11",
    name: "Cát Nắng Vàng Xe Cát Trải Nền",
    category: "cay-thuy-sinh",
    price: 20000,
    status: "in-stock",
    quantity: 150,
    imageUrl: "images/xecan.jpg",
    description: "Cát nắng vàng tự nhiên đã qua quy trình sàng lọc kỹ lưỡng, loại bỏ bụi bẩn và tạp chất có hại. Hạt cát tròn mịn màu vàng nắng óng ả mang lại vẻ đẹp tự nhiên, sinh động như đáy sông suối cho bể cá cảnh của bạn. Cát trơ hoàn toàn, không thôi chất làm thay đổi độ pH hay độ cứng nước (TDS), cực kỳ an toàn cho các loài cá và rùa cảnh.\n- Quy cách đóng bao: 1kg\n- Kích thước hạt: 0.8 - 1.2 mm\n- Hướng dẫn sử dụng: Rửa sạch cát với nước từ 2-3 lần trước khi trải nền bể cá"
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
  // Đồng bộ sản phẩm mẫu vào LocalStorage nếu chưa có, chứa ảnh Unsplash cũ hoặc phiên bản cũ
  const localProds = localStorage.getItem("aquatica_products");
  const localProdsVersion = localStorage.getItem("aquatica_products_version");
  const CURRENT_PRODUCTS_VERSION = "2.0";
  
  if (!localProds || localProds.includes("images.unsplash.com") || localProdsVersion !== CURRENT_PRODUCTS_VERSION) {
    localStorage.setItem("aquatica_products", JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem("aquatica_products_version", CURRENT_PRODUCTS_VERSION);
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
      
      // Nếu database Firebase trống, dùng ảnh Unsplash, hoặc dùng mô tả cũ ngắn ngủn, đồng bộ lại dữ liệu mẫu
      const hasOldUnsplashImages = currentProducts.some(prod => prod.id.startsWith("prod-") && prod.imageUrl && prod.imageUrl.includes("images.unsplash.com"));
      const hasOldDescriptions = currentProducts.some(prod => prod.id === "prod-1" && prod.description && prod.description.length < 150);
      
      if (currentProducts.length === 0 || hasOldUnsplashImages || hasOldDescriptions) {
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
  const localProdsVersion = localStorage.getItem("aquatica_products_version");
  const CURRENT_PRODUCTS_VERSION = "2.0";
  
  if (!localProds || localProds.includes("images.unsplash.com") || localProdsVersion !== CURRENT_PRODUCTS_VERSION) {
    localStorage.setItem("aquatica_products", JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem("aquatica_products_version", CURRENT_PRODUCTS_VERSION);
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
      <div class="product-img-wrapper" onclick="showProductDetails('${prod.id}')" style="cursor: pointer;">
        <img src="${prod.imageUrl || 'images/ongtien.jpg'}" alt="${prod.name}" class="product-img" loading="lazy">
        <span class="product-badge">${catLabel}</span>
        <span class="stock-badge ${stockClass}">${stockLabel}</span>
      </div>
      <div class="product-info">
        <span class="product-cat">${catLabel}</span>
        <h3 class="product-name" title="${prod.name}" onclick="showProductDetails('${prod.id}')" style="cursor: pointer;">${prod.name}</h3>
        <p class="product-stock-qty">Kho còn lại: <strong>${prod.quantity}</strong> ${unit}</p>
        <div class="product-footer">
          <span class="product-price">${priceFormatted}</span>
          <button class="add-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
                  onclick="event.stopPropagation(); addToCart('${prod.id}')" 
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
  fillGuestCheckoutInfo();
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

  // Lưu thông tin khách vãng lai để tự động điền lần sau
  const isCustomerLoggedIn = localStorage.getItem("aquatica_mock_user") !== null || (auth && auth.currentUser !== null);
  if (!isCustomerLoggedIn) {
    localStorage.setItem("aquatica_guest_info", JSON.stringify({ name, phone, address }));
  }
  
  // Tạo đơn hàng mới
  let customerUid = null;
  if (window.isFirebaseConfigured && auth && auth.currentUser) {
    customerUid = auth.currentUser.uid;
  } else {
    const mockUserStr = localStorage.getItem("aquatica_mock_user");
    if (mockUserStr) {
      const mockUser = JSON.parse(mockUserStr);
      customerUid = mockUser.uid;
    }
  }
  
  const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const newOrder = {
    customerUid: customerUid,
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
      
      // Lưu lại mã đơn hàng trên thiết bị này (Cho khách vãng lai)
      saveDeviceOrderId(docRef.id);
      
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
      
      // Lưu lại mã đơn hàng trên thiết bị này (Cho khách vãng lai)
      saveDeviceOrderId(newOrder.id);
      
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
  
  // Nạp lại thông tin khách vãng lai đã đặt hoặc xóa trắng nếu không có
  fillGuestCheckoutInfo();
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
      <span style="font-weight: 600;">Chào, ${displayName ? displayName.split(" ").pop() : 'Khách'}</span>
      <a href="login.html" class="nav-link" style="padding: 2px 4px; font-size: 13px; color: var(--primary);"><i class="fa-solid fa-clock-rotate-left"></i> Đơn hàng</a>
      <a href="#" onclick="handleLogout(event)" class="nav-link" style="padding: 2px 4px; font-size: 13px; color: var(--danger);"><i class="fa-solid fa-right-from-bracket"></i> Thoát</a>
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

// ----------------------------------------------------
// CHI TIẾT SẢN PHẨM (PRODUCT DETAILS MODAL)
// ----------------------------------------------------
window.toggleProductDetailModal = function(isOpen) {
  const modal = document.getElementById("product-detail-modal");
  const overlay = document.getElementById("product-detail-overlay");
  if (!modal || !overlay) return;

  if (isOpen) {
    modal.classList.add("open");
    overlay.classList.add("open");
  } else {
    modal.classList.remove("open");
    overlay.classList.remove("open");
  }
};

window.showProductDetails = function(productId) {
  const product = currentProducts.find(p => p.id === productId);
  if (!product) return;

  const contentContainer = document.getElementById("product-detail-content");
  if (!contentContainer) return;

  const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
  const isOutOfStock = product.status === 'out-of-stock' || product.quantity <= 0;
  const stockClass = isOutOfStock ? 'out-of-stock' : 'in-stock';
  const stockLabel = isOutOfStock ? 'Hết hàng' : 'Còn hàng';
  
  let catLabel = "Sản phẩm";
  if (product.category === 'ca-canh') catLabel = "Cá cảnh";
  else if (product.category === 'cay-thuy-sinh') catLabel = "Cây thủy sinh";
  else if (product.category === 'bom-loc') catLabel = "Bơm & Lọc";
  else if (product.category === 'phu-kien') catLabel = "Phụ kiện";

  const unit = product.category === 'ca-canh' ? 'đôi' : 'cái';

  // Định dạng phần mô tả chi tiết đẹp đẽ
  const formattedDescription = formatDescription(product.description);

  contentContainer.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-image-sec">
        <img src="${product.imageUrl || 'images/ongtien.jpg'}" alt="${product.name}" class="detail-main-img">
        <span class="detail-badge">${catLabel}</span>
        <span class="detail-stock-badge ${stockClass}">${stockLabel}</span>
      </div>
      <div class="product-detail-info-sec">
        <span class="detail-cat-name">${catLabel}</span>
        <h2 class="detail-title">${product.name}</h2>
        <div class="detail-price-row">
          <span class="detail-price">${priceFormatted}</span>
          <span class="detail-qty-status">Kho còn: <strong>${product.quantity}</strong> ${unit}</span>
        </div>
        
        <div class="detail-description-box">
          <h4>Mô tả sản phẩm</h4>
          <div class="detail-desc-text">
            ${formattedDescription}
          </div>
        </div>
        
        <div class="detail-action-row">
          <div class="detail-qty-selector">
            <button class="qty-btn" onclick="adjustDetailQty(-1)">-</button>
            <input type="text" id="detail-qty-input" value="1" readonly>
            <button class="qty-btn" onclick="adjustDetailQty(1)">+</button>
          </div>
          <button class="btn-add-detail-cart ${isOutOfStock ? 'disabled' : ''}" 
                  onclick="addDetailedToCart('${product.id}')"
                  ${isOutOfStock ? 'disabled' : ''}>
            <i class="fa-solid fa-cart-plus"></i> Thêm Vào Giỏ Hàng
          </button>
        </div>
      </div>
    </div>
  `;

  toggleProductDetailModal(true);
};

// Hàm định dạng các dòng mô tả
function formatDescription(desc) {
  if (!desc) return '<p>Không có mô tả chi tiết cho sản phẩm này.</p>';
  return desc.split('\n').map(line => {
    line = line.trim();
    if (line.startsWith('-')) {
      return `<li>${line.substring(1).trim()}</li>`;
    }
    return `<p>${line}</p>`;
  }).join('');
}

// Thay đổi số lượng trên modal chi tiết
window.adjustDetailQty = function(delta) {
  const qtyInput = document.getElementById("detail-qty-input");
  if (!qtyInput) return;

  const addBtn = document.querySelector(".btn-add-detail-cart");
  if (!addBtn) return;
  
  const match = addBtn.getAttribute("onclick").match(/'([^']+)'/);
  if (!match) return;
  const productId = match[1];
  const product = currentProducts.find(p => p.id === productId);
  if (!product) return;

  let currentVal = parseInt(qtyInput.value, 10);
  if (isNaN(currentVal)) currentVal = 1;

  const newVal = currentVal + delta;
  if (newVal >= 1 && newVal <= product.quantity) {
    qtyInput.value = newVal;
  } else if (newVal > product.quantity) {
    const unit = product.category === 'ca-canh' ? 'đôi' : 'cái';
    showToast(`Chỉ còn ${product.quantity} ${unit} trong kho!`, "warning");
  }
};

// Thêm vào giỏ hàng với số lượng xác định từ modal chi tiết
window.addDetailedToCart = function(productId) {
  const product = currentProducts.find(p => p.id === productId);
  if (!product) return;

  if (product.status === 'out-of-stock' || product.quantity <= 0) {
    showToast("Sản phẩm đã hết hàng!", "error");
    return;
  }

  const qtyInput = document.getElementById("detail-qty-input");
  const qtyToAdd = qtyInput ? parseInt(qtyInput.value, 10) : 1;

  if (isNaN(qtyToAdd) || qtyToAdd <= 0) {
    showToast("Số lượng chọn không hợp lệ!", "warning");
    return;
  }

  const existingItem = shoppingCart.find(item => item.id === productId);
  const currentQtyInCart = existingItem ? existingItem.qty : 0;

  if (currentQtyInCart + qtyToAdd > product.quantity) {
    const unit = product.category === 'ca-canh' ? 'đôi' : 'cái';
    showToast(`Không thể thêm! Tổng số lượng vượt quá tồn kho (${product.quantity} ${unit})`, "warning");
    return;
  }

  if (existingItem) {
    existingItem.qty += qtyToAdd;
  } else {
    shoppingCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      maxQty: product.quantity,
      qty: qtyToAdd
    });
  }

  saveCart();
  updateCartUI();
  toggleProductDetailModal(false);
  showToast(`Đã thêm ${qtyToAdd} "${product.name}" vào giỏ hàng`);
};

// Đóng các modal khi bấm nút ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleProductDetailModal(false);
    toggleCart(false);
  }
});

// Lưu mã đơn hàng đã đặt trên thiết bị này
function saveDeviceOrderId(orderId) {
  try {
    let ids = JSON.parse(localStorage.getItem("aquatica_device_order_ids") || "[]");
    if (!ids.includes(orderId)) {
      ids.push(orderId);
      localStorage.setItem("aquatica_device_order_ids", JSON.stringify(ids));
    }
  } catch (e) {
    console.error("Lỗi lưu ID đơn hàng vào thiết bị:", e);
  }
}

// Tự động điền thông tin khách vãng lai đã lưu
function fillGuestCheckoutInfo() {
  // Chỉ tự động điền nếu người dùng CHƯA đăng nhập tài khoản chính thức (nếu đã đăng nhập, thông tin điền từ profile)
  const isCustomerLoggedIn = localStorage.getItem("aquatica_mock_user") !== null || (auth && auth.currentUser !== null);
  if (isCustomerLoggedIn) return;

  try {
    const guestInfoStr = localStorage.getItem("aquatica_guest_info");
    if (guestInfoStr) {
      const guestInfo = JSON.parse(guestInfoStr);
      const checkoutName = document.getElementById("checkout-name");
      const checkoutPhone = document.getElementById("checkout-phone");
      const checkoutAddress = document.getElementById("checkout-address");
      
      if (checkoutName && guestInfo.name) checkoutName.value = guestInfo.name;
      if (checkoutPhone && guestInfo.phone) checkoutPhone.value = guestInfo.phone;
      if (checkoutAddress && guestInfo.address) checkoutAddress.value = guestInfo.address;
    } else {
      // Xóa trắng nếu không có dữ liệu lưu
      const checkoutName = document.getElementById("checkout-name");
      const checkoutPhone = document.getElementById("checkout-phone");
      const checkoutAddress = document.getElementById("checkout-address");
      if (checkoutName) checkoutName.value = "";
      if (checkoutPhone) checkoutPhone.value = "";
      if (checkoutAddress) checkoutAddress.value = "";
    }
  } catch (e) {
    console.error("Lỗi tự động điền thông tin khách vãng lai:", e);
  }
}
