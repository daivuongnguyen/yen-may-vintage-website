// =====================================================
// 🎨 YEN MAY VINTAGE - MAIN SCRIPT
// =====================================================
// This script renders the website content from config.js
// =====================================================

let siteData = {
  products: [],
  community: [],
  siteImages: {},
  siteContent: {}
};

document.addEventListener('DOMContentLoaded', async function () {
  // 1. Load initial static content (from config.js)
  renderAll();

  // 2. Try to fetch dynamic data (Favor Supabase, fallback to Sheets)
  await syncData();
});

function renderAll(filteredProducts = null) {
  renderHeader();
  renderHero();
  renderBrandHeart();
  renderGallery(filteredProducts);
  renderCommunity();
  renderPrestige();
  renderOasis();
  renderLocation();
  renderFooter();

  // Initialize Scroll Reveals
  initRevealObserver();
}

function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

async function syncData() {
  const sb = CONFIG.supabase;

  // 🚀 Option 1: Supabase (High Speed)
  if (sb && sb.url && sb.anonKey) {
    try {
      console.log("Connective to Supabase for high-speed data...");
      const client = supabase.createClient(sb.url, sb.anonKey);

      const [pRes, cRes] = await Promise.all([
        client.from('products').select('*').order('created_at', { ascending: false }),
        client.from('community').select('*').order('created_at', { ascending: false })
      ]);

      if (pRes.data) {
        siteData.products = pRes.data.map(p => ({
          ...p,
          image: p.images ? p.images[0] : '', // Backward compatibility
          imageAlt: p.image_alt || p.title
        }));
      }
      if (cRes.data) {
        siteData.community = cRes.data.map(c => ({
          image: c.image,
          alt: c.alt,
          username: c.username,
          date: c.display_date
        }));
      }

      if (siteData.products.length > 0 || siteData.community.length > 0) {
        applyFetchedData();
        renderAll();
        console.log("Supabase sync complete!");
        return; // Success!
      }
    } catch (e) {
      console.warn("Supabase failed, trying Sheets...", e);
    }
  }

  // 🐢 Option 2: Google Sheets (Fallback)
  await syncDataFromSheets();
}

async function syncDataFromSheets() {
  console.log("Syncing data from Google Sheets fallback...");
  const urls = CONFIG.googleSheetUrls;
  if (!urls || (!urls.products && !urls.community)) return;

  try {
    const fetchPromises = [];
    if (urls.products) fetchPromises.push(fetchCSV(urls.products).then(data => siteData.products = data));
    if (urls.community) fetchPromises.push(fetchCSV(urls.community).then(data => siteData.community = data));

    await Promise.all(fetchPromises);
    applyFetchedData();
    renderAll();
  } catch (error) {
    console.error("Error syncing Sheets:", error);
  }
}

async function fetchCSV(url) {
  // Add cache buster to URL
  const finalUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
  const response = await fetch(finalUrl);
  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const lines = text.split('\n');
  // Auto-detect delimiter (TSV uses tab, CSV uses comma)
  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const currentLine = lines[i].split(delimiter);
    const obj = {};
    headers.forEach((header, index) => {
      let value = currentLine[index] ? currentLine[index].trim().replace(/^"|"$/g, '') : "";
      // Handle 'images' field - convert comma-separated string to array
      if (header === 'images' && value) {
        obj[header] = value.split(',').map(s => s.trim());
        obj['image'] = obj[header][0]; // First image as main for backward compatibility
      } else {
        obj[header] = value;
      }
    });
    result.push(obj);
  }
  return result;
}

