import { About } from './About'
import { CallToAction } from './CallToAction'
import { Contact } from './Contact'
import { Details } from './Details'
import { Faq } from './Faq'
import { Features } from './Features'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { HowItWorks } from './HowItWorks'
import { Navbar } from './Navbar'
import { Showcase } from './Showcase'
import { Ticker } from './Ticker'

/** Landing pública de Nottia (ruta `/`): portada de cuaderno + páginas. */
export function LandingPage() {
  return (
    <div className="note-desk min-h-dvh text-ink">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Features />
        <HowItWorks />
        <Showcase />
        <Details />
        <About />
        <Faq />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
