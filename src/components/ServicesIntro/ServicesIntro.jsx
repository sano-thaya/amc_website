import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ServicesIntro.css'

const QUICK_SERVICES = [
  {
    id: 'air-tickets',
    title: 'Air Tickets',
    desc: 'Discounted international and domestic air tickets to destinations worldwide through major airlines.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
  },
  {
    id: 'vacation-packages',
    title: 'Vacation Packages',
    desc: 'Comprehensive vacation land and cruise packages tailored to your preferences and budget.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.47 0 12 0S6 2.53 6 4.65c0 .47.11.91.18 1.35H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-4c1.9 0 3.5 1.1 3.5 2.65 0 1.56-1.6 3.85-3.5 6.25C10.1 8.5 8.5 6.21 8.5 4.65 8.5 3.1 10.1 2 12 2zM20 20H4V8h4.23C7.51 9.42 7 10.64 7 11.5c0 2.76 2.24 5 5 5s5-2.24 5-5c0-.86-.51-2.08-1.23-3.5H20v12z" />
        <circle cx="12" cy="11" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'cruises',
    title: 'Cruises',
    desc: 'Cruise booking and vacation packages to stunning destinations across the globe.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.79-.12-.25-.34-.45-.6-.55L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.09-.48.28-.6.52-.12.24-.14.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
      </svg>
    ),
  },
  {
    id: 'hotels',
    title: 'Hotels',
    desc: 'Hotel arrangements and car rentals to ensure comfortable stays at your destinations.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
      </svg>
    ),
  },
  {
    id: 'travel-insurance',
    title: 'Travel Insurance',
    desc: 'Travel insurance assistance to help protect your journey and give you peace of mind.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
      </svg>
    ),
  },
  {
    id: 'group-tours',
    title: 'Group Tours',
    desc: 'Organised group tours and special travel packages including wedding and adventure trips.',
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
]

export default function ServicesIntro() {
  const ref = useScrollReveal()

  return (
    <section className="services-intro section" id="services-intro" ref={ref} aria-label="Our main services">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow reveal">What We Offer</span>
          <h2 className="section-title reveal reveal--delay-1">Everything You Need for Your Trip</h2>
          <span className="divider divider--centered reveal reveal--delay-2"></span>
          <p className="section-subtitle reveal reveal--delay-2">
            From booking your air ticket to arranging hotels and insurance, AMC Travel Service handles the details so you can focus on the journey.
          </p>
        </div>

        <div className="services-intro__grid">
          {QUICK_SERVICES.map((service, i) => (
            <article
              key={service.id}
              className={`service-card reveal reveal--delay-${(i % 3) + 1}`}
              id={`quick-service-${service.id}`}
            >
              <div className="service-card__icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
