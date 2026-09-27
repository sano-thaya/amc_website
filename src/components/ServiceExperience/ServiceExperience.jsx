import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/services';
import './ServiceExperience.css';

export default function ServiceExperience() {
  const [activeService, setActiveService] = useState(servicesData[0]);

  return (
    <section className="service-exp section" id="services">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow">Our Expertise</span>
          <h2 className="section-title">Explore Our Services</h2>
          <p className="section-subtitle">
            Comprehensive travel planning designed for every kind of journey.
          </p>
        </div>

        <div className="service-exp__layout">
          {/* Visual Display Side */}
          <div className="service-exp__visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className="service-exp__image-wrapper"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="service-exp__image"
                />
                <div className="service-exp__image-overlay"></div>
                
                <div className="service-exp__image-content">
                  <span className="service-exp__image-number">{activeService.id}</span>
                  <activeService.icon className="service-exp__image-icon" size={48} />
                  <h3 className="service-exp__image-title">{activeService.title}</h3>
                  <p className="service-exp__image-desc">{activeService.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive List Side */}
          <div className="service-exp__list">
            {servicesData.map((service) => {
              const isActive = activeService.id === service.id;
              
              return (
                <button
                  key={service.id}
                  className={`service-exp__item ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveService(service)}
                  onClick={() => setActiveService(service)}
                  aria-expanded={isActive}
                >
                  <div className="service-exp__item-header">
                    <span className="service-exp__item-number">{service.id}</span>
                    <span className="service-exp__item-title">{service.title}</span>
                  </div>
                  
                  <motion.div
                    className="service-exp__item-arrow"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ 
                      x: isActive ? 0 : -10, 
                      opacity: isActive ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
