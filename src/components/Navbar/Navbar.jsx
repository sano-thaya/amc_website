import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Contact', href: '#contact' },
]

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const yOffset = -80
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`} id="navbar" role="banner">
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={(e) => handleLinkClick(e, '#home')} aria-label="AMC Travel Service — Home">
          <div className="navbar__logo-icon">
            <PlaneIcon />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">AMC Travel Service</span>
            <span className="navbar__logo-tagline">Toronto, Canada</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="navbar__cta"
            onClick={(e) => handleLinkClick(e, '#contact')}
            id="navbar-contact-cta"
          >
            Contact Us
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          id="hamburger-button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`navbar__mobile-menu ${menuOpen ? 'is-open' : ''}`}
        id="mobile-menu"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="navbar__mobile-link"
            onClick={(e) => handleLinkClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="navbar__mobile-cta"
          onClick={(e) => handleLinkClick(e, '#contact')}
          id="mobile-contact-cta"
        >
          Contact Us
        </a>
      </nav>
    </header>
  )
}
