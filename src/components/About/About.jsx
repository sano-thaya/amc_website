import { useScrollReveal } from '../../hooks/useScrollReveal'
import aboutImg from '../../assets/images/about_travel.png'
import './About.css'

const FEATURES = [
  'Discounted air tickets to worldwide destinations',
  'Vacation packages, cruises, and group tours',
  'Hotel and car rental arrangements',
  'Travel insurance assistance',
  'Wedding and adventure packages',
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

export default function About() {
  const ref = useScrollReveal()

  const scrollToServices = (e) => {
    e.preventDefault()
    const target = document.querySelector('#services')
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section className="about section" id="about" ref={ref} aria-label="About AMC Travel Service">
      <div className="container">
        <div className="about__inner">
          {/* Image */}
          <div className="about__image-wrapper reveal">
            <img
              src={aboutImg}
              alt="Modern airport terminal — AMC Travel Service helps customers navigate their journey"
              className="about__image"
            />
            <div className="about__image-badge">
              <div className="about__image-badge-icon">
                <LocationIcon />
              </div>
              <div className="about__image-badge-text">
                <span className="about__image-badge-label">Our Office</span>
                <span className="about__image-badge-value">Toronto, Canada</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="about__text">
            <span className="section-eyebrow reveal">About Us</span>
            <h2 className="section-title reveal reveal--delay-1">Travel Made Simpler</h2>
            <span className="divider reveal reveal--delay-2"></span>

            <p className="reveal reveal--delay-2">
              AMC Travel Service is a Toronto-based travel agency dedicated to helping customers plan and arrange every aspect of their journeys. Whether you are booking a flight, planning a vacation, embarking on a cruise, or travelling as part of a group, we are here to help.
            </p>
            <p className="reveal reveal--delay-3">
              We work with a wide network of airlines and travel providers to offer competitive options across air ticketing, vacation packages, hotel arrangements, and more — all from our convenient location at 240 Wellesley St. East.
            </p>

            <ul className="about__features reveal reveal--delay-3" aria-label="Our services list">
              {FEATURES.map((f) => (
                <li key={f} className="about__feature">
                  <span className="about__feature-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="about__feature-text">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#services"
              className="btn btn--primary reveal reveal--delay-4"
              id="about-learn-more-btn"
              onClick={scrollToServices}
              aria-label="Learn more about our services"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
