import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { journeyCategories } from '../../data/destinations';
import './JourneyPlanner.css';

export default function JourneyPlanner() {
  const [selectedDestination, setSelectedDestination] = useState('Anywhere');
  const [selectedType, setSelectedType] = useState('Beach Escape');

  return (
    <section className="planner section" id="packages">
      <span id="journey-planner" style={{ position: 'absolute', top: '-80px', pointerEvents: 'none' }} aria-hidden="true" />
      <div className="container">
        <motion.div 
          className="planner__container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="planner__header">
            <h2 className="planner__title">Where will your journey take you?</h2>
            <p className="planner__subtitle">Let us help you discover the perfect getaway.</p>
          </div>

          <div className="planner__form">
            <div className="planner__group">
              <span className="planner__label">WHERE DO YOU WANT TO GO?</span>
              <button className="planner__select-btn">
                <span>{selectedDestination}</span>
                <ChevronDown size={20} />
              </button>
            </div>

            <div className="planner__group planner__group--types">
              <span className="planner__label">WHAT KIND OF JOURNEY?</span>
              <div className="planner__pills">
                {journeyCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`planner__pill ${selectedType === cat.name ? 'is-active' : ''}`}
                    onClick={() => setSelectedType(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn--primary planner__submit">
              <span>Start Exploring</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
