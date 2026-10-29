import { CallToAction } from './CallToAction'
import { Features } from './Features'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Navbar } from './Navbar'
import { Showcase } from './Showcase'

/** Landing pública de Nottia (ruta `/`): portada de cuaderno + páginas. */
export function LandingPage() {
  return (
    <div className="note-desk min-h-dvh text-ink">
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
