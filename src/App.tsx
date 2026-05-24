import { useScroll, useSpring, m, LazyMotion, domAnimation } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MarqueeSection from './components/MarqueeSection'
import WorkflowSection from './components/WorkflowSection'
import FeaturesSection from './components/FeaturesSection'
import CompareSection from './components/CompareSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import TractionTicker from './components/TractionTicker'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <m.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '2px', background: 'var(--c-accent)',
        transformOrigin: '0%', scaleX, zIndex: 100,
      }}
    />
  )
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--c-bg)', color: 'var(--c-text)' }}>
        <ScrollProgress />
        <Nav />
        <Hero />
        <MarqueeSection />
        <WorkflowSection />
        <FeaturesSection />
        <CompareSection />
        <TestimonialsSection />
        <PricingSection />
        <TractionTicker />
        <ClosingCTA />
        <Footer />
      </div>
    </LazyMotion>
  )
}
