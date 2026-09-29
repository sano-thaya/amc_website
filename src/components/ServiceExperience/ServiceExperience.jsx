import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { servicesData } from '../../data/services';
import './ServiceExperience.css';

export default function ServiceExperience() {
  const [hoveredService, setHoveredService] = useState(servicesData[0]);
  const [expandedId, setExpandedId] = useState(null);

  function handleServiceClick(service) {
    setHoveredService(service);
    setExpandedId(prev => (prev === service.id ? null : service.id));
  }

  function handleEnquireService(e, serviceTitle) {
    e.preventDefault();
    e.stopPropagation();
    
    // Smooth scroll to contact email form
    const target = document.querySelector('#contact');
    if (target) {
      const yOffset = -70;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Auto-select this service in the Contact form
    window.dispatchEvent(
      new CustomEvent('select-service-inquiry', { detail: serviceTitle })
    );
  }

  return (
    <section className="service-exp section" id="services">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow">Our Expertise</span>
          <h2 className="section-title">Explore Our Services</h2>
          <p className="section-subtitle">
            Comprehensive travel planning designed for every kind of journey. Click any service to view full details.
          </p>
        </div>

        <div className="service-exp__layout">
          {/* Visual Display Side */}
          <div className="service-exp__visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredService.id}
                className="service-exp__image-wrapper"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <img
                  src={hoveredService.image}
                  alt={hoveredService.title}
                  className="service-exp__image"
                />
                <div className="service-exp__image-overlay"></div>

                <div className="service-exp__image-content">
                  <span className="service-exp__image-number">{hoveredService.id}</span>
                  <hoveredService.icon className="service-exp__image-icon" size={48} />
                  <h3 className="service-exp__image-title">{hoveredService.title}</h3>
                  <p className="service-exp__image-desc">{hoveredService.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive List Side */}
          <div className="service-exp__list">
            {servicesData.map((service) => {
              const isHovered = hoveredService.id === service.id;
              const isExpanded = expandedId === service.id;

              return (
                <div key={service.id} className="service-exp__item-wrap">
                  <button
                    type="button"
                    className={`service-exp__item ${isHovered ? 'is-active' : ''} ${isExpanded ? 'is-expanded' : ''}`}
                    onMouseEnter={() => setHoveredService(service)}
                    onClick={() => handleServiceClick(service)}
                    aria-expanded={isExpanded}
                  >
                    <div className="service-exp__item-header">
                      <span className="service-exp__item-number">{service.id}</span>
                      <span className="service-exp__item-title">{service.title}</span>
                    </div>

                    <div className="service-exp__item-controls">
                      <motion.div
                        className="service-exp__item-arrow"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{
                          x: isHovered ? 0 : -10,
                          opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>

                      <motion.div
                        className="service-exp__item-chevron"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expand Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="service-exp__expand"
                        key="expand"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="service-exp__expand-inner">
                          <div className="service-exp__expand-body">
                            <div className="service-exp__expand-icon">
                              <service.icon size={22} />
                            </div>
                            <p className="service-exp__expand-desc">
                              {service.description}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="service-exp__expand-cta"
                            onClick={(e) => handleEnquireService(e, service.title)}
                          >
                            <span>Enquire about {service.title}</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
