import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import ServicesIntro from '../components/ServicesIntro/ServicesIntro'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Destinations from '../components/Destinations/Destinations'
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs'
import InsuranceCTA from '../components/InsuranceCTA/InsuranceCTA'
import Partners from '../components/Partners/Partners'
import ContactCTA from '../components/ContactCTA/ContactCTA'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ServicesIntro />
        <About />
        <Services />
        <Destinations />
        <WhyChooseUs />
        <InsuranceCTA />
        <Partners />
        <ContactCTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
