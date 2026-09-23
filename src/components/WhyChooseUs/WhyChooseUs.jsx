import { motion } from 'framer-motion';
import { 
  Globe, 
  CheckCircle, 
  Plane, 
  Ship, 
  ShieldCheck, 
  Users 
} from 'lucide-react';
import './WhyChooseUs.css';

const REASONS = [
  {
    id: 'range',
    title: 'Travel Services in One Place',
    desc: 'From air tickets and vacation packages to cruises, group tours, and wedding travel.',
    icon: Globe,
  },
  {
    id: 'convenience',
    title: 'Flight & Vacation Planning',
    desc: 'We handle the details of your travel arrangements so you can focus on enjoying the journey.',
    icon: CheckCircle,
  },
  {
    id: 'airlines',
    title: 'Air Ticketing Assistance',
    desc: 'Access to air tickets serving worldwide destinations through extensive airline networks.',
    icon: Plane,
  },
  {
    id: 'cruise-vacation',
    title: 'Cruise & Hotel Options',
    desc: 'Thoughtfully arranged vacation land and cruise packages designed around your preferences.',
    icon: Ship,
  },
  {
    id: 'insurance',
    title: 'Travel Insurance',
    desc: 'We help you navigate travel insurance options so your journey is protected from the unexpected.',
    icon: ShieldCheck,
  },
  {
    id: 'special',
    title: 'Group & Wedding Travel',
    desc: 'Specialised packages for group travel, adventure tours, and memorable occasions like weddings.',
    icon: Users,
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="why section" id="why-choose-us" aria-label="Why choose AMC Travel Service">
      <div className="container">
        <div className="section-header section-header--centered">
          <span className="section-eyebrow section-eyebrow--light">Why AMC?</span>
          <h2 className="section-title section-title--light">Why Choose AMC Travel Service</h2>
          <span className="divider divider--centered divider--light"></span>
          <p className="section-subtitle section-subtitle--light">
            Dedicated to providing comprehensive travel services for a smooth journey.
          </p>
        </div>

        <motion.div 
          className="why__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {REASONS.map((reason) => (
            <motion.article
              key={reason.id}
              className="why__item"
              variants={itemVariants}
            >
              <div className="why__item-icon" aria-hidden="true">
                <reason.icon size={24} />
              </div>
              <h3 className="why__item-title">{reason.title}</h3>
              <p className="why__item-desc">{reason.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
