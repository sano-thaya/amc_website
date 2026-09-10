import './Footer.css'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Travel Insurance', href: '#insurance' },
  { label: 'Contact', href: '#contact' },
]

const SERVICE_LINKS = [
  { label: 'Air Ticketing', href: '#service-air-ticketing' },
  { label: 'Vacation Packages', href: '#service-vacation-packages' },
  { label: 'Cruise Travel', href: '#service-cruise-travel' },
  { label: 'Group Tours', href: '#service-group-tours' },
  { label: 'Wedding Packages', href: '#service-wedding-packages' },
  { label: 'Adventure Tours', href: '#service-adventure-exotic' },
]

function handleNav(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
  )
}

function LocationIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
}

function EmailIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
}

function FBIcon() {
  return <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}

function IGIcon() {
  return <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon" aria-hidden="true">
                <PlaneIcon />
              </div>
              <span className="footer__logo-name">AMC Travel Service</span>
            </div>
            <p className="footer__tagline">
              Toronto's trusted travel agency for air tickets, vacation packages, cruises, and more.
            </p>
            <div className="footer__social" aria-label="Social media (coming soon)">
              <span className="footer__social-btn" title="Facebook (coming soon)" aria-label="Facebook">
                <FBIcon />
              </span>
              <span className="footer__social-btn" title="Instagram (coming soon)" aria-label="Instagram">
                <IGIcon />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <p className="footer__col-title">Quick Links</p>
            <ul className="footer__links">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link" onClick={(e) => handleNav(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services links">
            <p className="footer__col-title">Services</p>
            <ul className="footer__links">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link" onClick={(e) => handleNav(e, '#services')}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="footer__col-title">Contact</p>
            <ul className="footer__contact-items">
              <li className="footer__contact-item">
                <LocationIcon />
                <span>240 Wellesley St. East, Toronto, ON M4X 1G5, Canada</span>
              </li>
              <li className="footer__contact-item">
                <PhoneIcon />
                <a href="tel:4169270770" aria-label="Call 416-927-0770">416-927-0770</a>
              </li>
              <li className="footer__contact-item">
                <PhoneIcon />
                <a href="tel:4168263331" aria-label="Call 416-826-3331">416-826-3331</a>
              </li>
              <li className="footer__contact-item">
                <EmailIcon />
                <a href="mailto:nsothi@gmail.com" aria-label="Email AMC Travel">nsothi@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copy">
              © {new Date().getFullYear()} AMC Travel Service. All rights reserved.
            </p>
            <p className="footer__bottom-note">240 Wellesley St. East, Toronto, ON M4X 1G5</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
