import { CallToAction } from './CallToAction'
import { Features } from './Features'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Navbar } from './Navbar'
import { Showcase } from './Showcase'

/** Landing pública de Nottia (ruta `/`). */
export function LandingPage() {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
