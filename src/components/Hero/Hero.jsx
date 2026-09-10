import heroImg from '../../assets/images/hero_travel.png'
import './Hero.css'

function scrollToSection(href) {
  const target = document.querySelector(href)
  if (target) {
    const yOffset = -80
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Hero — AMC Travel Service">
      {/* Background Image */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src={heroImg}
          alt="Airplane soaring above clouds at golden hour"
          className="hero__bg-img"
        />
        <div className="hero__overlay"></div>
      </div>

      {/* Content */}
      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-dot"></span>
          AMC Travel Service
        </p>

        <h1 className="hero__heading">
          Your Journey<br />
          <em>Begins With Us</em>
        </h1>

        <p className="hero__subtext">
          Air tickets, vacation packages, cruises, hotels and travel
          services designed to make your journey easier.
        </p>

        <div className="hero__actions">
          <button
            className="btn btn--primary"
            id="hero-explore-btn"
            onClick={() => scrollToSection('#services-intro')}
            aria-label="Explore our travel services"
          >
            Explore Our Services
          </button>
          <button
            className="btn btn--outline"
            id="hero-contact-btn"
            onClick={() => scrollToSection('#contact')}
            aria-label="Contact AMC Travel Service"
          >
            Contact Us
          </button>
        </div>

        {/* Trust indicators */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-label">Location</span>
            <span className="hero__stat-value">Toronto, ON</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label">Phone</span>
            <span className="hero__stat-value">416-927-0770</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-label">Services</span>
            <span className="hero__stat-value">Worldwide Travel</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero__scroll"
        onClick={() => scrollToSection('#services-intro')}
        aria-label="Scroll down to explore services"
      >
        <span className="hero__scroll-bar"></span>
        <span>Scroll</span>
      </button>
    </section>
  )
}