function applyFetchedData() {
  // Products
  if (siteData.products.length > 0) {
    CONFIG.gallery.items = siteData.products;
  }

  // Community
  if (siteData.community.length > 0) {
    CONFIG.community.photos = siteData.community;
  }

  // Site Images Mapping
  if (Object.keys(siteData.siteImages).length > 0) {
    const si = siteData.siteImages;
    if (si.hero_bg) CONFIG.hero.backgroundImage = si.hero_bg;
    if (si.brand_heart_img) CONFIG.brandHeart.featureImage = si.brand_heart_img;
    if (si.oasis_main) CONFIG.oasis.images.main = si.oasis_main;
    if (si.oasis_sec1) CONFIG.oasis.images.secondary1 = si.oasis_sec1;
    if (si.oasis_sec2) CONFIG.oasis.images.secondary2 = si.oasis_sec2;
  }

  // Site Content Mapping
  if (Object.keys(siteData.siteContent).length > 0) {
    const sc = siteData.siteContent;
    if (sc.brand_name) CONFIG.brand.name = sc.brand_name;
    if (sc.brand_tagline) CONFIG.brand.tagline = sc.brand_tagline;
    if (sc.hero_description) CONFIG.hero.description = sc.hero_description;
    // ... add more mappings as needed
  }
}

// ─────────────────────────────────────────────────────
// Helper: Create star SVG
// ─────────────────────────────────────────────────────
function createStarSVG(className = '') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('viewBox', '0 0 24 24');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z');
  svg.appendChild(path);
  return svg;
}

