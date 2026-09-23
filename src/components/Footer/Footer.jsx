import { Plane, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

function FBIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}

function IGIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
}

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Travel Insurance', href: '#insurance' },
  { label: 'Contact', href: '#contact' },
];

const SERVICE_LINKS = [
  { label: 'Air Ticketing', href: '#services' },
  { label: 'Vacation Packages', href: '#services' },
  { label: 'Cruise Travel', href: '#services' },
  { label: 'Group Tours', href: '#services' },
  { label: 'Wedding Packages', href: '#services' },
  { label: 'Adventure Tours', href: '#services' },
];

function handleNav(e, href) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
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
                <Plane size={20} />
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
                  <a href={link.href} className="footer__link" onClick={(e) => handleNav(e, link.href)}>
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
                <MapPin size={16} />
                <span>240 Wellesley St. East, Toronto, ON M4X 1G5, Canada</span>
              </li>
              <li className="footer__contact-item">
                <Phone size={16} />
                <a href="tel:4169270770">416-927-0770</a>
              </li>
              <li className="footer__contact-item">
                <Phone size={16} />
                <a href="tel:4168263331">416-826-3331</a>
              </li>
              <li className="footer__contact-item">
                <Mail size={16} />
                <a href="mailto:nsothi@gmail.com">nsothi@gmail.com</a>
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
  );
}
