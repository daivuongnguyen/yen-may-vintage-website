# Yen May Vintage Website

A beautiful, easily customizable landing page for Yen May Vintage.

## 📁 File Structure

```
Yen May Vintage Website/
├── index.html      # Main HTML file (usually no need to edit)
├── config.js       # ⭐ EDIT THIS FILE to update content
├── styles.css      # All styling (edit for design changes)
├── app.js          # JavaScript logic (usually no need to edit)
└── README.md       # This file
```

## ✏️ How to Update Content

### Quick Guide

1. Open `config.js` in any text editor
2. Find the section you want to update
3. Change the text or image URLs
4. Save the file and refresh the browser

### Updating Images

Replace the image URLs in `config.js`. For example:

```javascript
hero: {
  backgroundImage: "YOUR_NEW_IMAGE_URL_HERE"
}
```

**Tip:** Upload your images to a service like:
- [Imgur](https://imgur.com/)
- [Cloudinary](https://cloudinary.com/)
- Google Drive (use direct link)
- Your own hosting

### Section Reference

| Section | What to Edit | Location in config.js |
|---------|-------------|----------------------|
| Header/Logo | Brand name, tagline | `CONFIG.brand` |
| Hero Banner | Heading, description, background | `CONFIG.hero` |
| Philosophy | Headings, description, feature image | `CONFIG.brandHeart` |
| Products | Product images, titles, availability | `CONFIG.gallery.items` |
| Customer Photos | Community images | `CONFIG.community.photos` |
| Reviews | Customer testimonials | `CONFIG.prestige.reviews` |
| Store Experience | Store images, descriptions | `CONFIG.oasis` |
| Location | Address, hours, map | `CONFIG.location` |

## 🖼️ Adding New Products

In `config.js`, find the `gallery.items` array and add a new item:

```javascript
{
  image: "YOUR_PRODUCT_IMAGE_URL",
  imageAlt: "Description of the product",
  title: "Product Name",
  status: "Available",  // or "Reserved" or "Sold Out"
  size: "Size M",
  badge: null  // or "RARE FIND" or "NEW" etc.
}
```

## 📱 Adding Customer Photos

In `config.js`, find the `community.photos` array:

```javascript
{
  image: "CUSTOMER_PHOTO_URL",
  alt: "Description",
  username: "@instagram_handle"  // or null if no username
}
```

## 🎨 Changing Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
  --primary: #D0BB95;           /* Main accent color */
  --primary-dark: #b09b75;      /* Darker accent */
  --background-light: #f7f7f6;  /* Page background */
  --text-main: #0e1b19;         /* Main text color */
  --text-muted: #5C706A;        /* Secondary text */
}
```

## 🚀 How to View

Simply open `index.html` in your web browser:
- Double-click the file, or
- Right-click → Open with → Your browser

## 📝 Common Updates

### Change Store Hours
```javascript
location: {
  hours: "10:00 AM — 9:00 PM",
}
```

### Change Instagram Handle
```javascript
brand: {
  instagramHandle: "@yenmayvintage",
  instagramUrl: "https://instagram.com/yenmayvintage",
}
```

### Change Address
```javascript
location: {
  address: {
    line1: "45/3 An Hai Dong 1 St,",
    line2: "Son Tra, Da Nang",
    full: "45/3 An Hai Dong 1, Son Tra, Da Nang"
  },
}
```

## ❓ Need Help?

The `config.js` file has comments explaining each section. Look for the emoji headers:
- 📌 Brand Information
- 🏠 Hero Section
- 💎 Brand Heart Section
- 👗 Gallery Section
- 📷 Community Section
- ⭐ Prestige Section
- 🌿 Oasis Section
- 📍 Location Section
