// =====================================================
// 🎨 YEN MAY VINTAGE - MAIN SCRIPT
// =====================================================
// This script renders the website content from config.js
// =====================================================

let siteData = {
  products: [],
  community: [],
  reviewScreenshots: [],
  siteImages: {},
  siteContent: {}
};

// ─────────────────────────────────────────────────────
// Load Homepage Config (Override from Admin)
// ─────────────────────────────────────────────────────
async function loadHomepageConfig() {
  try {
    const sb = CONFIG.supabase;

    // Try Supabase first
    if (sb && sb.url && sb.anonKey) {
      const client = supabase.createClient(sb.url, sb.anonKey);

      // Load homepage config
      const { data: configData, error: configError } = await client
        .from('site_content')
        .select('config_data')
        .eq('id', 'homepage_config')
        .single();

      if (configData && configData.config_data) {
        if (configData.config_data.hero) {
          Object.assign(CONFIG.hero, configData.config_data.hero);
        }
        if (configData.config_data.brand) {
          Object.assign(CONFIG.brand, configData.config_data.brand);
        }
        console.log('Homepage config loaded from Supabase');
      }

      // Load site images
      const { data: imagesData, error: imagesError } = await client
        .from('site_content')
        .select('config_data')
        .eq('id', 'site_images')
        .single();

      if (imagesData && imagesData.config_data) {
        if (imagesData.config_data.hero?.backgroundImage) {
          CONFIG.hero.backgroundImage = imagesData.config_data.hero.backgroundImage;
        }
        if (imagesData.config_data.brandHeart?.featureImage) {
          CONFIG.brandHeart.featureImage = imagesData.config_data.brandHeart.featureImage;
        }
        if (imagesData.config_data.oasis?.images) {
          Object.assign(CONFIG.oasis.images, imagesData.config_data.oasis.images);
        }
        console.log('Site images loaded from Supabase');
      }

      return;
    }

    // Fallback to localStorage
    const savedConfig = localStorage.getItem('yenmay_homepage_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      if (config.hero) {
        Object.assign(CONFIG.hero, config.hero);
      }
      if (config.brand) {
        Object.assign(CONFIG.brand, config.brand);
      }
      console.log('Homepage config loaded from localStorage');
    }

    const savedImages = localStorage.getItem('yenmay_site_images');
    if (savedImages) {
      const images = JSON.parse(savedImages);
      if (images.hero?.backgroundImage) {
        CONFIG.hero.backgroundImage = images.hero.backgroundImage;
      }
      if (images.brandHeart?.featureImage) {
        CONFIG.brandHeart.featureImage = images.brandHeart.featureImage;
      }
      if (images.oasis?.images) {
        Object.assign(CONFIG.oasis.images, images.oasis.images);
      }
      console.log('Site images loaded from localStorage');
    }
  } catch (error) {
    console.warn('Could not load homepage config:', error);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  // 0. Load homepage config from Supabase or localStorage (if exists)
  await loadHomepageConfig();

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
  renderReviewScreenshots();
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
  // ⚡ PRIMARY DATA SOURCE: Google Sheets
  // Supabase is DISABLED per user directive - Google Sheets is now the main source
  console.log("Loading data from Google Sheets (PRIMARY SOURCE)...");

  const urls = CONFIG.googleSheetUrls;
  if (urls && (urls.products || urls.community)) {
    try {
      await syncDataFromSheets();
      console.log("✅ Google Sheets data loaded successfully!");
      return; // Success!
    } catch (e) {
      console.error("❌ Google Sheets loading failed:", e);
    }
  } else {
    console.error("❌ No Google Sheets URLs configured!");
  }

  // Only show warning if no data loaded
  if (siteData.products.length === 0 && siteData.community.length === 0) {
    console.warn("⚠️ No data could be loaded. Please check Google Sheets URLs in config.js");
  }
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

    // Fallback to CONFIG for review screenshots (not in Google Sheets)
    if (!siteData.reviewScreenshots || siteData.reviewScreenshots.length === 0) {
      if (CONFIG.prestige && CONFIG.prestige.reviewScreenshots) {
        siteData.reviewScreenshots = CONFIG.prestige.reviewScreenshots;
        console.log("✅ Loaded review screenshots from CONFIG (fallback)");
      }
    }

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

  // Urgency Banner Logic
  const bannerConfig = CONFIG.urgencyBanner || {};
  let announcementHtml = '';

  if (bannerConfig.enabled) {
    announcementHtml = `
      <div class="announcement-bar">
        <span class="material-symbols-outlined">schedule</span>
        <span>${bannerConfig.message}</span>
        <a href="${bannerConfig.ctaLink}" target="_blank" class="announcement-cta">
          ${bannerConfig.ctaText}
          <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    `;
  }

  headerWrapper.innerHTML = `
    ${announcementHtml}
    
    <div class="header-container">
      <header>
        <a class="logo" href="#top">
          <span class="logo-name">${CONFIG.brand.name}</span>
          <span class="logo-tagline">${CONFIG.brand.tagline}</span>
        </a>
        
        <nav>${navHtml}</nav>
        <div class="header-actions">
          <a class="location-btn" href="https://www.google.com/maps/dir/?api=1&destination=45/3+An+Hai+Dong+1,+Son+Tra,+Da+Nang" target="_blank">
            <span class="material-symbols-outlined">directions</span>
            <span class="location-text">Get Directions</span>
          </a>
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

  // Countdown HTML (if enabled)
  let countdownHtml = '';
  if (CONFIG.hero.countdown?.enabled) {
    countdownHtml = `
      <div class="hero-countdown" id="hero-countdown">
        <div class="countdown-title">${CONFIG.hero.countdown.title}</div>
        <div class="countdown-timer" id="countdown-timer">
          <div class="countdown-segment">
            <span class="countdown-value" id="days">00</span>
            <span class="countdown-label">Days</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-segment">
            <span class="countdown-value" id="hours">00</span>
            <span class="countdown-label">Hours</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-segment">
            <span class="countdown-value" id="minutes">00</span>
            <span class="countdown-label">Min</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-segment">
            <span class="countdown-value" id="seconds">00</span>
            <span class="countdown-label">Sec</span>
          </div>
        </div>
      </div>
    `;
  }

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
      ${countdownHtml}
      <h1 class="hero-heading">
        ${CONFIG.hero.headingLine1}<br/>${CONFIG.hero.headingLine2}
      </h1>
      <p class="hero-description">${CONFIG.hero.description}</p>
      <a class="hero-cta" href="https://www.google.com/maps/dir/?api=1&destination=45/3+An+Hai+Dong+1,+Son+Tra,+Da+Nang" target="_blank">
        <span>${CONFIG.hero.buttonText}</span>
        <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  `;

  // Start countdown timer if enabled
  if (CONFIG.hero.countdown?.enabled) {
    startCountdown();
  }
}

