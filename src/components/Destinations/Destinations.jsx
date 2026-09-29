import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { destinationsData } from '../../data/destinations';
import './Destinations.css';

export default function Destinations() {
  const [highlightedDest, setHighlightedDest] = useState(null);

  useEffect(() => {
    function onHighlight(e) {
      if (e.detail && e.detail.destination) {
        const destName = e.detail.destination;
        if (destName !== 'Anywhere') {
          setHighlightedDest(destName);
          // Clear highlight effect after 4 seconds
          setTimeout(() => {
            setHighlightedDest(null);
          }, 4000);
        } else {
          setHighlightedDest(null);
        }
      }
    }

    window.addEventListener('highlight-destination', onHighlight);
    return () => window.removeEventListener('highlight-destination', onHighlight);
  }, []);

  const handleInquireDestination = (destName) => {
    const target = document.querySelector('#contact');
    if (target) {
      const yOffset = -70;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    window.dispatchEvent(
      new CustomEvent('select-service-inquiry', { detail: `Vacation Packages (${destName})` })
    );
  };

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
          {destinationsData.map((dest, i) => {
            const isHighlighted = highlightedDest && dest.name.toLowerCase().includes(highlightedDest.toLowerCase());

            return (
              <motion.article
                key={dest.id}
                className={`destinations__card ${i === 0 || i === 3 ? 'destinations__card--large' : ''} ${isHighlighted ? 'destinations__card--highlighted' : ''}`}
                variants={itemVariants}
                id={`dest-card-${dest.id}`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="destinations__card-img"
                  loading="lazy"
                />
                <div className="destinations__card-overlay" aria-hidden="true"></div>
                
                <div className="destinations__card-content">
                  <div className="destinations__card-tags">
                    <span className="destinations__card-category">{dest.category}</span>
                    {isHighlighted && (
                      <span className="destinations__card-badge">
                        <Sparkles size={12} /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="destinations__card-title">{dest.name}</h3>
                  
                  <div className="destinations__card-footer">
                    <p className="destinations__card-desc">{dest.description}</p>
                    <button 
                      type="button"
                      className="destinations__card-btn" 
                      onClick={() => handleInquireDestination(dest.name)}
                      aria-label={`Inquire about ${dest.name}`}
                      title={`Plan trip to ${dest.name}`}
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
