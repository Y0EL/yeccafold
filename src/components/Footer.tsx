import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = {
  Platform: [
    { label: 'Alur Kerja', href: '#workflow' },
    { label: 'Fitur', href: '#features' },
    { label: 'Perbandingan', href: '#compare' },
    { label: 'Harga', href: '#harga' },
  ],
  Produk: [
    { label: 'Dokumen Otomatis', href: '#features' },
    { label: 'Magic Link', href: '#features' },
    { label: 'Curator Board', href: '#features' },
    { label: 'Sinkronisasi Sheets', href: '#features' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '#' },
    { label: 'Minta Demo', href: '#contact' },
    { label: 'Kontak', href: '#contact' },
    { label: 'PT. Yeccafold Indonesia', href: '#' },
  ],
}

function DemoForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'demo-request', email }).toString(),
      })
    } catch {
      // proceed to success state regardless
    } finally {
      setLoading(false)
      setSent(true)
    }
  }

  return (
    <div
      id="contact-form"
      style={{ background: 'rgba(196,147,63,0.06)', border: '1px solid rgba(196,147,63,0.18)', borderRadius: '16px', padding: '24px', overflow: 'hidden', position: 'relative', minHeight: '168px' }}
    >
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            name="demo-request"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="demo-request" />
            <input type="hidden" name="bot-field" />
            <div className="font-heading font-normal mb-2" style={{ fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--c-text)' } as CSSProperties}>
              Jadwalkan Demo
            </div>
            <p className="font-body mb-4" style={{ fontSize: '12px', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
              Lihat yeccafold bekerja untuk tim kamu secara langsung.
            </p>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email@perusahaan.com"
              className="font-body w-full mb-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--c-border)',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13px',
                color: 'var(--c-text)',
                outline: 'none',
                width: '100%',
                display: 'block',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(196,147,63,0.4)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--c-border)' }}
            />
            <button
              type="submit"
              className="font-body w-full font-semibold"
              style={{
                padding: '11px',
                borderRadius: '10px',
                background: loading ? 'rgba(196,147,63,0.5)' : 'var(--c-accent)',
                color: '#080604',
                fontSize: '13px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.02em',
                transition: 'all 0.2s',
                width: '100%',
              }}
            >
              {loading ? 'Mengirim...' : 'Kirim Permintaan'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '168px', textAlign: 'center', gap: '12px' }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="font-heading" style={{ fontSize: '16px', letterSpacing: '-0.02em', color: 'var(--c-text)' } as CSSProperties}>
              Terima kasih!
            </div>
            <p className="font-body" style={{ fontSize: '12px', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
              Kami akan menghubungi {email} dalam 24 jam.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'var(--c-bg)', borderTop: '1px solid var(--c-border)' }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,147,63,0.3), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="py-20 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:max-w-[360px] text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
              <span
                className="font-heading font-normal"
                style={{ fontSize: '20px', letterSpacing: '-0.025em', color: 'var(--c-text)' } as CSSProperties}
              >
                yeccafold
              </span>
            </div>
            <p
              className="font-body"
              style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--c-text-muted)' }}
            >
              Platform manajemen kreator terpadu untuk tim KOL profesional. Dari reachout hingga pembayaran, semua dalam satu tempat.
            </p>
            <div className="flex items-center gap-2 mt-4 mb-8">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6.5" stroke="rgba(34,197,94,0.4)" />
                <path d="M4 7l2.5 2.5L10 5" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-body" style={{ fontSize: '12px', color: 'var(--c-text-muted)' }}>
                120+ tim KOL profesional sudah menggunakan yeccafold
              </span>
            </div>
            <DemoForm />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group}>
                <div
                  className="font-body font-semibold mb-5 uppercase"
                  style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--c-text-dim)' }}
                >
                  {group}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body"
                        style={{ fontSize: '13px', color: 'var(--c-text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--c-text)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--c-text-muted)' }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <div
          style={{ borderTop: '1px solid var(--c-border)', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}
          className="sm:flex-row sm:justify-between sm:items-center"
        >
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            <span className="font-body" style={{ fontSize: '12px', color: 'var(--c-text-dim)' }}>
              2026 PT. Yeccafold Indonesia. Hak cipta dilindungi.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
