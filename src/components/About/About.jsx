import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <section className="about section" id="about" aria-label="About AMC Travel Service">
      <div className="container">
        <div className="about__layout">
          <motion.div 
            className="about__image-container"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80"
              alt="Travelers examining a globe"
              className="about__image"
              loading="lazy"
            />
            <div className="about__image-accent"></div>
          </motion.div>

          <motion.div 
            className="about__content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="section-eyebrow">About Us</span>
            <h2 className="about__title">Travel Made Simpler.</h2>
            <span className="divider"></span>
            
            <p className="about__text">
              At AMC Travel Service, we believe that your journey should begin the moment you start planning it. 
              Our goal is to transform the complexities of global travel into a seamless, premium experience.
            </p>
            
            <p className="about__text">
              Whether you are looking for convenient air travel arrangements, comprehensive vacation packages, 
              cruises, premium hotel accommodations, or group and special event travel, our dedicated team is 
              here to arrange every detail with precision.
            </p>
            
            <button className="btn btn--primary about__cta">
              <span>Learn More About Our Services</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
