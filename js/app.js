// ThreadCraft Global Application Logic

// Initializing Storage
let cart = JSON.parse(localStorage.getItem('threadcraft_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('threadcraft_wishlist')) || [];
const PROMO_CODES = {
  'WELCOME10': 0.10,
  'TCFABRIC': 0.15,
  'WEAVE20': 0.20
};
let activeDiscount = 0; // percentage

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('threadcraft_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('threadcraft_theme', newTheme);
  updateThemeIcons(newTheme);
  showToast(`Switched to ${newTheme} theme`);
}

function updateThemeIcons(theme) {
  const themeBtns = document.querySelectorAll('.theme-toggle-btn i');
  themeBtns.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'ri-sun-line';
    } else {
      icon.className = 'ri-moon-line';
    }
  });
}

// Toast Notification utility
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="ri-${type === 'success' ? 'checkbox-circle-fill' : 'error-warning-fill'}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Auto remove
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Update Badges UI
function updateBadges() {
  const cartBadges = document.querySelectorAll('.cart-badge');
  const wishBadges = document.querySelectorAll('.wish-badge');
  
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  cartBadges.forEach(badge => {
    badge.textContent = totalCartItems;
    badge.style.display = totalCartItems > 0 ? 'flex' : 'none';
  });
  
  wishBadges.forEach(badge => {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  });
}

// Add to Cart
function addToCart(productId, size = 'M', quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size: size,
      quantity: quantity
    });
  }
  
  localStorage.setItem('threadcraft_cart', JSON.stringify(cart));
  updateBadges();
  showToast(`Added ${quantity} x ${product.title} (${size}) to Cart`);
}

// Toggle Wishlist
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed from Wishlist`, 'error');
  } else {
    wishlist.push(productId);
    showToast(`Added to Wishlist`);
  }
  
  localStorage.setItem('threadcraft_wishlist', JSON.stringify(wishlist));
  updateBadges();
  
  // Re-draw heart icons if they exist on buttons
  const wishButtons = document.querySelectorAll(`.wish-btn-${productId}`);
  wishButtons.forEach(btn => {
    btn.classList.toggle('active', wishlist.includes(productId));
    const h = btn.querySelector('i');
    if (h) {
      h.className = wishlist.includes(productId) ? 'ri-heart-3-fill' : 'ri-heart-3-line';
    }
  });
}

// Global Operations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme
  initTheme();
  
  // Bind Theme Toggle Buttons
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Global Toast Container creation if missing
  if (!document.getElementById('toast-container')) {
    const tc = document.createElement('div');
    tc.id = 'toast-container';
    tc.className = 'toast-container';
    document.body.appendChild(tc);
  }
  
  // Inject Header and Footer dynamically if targets are empty or if we want standard static builds.
  // For multipage standalone files, we can include static HTML headers but run shared script features:
  initializeStickyHeader();
  initializeMobileMenu();
  initializeHeaderSearch();
  updateBadges();
  
  // Run scripts depending on page identifier
  const pagePath = window.location.pathname;
  const pageFile = pagePath.substring(pagePath.lastIndexOf('/') + 1);
  
  if (
    pageFile === '' ||
    pageFile === 'index.html' ||
    pageFile === 'index'
) {
    renderHomeCollections();
}
else if (
    pageFile === 'products.html' ||
    pageFile === 'products'
) {
    initCatalogPage();
}
else if (
    pageFile === 'product-details.html' ||
    pageFile === 'product-details'
) {
    initProductDetailsPage();
}
else if (
    pageFile === 'cart.html' ||
    pageFile === 'cart'
) {
    initCartPage();
}
});

// Sticky Header logic
function initializeStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile navigation menu triggers
function initializeMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = menu.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
    }
  });
}

// Global search box event
function initializeHeaderSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
      window.location.href = `products.html?search=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });
}

