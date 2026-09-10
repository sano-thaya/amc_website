import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Contact.css'

function LocationIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
}

function MobileIcon() {
  return <svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
}

function EmailIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
}

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section className="contact section" id="contact" ref={ref} aria-label="Contact information and location">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow reveal">Find Us</span>
          <h2 className="section-title reveal reveal--delay-1">Contact & Location</h2>
          <span className="divider divider--centered reveal reveal--delay-2"></span>
          <p className="section-subtitle reveal reveal--delay-2">
            Visit us in Toronto or get in touch by phone or email. We are happy to assist with your travel plans.
          </p>
        </div>

        <div className="contact__inner">
          {/* Info */}
          <div className="contact__info reveal">
            <div className="contact__info-items">
              <div className="contact__info-item">
                <div className="contact__info-icon" aria-hidden="true">
                  <LocationIcon />
                </div>
                <div className="contact__info-text">
                  <span className="contact__info-label">Address</span>
                  <span className="contact__info-value">
                    240 Wellesley St. East<br />
                    Toronto, ON M4X 1G5<br />
                    Canada
                  </span>
                  <span className="contact__info-note">Next to Food Basics</span>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon" aria-hidden="true">
                  <PhoneIcon />
                </div>
                <div className="contact__info-text">
                  <span className="contact__info-label">Telephone</span>
                  <span className="contact__info-value">
                    <a href="tel:4169270770" id="contact-phone-link" aria-label="Call AMC at 416-927-0770">416-927-0770</a>
                  </span>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon" aria-hidden="true">
                  <MobileIcon />
                </div>
                <div className="contact__info-text">
                  <span className="contact__info-label">Mobile</span>
                  <span className="contact__info-value">
                    <a href="tel:4168263331" id="contact-mobile-link" aria-label="Call AMC mobile at 416-826-3331">416-826-3331</a>
                  </span>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon" aria-hidden="true">
                  <EmailIcon />
                </div>
                <div className="contact__info-text">
                  <span className="contact__info-label">Email</span>
                  <span className="contact__info-value">
                    <a href="mailto:nsothi@gmail.com" id="contact-email-link" aria-label="Email AMC Travel Service">nsothi@gmail.com</a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed — 240 Wellesley St East, Toronto */}
          <div className="contact__map reveal reveal--delay-2">
            <iframe
              title="AMC Travel Service location — 240 Wellesley St. East, Toronto"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.3!2d-79.3734!3d43.6670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb5a5d3a4a3b%3A0x0!2s240+Wellesley+St+E%2C+Toronto%2C+ON+M4X+1G5!5e0!3m2!1sen!2sca!4v1"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing AMC Travel Service at 240 Wellesley St East Toronto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
