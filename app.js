// =====================================================
// 🎨 YEN MAY VINTAGE - MAIN SCRIPT
// =====================================================
// This script renders the website content from config.js
// =====================================================

document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderHero();
    renderBrandHeart();
    renderGallery();
    renderCommunity();
    renderPrestige();
    renderOasis();
    renderLocation();
    renderFooter();
});

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
function renderGallery() {
    const section = document.getElementById('gallery');

    const itemsHtml = CONFIG.gallery.items.map((item, index) => {
        const rotation = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'][index % 6];
        const badgeHtml = item.badge ?
            `<div class="gallery-item-badge">${item.badge}</div>` : '';

        return `
      <div class="gallery-item">
        <div class="gallery-item-tape masking-tape" style="transform: translateX(-50%) ${rotation.includes('-') ? 'rotate(-1deg)' : 'rotate(1deg)'};"></div>
        <div class="gallery-item-image-wrapper">
          <img src="${item.image}" alt="${item.imageAlt}"/>
          ${badgeHtml}
          <div class="gallery-item-overlay">
            <span class="gallery-item-title">${item.title}</span>
            <span class="gallery-item-status">${item.status} • ${item.size}</span>
          </div>
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

// ─────────────────────────────────────────────────────
// Render Community Section
// ─────────────────────────────────────────────────────
function renderCommunity() {
    const section = document.getElementById('community');

    const photosHtml = CONFIG.community.photos.map(photo => `
    <div class="community-photo">
      <img src="${photo.image}" alt="${photo.alt}"/>
      <div class="community-photo-grain vintage-grain"></div>
      ${photo.username ? `
        <div class="community-photo-overlay">
          <span class="community-photo-username">${photo.username}</span>
        </div>
      ` : ''}
    </div>
  `).join('');

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
    </div>
  `;
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