// HOME PAGE RENDERINGS
function renderHomeCollections() {
  const featuredGrid = document.getElementById('featured-products-grid');
  const arrivalsGrid = document.getElementById('new-arrivals-grid');
  
  if (featuredGrid) {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
    featuredGrid.innerHTML = featured.map(p => createProductCardHtml(p)).join('');
  }
  
  if (arrivalsGrid) {
    const arrivals = PRODUCTS.filter(p => p.newArrival).slice(0, 4);
    arrivalsGrid.innerHTML = arrivals.map(p => createProductCardHtml(p)).join('');
  }
  
  // Home tab toggles for main product row
  const tabButtons = document.querySelectorAll('.home-tabs .tab-btn');
  const tabsTarget = document.getElementById('home-tab-products');
  
  if (tabButtons.length > 0 && tabsTarget) {
    const loadTab = (type) => {
      let filtered = [];
      if (type === 'all') filtered = PRODUCTS.slice(0, 8);
      else if (type === 'best') filtered = PRODUCTS.filter(p => p.bestSeller);
      else if (type === 'new') filtered = PRODUCTS.filter(p => p.newArrival);
      else if (type === 'featured') filtered = PRODUCTS.filter(p => p.featured);
      
      tabsTarget.innerHTML = filtered.map(p => createProductCardHtml(p)).join('');
    };
    
    // Initial load
    loadTab('all');
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadTab(btn.dataset.tab);
      });
    });
  }
  
  // Initialize Simple Testimonial Slider
  initializeTestimonialSlider();
}

function createProductCardHtml(product) {
  const isWished = wishlist.includes(product.id);
  const heartClass = isWished ? 'ri-heart-3-fill' : 'ri-heart-3-line';
  const activeClass = isWished ? 'active' : '';
  const hasDiscount = product.discountPrice < product.price;
  const discPercent = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
  
  return `
    <div class="product-card" data-category="${product.category}">
      ${hasDiscount ? `<span class="badge-discount">-${discPercent}%</span>` : ''}
      <button class="card-wish-btn wish-btn-${product.id} ${activeClass}" onclick="toggleWishlist('${product.id}')" aria-label="Add to Wishlist">
        <i class="${heartClass}"></i>
      </button>
      <div class="prod-img-wrap">
        <a href="product-details.html?id=${product.id}">
          <img class="prod-img" src="${product.images[0]}" alt="${product.title}" loading="lazy" onerror="this.src='assets/default-fabric.png';">
          <img class="prod-img-hover" src="${product.images[1] || product.images[0]}" alt="${product.title}" loading="lazy" onerror="this.onerror=null; this.src=this.previousElementSibling.src;">
        </a>
        <div class="card-actions-overlay">
          <button class="btn btn-primary" style="flex: 1; padding: 10px;" onclick="addToCart('${product.id}', '${product.sizes[0]}', 1)">
            Add To Cart
          </button>
        </div>
      </div>
      <div class="prod-details">
        <div class="prod-cat">${product.category}</div>
        <a href="product-details.html?id=${product.id}">
          <h3 class="prod-title">${product.title}</h3>
        </a>
        <div class="prod-price">
          <span class="curr-price">₹${(product.discountPrice || product.price).toLocaleString('en-IN')}</span>
          ${hasDiscount ? `<span class="orig-price">₹${product.price.toLocaleString('en-IN')}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function initializeTestimonialSlider() {
  const reviews = [
    { text: "“The handspun cotton from ThreadCraft feels like a second skin. Dynamic drape, superb breathability, and authentic Indian roots in every thread.”", author: "Aurelia Sen", role: "Fashion Designer, Delhi" },
    { text: "“I bought the Banarasi Silk saree for my daughter's wedding rehearsal. The complexity and sheen of the weft borders received compliments all evening.”", author: "P. R. Krishnan", role: "Art Historian, Chennai" },
    { text: "“A truly premium brand. The sand-washed linen shirt has become my summer office wardrobe companion. Excellent minimal styling.”", author: "Mehul Mehta", role: "Creative Lead, Mumbai" }
  ];
  let curIndex = 0;
  
  const rc = document.getElementById('review-card-target');
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');
  
  if (!rc) return;
  
  const drawReview = (idx) => {
    rc.style.opacity = '0';
    setTimeout(() => {
      rc.innerHTML = `
        <div class="stars">
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
          <i class="ri-star-fill"></i>
        </div>
        <p class="review-text">${reviews[idx].text}</p>
        <div class="review-author">${reviews[idx].author} <span>${reviews[idx].role}</span></div>
      `;
      rc.style.opacity = '1';
    }, 200);
  };
  
  // Bind events
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      curIndex = (curIndex === 0) ? reviews.length - 1 : curIndex - 1;
      drawReview(curIndex);
    });
    nextBtn.addEventListener('click', () => {
      curIndex = (curIndex === reviews.length - 1) ? 0 : curIndex + 1;
      drawReview(curIndex);
    });
  }
}

// CATALOG PAGE INTERACTIVE FILTERING & SORTING
let currentFilters = {
  categories: [],
  priceMax: 9000,
  search: ''
};

