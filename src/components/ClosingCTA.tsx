import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

export default function ClosingCTA() {
  return (
    <section
      id="cta"
      style={{ background: 'var(--c-bg)', padding: '80px 0 96px', position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 70% at 50% 110%, rgba(196,147,63,0.14) 0%, transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute', top: '30%', left: '15%', width: '400px', height: '300px', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(196,147,63,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute', top: '20%', right: '10%', width: '320px', height: '260px', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(196,147,63,0.3) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-body block mb-6 uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'var(--c-accent)', fontWeight: 600 }}
          >
            Mulai Sekarang
          </span>

          <h2
            className="font-heading font-normal"
            style={{
              fontSize: 'clamp(40px, 6.5vw, 88px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              color: 'var(--c-text)',
              marginBottom: '28px',
            } as CSSProperties}
          >
            Tim kamu layak
            <br />
            <em style={{ color: 'var(--c-accent)', fontStyle: 'italic' }}>bekerja lebih baik.</em>
          </h2>

          <p
            className="font-body mx-auto mb-12"
            style={{
              fontSize: '16px', lineHeight: 1.75, color: 'var(--c-text-muted)',
              maxWidth: '480px',
            }}
          >
            Berhenti menghabiskan waktu di spreadsheet dan thread WhatsApp. Coba yeccafold dan rasakan perbedaannya dalam satu minggu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="font-body font-semibold px-10 py-4 rounded-[14px] text-center transition-all duration-200"
              style={{ background: 'var(--c-accent)', color: '#080604', fontSize: '15px', letterSpacing: '0.01em', display: 'inline-block' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >
              Jadwalkan Demo Gratis
            </a>
            <a
              href="#workflow"
              className="font-body font-medium px-10 py-4 rounded-[14px] text-center transition-all duration-200"
              style={{ border: '1px solid var(--c-ghost-border)', color: 'var(--c-ghost-text)', fontSize: '15px', display: 'inline-block' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(196,147,63,0.3)'; el.style.color = 'var(--c-text)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--c-ghost-border)'; el.style.color = 'var(--c-ghost-text)' }}
            >
              Pelajari Platform
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
            {['Tidak perlu kartu kredit', 'Setup dalam 10 menit', 'Dukungan tim langsung'].map(text => (
              <div key={text} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="rgba(34,197,94,0.5)" />
                  <path d="M4 7l2.5 2.5L10 5" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-body" style={{ fontSize: '13px', color: 'var(--c-text-muted)' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
