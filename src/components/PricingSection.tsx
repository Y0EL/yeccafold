import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLANS = [
  {
    name: 'Mulai',
    tagline: 'Untuk tim kecil yang baru memulai',
    monthly: 299000,
    annual: 239000,
    limit: 'Hingga 20 kreator',
    cta: 'Coba Gratis 14 Hari',
    highlight: false,
    features: [
      'Dashboard kreator terpusat',
      'Dokumen otomatis (invoice dan MOU)',
      'Magic Link tanda tangan',
      'Curator Board review konten',
      '2 akun pengguna',
      'Dukungan via email',
    ],
  },
  {
    name: 'Tim',
    tagline: 'Untuk agensi yang sedang berkembang',
    monthly: 799000,
    annual: 639000,
    limit: 'Hingga 100 kreator',
    cta: 'Mulai Sekarang',
    highlight: true,
    badge: 'Paling Populer',
    features: [
      'Semua fitur di paket Mulai',
      'Sinkronisasi Google Sheets otomatis',
      'Pencarian Cerdas dengan AI',
      '5 akun pengguna',
      'Notifikasi status pipeline',
      'Priority support',
    ],
  },
  {
    name: 'Agensi',
    tagline: 'Untuk tim profesional skala besar',
    monthly: 1999000,
    annual: 1599000,
    limit: 'Kreator tak terbatas',
    note: 'Kontrak tahunan minimum',
    cta: 'Hubungi Kami',
    highlight: false,
    features: [
      'Semua fitur di paket Tim',
      'Akun pengguna tak terbatas',
      'Akses API dan integrasi kustom',
      'Onboarding dan migrasi data',
      'Manajer akun khusus',
      'SLA uptime 99,9%',
    ],
  },
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
      <circle cx="7" cy="7" r="7" fill="rgba(196,147,63,0.15)" />
      <path d="M4 7L6.2 9.2L10 5" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function formatRupiah(val: number) {
  if (val >= 1000000) {
    const m = val / 1000000
    return `Rp ${m % 1 === 0 ? m : m.toFixed(1)} jt`
  }
  return `Rp ${(val / 1000).toFixed(0)} rb`
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section
      id="harga"
      className="relative overflow-hidden dot-grid"
      style={{ background: 'var(--c-bg)', padding: '80px 0 96px' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(196,147,63,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-body block mb-5 uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--c-accent)', fontWeight: 600 }}
          >
            Harga
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
            Investasi sekali,
            <br />
            <em style={{ color: 'var(--c-accent)', fontStyle: 'italic' }}>hemat selamanya.</em>
          </h2>

          <div className="relative inline-flex flex-col items-end mt-10" style={{ gap: '6px' }}>
            <span
              className="font-body self-end"
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--c-accent)',
                padding: '3px 9px',
                borderRadius: '100px',
                background: 'rgba(196,147,63,0.10)',
                border: '1px solid rgba(196,147,63,0.22)',
                marginRight: '4px',
              }}
            >
              HEMAT 20%
            </span>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--c-bg-card)',
                border: '1px solid var(--c-border)',
                borderRadius: '100px',
                padding: '4px',
                gap: '2px',
              }}
            >
              {(['Bulanan', 'Tahunan'] as const).map((label, i) => {
                const active = annual === (i === 1)
                return (
                  <button
                    key={label}
                    onClick={() => setAnnual(i === 1)}
                    className="font-body"
                    style={{
                      padding: '7px 22px',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: active ? 600 : 400,
                      color: active ? (i === 1 ? '#000' : 'var(--c-bg)') : 'var(--c-text-muted)',
                      background: active ? (i === 1 ? 'var(--c-accent)' : 'var(--c-text)') : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                borderRadius: '20px',
                padding: plan.highlight ? '32px' : '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                background: plan.highlight ? 'var(--c-bg-card)' : 'var(--c-bg-card)',
                border: plan.highlight ? '1px solid rgba(196,147,63,0.35)' : '1px solid var(--c-border)',
                boxShadow: plan.highlight ? '0 0 60px rgba(196,147,63,0.08), 0 24px 48px rgba(0,0,0,0.3)' : 'none',
              } as CSSProperties}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(196,147,63,0.7) 50%, transparent 100%)',
                    borderRadius: '20px 20px 0 0',
                  }}
                />
              )}

              {plan.badge && (
                <div
                  className="font-body"
                  style={{
                    display: 'inline-block',
                    marginBottom: '16px',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    background: 'rgba(196,147,63,0.12)',
                    color: 'var(--c-accent)',
                    border: '1px solid rgba(196,147,63,0.2)',
                    width: 'fit-content',
                  }}
                >
                  {plan.badge.toUpperCase()}
                </div>
              )}

              <div className="font-heading" style={{ fontSize: '22px', fontWeight: 400, color: 'var(--c-text)', marginBottom: '4px' }}>
                {plan.name}
              </div>
              <div className="font-body" style={{ fontSize: '12px', color: 'var(--c-text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                {plan.tagline}
              </div>

              <div style={{ marginBottom: '8px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? 'annual' : 'monthly'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="font-heading"
                    style={{
                      fontSize: 'clamp(32px, 3vw, 42px)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: plan.highlight ? 'var(--c-accent)' : 'var(--c-text)',
                    } as CSSProperties}
                  >
                    {formatRupiah(annual ? plan.annual : plan.monthly)}
                  </motion.div>
                </AnimatePresence>
                <div className="font-body" style={{ fontSize: '11px', color: 'var(--c-text-muted)', marginTop: '4px' }}>
                  per bulan{annual ? ', dibayar tahunan' : ''}
                </div>
                {'note' in plan && (
                  <div className="font-body" style={{ fontSize: '10px', color: 'var(--c-accent)', marginTop: '6px', fontWeight: 600, letterSpacing: '0.02em' }}>
                    {(plan as typeof plan & { note: string }).note}
                  </div>
                )}
              </div>

              <div
                className="font-body"
                style={{
                  display: 'inline-block',
                  margin: '16px 0',
                  padding: '5px 12px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: 'rgba(196,147,63,0.07)',
                  color: 'var(--c-text-muted)',
                  border: '1px solid var(--c-border)',
                  width: 'fit-content',
                }}
              >
                {plan.limit}
              </div>

              <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '20px', marginBottom: '24px' }}>
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2" style={{ marginBottom: '10px' }}>
                    <CheckIcon />
                    <span className="font-body" style={{ fontSize: '13px', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="font-body"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '13px 24px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  background: plan.highlight ? 'var(--c-accent)' : 'transparent',
                  color: plan.highlight ? '#0c0a06' : 'var(--c-text)',
                  border: plan.highlight ? 'none' : '1px solid var(--c-border)',
                  transition: 'all 0.2s ease',
                  marginTop: 'auto',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (plan.highlight) {
                    el.style.background = '#d4a84a'
                  } else {
                    el.style.borderColor = 'rgba(196,147,63,0.35)'
                    el.style.color = 'var(--c-accent)'
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  if (plan.highlight) {
                    el.style.background = 'var(--c-accent)'
                  } else {
                    el.style.borderColor = 'var(--c-border)'
                    el.style.color = 'var(--c-text)'
                  }
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-body text-center mt-10"
          style={{ fontSize: '12px', color: 'var(--c-text-muted)', lineHeight: 1.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Semua paket termasuk uji coba 14 hari tanpa biaya. Tidak perlu kartu kredit untuk memulai.
        </motion.p>
      </div>
    </section>
  )
}