// ─────────────────────────────────────────────────────
// Countdown Timer Logic
// ─────────────────────────────────────────────────────
function startCountdown() {
  const targetDate = new Date(CONFIG.hero.countdown.targetDate).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      // Countdown expired
      const countdownEl = document.getElementById('hero-countdown');
      if (countdownEl) {
        countdownEl.innerHTML = `
          <div class="countdown-expired">${CONFIG.hero.countdown.expiredMessage}</div>
        `;
      }
      return;
    }

    // Calculate time remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Update immediately
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);
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
            <img src="${CONFIG.brandHeart.featureImage}" alt="${CONFIG.brandHeart.featureImageAlt}" loading="lazy"/>
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
          <div class="gallery-item-header-external">
            <span class="gallery-item-title-external">${item.title}</span>
            <a class="check-stock-btn" href="${CONFIG.brand.instagramUrl}" target="_blank" onclick="event.stopPropagation()">
               <span class="material-symbols-outlined">chat_bubble</span>
            </a>
          </div>
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
        <a class="gallery-view-more-btn" href="${CONFIG.gallery.viewMoreLink || CONFIG.brand.instagramUrl}" target="_blank" rel="noopener noreferrer">
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
window.communityVisibleCount = 12; // Initial 3x4 on mobile, 4x3 on desktop

