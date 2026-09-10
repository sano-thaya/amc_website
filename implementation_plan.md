# AMC Travel Service Website — Implementation Plan

## Overview

Build a modern, premium, fully responsive static website for **AMC Travel Service** using **React + Vite**.
The design will modernize the agency's blue-based branding into an elegant, trustworthy travel-agency experience.

---

## Color System

| Token | Value | Usage |
|---|---|---|
| `--blue-primary` | `#1A6DC0` | Primary brand blue |
| `--blue-deep` | `#0D3B6E` | Deep navy headings, footer |
| `--blue-light` | `#E8F1FB` | Section backgrounds |
| `--blue-mid` | `#2985D8` | Hover states, accents |
| `--white` | `#FFFFFF` | Backgrounds |
| `--gray-light` | `#F4F7FB` | Card backgrounds |
| `--gray-text` | `#6B7280` | Body text |
| `--dark-text` | `#111827` | Headings |

## Typography

- **Display / Headings**: `Playfair Display` (Google Fonts) — elegant, premium serif feel
- **Body / UI**: `Inter` (Google Fonts) — clean, modern sans-serif

---

## Proposed File Structure

```
d:\AMC_Travel_Service_Website\
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/          ← generated travel images
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── ServicesIntro/   ← Quick 6-card intro
│   │   ├── About/
│   │   ├── Services/        ← Full 9-service grid
│   │   ├── Destinations/
│   │   ├── WhyChooseUs/
│   │   ├── InsuranceCTA/
│   │   ├── Partners/        ← Airline/travel partners
│   │   ├── ContactCTA/
│   │   ├── Contact/
│   │   └── Footer/
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   ├── globals.css      ← Design tokens + resets
│   │   └── animations.css   ← Intersection observer anims
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Section-by-Section Plan

### 1. Navbar
- Logo (AMC Travel Service wordmark in blue)
- Links: Home · About · Services · Packages · Destinations · Contact
- CTA: "Contact Us" button
- Sticky on scroll with shadow
- Mobile hamburger menu (CSS-only toggle)

### 2. Hero
- Full-viewport height
- Background: generated premium travel image (airplane/destination)
- Dark overlay for text legibility
- Eyebrow → H1 → supporting copy → two CTA buttons
- Subtle scroll-down indicator

### 3. Quick Service Introduction (6 cards)
- Air Tickets · Vacation Packages · Cruises · Hotels · Travel Insurance · Group Tours
- SVG icons, card hover lift effect

### 4. About AMC
- Two-column: image left, text right
- Heading: "Travel Made Simpler"
- Concise professional copy
- "Learn More" CTA → scroll to Services

### 5. Full Services Grid (9 services)
- Air Ticketing · Vacation Packages · Cruise Travel · Hotels · Travel Insurance
- Group Tours · Wedding Packages · Car Rentals · Adventure & Exotic Tours
- Refined grid, icon + title + description

### 6. Destinations / Travel Experiences
- 6 visual cards with destination imagery
- Categories: International · Beach · Cruises · Adventure · Group · Luxury

### 7. Why Choose AMC
- 6 trust-focused benefit blocks
- Based only on stated services

### 8. Travel Insurance CTA
- Distinctive banner section
- "Travel With Confidence" headline

### 9. Airline / Travel Partners
- Clean logo-row section
- Named airlines from the poster listed as text/logo blocks

### 10. Contact CTA
- "Ready for Your Next Journey?" with Call/Email buttons

### 11. Contact / Location
- Address, phone, mobile, email
- Google Maps embed (static iframe for Toronto location)

### 12. Footer
- Logo, tagline, quick links, contact, copyright

---

## Image Generation Plan

I will generate the following images using the image tool:
1. **Hero** — Premium airplane/destination travel photo (dark, cinematic)
2. **About section** — Travel consultant / world map / airport ambiance
3. **6 Destination cards** — International city, beach, cruise ship, mountain adventure, group tour, luxury hotel

---

## Animations

- Section fade-in via Intersection Observer (vanilla JS in a hook)
- Card hover: subtle lift + border glow
- Navbar: opacity + blur on scroll
- Hero: text fade-up on load
- Smooth scroll behavior

---

## Verification Plan

1. Run `npm run dev` and verify all sections render correctly
2. Check mobile responsiveness at 375px, 768px, 1024px, 1440px viewpoints
3. Verify all contact links (tel:, mailto:) work correctly
4. Confirm no horizontal overflow on mobile
5. Confirm sticky navbar behavior
