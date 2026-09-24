import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import './InsuranceCTA.css';

export default function InsuranceCTA() {
  return (
    <section className="insurance-cta" id="insurance" aria-label="Travel insurance enquiry">
      <div className="container">
        <motion.div 
          className="insurance-cta__inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="insurance-cta__icon-block" aria-hidden="true">
            <ShieldCheck size={40} />
          </div>

          <div className="insurance-cta__text">
            <span className="section-eyebrow">Travel Insurance</span>
            <h2 className="section-title">Travel With Confidence</h2>
            <p className="section-subtitle">
              Protect your journey from the unexpected. We provide travel insurance assistance tailored to your trip, so you can focus on the experience.
            </p>
          </div>

          <div className="insurance-cta__actions">
            <button
              className="btn btn--primary insurance-cta__btn"
              onClick={() => {
                const el = document.querySelector('#contact');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
              }}
              aria-label="Ask AMC about travel insurance"
            >
              <span>Ask About Coverage</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