function renderCommunity() {
  const section = document.getElementById('community');
  const allPhotos = CONFIG.community.photos;
  const visiblePhotos = allPhotos.slice(0, window.communityVisibleCount);

  const photosHtml = visiblePhotos.map((photo, index) => `
    <div class="community-photo reveal" 
         style="--delay: ${index % 4}" 
         onclick="openCommunityLightbox(${index})">
      <img src="${photo.image}" alt="${photo.alt}" loading="lazy"/>
      <div class="community-photo-grain vintage-grain"></div>
      <div class="community-photo-overlay">
        ${photo.username ? `<span class="community-photo-username">${photo.username}</span>` : ''}
        ${photo.date ? `<span class="community-photo-date">${photo.date}</span>` : ''}
      </div>
    </div>
  `).join('');

  const loadMoreBtn = window.communityVisibleCount < allPhotos.length
    ? `<div class="btn-load-container">
         <button onclick="loadMoreCommunity()" class="btn-load-more">
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
  window.communityVisibleCount += 12;
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
  const total = CONFIG.community.photos.length;

  if (!lightbox) return;

  lightbox.innerHTML = `
    <div class="lightbox-backdrop" onclick="closeCommunityLightbox()"></div>
    
    <button class="lightbox-close" onclick="closeCommunityLightbox()" aria-label="Close">
      <span class="material-symbols-outlined">close</span>
    </button>
    
    <button class="lightbox-nav lightbox-prev" onclick="prevCommunityImage(event)" aria-label="Previous">
      <span class="material-symbols-outlined">chevron_left</span>
    </button>

    <div class="lightbox-content" id="lightbox-swipe-area">
       <img src="${photo.image}" class="lightbox-image" style="max-height:80vh; max-width:90vw; border-radius:4px; object-fit:contain;">
       <div class="lightbox-info" style="margin-top:1rem; text-align:center; color:white;">
          ${photo.username ? `<p style="margin:0; font-weight:600;">${photo.username}</p>` : ''}
          ${photo.date ? `<p style="margin:4px 0 0; opacity:0.7; font-size:14px;">${photo.date}</p>` : ''}
          <p style="margin:8px 0 0; opacity:0.5; font-size:12px;">${communityLightboxIndex + 1} / ${total}</p>
       </div>
    </div>

    <button class="lightbox-nav lightbox-next" onclick="nextCommunityImage(event)" aria-label="Next">
      <span class="material-symbols-outlined">chevron_right</span>
    </button>
  `;

  // Add touch swipe support
  const swipeArea = document.getElementById('lightbox-swipe-area');
  let touchStartX = 0;
  let touchEndX = 0;

  swipeArea.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  swipeArea.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextCommunityImage();
      } else {
        prevCommunityImage();
      }
    }
  }, { passive: true });
}

function handleCommunityLightboxKey(e) {
  if (e.key === 'Escape') closeCommunityLightbox();
  if (e.key === 'ArrowRight') nextCommunityImage();
  if (e.key === 'ArrowLeft') prevCommunityImage();
}

// ─────────────────────────────────────────────────────
// Render Review Screenshots Gallery
// ─────────────────────────────────────────────────────
function renderReviewScreenshots() {
  const section = document.getElementById('review-screenshots');
  if (!section) return;

  // Hide section if no screenshots
  if (!siteData.reviewScreenshots || siteData.reviewScreenshots.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const photosHtml = siteData.reviewScreenshots.map((screenshot, index) => {
    // Debug log
    console.log(`Review ${index}:`, screenshot.sourceUrl ? 'HAS sourceUrl' : 'NO sourceUrl', screenshot.sourceUrl);

    return `
    <div class="review-screenshot-wrapper">
      <div class="review-screenshot-item reveal" onclick="openReviewLightbox(${index})">
        <img src="${screenshot.image}" alt="Google Review ${index + 1}" loading="lazy">
      </div>
      ${screenshot.sourceUrl ? `
        <a href="${screenshot.sourceUrl}" target="_blank" class="review-source-link" onclick="event.stopPropagation()">
          <span class="material-symbols-outlined">open_in_new</span>
          Check Review
        </a>
      ` : `
        <span class="review-source-link review-source-link-disabled">
          <span class="material-symbols-outlined">open_in_new</span>
          Check Review
        </span>
      `}
    </div>
  `}).join('');

  section.innerHTML = `
    <div class="review-screenshots-header">
      <h2>What Customers Say</h2>
      <p>Real reviews from our customers on Google Maps</p>
    </div>
    <div class="review-screenshots-grid">
      ${photosHtml}
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Review Screenshots Lightbox
// ─────────────────────────────────────────────────────
let currentReviewIndex = 0;

window.openReviewLightbox = function (index) {
  const screenshots = siteData.reviewScreenshots;
  currentReviewIndex = index;

  let lightbox = document.getElementById('review-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'review-lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.style.display = 'none';
    document.body.appendChild(lightbox);
  }

  updateReviewLightbox();
  lightbox.style.display = 'flex';
  setTimeout(() => lightbox.style.opacity = '1', 10);
  document.body.style.overflow = 'hidden';

  // Add keyboard listener
  document.addEventListener('keydown', handleReviewLightboxKey);
}

window.closeReviewLightbox = function () {
  const lightbox = document.getElementById('review-lightbox');
  if (lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  }
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleReviewLightboxKey);
}

window.nextReviewImage = function (e) {
  if (e) e.stopPropagation();
  const total = siteData.reviewScreenshots.length;
  currentReviewIndex = (currentReviewIndex + 1) % total;
  updateReviewLightbox();
}