function initCatalogPage() {
  const grid = document.getElementById('catalog-products-grid');
  if (!grid) return;
  
  // Resolve query parameters
  const params = new URLSearchParams(window.location.search);
  const searchFilter = params.get('search');
  const catFilter = params.get('category');
  
  if (searchFilter) {
    currentFilters.search = searchFilter.toLowerCase();
    const searchInput = document.querySelector('.search-input');
    if (searchInput) searchInput.value = searchFilter;
  }
  
  if (catFilter) {
    currentFilters.categories.push(catFilter);
    const cb = document.querySelector(`.category-checkbox[value="${catFilter}"]`);
    if (cb) cb.checked = true;
  }
  
  // Bind Checkboxes
  const checkboxes = document.querySelectorAll('.category-checkbox');
  checkboxes.forEach(box => {
    box.addEventListener('change', () => {
      if (box.checked) {
        currentFilters.categories.push(box.value);
      } else {
        currentFilters.categories = currentFilters.categories.filter(c => c !== box.value);
      }
      applyFilters();
    });
  });
  
  // Bind Price Range slider
  const slider = document.getElementById('price-slider');
  const sliderValue = document.getElementById('price-value-lbl');
  
  if (slider && sliderValue) {
    slider.addEventListener('input', (e) => {
      sliderValue.textContent = `₹${parseInt(e.target.value).toLocaleString('en-IN')}`;
      currentFilters.priceMax = parseInt(e.target.value);
      applyFilters();
    });
  }
  
  // Bind Sorters
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applyFilters();
    });
  }
  
  // Render
  applyFilters();
}

function applyFilters() {
  let filtered = [...PRODUCTS];
  
  // Apply Category Filters
  if (currentFilters.categories.length > 0) {
    filtered = filtered.filter(p => currentFilters.categories.includes(p.category));
  }
  
  // Apply Price Cap
  filtered = filtered.filter(p => (p.discountPrice || p.price) <= currentFilters.priceMax);
  
  // Apply Query String Search
  if (currentFilters.search) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(currentFilters.search) || 
      p.description.toLowerCase().includes(currentFilters.search) ||
      p.category.toLowerCase().includes(currentFilters.search)
    );
  }
  
  // Apply Sorting
  const sorter = document.getElementById('catalog-sort')?.value || 'default';
  if (sorter === 'price-low') {
    filtered.sort((a,b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sorter === 'price-high') {
    filtered.sort((a,b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  } else if (sorter === 'title-asc') {
    filtered.sort((a,b) => a.title.localeCompare(b.title));
  }
  
  // Write to Grid
  const grid = document.getElementById('catalog-products-grid');
  const countLbl = document.getElementById('catalog-product-count');
  
  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: span 3; text-align: center; padding: 60px 0;">
          <h3 style="font-size: 1.5rem; color: var(--text-muted);">No products match your criteria</h3>
          <p style="margin-top: 8px;">Try clearing filters or specifying a wider price range</p>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(p => createProductCardHtml(p)).join('');
    }
  }
  
  if (countLbl) {
    countLbl.textContent = `Showing ${filtered.length} products`;
  }
}

// PRODUCT DETAILS LAYOUTS
function initProductDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const pId = params.get('id') || 'saree-1';
  
  const product = PRODUCTS.find(p => p.id === pId);
  if (!product) return;
  
  // Write content
  document.getElementById('details-title').textContent = product.title;
  document.getElementById('details-category').innerHTML = `<a href="products.html">Collections</a> / <a href="products.html?category=${product.category}">${product.category}</a>`;
  
  const priceRow = document.getElementById('details-price');
  const isDisc = product.discountPrice < product.price;
  priceRow.innerHTML = `
    <span class="details-curr-price">₹${(product.discountPrice || product.price).toLocaleString('en-IN')}</span>
    ${isDisc ? `<span class="details-orig-price">₹${product.price.toLocaleString('en-IN')}</span>` : ''}
  `;
  
  document.getElementById('details-description-text').textContent = product.description;
  
  // Render Sizes
  const sizeContainer = document.getElementById('details-sizes');
  if (sizeContainer) {
    sizeContainer.innerHTML = product.sizes.map((s, idx) => `
      <div class="size-chip ${idx === 0 ? 'active' : ''}" data-size="${s}" onclick="selectSizeChip(this)">
        ${s}
      </div>
    `).join('');
  }
  
  // Render Image Gallery
  const thumbs = document.getElementById('thumb-list-target');
  const mainImgWrap = document.getElementById('main-image-container');
  
  if (thumbs && mainImgWrap) {
    // Fill thumbs
    thumbs.innerHTML = product.images.map((imgUrl, idx) => `
      <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="changeDetailImage(this, '${imgUrl}')">
        <img src="${imgUrl}" alt="${product.title}" onerror="this.src='assets/default-fabric.png';">
      </div>
    `).join('');
    
    // Fill Main
    mainImgWrap.innerHTML = `
      <img id="detail-main-img" src="${product.images[0]}" alt="${product.title}" onerror="this.src='assets/default-fabric.png';">
    `;
  }
  
  // Specs rendering
  const tabContainer = document.getElementById('spec-details-table');
  if (tabContainer) {
    let specRows = '';
    for (const [key, value] of Object.entries(product.specs)) {
      specRows += `
        <tr>
          <td>${key}</td>
          <td>${value}</td>
        </tr>
      `;
    }
    tabContainer.innerHTML = specRows;
  }
  
  // Similar products recommender
  renderSimilarProducts(product);
  
  // Setup CTA bindings
  const cartBtn = document.getElementById('details-add-cart-btn');
  const waBtn = document.getElementById('details-buy-wa-btn');
  
  if (cartBtn) {
    cartBtn.onclick = () => {
      const activeSize = document.querySelector('.size-chip.active')?.dataset.size || 'Standard';
      const quantity = parseInt(document.getElementById('details-qty')?.textContent || 1);
      addToCart(product.id, activeSize, quantity);
    };
  }
  
  if (waBtn) {
    waBtn.onclick = () => {
      const activeSize = document.querySelector('.size-chip.active')?.dataset.size || 'Standard';
      const quantity = parseInt(document.getElementById('details-qty')?.textContent || 1);
      
      const phoneNum = "919876543210"; // Placeholder Business WhatsApp Link number
      const formattedMessage = `Hello ThreadCraft, I'd like to purchase:\n\n*Product:* ${product.title}\n*Size:* ${activeSize}\n*Quantity:* ${quantity}\n*Price:* ₹${(product.discountPrice || product.price).toLocaleString('en-IN')}\n\nCan you confirm availability?`;
      
      window.open(`https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(formattedMessage)}`, '_blank');
    };
  }
}

