import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import InstantQuote from '@/components/sections/InstantQuote';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import NavMenu from '@/components/ui/NavMenu';

export default function HomePage() {
  return (
    <main>
      <NavMenu />
      <Hero />
      <Services />
      <Projects />
      <InstantQuote />
      <CTA />
      <Footer />
    </main>
  );
}
