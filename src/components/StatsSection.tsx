import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 500, suffix: '+', label: 'Kreator Terkelola', sub: 'Dalam satu platform terpusat' },
  { value: 10000, suffix: '+', label: 'Dokumen Dibuat', sub: 'Invoice dan MOU' },
  { value: 90, suffix: '%', label: 'Lebih Efisien', sub: 'Dibanding proses manual' },
  { value: 6, suffix: '', label: 'Tahap Terintegrasi', sub: 'Pipeline lengkap ujung ke ujung' },
]

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target])

  return (
    <span>
      {count.toLocaleString('id-ID')}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      id="stats"
      className="relative overflow-hidden dot-grid"
      style={{ background: 'var(--c-bg)', padding: '80px 0 96px' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,147,63,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-body block mb-5 uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--c-accent)', fontWeight: 600 }}
          >
            Angka Nyata
          </span>
          <h2
            className="font-heading font-normal"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--c-text)',
            } as CSSProperties}
          >
            Hasil yang bisa
            <br />
            <em style={{ color: 'var(--c-accent)', fontStyle: 'italic' }}>diukur.</em>
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{
            border: '1px solid var(--c-border)',
            borderTop: '2px solid rgba(196,147,63,0.5)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: 'clamp(32px, 4vw, 48px) clamp(16px, 2.5vw, 32px)',
                background: 'var(--c-bg)',
                textAlign: 'center',
                position: 'relative',
                cursor: 'default',
              } as CSSProperties}
            >
              {i < STATS.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-8 bottom-8"
                  style={{ width: '1px', background: 'var(--c-border)' }}
                />
              )}
              <div
                className="font-heading font-normal tabular-nums"
                style={{
                  fontSize: 'clamp(26px, 5.5vw, 72px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: 'var(--c-accent)',
                  marginBottom: '12px',
                } as CSSProperties}
              >
                <Counter target={stat.value} suffix={stat.suffix} active={isInView} />
              </div>
              <div
                className="font-heading font-normal"
                style={{ fontSize: '16px', letterSpacing: '-0.01em', color: 'var(--c-text)', marginBottom: '6px' } as CSSProperties}
              >
                {stat.label}
              </div>
              <div
                className="font-body"
                style={{ fontSize: '12px', color: 'var(--c-text-muted)', lineHeight: 1.5 } as CSSProperties}
              >
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{
            padding: '40px 48px',
            background: 'var(--c-bg-card)',
            border: '1px solid var(--c-border)',
            borderRadius: '20px',
          } as CSSProperties}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div
              className="font-heading font-normal"
              style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', letterSpacing: '-0.03em', color: 'var(--c-text)', lineHeight: 1.1 } as CSSProperties}
            >
              Siap mengubah cara
              <br />
              tim kamu bekerja?
            </div>
            <p
              className="font-body mt-4"
              style={{ fontSize: '14px', color: 'var(--c-text-muted)', lineHeight: 1.7, maxWidth: '420px' } as CSSProperties}
            >
              Lebih dari 500 kreator sudah dikelola melalui yeccafold. Bergabunglah dan rasakan perbedaannya.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#contact"
              className="font-body text-sm font-semibold px-8 py-4 rounded-[14px] text-center transition-all duration-200"
              style={{ background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)', letterSpacing: '0.01em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Minta Demo Gratis
            </a>
            <a
              href="#workflow"
              className="font-body text-sm font-medium px-8 py-4 rounded-[14px] text-center transition-all duration-200"
              style={{ border: '1px solid var(--c-ghost-border)', color: 'var(--c-ghost-text)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(196,147,63,0.3)'; el.style.color = 'var(--c-text)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--c-ghost-border)'; el.style.color = 'var(--c-ghost-text)' }}
            >
              Lihat Alur Kerja
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
