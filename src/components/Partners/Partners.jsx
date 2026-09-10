import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Partners.css'

const AIRLINES = [
  'Lufthansa',
  'Emirates',
  'Air Canada',
  'Air France',
  'KLM',
  'Etihad Airways',
  'Gulf Air',
  'Air India',
  'SriLankan Airlines',
  'Jet Airways',
]

export default function Partners() {
  const ref = useScrollReveal()

  return (
    <section className="partners" id="partners" ref={ref} aria-label="Airlines and travel partners">
      <div className="container">
        <div className="partners__intro">
          <span className="section-eyebrow reveal">Airlines & Partners</span>
          <h2 className="section-title reveal reveal--delay-1">Airlines We Work With</h2>
          <span className="partners__note reveal reveal--delay-2">
            Listed as reference from our service network. Please contact us to confirm current availability.
          </span>
        </div>

        <div className="partners__row reveal reveal--delay-2" role="list" aria-label="Airline partners list">
          {AIRLINES.map((airline) => (
            <span key={airline} className="partners__chip" role="listitem">
              <span className="partners__chip-dot" aria-hidden="true"></span>
              {airline}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
