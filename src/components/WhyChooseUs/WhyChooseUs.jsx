import { useScrollReveal } from '../../hooks/useScrollReveal'
import './WhyChooseUs.css'

const REASONS = [
  {
    id: 'range',
    title: 'Wide Range of Travel Services',
    desc: 'From air tickets and vacation packages to cruises, group tours, and wedding travel — all in one place.',
    icon: <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>,
  },
  {
    id: 'convenience',
    title: 'Convenient Arrangements',
    desc: 'We handle the details of your travel arrangements so you can focus on enjoying the journey.',
    icon: <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>,
  },
  {
    id: 'airlines',
    title: 'International Air Ticketing',
    desc: 'Access to air tickets through a broad network of international airlines serving worldwide destinations.',
    icon: <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>,
  },
  {
    id: 'cruise-vacation',
    title: 'Vacation & Cruise Planning',
    desc: 'Thoughtfully arranged vacation land and cruise packages designed around your preferences.',
    icon: <svg viewBox="0 0 24 24"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.79-.12-.25-.34-.45-.6-.55L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.09-.48.28-.6.52-.12.24-.14.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/></svg>,
  },
  {
    id: 'insurance',
    title: 'Travel Insurance Assistance',
    desc: 'We help you navigate travel insurance options so your journey is protected from the unexpected.',
    icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    id: 'special',
    title: 'Group & Special Travel',
    desc: 'Specialised packages for group travel, adventure tours, and memorable occasions like weddings.',
    icon: <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  },
]

export default function WhyChooseUs() {
  const ref = useScrollReveal()

  return (
    <section className="why section" id="why-choose-us" ref={ref} aria-label="Why choose AMC Travel Service">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow section-eyebrow--light reveal">Why AMC?</span>
          <h2 className="section-title section-title--light reveal reveal--delay-1">Why Choose AMC Travel Service</h2>
          <span className="divider divider--centered divider--light reveal reveal--delay-2"></span>
          <p className="section-subtitle section-subtitle--light reveal reveal--delay-2">
            We are committed to making your travel experience as smooth and enjoyable as possible.
          </p>
        </div>

        <div className="why__grid">
          {REASONS.map((reason, i) => (
            <article
              key={reason.id}
              className={`why__item reveal reveal--delay-${(i % 3) + 1}`}
              id={`why-${reason.id}`}
            >
              <div className="why__item-icon" aria-hidden="true">
                {reason.icon}
              </div>
              <h3 className="why__item-title">{reason.title}</h3>
              <p className="why__item-desc">{reason.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
