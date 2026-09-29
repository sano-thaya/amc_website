import { motion } from 'framer-motion';
import { MapPin, Phone, Globe } from 'lucide-react';
import FlightRoute from '../FlightRoute/FlightRoute';
import './Hero.css';

function scrollToSection(href) {
  const target = document.querySelector(href);
  if (target) {
    const yOffset = -80;
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero" id="home" aria-label="Hero — AMC Travel Service">
      {/* Cinematic Background */}
      <div className="hero__bg" aria-hidden="true">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"
          alt="Cinematic airplane flight"
          className="hero__bg-img"
        />
        <div className="hero__overlay"></div>
      </div>

      <FlightRoute />

      {/* Content */}
      <div className="hero__content">
        <motion.div 
          className="hero__text-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__eyebrow" variants={itemVariants}>
            <span className="hero__eyebrow-dot"></span>
            AMC TRAVEL SERVICE
          </motion.p>

          <motion.h1 className="hero__heading" variants={itemVariants}>
            YOUR JOURNEY<br />
            <span>BEGINS HERE.</span>
          </motion.h1>

          <motion.p className="hero__subtext" variants={itemVariants}>
            Air tickets, holidays, cruises, hotels and travel services
            for journeys around the world.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <button
              className="btn btn--primary hero__btn"
              onClick={() => scrollToSection('#services')}
            >
              Explore Services
            </button>
            <button
              className="btn btn--outline hero__btn"
              onClick={() => scrollToSection('#contact')}
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>

        {/* Small Destination Coordinates or Details overlaying the corner */}
        <motion.div 
          className="hero__coordinates"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="hero__coord-item">
            <MapPin size={16} /> <span>Toronto, ON</span>
          </div>
          <div className="hero__coord-item">
            <Phone size={16} /> <span>416-927-0770</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll"
        onClick={() => scrollToSection('#journey-planner')}
        aria-label="Scroll down to explore services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.span 
          className="hero__scroll-bar"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        ></motion.span>
        <span>Scroll</span>
      </motion.button>
    </section>
  );
}