window.prevReviewImage = function (e) {
  if (e) e.stopPropagation();
  const total = siteData.reviewScreenshots.length;
  currentReviewIndex = (currentReviewIndex - 1 + total) % total;
  updateReviewLightbox();
}

function updateReviewLightbox() {
  const lightbox = document.getElementById('review-lightbox');
  const screenshot = siteData.reviewScreenshots[currentReviewIndex];
  const total = siteData.reviewScreenshots.length;

  if (!lightbox) return;

  lightbox.innerHTML = `
    <div class="lightbox-backdrop" onclick="closeReviewLightbox()"></div>

    <button class="lightbox-close" onclick="closeReviewLightbox()" aria-label="Close">
      <span class="material-symbols-outlined">close</span>
    </button>

    <button class="lightbox-nav lightbox-prev" onclick="prevReviewImage(event)" aria-label="Previous">
      <span class="material-symbols-outlined">chevron_left</span>
    </button>

    <div class="lightbox-content review-lightbox-content" id="review-swipe-area">
       <img src="${screenshot.image}" class="lightbox-image" style="max-height:90vh; max-width:90vw; object-fit:contain; border-radius:8px;">
       <div class="lightbox-info" style="margin-top:1rem; text-align:center; color:white;">
          <p style="margin:0; opacity:0.5; font-size:12px;">${currentReviewIndex + 1} / ${total}</p>
       </div>
       ${screenshot.sourceUrl ? `
       <div class="review-lightbox-source">
         <a href="${screenshot.sourceUrl}" target="_blank" rel="noopener noreferrer">
           <span class="material-symbols-outlined">open_in_new</span>
           Check Review
         </a>
       </div>
       ` : ''}
    </div>

    <button class="lightbox-nav lightbox-next" onclick="nextReviewImage(event)" aria-label="Next">
      <span class="material-symbols-outlined">chevron_right</span>
    </button>
  `;

  // Add touch swipe support
  const swipeArea = document.getElementById('review-swipe-area');
  let touchStartX = 0;
  let touchEndX = 0;

  swipeArea.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  swipeArea.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextReviewImage();
      } else {
        prevReviewImage();
      }
    }
  }, { passive: true });
}

function handleReviewLightboxKey(e) {
  if (e.key === 'Escape') closeReviewLightbox();
  if (e.key === 'ArrowRight') nextReviewImage();
  if (e.key === 'ArrowLeft') prevReviewImage();
}

// ─────────────────────────────────────────────────────
// Render Prestige Section
// ─────────────────────────────────────────────────────
function renderPrestige() {
  const section = document.getElementById('prestige');

  // Render press items with articles
  const pressItemsHtml = CONFIG.prestige.pressItems ? CONFIG.prestige.pressItems.map((item, index) => `
    <a href="${item.articleUrl}" target="_blank" class="press-item reveal" style="--delay: ${index % 3}">
      <div class="press-item-badge">
        <span class="material-symbols-outlined">article</span>
      </div>
      <div class="press-item-content">
        <div class="press-publication">${item.publication}</div>
        <h3 class="press-article-title">${item.articleTitle}</h3>
        <div class="press-read-more">
          Read Article
          <span class="material-symbols-outlined">arrow_outward</span>
        </div>
      </div>
    </a>
  `).join('') : '';

  // Fallback to old pressLogos if pressItems doesn't exist
  const logosHtml = !CONFIG.prestige.pressItems && CONFIG.prestige.pressLogos ? CONFIG.prestige.pressLogos.map((logo, index) => {
    const classes = ['prestige-logo'];
    if (index === 1) classes.push('italic');
    if (index === 2) classes.push('uppercase');
    return `<div class="${classes.join(' ')}">${logo}</div>`;
  }).join('') : '';

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
        <img src="${review.authorImage}" alt="${review.authorName}" loading="lazy"/>
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
      ${pressItemsHtml ? `<div class="press-items-grid">${pressItemsHtml}</div>` : `<div class="prestige-logos">${logosHtml}</div>`}
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
              <img src="${CONFIG.oasis.images.main}" alt="${CONFIG.oasis.images.mainAlt}" loading="lazy"/>
              <div class="oasis-image-grain vintage-grain"></div>
            </div>
            <div class="oasis-image-secondary rotate-right">
              <img src="${CONFIG.oasis.images.secondary1}" alt="${CONFIG.oasis.images.secondary1Alt}" loading="lazy"/>
              <div class="oasis-image-grain vintage-grain"></div>
            </div>
            <div class="oasis-image-secondary rotate-left">
              <img src="${CONFIG.oasis.images.secondary2}" alt="${CONFIG.oasis.images.secondary2Alt}" loading="lazy"/>
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