function selectSizeChip(chipElement) {
  const chips = document.querySelectorAll('.size-chip');
  chips.forEach(c => c.classList.remove('active'));
  chipElement.classList.add('active');
}

function changeDetailImage(thumbElement, imgUrl) {
  const items = document.querySelectorAll('.thumb-item');
  items.forEach(it => it.classList.remove('active'));
  thumbElement.classList.add('active');
  
  const mainImg = document.getElementById('detail-main-img');
  if (mainImg) {
    mainImg.src = imgUrl;
  }
}

// Select quantity change triggers
function adjustQuantity(direction) {
  const qtyIndicator = document.getElementById('details-qty');
  if (!qtyIndicator) return;
  let q = parseInt(qtyIndicator.textContent);
  if (direction === 'up') q++;
  if (direction === 'down' && q > 1) q--;
  qtyIndicator.textContent = q;
}

function renderSimilarProducts(curProduct) {
  const recGrid = document.getElementById('similar-products-grid');
  if (!recGrid) return;
  
  const similar = PRODUCTS.filter(p => p.category === curProduct.category && p.id !== curProduct.id).slice(0, 4);
  
  if (similar.length === 0) {
    // fall back to featured
    const fallbacks = PRODUCTS.filter(p => p.id !== curProduct.id).slice(0, 4);
    recGrid.innerHTML = fallbacks.map(p => createProductCardHtml(p)).join('');
  } else {
    recGrid.innerHTML = similar.map(p => createProductCardHtml(p)).join('');
  }
}

