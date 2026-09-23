import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Smartphone } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="contact section" id="contact" aria-label="Contact information and location">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow">Find Us</span>
          <h2 className="section-title">Contact & Location</h2>
          <span className="divider divider--centered"></span>
          <p className="section-subtitle">
            Visit us in Toronto or get in touch. We are happy to assist with your travel plans.
          </p>
        </div>

        <div className="contact__layout">
          {/* Info Side */}
          <motion.div 
            className="contact__info"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="contact__info-item" variants={itemVariants}>
              <div className="contact__info-icon">
                <MapPin size={24} />
              </div>
              <div className="contact__info-text">
                <span className="contact__info-label">Address</span>
                <span className="contact__info-value">
                  240 Wellesley St. East<br />
                  Toronto, ON M4X 1G5<br />
                  Canada
                </span>
                <span className="contact__info-note">Next to Food Basics</span>
              </div>
            </motion.div>

            <motion.div className="contact__info-item" variants={itemVariants}>
              <div className="contact__info-icon">
                <Phone size={24} />
              </div>
              <div className="contact__info-text">
                <span className="contact__info-label">Telephone</span>
                <span className="contact__info-value">
                  <a href="tel:4169270770">416-927-0770</a>
                </span>
              </div>
            </motion.div>

            <motion.div className="contact__info-item" variants={itemVariants}>
              <div className="contact__info-icon">
                <Smartphone size={24} />
              </div>
              <div className="contact__info-text">
                <span className="contact__info-label">Mobile</span>
                <span className="contact__info-value">
                  <a href="tel:4168263331">416-826-3331</a>
                </span>
              </div>
            </motion.div>

            <motion.div className="contact__info-item" variants={itemVariants}>
              <div className="contact__info-icon">
                <Mail size={24} />
              </div>
              <div className="contact__info-text">
                <span className="contact__info-label">Email</span>
                <span className="contact__info-value">
                  <a href="mailto:nsothi@gmail.com">nsothi@gmail.com</a>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Map Side */}
          <motion.div 
            className="contact__map"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              title="AMC Travel Service location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.3!2d-79.3734!3d43.6670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb5a5d3a4a3b%3A0x0!2s240+Wellesley+St+E%2C+Toronto%2C+ON+M4X+1G5!5e0!3m2!1sen!2sca!4v1"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
