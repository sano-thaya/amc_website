import { motion } from 'framer-motion';
import './AirlinePartners.css';

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
];

export default function AirlinePartners() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section className="partners" id="partners" aria-label="Airlines referenced in our travel material">
      <div className="container">
        <div className="partners__intro">
          <span className="section-eyebrow">Airlines</span>
          <h2 className="partners__title">Airlines Represented in Our Network</h2>
          <p className="partners__note">
            Please contact us to confirm current availability and booking options.
          </p>
        </div>

        <motion.div 
          className="partners__row" 
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {AIRLINES.map((airline) => (
            <motion.span 
              key={airline} 
              className="partners__chip" 
              role="listitem"
              variants={itemVariants}
            >
              {airline}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