// CART PAGE CALCULATOR & LISTINGS
function initCartPage() {
  const itemsContainer = document.getElementById('cart-items-target');
  const summaryBox = document.getElementById('cart-summary-box');
  
  if (!itemsContainer) return;
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <i class="ri-shopping-bag-2-line empty-cart-icon"></i>
        <h2>Your Shopping Cart is Empty</h2>
        <p style="color: var(--text-muted); margin: 12px 0 30px 0;">Explore our catalog featuring handloom Banarasi silk, khadi linens and organic shirts.</p>
        <a href="products.html" class="btn btn-primary">Discover Collections</a>
      </div>
    `;
    if (summaryBox) summaryBox.style.display = 'none';
    return;
  }
  
  if (summaryBox) summaryBox.style.display = 'block';
  
  // Render items
  itemsContainer.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/default-fabric.png';">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-title">${item.title}</h3>
        <div class="cart-item-meta">
          <span>Size: <strong>${item.size}</strong></span>
        </div>
        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
      </div>
      <div class="qty-control" style="margin-right: 12px;">
        <button class="qty-btn" onclick="updateCartQuantity(${idx}, 'down')"><i class="ri-subtract-line"></i></button>
        <div class="qty-num">${item.quantity}</div>
        <button class="qty-btn" onclick="updateCartQuantity(${idx}, 'up')"><i class="ri-add-line"></i></button>
      </div>
      <button class="cart-remove-btn" onclick="removeCartItem(${idx})" aria-label="Remove item">
        <i class="ri-delete-bin-6-line"></i>
      </button>
    </div>
  `).join('');
  
  recalculateCartRows();
}

function updateCartQuantity(index, direction) {
  if (direction === 'up') {
    cart[index].quantity++;
  } else if (direction === 'down' && cart[index].quantity > 1) {
    cart[index].quantity--;
  }
  
  localStorage.setItem('threadcraft_cart', JSON.stringify(cart));
  updateBadges();
  initCartPage(); // Redraw
}

function removeCartItem(index) {
  const removedName = cart[index].title;
  cart.splice(index, 1);
  localStorage.setItem('threadcraft_cart', JSON.stringify(cart));
  updateBadges();
  showToast(`Removed ${removedName} from cart`, 'error');
  initCartPage(); // Redraw
}

function applyPromoCode() {
  const codeInput = document.getElementById('promo-input');
  if (!codeInput) return;
  const val = codeInput.value.trim().toUpperCase();
  
  if (PROMO_CODES[val]) {
    activeDiscount = PROMO_CODES[val];
    showToast(`Promo applied! You saved ${activeDiscount * 100}%`);
    recalculateCartRows();
  } else {
    showToast(`Invalid promo code`, 'error');
  }
}

function recalculateCartRows() {
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountVal = cartSubtotal * activeDiscount;
  const shippingVal = cartSubtotal > 5000 ? 0 : 250;
  const totalVal = cartSubtotal - discountVal + shippingVal;
  
  document.getElementById('sum-subtotal').textContent = `₹${cartSubtotal.toLocaleString('en-IN')}`;
  document.getElementById('sum-discount').textContent = `-₹${discountVal.toLocaleString('en-IN')}`;
  document.getElementById('sum-shipping').textContent = shippingVal === 0 ? 'FREE' : `₹${shippingVal.toLocaleString('en-IN')}`;
  document.getElementById('sum-total').textContent = `₹${totalVal.toLocaleString('en-IN')}`;
  
  // Set up click handlers for Checkout actions
  const checkoutBtn = document.getElementById('btn-web-checkout');
  const waCheckBtn = document.getElementById('btn-wa-checkout');
  
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      showToast("Thank you for choosing ThreadCraft. Custom online payment options are currently simulating. Directing to checkout.");
      setTimeout(() => {
        alert(`Order Placed Successfully!\nTotal Paid: ₹${totalVal.toLocaleString('en-IN')}\n\nWe will mail your order details shortly.`);
        cart = [];
        localStorage.setItem('threadcraft_cart', JSON.stringify(cart));
        updateBadges();
        window.location.href = "index.html";
      }, 1000);
    };
  }
  
  if (waCheckBtn) {
    waCheckBtn.onclick = () => {
      sendWhatsAppCartOrder(cartSubtotal, discountVal, shippingVal, totalVal);
    };
  }
}

function sendWhatsAppCartOrder(subTotal, discount, shipping, total) {
  let listTxt = '';
  cart.forEach((item, index) => {
    listTxt += `${index + 1}. *${item.title}* - Size: ${item.size} | Qty: ${item.quantity} | Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
  });
  
  const phone = "919876543210";
  const message = `Hello ThreadCraft, I'd like to place an order via WhatsApp:\n\n*Items Purchased:*\n${listTxt}\n*Summary:*\nSubtotal: ₹${subTotal.toLocaleString('en-IN')}\nDiscount Applied: -₹${discount.toLocaleString('en-IN')}\nShipping: ${shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString('en-IN')}\n*Grand Total: ₹${total.toLocaleString('en-IN')}*\n\nPlease let me know the payment instructions. Thank you!`;
  
  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
}
