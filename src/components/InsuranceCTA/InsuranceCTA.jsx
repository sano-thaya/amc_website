import { useScrollReveal } from '../../hooks/useScrollReveal'
import './InsuranceCTA.css'

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  )
}

export default function InsuranceCTA() {
  const ref = useScrollReveal()

  const handleClick = (e) => {
    e.preventDefault()
    const el = document.querySelector('#contact')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
  }

  return (
    <section className="insurance-cta" id="insurance" ref={ref} aria-label="Travel insurance enquiry">
      <div className="container">
        <div className="insurance-cta__inner">
          <div className="insurance-cta__icon-block reveal" aria-hidden="true">
            <ShieldIcon />
          </div>

          <div className="insurance-cta__text">
            <span className="section-eyebrow reveal">Travel Insurance</span>
            <h2 className="section-title reveal reveal--delay-1">Travel With Confidence</h2>
            <p className="section-subtitle reveal reveal--delay-2">
              Protect your journey with travel insurance assistance from AMC Travel Service. Ask us about coverage options for your next trip.
            </p>
          </div>

          <div className="insurance-cta__actions reveal reveal--delay-2">
            <a
              href="#contact"
              className="btn btn--primary"
              id="insurance-enquire-btn"
              onClick={handleClick}
              aria-label="Ask AMC about travel insurance"
            >
              Ask About Travel Insurance
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
