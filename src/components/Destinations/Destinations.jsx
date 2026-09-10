import { useScrollReveal } from '../../hooks/useScrollReveal'
import destInternational from '../../assets/images/dest_international.png'
import destBeach from '../../assets/images/dest_beach.png'
import destCruise from '../../assets/images/dest_cruise.png'
import destAdventure from '../../assets/images/dest_adventure.png'
import './Destinations.css'

// For the 2 images we couldn't generate, we use reliable Unsplash URLs
const DESTINATIONS = [
  {
    id: 'international',
    category: 'International Travel',
    title: 'World Destinations',
    desc: 'Flights and packages to cities and countries across every continent.',
    img: destInternational,
    alt: 'Aerial view of a European city at dusk',
    tall: true,
  },
  {
    id: 'beach',
    category: 'Beach Getaways',
    title: 'Sun & Sand',
    desc: 'Relax on pristine beaches at tropical destinations worldwide.',
    img: destBeach,
    alt: 'Pristine tropical beach with turquoise water',
  },
  {
    id: 'cruises',
    category: 'Cruise Holidays',
    title: 'Ocean Voyages',
    desc: 'Cruise packages ranging from short voyages to extended ocean adventures.',
    img: destCruise,
    alt: 'Luxury cruise ship sailing at sunset',
  },
  {
    id: 'adventure',
    category: 'Adventure Travel',
    title: 'Explore & Discover',
    desc: 'Adventure and exotic tours for those seeking extraordinary experiences.',
    img: destAdventure,
    alt: 'Hiker on a mountain trail above the clouds',
  },
  {
    id: 'group',
    category: 'Group Travel',
    title: 'Travel Together',
    desc: 'Group tours and packages for families, friends, and organised travel.',
    img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80',
    alt: 'Group of diverse travelers exploring together',
  },
  {
    id: 'luxury',
    category: 'Luxury & Leisure',
    title: 'Premium Escapes',
    desc: 'Premium hotel arrangements and special packages for a refined travel experience.',
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    alt: 'Luxury overwater bungalow resort',
  },
]

export default function Destinations() {
  const ref = useScrollReveal()

  return (
    <section className="destinations section section--alt" id="destinations" ref={ref} aria-label="Travel experiences and destinations">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow reveal">Travel Experiences</span>
          <h2 className="section-title reveal reveal--delay-1">Journeys We Can Help Arrange</h2>
          <span className="divider divider--centered reveal reveal--delay-2"></span>
          <p className="section-subtitle reveal reveal--delay-2">
            From beach getaways and international city breaks to cruises and adventure tours — AMC Travel Service can help you plan it.
          </p>
        </div>

        <div className="destinations__grid">
          {DESTINATIONS.map((dest, i) => (
            <article
              key={dest.id}
              className={`destinations__card reveal reveal--delay-${(i % 3) + 1} ${dest.tall ? 'destinations__card--tall' : ''}`}
              id={`destination-${dest.id}`}
            >
              <img
                src={dest.img}
                alt={dest.alt}
                className="destinations__card-img"
                loading="lazy"
              />
              <div className="destinations__card-overlay" aria-hidden="true"></div>
              <div className="destinations__card-content">
                <span className="destinations__card-category">{dest.category}</span>
                <h3 className="destinations__card-title">{dest.title}</h3>
                <p className="destinations__card-desc">{dest.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
