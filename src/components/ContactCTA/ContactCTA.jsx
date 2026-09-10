import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ContactCTA.css'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
  )
}

export default function ContactCTA() {
  const ref = useScrollReveal()

  return (
    <section className="contact-cta" id="contact-cta" ref={ref} aria-label="Contact AMC Travel Service">
      <div className="container">
        <div className="contact-cta__inner">
          <span className="section-eyebrow section-eyebrow--light reveal">Get In Touch</span>
          <h2 className="section-title section-title--light reveal reveal--delay-1">
            Ready for Your Next Journey?
          </h2>
          <span className="divider divider--centered divider--light reveal reveal--delay-2"></span>
          <p className="section-subtitle section-subtitle--light reveal reveal--delay-2">
            Speak with AMC Travel Service about your next trip. We are here to help you plan and book every step of your journey.
          </p>

          <div className="contact-cta__actions reveal reveal--delay-3">
            <a
              href="tel:4169270770"
              className="btn btn--white"
              id="cta-call-btn"
              aria-label="Call AMC Travel Service at 416-927-0770"
            >
              <PhoneIcon />
              Call Us
            </a>
            <a
              href="mailto:nsothi@gmail.com"
              className="btn btn--outline"
              id="cta-email-btn"
              aria-label="Email AMC Travel Service"
            >
              <EmailIcon />
              Email Us
            </a>
          </div>

          <p className="contact-cta__link reveal reveal--delay-4">
            <PhoneIcon /> 416-927-0770 &nbsp;|&nbsp; 416-826-3331
          </p>
        </div>
      </div>
    </section>
  )
}
