import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  MapPin,
  Phone,
  Mail,
  Smartphone,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import './Contact.css';

// ── EmailJS Configuration ─────────────────────────────────────────
// These are read from your .env file (VITE_ prefix exposes them to the browser)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'sano.nago2712nr@gmail.com';

const IS_EMAILJS_CONFIGURED =
  EMAILJS_SERVICE_ID &&
  EMAILJS_TEMPLATE_ID &&
  EMAILJS_PUBLIC_KEY &&
  !EMAILJS_SERVICE_ID.includes('your_');

const serviceOptions = [
  'Air Tickets',
  'Vacation Packages',
  'Cruises',
  'Hotels',
  'Travel Insurance',
  'Group Tours',
  'Wedding Packages',
  'Car Rentals',
  'Adventure & Exotic Tours',
  'General Travel Inquiry'
];

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Air Tickets',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Listen for pre-fill events from services or packages
  useEffect(() => {
    function handleServiceSelected(e) {
      if (e.detail) {
        const found = serviceOptions.find(
          s => s.toLowerCase() === e.detail.toLowerCase() ||
            e.detail.toLowerCase().includes(s.toLowerCase())
        );
        if (found) {
          setFormData(prev => ({ ...prev, service: found }));
        }
      }
    }
    window.addEventListener('select-service-inquiry', handleServiceSelected);
    return () => window.removeEventListener('select-service-inquiry', handleServiceSelected);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formStatus === 'error') {
      setFormStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Client-side validation ──────────────────────────────
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      setFormStatus('error');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address so we can reply to you.');
      setFormStatus('error');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please tell us a bit about your travel plans or questions.');
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');

    if (IS_EMAILJS_CONFIGURED) {
      // ── Send real email via EmailJS ───────────────────────
      try {
        const templateParams = {
          from_name: formData.name,
          reply_to: formData.email,      // When you hit Reply in Gmail, this is where it goes
          phone: formData.phone || 'Not provided',
          service: formData.service,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );

        setFormStatus('success');
      } catch (err) {
        console.error('EmailJS error:', err);
        setErrorMessage(
          'Sorry, there was a problem sending your message. Please try emailing us directly at ' +
          CONTACT_EMAIL
        );
        setFormStatus('error');
      }
    } else {
      // ── Dev mode: no EmailJS keys yet, open mailto as fallback ──
      const subject = encodeURIComponent(`AMC Travel Inquiry: ${formData.service} from ${formData.name}`);
      const body = encodeURIComponent(
        `Hello AMC Travel Service,\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n` +
        `Service: ${formData.service}\n\n` +
        `Message:\n${formData.message}\n`
      );
      window._devMailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setFormStatus('success');
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', phone: '', service: 'Air Tickets', message: '' });
    setFormStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="contact section" id="contact" aria-label="Contact information and location">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Contact AMC Travel Service</h2>
          <span className="divider divider--centered"></span>
          <p className="section-subtitle">
            Send us a message and we will reply directly to your email. We are eager to make your travel seamless and unforgettable.
          </p>
        </div>

        {/* Dev warning banner — only visible when EmailJS keys are missing */}
        {!IS_EMAILJS_CONFIGURED && (
          <div className="contact__dev-notice">
            <AlertCircle size={16} />
            <span>
              <strong>Dev Mode:</strong> EmailJS not configured yet. Follow{' '}
              <strong>EMAILJS_SETUP.md</strong> to enable real email sending to{' '}
              <strong>{CONTACT_EMAIL}</strong>.
            </span>
          </div>
        )}

        <div className="contact__grid">
          {/* ── Email Form ─────────────────────────────────── */}
          <motion.div
            className="contact__form-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact__form-header">
              <div className="contact__form-badge">
                <Mail size={16} />
                <span>Direct Email Inquiry</span>
              </div>
              <h3 className="contact__form-title">Send Us A Message</h3>
              <p className="contact__form-subtitle">
                Fill in your details and we will reply to your email promptly.{' '}
                Replies go straight to <strong>{CONTACT_EMAIL}</strong>.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  key="success-box"
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="contact__success-icon">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="contact__success-title">Message Sent!</h4>
                  <p className="contact__success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry about{' '}
                    <strong>{formData.service}</strong> has been sent to the AMC Travel
                    Service team. We will reply to <strong>{formData.email}</strong> shortly.
                  </p>

                  <div className="contact__success-actions">
                    {!IS_EMAILJS_CONFIGURED && window._devMailto && (
                      <a
                        href={window._devMailto}
                        className="btn btn--primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail size={18} />
                        <span>Open in Email App (Dev fallback)</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="btn btn--outline-blue"
                    >
                      <RefreshCw size={16} />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form
                  key="contact-form"
                  ref={formRef}
                  className="contact__form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <AnimatePresence>
                    {formStatus === 'error' && (
                      <motion.div
                        key="error"
                        className="contact__alert contact__alert--error"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle size={18} />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="contact__field-row">
                    <div className="contact__field">
                      <label htmlFor="contact-name" className="contact__label">
                        Your Name <span className="contact__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        className="contact__input"
                        placeholder="e.g. Eleanor Vance"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="contact__field">
                      <label htmlFor="contact-email" className="contact__label">
                        Email Address <span className="contact__required">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        className="contact__input"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact__field-row">
                    <div className="contact__field">
                      <label htmlFor="contact-phone" className="contact__label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        className="contact__input"
                        placeholder="416-000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="contact__field">
                      <label htmlFor="contact-service" className="contact__label">
                        Service of Interest
                      </label>
                      <div className="contact__select-wrap">
                        <select
                          id="contact-service"
                          name="service"
                          className="contact__select"
                          value={formData.service}
                          onChange={handleChange}
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="contact__field">
                    <label htmlFor="contact-message" className="contact__label">
                      Message / Travel Details <span className="contact__required">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact__textarea"
                      rows={4}
                      placeholder="Tell us about your destination, dates, number of travelers, or any special requests..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary contact__submit-btn"
                    disabled={formStatus === 'sending'}
                    id="contact-submit-btn"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>Sending to {CONTACT_EMAIL}…</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="contact__privacy-note">
                    Your information will only be used to reply to your travel inquiry and is never shared.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Side Column: Contact Info + Map ──────────── */}
          <div className="contact__side-column">
            <motion.div
              className="contact__info-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="contact__info-card-title">Office & Contact Details</h3>

              <div className="contact__info-list">
                <div className="contact__info-item">
                  <div className="contact__info-icon"><MapPin size={22} /></div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">Address</span>
                    <span className="contact__info-value">
                      240 Wellesley St. East<br />
                      Toronto, ON M4X 1G5, Canada
                    </span>
                    <span className="contact__info-note">Next to Food Basics</span>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon"><Phone size={22} /></div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">Telephone</span>
                    <span className="contact__info-value">
                      <a href="tel:4169270770">416-927-0770</a>
                    </span>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon"><Smartphone size={22} /></div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">Mobile</span>
                    <span className="contact__info-value">
                      <a href="tel:4168263331">416-826-3331</a>
                    </span>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon"><Mail size={22} /></div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">Direct Email</span>
                    <span className="contact__info-value">
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    </span>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon"><Clock size={22} /></div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">Business Hours</span>
                    <span className="contact__info-value">
                      Mon – Sat: 9:30 AM – 6:30 PM<br />
                      Sunday: By Appointment
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="contact__map-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="contact__map-header">
                <MapPin size={16} className="contact__map-pin" />
                <span>Interactive Map & Directions</span>
              </div>
              <div className="contact__map-wrap">
                <iframe
                  title="AMC Travel Service location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.3!2d-79.3734!3d43.6670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb5a5d3a4a3b%3A0x0!2s240+Wellesley+St+E%2C+Toronto%2C+ON+M4X+1G5!5e0!3m2!1sen!2sca!4v1"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
