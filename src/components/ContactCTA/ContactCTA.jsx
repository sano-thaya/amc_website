import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section className="contact-cta" id="contact-cta" aria-label="Contact AMC Travel Service">
      <div className="container">
        <motion.div 
          className="contact-cta__inner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-cta__content">
            <span className="section-eyebrow section-eyebrow--light">Start Planning</span>
            <h2 className="contact-cta__title">Ready for Your Next Journey?</h2>
            <p className="contact-cta__subtitle">
              Speak with AMC Travel Service about your next trip. We are here to help you plan and book every step of your journey.
            </p>

            <div className="contact-cta__actions">
              <a href="tel:4169270770" className="btn btn--white contact-cta__btn">
                <Phone size={18} />
                <span>Call Us</span>
              </a>
              <a href="mailto:nsothi@gmail.com" className="btn btn--outline contact-cta__btn">
                <Mail size={18} />
                <span>Email Us</span>
              </a>
            </div>
            
            <p className="contact-cta__direct">
              <Phone size={16} /> 416-927-0770 &nbsp;|&nbsp; 416-826-3331
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