// ─────────────────────────────────────────────────────
// Render Header
// ─────────────────────────────────────────────────────
function renderHeader() {
  const headerWrapper = document.getElementById('header-wrapper');

  // Navigation
  const navHtml = CONFIG.navigation.map(item =>
    `<a href="${item.href}">${item.label}</a>`
  ).join('');

  headerWrapper.innerHTML = `
    <div class="header-container">
      <header>
        <a class="logo" href="#top">
          <span class="logo-name">${CONFIG.brand.name}</span>
          <span class="logo-tagline">${CONFIG.brand.tagline}</span>
        </a>
        <nav>${navHtml}</nav>
        <div class="header-actions">
          <a class="ig-button" href="${CONFIG.brand.instagramUrl}" target="_blank">
            Follow on IG
          </a>
          <button class="mobile-menu-btn">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Render Hero Section
// ─────────────────────────────────────────────────────
function renderHero() {
  const hero = document.getElementById('hero');

  hero.innerHTML = `
    <div class="hero-bg" style="background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url('${CONFIG.hero.backgroundImage}');"></div>
    <div class="hero-grain vintage-grain"></div>
    <div class="hero-content">
      <div class="hero-badge-wrapper">
        <span class="hero-badge">${CONFIG.brand.established}</span>
        <svg class="hero-badge-star" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"></path>
        </svg>
      </div>
      <h1 class="hero-heading">
        ${CONFIG.hero.headingLine1}<br/>${CONFIG.hero.headingLine2}
      </h1>
      <p class="hero-description">${CONFIG.hero.description}</p>
      <a class="hero-cta" href="#gallery">
        <span>${CONFIG.hero.buttonText}</span>
        <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Render Brand Heart Section
// ─────────────────────────────────────────────────────
function renderBrandHeart() {
  const section = document.getElementById('brand-heart');

  const featuresHtml = CONFIG.brandHeart.features.map(feature => `
    <div class="feature-card">
      <div class="feature-card-corner"></div>
      <span class="material-symbols-outlined">${feature.icon}</span>
      <h4>${feature.title}</h4>
      <p>${feature.description}</p>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-container">
      <div class="brand-heart-grid">
        <div class="brand-heart-content">
          <div>
            <div class="label-with-line">
              <span class="section-label">${CONFIG.brandHeart.sectionLabel}</span>
              <div class="label-line"></div>
            </div>
            <h2 class="brand-heart-heading">
              ${CONFIG.brandHeart.headingLine1}<br/>
              ${CONFIG.brandHeart.headingLine2}<br/>
              <span class="highlight">
                ${CONFIG.brandHeart.headingLine3}
                <svg class="star" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9L12 0Z"></path>
                </svg>
              </span>
            </h2>
            <p class="brand-heart-description">${CONFIG.brandHeart.description}</p>
          </div>
          <div class="features-grid">
            ${featuresHtml}
          </div>
        </div>
        <div class="brand-heart-image-wrapper">
          <div class="image-bg-layer"></div>
          <div class="image-border-layer"></div>
          <div class="image-container">
            <img src="${CONFIG.brandHeart.featureImage}" alt="${CONFIG.brandHeart.featureImageAlt}"/>
          </div>
          <div class="authentic-badge">100%<br/>AUTHENTIC</div>
          <div class="tape-decoration masking-tape"></div>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Render Gallery Section
// ─────────────────────────────────────────────────────
function renderGallery(filteredProducts = null) {
  const section = document.getElementById('gallery');

  // Use filtered set if provided, otherwise use all from CONFIG
  const displayItems = filteredProducts || CONFIG.gallery.items;

  // Get unique categories for filtering
  const categories = ['All', ...new Set(CONFIG.gallery.items.map(item => item.category).filter(Boolean))];

  const filterHtml = categories.length > 1 ? `
        <div class="category-filters">
            ${categories.map(cat => `
                <button class="filter-btn ${(!filteredProducts && cat === 'All') || (filteredProducts && filteredProducts[0]?.category === cat) ? 'active' : ''}" 
                        onclick="filterByCategory('${cat}')">
                    ${cat}
                </button>
            `).join('')}
        </div>
    ` : '';

  const itemsHtml = displayItems.map((item, index) => {
    const rotation = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'][index % 6];
    const badgeHtml = item.badge ?
      `<div class="gallery-item-badge">${item.badge}</div>` : '';

    const isSoldOut = item.status?.toLowerCase() === 'sold out';
    const isReserved = item.status?.toLowerCase() === 'reserved';

    // Multi-image support
    const mainImage = item.images?.[0] || item.image;
    const imageCount = item.images?.length || (item.image ? 1 : 0);
    const multiImageBadge = imageCount > 1 ? `<div class="multi-image-badge"><span class="material-symbols-outlined">photo_library</span>${imageCount}</div>` : '';

    // Find original index for lightbox
    const originalIndex = CONFIG.gallery.items.findIndex(p => p.title === item.title);

    return `
      <div class="gallery-item ${isSoldOut ? 'sold-out' : ''} reveal" onclick="openProductLightbox(${originalIndex})" style="cursor:pointer">
        <div class="gallery-item-tape masking-tape" style="transform: translateX(-50%) ${rotation.includes('-') ? 'rotate(-1deg)' : 'rotate(1deg)'}"></div>
        <div class="gallery-item-image-wrapper">
          <img src="${mainImage}" alt="${item.imageAlt}" loading="lazy"/>
          ${badgeHtml}
          ${multiImageBadge}
          ${isReserved ? `<div class="reserved-tag">RESERVED</div>` : ''}
          ${isSoldOut ? `<div class="sold-out-overlay">SOLD OUT</div>` : ''}
          <div class="gallery-item-overlay">
            <span class="gallery-item-title">${item.title}</span>
          </div>
        </div>
        <div class="gallery-item-info-external">
          <span class="gallery-item-title-external">${item.title}</span>
          <span class="gallery-item-meta-external">${item.status} • ${item.size}</span>
        </div>
      </div>
    `;
  }).join('');

  section.innerHTML = `
    <div class="section-container">
      <div class="gallery-header">
        <div class="gallery-circle-decoration"></div>
        <div>
          <div class="gallery-label-wrapper">
            <span class="gallery-label-dot"></span>
            <span class="section-label">${CONFIG.gallery.sectionLabel}</span>
          </div>
          <div class="gallery-heading-wrapper">
            <h2 class="gallery-heading">
              ${CONFIG.gallery.headingLine1}<br/>
              <span class="gradient-text">${CONFIG.gallery.headingLine2}</span>
            </h2>
            <svg class="gallery-star-decoration" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"></path>
            </svg>
          </div>
        </div>
        <div class="gallery-header-right">
          <p>${CONFIG.gallery.description}</p>
          <a href="${CONFIG.brand.instagramUrl}">
            ${CONFIG.gallery.ctaText}
            <span class="material-symbols-outlined">arrow_outward</span>
          </a>
        </div>
      </div>
      
      ${filterHtml}

      <div class="gallery-grid">
        ${itemsHtml}
      </div>
      <div class="gallery-view-more">
        <div class="gallery-view-more-line"></div>
        <a class="gallery-view-more-btn" href="${CONFIG.brand.instagramUrl}" target="_blank">
          ${CONFIG.gallery.viewMoreText}
          <span class="material-symbols-outlined">open_in_new</span>
        </a>
      </div>
    </div>
  `;
}

function filterByCategory(category) {
  if (category === 'All') {
    renderAll();
  } else {
    const filtered = CONFIG.gallery.items.filter(item => item.category === category);
    renderAll(filtered);
  }
}

// ─────────────────────────────────────────────────────
// Render Community Section
// ─────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────
// Render Community Section
// ─────────────────────────────────────────────────────
window.communityVisibleCount = 9; // Initial 3x3

function renderCommunity() {
  const section = document.getElementById('community');
  const allPhotos = CONFIG.community.photos;
  const visiblePhotos = allPhotos.slice(0, window.communityVisibleCount);

  const photosHtml = visiblePhotos.map((photo, index) => `
    <div class="community-photo reveal" style="--delay: ${index % 4}" onclick="openCommunityLightbox(${index})">
      <img src="${photo.image}" alt="${photo.alt}" loading="lazy"/>
      <div class="community-photo-grain vintage-grain"></div>
      <div class="community-photo-overlay">
        ${photo.username ? `<span class="community-photo-username">${photo.username}</span>` : ''}
        ${photo.date ? `<span class="community-photo-date">${photo.date}</span>` : ''}
      </div>
    </div>
  `).join('');

  const loadMoreBtn = window.communityVisibleCount < allPhotos.length
    ? `<div style="text-align:center; margin-top: 2rem;">
         <button onclick="loadMoreCommunity()" class="btn-outline" style="background:white; padding: 10px 24px; border-radius: 99px; font-family: 'Syne'; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s;">
           Load More (${allPhotos.length - window.communityVisibleCount})
         </button>
       </div>`
    : '';

  section.innerHTML = `
    <div class="section-container">
      <div class="community-header">
        <span class="section-label">${CONFIG.community.sectionLabel}</span>
        <h2 class="community-heading">${CONFIG.community.heading}</h2>
        <svg class="community-star" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"></path>
        </svg>
        <p class="community-description">
          ${CONFIG.community.description} Tag <span class="highlight">${CONFIG.brand.instagramHandle}</span> ${CONFIG.community.tagPrompt}
        </p>
      </div>
      <div class="community-grid">
        ${photosHtml}
      </div>
      ${loadMoreBtn}
    </div>
  `;
}

window.loadMoreCommunity = function () {
  window.communityVisibleCount += 9;
  renderCommunity();
}

// ─────────────────────────────────────────────────────
// Community Lightbox Logic
// ─────────────────────────────────────────────────────
let communityLightboxIndex = 0;

window.openCommunityLightbox = function (index) {
  const images = CONFIG.community.photos;
  communityLightboxIndex = index;

  let lightbox = document.getElementById('community-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'community-lightbox';
    lightbox.className = 'lightbox-overlay'; // Reuse existing class
    lightbox.style.display = 'none';
    document.body.appendChild(lightbox);
  }

  updateCommunityLightbox();
  lightbox.style.display = 'flex';
  setTimeout(() => lightbox.style.opacity = '1', 10);
  document.body.style.overflow = 'hidden';

  // Add key listener
  document.addEventListener('keydown', handleCommunityLightboxKey);
}

window.closeCommunityLightbox = function () {
  const lightbox = document.getElementById('community-lightbox');
  if (lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  }
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleCommunityLightboxKey);
}

window.nextCommunityImage = function (e) {
  if (e) e.stopPropagation();
  const total = CONFIG.community.photos.length;
  communityLightboxIndex = (communityLightboxIndex + 1) % total;
  updateCommunityLightbox();
}

window.prevCommunityImage = function (e) {
  if (e) e.stopPropagation();
  const total = CONFIG.community.photos.length;
  communityLightboxIndex = (communityLightboxIndex - 1 + total) % total;
  updateCommunityLightbox();
}

function updateCommunityLightbox() {
  const lightbox = document.getElementById('community-lightbox');
  const photo = CONFIG.community.photos[communityLightboxIndex];

  if (!lightbox) return;

  lightbox.innerHTML = `
    <button class="lightbox-close" onclick="closeCommunityLightbox()">
      <span class="material-symbols-outlined">close</span>
    </button>
    
    <button class="lightbox-nav lightbox-prev" onclick="prevCommunityImage(event)">
      <span class="material-symbols-outlined">arrow_back</span>
    </button>

    <div class="lightbox-content" onclick="event.stopPropagation()">
       <div class="lightbox-image-container" style="background:transparent; box-shadow:none;">
          <img src="${photo.image}" class="lightbox-image" style="max-height:85vh; border-radius:4px;">
       </div>
       <div class="lightbox-info" style="margin-top:1rem;">
          ${photo.username ? `<h3 style="margin-bottom:0;">${photo.username}</h3>` : ''}
          ${photo.date ? `<p style="opacity:0.7;">${photo.date}</p>` : ''}
       </div>
    </div>

    <button class="lightbox-nav lightbox-next" onclick="nextCommunityImage(event)">
      <span class="material-symbols-outlined">arrow_forward</span>
    </button>
  `;
}

function handleCommunityLightboxKey(e) {
  if (e.key === 'Escape') closeCommunityLightbox();
  if (e.key === 'ArrowRight') nextCommunityImage();
  if (e.key === 'ArrowLeft') prevCommunityImage();
}

// ─────────────────────────────────────────────────────
// Render Prestige Section
// ─────────────────────────────────────────────────────
function renderPrestige() {
  const section = document.getElementById('prestige');

  const logosHtml = CONFIG.prestige.pressLogos.map((logo, index) => {
    const classes = ['prestige-logo'];
    if (index === 1) classes.push('italic');
    if (index === 2) classes.push('uppercase');
    return `<div class="${classes.join(' ')}">${logo}</div>`;
  }).join('');

  const reviewsHtml = CONFIG.prestige.reviews.map(review => `
    <div class="review-card">
      <div class="review-card-gradient"></div>
      <div class="review-stars">
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
      </div>
      <h3 class="review-title">"${review.title}"</h3>
      <p class="review-text">"${review.text}"</p>
      <div class="review-author">
        <img src="${review.authorImage}" alt="${review.authorName}"/>
        <div>
          <div class="review-author-name">${review.authorName}</div>
          <div class="review-author-platform">${review.platform}</div>
        </div>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-container">
      <div class="prestige-header">
        <h2 class="prestige-heading">${CONFIG.prestige.heading}</h2>
        <div class="prestige-underline"></div>
      </div>
      <div class="prestige-logos">
        ${logosHtml}
      </div>
      <div class="reviews-grid">
        ${reviewsHtml}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Render Oasis Section
// ─────────────────────────────────────────────────────
function renderOasis() {
  const section = document.getElementById('oasis');

  const featuresHtml = CONFIG.oasis.features.map(feature => `
    <div class="oasis-feature">
      <div class="oasis-feature-icon">
        <span class="material-symbols-outlined">${feature.icon}</span>
      </div>
      <div>
        <h4>${feature.title}</h4>
        <p>${feature.description}</p>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="oasis-bg-stripe"></div>
    <div class="oasis-container section-container">
      <div class="oasis-grid">
        <div class="oasis-images">
          <div class="oasis-images-grid">
            <div class="oasis-image-main">
              <img src="${CONFIG.oasis.images.main}" alt="${CONFIG.oasis.images.mainAlt}"/>
              <div class="oasis-image-grain vintage-grain"></div>
            </div>
            <div class="oasis-image-secondary rotate-right">
              <img src="${CONFIG.oasis.images.secondary1}" alt="${CONFIG.oasis.images.secondary1Alt}"/>
              <div class="oasis-image-grain vintage-grain"></div>
            </div>
            <div class="oasis-image-secondary rotate-left">
              <img src="${CONFIG.oasis.images.secondary2}" alt="${CONFIG.oasis.images.secondary2Alt}"/>
              <div class="oasis-image-grain vintage-grain"></div>
            </div>
          </div>
        </div>
        <div class="oasis-content">
          <div class="oasis-label">
            <span class="material-symbols-outlined">spa</span>
            ${CONFIG.oasis.sectionLabel}
          </div>
          <h2 class="oasis-heading">
            ${CONFIG.oasis.headingLine1}<br/>
            <span class="highlight">${CONFIG.oasis.headingLine2}</span>
          </h2>
          <div class="oasis-description">
            <p>${CONFIG.oasis.descriptionParagraph1}</p>
            <p>${CONFIG.oasis.descriptionParagraph2}</p>
          </div>
          <div class="oasis-features">
            ${featuresHtml}
          </div>
          <div class="oasis-cta">
            <a href="#visit-us">
              ${CONFIG.oasis.ctaText}
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Render Location Section
// ─────────────────────────────────────────────────────
function renderLocation() {
  const section = document.getElementById('visit-us');

  section.innerHTML = `
    <div class="section-container" style="max-width: 1440px;">
      <div class="location-header">
        <span class="section-label">${CONFIG.location.sectionLabel}</span>
        <h2 class="location-heading">${CONFIG.location.heading}</h2>
      </div>
      <div class="location-card">
        <div class="location-info">
          <div class="location-accent-bar"></div>
          <div class="location-info-content">
            <div>
              <h3 class="location-store-name">${CONFIG.location.storeName}</h3>
              <p class="location-store-desc">${CONFIG.location.storeDescription}</p>
            </div>
            <div class="location-details">
              <div class="location-detail">
                <div class="location-detail-icon">
                  <span class="material-symbols-outlined">storefront</span>
                </div>
                <div>
                  <p class="location-detail-label">Address</p>
                  <p class="location-detail-value">${CONFIG.location.address.line1}<br/>${CONFIG.location.address.line2}</p>
                  <p class="location-detail-landmark">
                    <span class="material-symbols-outlined">visibility</span>
                    ${CONFIG.location.landmark}
                  </p>
                </div>
              </div>
              <div class="location-detail">
                <div class="location-detail-icon">
                  <span class="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p class="location-detail-label">Open Daily</p>
                  <p class="location-detail-value">${CONFIG.location.hours}</p>
                  <p class="location-detail-note">${CONFIG.location.hoursNote}</p>
                </div>
              </div>
            </div>
            <div class="location-directions">
              <label for="start-location">Get Directions From:</label>
              <form action="https://www.google.com/maps/dir/" method="get" target="_blank">
                <input type="hidden" name="api" value="1"/>
                <input type="hidden" name="destination" value="${CONFIG.location.address.full}"/>
                <div class="input-wrapper">
                  <span class="input-icon material-symbols-outlined">my_location</span>
                  <input type="text" id="start-location" name="origin" placeholder="Enter your location..."/>
                </div>
                <button type="submit">
                  Get Directions
                  <span class="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="location-map">
          <iframe 
            src="${CONFIG.location.mapEmbedUrl}" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            title="Yen May Vintage Location">
          </iframe>
          <div class="location-map-overlay"></div>
          <div class="location-parking-note">
            <p class="location-parking-note-label">Parking</p>
            <p class="location-parking-note-text">${CONFIG.location.parkingNote}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Render Footer
// ─────────────────────────────────────────────────────
function renderFooter() {
  const footer = document.getElementById('footer');

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-logo">
        <span class="footer-logo-name">${CONFIG.brand.name}</span>
        <span class="footer-logo-tagline">${CONFIG.brand.tagline}</span>
      </div>
      <p class="footer-slogan">"${CONFIG.brand.slogan}"</p>
      <div class="footer-info-grid">
        <div class="footer-info-item">
          <span class="material-symbols-outlined">location_on</span>
          <h4>Visit Us</h4>
          <p>${CONFIG.location.address.line1}<br/>${CONFIG.location.address.line2}</p>
        </div>
        <div class="footer-info-item">
          <span class="material-symbols-outlined">alternate_email</span>
          <h4>Connect</h4>
          <a href="${CONFIG.brand.instagramUrl}">${CONFIG.brand.instagramHandle}</a>
          <p>DM for inquiries</p>
        </div>
        <div class="footer-info-item">
          <span class="material-symbols-outlined">schedule</span>
          <h4>Hours</h4>
          <p>Daily: ${CONFIG.location.hours}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${CONFIG.brand.copyright}</span>
        <a class="footer-back-to-top" href="#top">
          Back to Top
          <span class="material-symbols-outlined">north</span>
        </a>
      </div>
    </div>
  `;

  // Also render mobile chat button
  const chatBtn = document.getElementById('mobile-chat-btn');
  if (chatBtn) {
    chatBtn.href = CONFIG.brand.instagramUrl;
  }
}

// ─────────────────────────────────────────────────────
// Product Lightbox Carousel
// ─────────────────────────────────────────────────────
let currentLightboxProduct = null;
let currentLightboxImageIndex = 0;

function openProductLightbox(productIndex) {
  currentLightboxProduct = CONFIG.gallery.items[productIndex];
  currentLightboxImageIndex = 0;

  // Get images array (support both old and new format)
  const images = currentLightboxProduct.images || [currentLightboxProduct.image];

  // Create lightbox if it doesn't exist
  let lightbox = document.getElementById('product-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'product-lightbox';
    lightbox.className = 'product-lightbox';
    document.body.appendChild(lightbox);
  }

  renderLightboxContent(images);
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function renderLightboxContent(images) {
  const lightbox = document.getElementById('product-lightbox');
  const product = currentLightboxProduct;

  const dotsHtml = images.length > 1 ? `
    <div class="lightbox-dots">
      ${images.map((_, i) => `<span class="lightbox-dot ${i === currentLightboxImageIndex ? 'active' : ''}" onclick="goToLightboxImage(${i})"></span>`).join('')}
    </div>
  ` : '';

  const navHtml = images.length > 1 ? `
    <button class="lightbox-nav lightbox-prev" onclick="prevLightboxImage()">
      <span class="material-symbols-outlined">chevron_left</span>
    </button>
    <button class="lightbox-nav lightbox-next" onclick="nextLightboxImage()">
      <span class="material-symbols-outlined">chevron_right</span>
    </button>
  ` : '';

  lightbox.innerHTML = `
    <div class="lightbox-overlay" onclick="closeProductLightbox()"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" onclick="closeProductLightbox()">
        <span class="material-symbols-outlined">close</span>
      </button>
      <div class="lightbox-image-container">
        <img src="${images[currentLightboxImageIndex]}" alt="${product.title}" class="lightbox-image">
        ${navHtml}
        <div class="lightbox-counter">${currentLightboxImageIndex + 1} / ${images.length}</div>
      </div>
      ${dotsHtml}
      <div class="lightbox-info">
        <h3>${product.title}</h3>
        <p>${product.category || ''} • ${product.size || ''}</p>
        <span class="lightbox-status ${product.status?.toLowerCase().replace(' ', '-')}">${product.status}</span>
      </div>
    </div>
  `;

  // Add swipe support for mobile
  const container = lightbox.querySelector('.lightbox-image-container');
  let touchStartX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextLightboxImage();
      } else {
        prevLightboxImage();
      }
    }
  }, { passive: true });
}

function closeProductLightbox() {
  const lightbox = document.getElementById('product-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function nextLightboxImage() {
  if (!currentLightboxProduct) return;
  const images = currentLightboxProduct.images || [currentLightboxProduct.image];
  currentLightboxImageIndex = (currentLightboxImageIndex + 1) % images.length;
  renderLightboxContent(images);
}

function prevLightboxImage() {
  if (!currentLightboxProduct) return;
  const images = currentLightboxProduct.images || [currentLightboxProduct.image];
  currentLightboxImageIndex = (currentLightboxImageIndex - 1 + images.length) % images.length;
  renderLightboxContent(images);
}

function goToLightboxImage(index) {
  if (!currentLightboxProduct) return;
  const images = currentLightboxProduct.images || [currentLightboxProduct.image];
  currentLightboxImageIndex = index;
  renderLightboxContent(images);
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductLightbox();
  }
  if (e.key === 'ArrowRight') {
    nextLightboxImage();
  }
  if (e.key === 'ArrowLeft') {
    prevLightboxImage();
  }
});
