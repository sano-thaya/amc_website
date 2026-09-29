import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, MapPin, Check } from 'lucide-react';
import { journeyCategories, destinationsData } from '../../data/destinations';
import './JourneyPlanner.css';

const destinationOptions = [
  { id: 'any', name: 'Anywhere (All Destinations)', label: 'Anywhere' },
  { id: 'dest-1', name: 'Paris, France', label: 'Paris' },
  { id: 'dest-2', name: 'Maldives', label: 'Maldives' },
  { id: 'dest-3', name: 'Dubai, UAE', label: 'Dubai' },
  { id: 'dest-4', name: 'Swiss Alps', label: 'Swiss Alps' },
  { id: 'dest-5', name: 'Caribbean Islands', label: 'Caribbean' },
  { id: 'dest-6', name: 'Tokyo, Japan', label: 'Tokyo' },
];

export default function JourneyPlanner() {
  const [selectedDestination, setSelectedDestination] = useState(destinationOptions[0]);
  const [selectedType, setSelectedType] = useState('Beach Escape');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStartExploring = () => {
    // Scroll to destinations section smoothly
    const target = document.querySelector('#destinations');
    if (target) {
      const yOffset = -70;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Dispatch event to optionally highlight matching destination in Destinations section
      window.dispatchEvent(
        new CustomEvent('highlight-destination', {
          detail: {
            destination: selectedDestination.label,
            category: selectedType,
          },
        })
      );
    }
  };

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
            <span className="section-eyebrow">Custom Itineraries</span>
            <h2 className="planner__title">Where will your journey take you?</h2>
            <p className="planner__subtitle">Let us help you discover the perfect getaway tailored to your dreams.</p>
          </div>

          <div className="planner__form">
            {/* Destination Dropdown */}
            <div className="planner__group" ref={dropdownRef}>
              <span className="planner__label">WHERE DO YOU WANT TO GO?</span>
              <div className="planner__select-wrapper">
                <button 
                  type="button"
                  className={`planner__select-btn ${isDropdownOpen ? 'is-open' : ''}`}
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="planner__select-value">
                    <MapPin size={18} className="planner__select-pin" />
                    <span>{selectedDestination.name}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`planner__select-chevron ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul 
                      className="planner__dropdown-menu"
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      role="listbox"
                    >
                      {destinationOptions.map((opt) => {
                        const isSelected = selectedDestination.id === opt.id;
                        return (
                          <li key={opt.id}>
                            <button
                              type="button"
                              className={`planner__dropdown-item ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => {
                                setSelectedDestination(opt);
                                setIsDropdownOpen(false);
                              }}
                              role="option"
                              aria-selected={isSelected}
                            >
                              <span>{opt.name}</span>
                              {isSelected && <Check size={16} className="planner__check-icon" />}
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Journey Type Pills */}
            <div className="planner__group planner__group--types">
              <span className="planner__label">WHAT KIND OF JOURNEY?</span>
              <div className="planner__pills">
                {journeyCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`planner__pill ${selectedType === cat.name ? 'is-active' : ''}`}
                    onClick={() => setSelectedType(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Exploring Action */}
            <div className="planner__actions">
              <button 
                type="button"
                className="btn btn--primary planner__submit"
                onClick={handleStartExploring}
                id="start-exploring-btn"
              >
                <span>Start Exploring</span>
                <ArrowRight size={18} />
              </button>
              
              <span className="planner__hint">
                Selected: <strong>{selectedDestination.label}</strong> • <em>{selectedType}</em>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
