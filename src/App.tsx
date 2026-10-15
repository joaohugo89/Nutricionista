/* =========================================================================
   MONTAGEM DA PÁGINA — a ordem das seções é definida aqui.
   Para remover uma seção, basta comentar a linha correspondente.
   ========================================================================= */
import FluidBackground from './components/FluidBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Plate from './components/Plate';
import Journey from './components/Journey';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SelecaoProvider } from './lib/selection';

export default function App() {
  return (
    <SelecaoProvider>
      <FluidBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Plate />
        <Journey />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SelecaoProvider>
  );
}
