import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Platform', href: '#platform' },
  { label: 'Alur Kerja', href: '#workflow' },
  { label: 'Fitur', href: '#features' },
  { label: 'Perbandingan', href: '#compare' },
  { label: 'Harga', href: '#harga' },
]


function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M12.6 3.4L11.5 4.5M4.5 11.5L3.4 12.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [activeSection, setActiveSection] = useState('platform')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['platform', 'workflow', 'features', 'compare', 'stats', 'harga', 'cta', 'contact']
    let observers: IntersectionObserver[] = []

    const setup = () => {
      observers.forEach(o => o.disconnect())
      observers = []
      sectionIds.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id)
          },
          { rootMargin: '-20% 0px -60% 0px' }
        )
        obs.observe(el)
        observers.push(obs)
      })
    }

    setup()
    window.addEventListener('yf:sections-ready', setup)

    return () => {
      window.removeEventListener('yf:sections-ready', setup)
      observers.forEach(o => o.disconnect())
    }
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }

  return (
    <m.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'var(--c-nav-scrolled)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid var(--c-nav-border)` : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#platform" className="flex items-center select-none">
          <span className="font-heading font-normal text-[17px]" style={{ letterSpacing: '-0.025em', color: 'var(--c-text)' }}>
            yeccafold
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-medium transition-all duration-200 relative py-1"
                style={{ color: isActive ? 'var(--c-text)' : 'var(--c-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--c-text)' : 'var(--c-text-muted)')}
              >
                {link.label}
                {isActive && (
                  <m.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full"
                    style={{ background: 'var(--c-accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{ color: 'var(--c-text-muted)', border: '1px solid var(--c-border)' }}
            aria-label="Ganti tema"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="#contact"
            className="font-body text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
            style={{ border: '1px solid var(--c-badge-border)', color: 'var(--c-accent)' }}
          >
            Minta Demo
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1 transition-colors"
          style={{ color: 'var(--c-text-muted)' }}
          aria-label="Buka navigasi"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden"
            style={{
              background: 'var(--c-nav-scrolled)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid var(--c-border-subtle)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base font-medium py-1 transition-colors"
                  style={{ color: activeSection === link.href.slice(1) ? 'var(--c-text)' : 'var(--c-text-muted)' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ color: 'var(--c-text-muted)', border: '1px solid var(--c-border)' }}
                >
                  {dark ? <SunIcon /> : <MoonIcon />}
                </button>
                <a
                  href="#contact"
                  className="flex-1 font-body text-sm font-medium text-center px-4 py-3 rounded-lg transition-all hover:opacity-80"
                  style={{ border: '1px solid var(--c-badge-border)', color: 'var(--c-accent)' }}
                >
                  Minta Demo
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  )
}
