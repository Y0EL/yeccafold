import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'Tim kami hemat lebih dari 40 jam sebulan. Semua kontrak dan invoice sekarang ada di satu tempat. Tidak ada lagi email yang nyangkut.',
    name: 'Rina Andriani',
    role: 'Head of BD',
    company: 'Melody Agency Jakarta',
    seed: 'RinaAndriani',
    metric: '40 jam',
    metricLabel: 'dihemat per bulan',
  },
  {
    quote: 'Magic Link mengubah cara kami kelola MOU. Kreator tanda tangan langsung dari HP. Proses yang dulu 3 hari sekarang jadi 10 menit.',
    name: 'Bimo Santosa',
    role: 'Founder',
    company: 'Kolektiv Co. Surabaya',
    seed: 'BimoSantosa',
    metric: '10 mnt',
    metricLabel: 'bukan lagi 3 hari',
  },
  {
    quote: '147 kreator kami kelola tanpa spreadsheet. Tim kecil kami bisa bekerja seperti agensi besar berkat pipeline yeccafold.',
    name: 'Dira Kusuma',
    role: 'Operations Lead',
    company: 'StarManage Bandung',
    seed: 'DiraKusuma',
    metric: '147',
    metricLabel: 'kreator tanpa spreadsheet',
  },
]

function QuoteIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 28 22" fill="none">
      <path
        d="M0 22V13.4C0 9.86667 0.866667 6.93333 2.6 4.6C4.4 2.2 7.06667 0.6 10.6 0L12 2.6C9.86667 3.26667 8.26667 4.33333 7.2 5.8C6.13333 7.26667 5.6 9 5.6 11H11.2V22H0ZM16.8 22V13.4C16.8 9.86667 17.6667 6.93333 19.4 4.6C21.2 2.2 23.8667 0.6 27.4 0L28.8 2.6C26.6667 3.26667 25.0667 4.33333 24 5.8C22.9333 7.26667 22.4 9 22.4 11H28V22H16.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function TestimonialsSection() {
  return (
    <section
      className="relative overflow-hidden dot-grid"
      style={{ background: 'var(--c-bg)', padding: '80px 0 96px' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,147,63,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-body block mb-5 uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--c-accent)', fontWeight: 600 }}
          >
            Kata Mereka
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
            Tim yang sudah
            <br />
            <em style={{ color: 'var(--c-accent)', fontStyle: 'italic' }}>merasakannya.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'var(--c-bg-card)',
                border: '1px solid var(--c-border)',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              } as CSSProperties}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(196,147,63,0.22)'
                el.style.boxShadow = '0 24px 64px rgba(0,0,0,0.35), 0 0 40px rgba(196,147,63,0.05)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--c-border)'
                el.style.boxShadow = 'none'
              }}
            >
              <div style={{ color: 'rgba(196,147,63,0.16)' }}>
                <QuoteIcon />
              </div>

              <p
                className="font-heading font-normal flex-1"
                style={{
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: 'var(--c-text)',
                  fontStyle: 'italic',
                } as CSSProperties}
              >
                {t.quote}
              </p>

              <div
                className="flex items-center gap-3"
                style={{ paddingTop: '16px', borderTop: '1px solid var(--c-border)' }}
              >
                <img
                  src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${t.seed}&backgroundColor=c4933f,b07d28,e8dcc8`}
                  alt={t.name}
                  width={36}
                  height={36}
                  style={{ borderRadius: '50%', background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="font-body" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-text)', letterSpacing: '-0.01em' }}>
                    {t.name}
                  </div>
                  <div className="font-body" style={{ fontSize: '11px', color: 'var(--c-text-muted)', lineHeight: 1.4 }}>
                    {t.role} · {t.company}
                  </div>
                </div>
                <div
                  className="font-body shrink-0"
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--c-accent)',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    background: 'rgba(196,147,63,0.08)',
                    border: '1px solid rgba(196,147,63,0.15)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
