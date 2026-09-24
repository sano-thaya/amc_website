import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import './FlightRoute.css';

export default function FlightRoute() {
  return (
    <div className="flight-route-container" aria-hidden="true">
      <svg className="flight-route-svg" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <motion.path
          d="M 100 0 C 300 200, 700 400, 900 600"
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <motion.path
          d="M 100 0 C 300 200, 700 400, 900 600"
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
