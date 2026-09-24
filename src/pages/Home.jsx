import { useRef } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import ServiceExperience from '../components/ServiceExperience/ServiceExperience';
import JourneyPlanner from '../components/JourneyPlanner/JourneyPlanner';
import Destinations from '../components/Destinations/Destinations';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import InsuranceCTA from '../components/InsuranceCTA/InsuranceCTA';
import AirlinePartners from '../components/AirlinePartners/AirlinePartners';
import ContactCTA from '../components/ContactCTA/ContactCTA';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import GlobalJourneyRoute from '../components/GlobalJourneyRoute/GlobalJourneyRoute';

export default function Home() {
  const containerRef = useRef(null);

  return (
    <>
      <Navbar />
      <div 
        className="home-journey-wrapper" 
        ref={containerRef} 
        style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}
      >
        <GlobalJourneyRoute containerRef={containerRef} />
        <main id="main-content">
          <Hero />
          <About />
          <ServiceExperience />
          <JourneyPlanner />
          <Destinations />
          <WhyChooseUs />
          <InsuranceCTA />
          <AirlinePartners />
          <ContactCTA />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
