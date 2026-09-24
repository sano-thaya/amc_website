import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { destinationsData } from '../../data/destinations';
import './Destinations.css';

export default function Destinations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="destinations section section--alt" id="destinations" aria-label="Travel experiences and destinations">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow">Discover The World</span>
          <h2 className="section-title">Destinations & Experiences</h2>
          <span className="divider divider--centered"></span>
          <p className="section-subtitle">
            From pristine beaches to vibrant cities, explore the extraordinary destinations waiting for you.
          </p>
        </div>

        <motion.div 
          className="destinations__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {destinationsData.map((dest, i) => (
            <motion.article
              key={dest.id}
              className={`destinations__card ${i === 0 || i === 3 ? 'destinations__card--large' : ''}`}
              variants={itemVariants}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="destinations__card-img"
                loading="lazy"
              />
              <div className="destinations__card-overlay" aria-hidden="true"></div>
              
              <div className="destinations__card-content">
                <span className="destinations__card-category">{dest.category}</span>
                <h3 className="destinations__card-title">{dest.name}</h3>
                
                <div className="destinations__card-footer">
                  <p className="destinations__card-desc">{dest.description}</p>
                  <button className="destinations__card-btn" aria-label={`Explore ${dest.name}`}>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
