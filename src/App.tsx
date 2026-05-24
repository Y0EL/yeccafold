import { useScroll, useSpring, m, LazyMotion, domAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
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

const BELOW_FOLD = [
  WorkflowSection,
  FeaturesSection,
  CompareSection,
  TestimonialsSection,
  PricingSection,
  TractionTicker,
  ClosingCTA,
  Footer,
]

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= BELOW_FOLD.length) {
      window.dispatchEvent(new Event('yf:sections-ready'))
      return
    }
    const id = window.setTimeout(() => setCount((c) => Math.min(c + 1, BELOW_FOLD.length)), 60)
    return () => window.clearTimeout(id)
  }, [count])

  useEffect(() => {
    const mountAll = () => setCount(BELOW_FOLD.length)
    if (window.location.hash) mountAll()
    const onHash = () => {
      mountAll()
      const target = document.getElementById(window.location.hash.slice(1))
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }))
    }
    window.addEventListener('hashchange', onHash)
    const safety = window.setTimeout(mountAll, 2000)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.clearTimeout(safety)
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--c-bg)', color: 'var(--c-text)' }}>
        <ScrollProgress />
        <Nav />
        <Hero />
        <MarqueeSection />
        {BELOW_FOLD.slice(0, count).map((Section, i) => (
          <Section key={i} />
        ))}
      </div>
    </LazyMotion>
  )
}
