import { useState, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHAOS_MESSAGES = [
  { from: 'Rina', text: 'Kak mau tanya kontraknya yang mana?', time: '09:12', self: false },
  { from: 'You', text: 'Yang di folder Drive, cek ya', time: '09:13', self: true },
  { from: 'Rina', text: 'Yang mana? Ada 3 file', time: '09:14', self: false },
  { from: 'You', text: 'Eh tunggu, saya kirimin dulu ya kaa', time: '09:14', self: true },
  { from: 'Diva', text: 'Halo kak invoicenya udah jadi?', time: '09:21', self: false },
  { from: 'You', text: 'Masih, nanti ya', time: '09:22', self: true },
]

const PIPELINE_ROWS = [
  { name: 'JessicaRavena', stage: 'Drafting', color: '#e0e7ff', textColor: '#4f46e5', dot: '#6366f1', updated: '2j lalu' },
  { name: 'DivaRatna', stage: 'Dealing', color: '#fef3c7', textColor: '#d97706', dot: '#f59e0b', updated: '5j lalu' },
  { name: 'MayaSerafin', stage: 'Finished', color: '#dcfce7', textColor: '#16a34a', dot: '#22c55e', updated: '1h lalu' },
  { name: 'Sarah_Kirana', stage: 'Financing', color: '#f3e8ff', textColor: '#7c3aed', dot: '#a855f7', updated: '3j lalu' },
]

function ChaosBefore() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['Spreadsheet Kreator', 'Folder Drive', 'WhatsApp BD', 'Email Invoice'].map(label => (
          <div
            key={label}
            style={{ fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.28)', color: 'rgba(239,68,68,0.85)', fontFamily: 'Inter, sans-serif' }}
          >
            {label}
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--c-compare-chat-bg)', border: '1px solid var(--c-compare-chat-border)', borderRadius: '12px', padding: '12px', flex: 1, overflow: 'hidden' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--c-compare-text-dim)', marginBottom: '10px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>
          GRUP WHATSAPP BD TEAM
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CHAOS_MESSAGES.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.self ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%',
                padding: '6px 10px',
                borderRadius: msg.self ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                background: msg.self ? 'rgba(196,147,63,0.22)' : 'var(--c-compare-bubble-other)',
                border: `1px solid ${msg.self ? 'rgba(196,147,63,0.32)' : 'var(--c-compare-bubble-border)'}`,
              }}>
                {!msg.self && <div style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(196,147,63,0.7)', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>{msg.from}</div>}
                <div style={{ fontSize: '10px', color: 'var(--c-compare-text-muted)', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>{msg.text}</div>
                <div style={{ fontSize: '8px', color: 'var(--c-compare-text-dim)', textAlign: 'right', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Kontrak tertunda', val: '12' },
          { label: 'Pesan belum dibalas', val: '34' },
          { label: 'Dokumen tidak ditemukan', val: '7' },
          { label: 'Deadline terlewat', val: '3' },
        ].map(item => (
          <div key={item.label} style={{ padding: '10px 12px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: '10px' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'rgba(239,68,68,0.85)', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em', lineHeight: 1 }}>{item.val}</div>
            <div style={{ fontSize: '9px', color: 'var(--c-compare-text-muted)', marginTop: '3px', fontFamily: 'Inter, sans-serif', lineHeight: 1.3 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnimatedCounter({ target, color, delay = 0 }: { target: number; color: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const duration = 900
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) rafRef.current = requestAnimationFrame(tick)
        else setCount(target)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current) }
  }, [target, delay])
  return <span style={{ fontSize: '20px', fontWeight: 800, color, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em', lineHeight: 1 }}>{count}</span>
}

function OrderAfter() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['Reachout', 'Dealing', 'Sampling', 'Drafting', 'Financing', 'Finished'].map(stage => (
          <div
            key={stage}
            style={{ fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: 'rgba(196,147,63,0.08)', border: '1px solid rgba(196,147,63,0.18)', color: 'rgba(196,147,63,0.85)', fontFamily: 'Inter, sans-serif' }}
          >
            {stage}
          </div>
        ))}
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px', overflow: 'hidden', flex: 1 }}>
        <div style={{ background: '#1c1c1e', height: '32px', display: 'flex', alignItems: 'center', paddingLeft: '12px', gap: '6px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
          ))}
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto', marginRight: '12px', fontFamily: 'Inter, sans-serif' }}>yeccafold</div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr 0.7fr', padding: '6px 12px', background: '#f8fafc', borderBottom: '1px solid #f0f0f0' }}>
            {['KREATOR', 'STATUS', 'UPDATE'].map(h => (
              <div key={h} style={{ fontSize: '8px', fontWeight: 800, color: '#9ca3af', fontFamily: 'Inter, sans-serif', letterSpacing: '0.07em' }}>{h}</div>
            ))}
          </div>
          {PIPELINE_ROWS.map(row => (
            <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr 0.7fr', padding: '8px 12px', borderBottom: '1px solid #f8f8f8', alignItems: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#111', fontFamily: 'Inter, sans-serif' }}>{row.name}</div>
              <div>
                <span style={{ fontSize: '9px', fontWeight: 800, padding: '2px 7px', borderRadius: '20px', background: row.color, color: row.textColor, fontFamily: 'Inter, sans-serif' }}>
                  {row.stage.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{row.updated}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Kreator aktif', val: 147, delay: 0 },
          { label: 'Dokumen selesai', val: 89, delay: 80 },
          { label: 'Invoice terkirim', val: 23, delay: 160 },
          { label: 'Deadline terlewat', val: 0, delay: 240 },
        ].map(item => (
          <div key={item.label} style={{ padding: '10px 12px', background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)', borderRadius: '10px' }}>
            <AnimatedCounter target={item.val} color="rgba(34,197,94,0.90)" delay={item.delay} />
            <div style={{ fontSize: '9px', color: 'var(--c-compare-text-muted)', marginTop: '3px', fontFamily: 'Inter, sans-serif', lineHeight: 1.3 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CompareSection() {
  const [view, setView] = useState<'before' | 'after'>('before')

  return (
    <section
      id="compare"
      className="relative overflow-hidden"
      style={{ background: 'var(--c-bg)', padding: '80px 0 96px' }}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(196,147,63,0.05) 0%, transparent 70%)', filter: 'blur(120px)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-body block mb-5 uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--c-accent)', fontWeight: 600 }}
          >
            Sebelum vs Sesudah
          </span>
          <h2
            className="font-heading font-normal"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'var(--c-text)',
            } as CSSProperties}
          >
            Cara lama sudah
            <br />
            <em style={{ color: 'var(--c-accent)', fontStyle: 'italic' }}>tidak cukup.</em>
          </h2>
          <p
            className="font-body mt-6 mx-auto"
            style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--c-text-muted)', maxWidth: '440px' }}
          >
            Tim KOL biasanya menghabiskan 3 jam per kreator untuk administrasi manual. yeccafold memangkasnya menjadi kurang dari 20 menit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-8">
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', background: 'rgba(196,147,63,0.05)', border: '1px solid rgba(196,147,63,0.13)', borderRadius: '18px', padding: '16px 24px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'rgba(239,68,68,0.75)', letterSpacing: '-0.05em', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>3 jam</div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--c-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>Per kreator</div>
              </div>
              <svg width="24" height="14" viewBox="0 0 28 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M2 8h22M18 3l6 5-6 5" stroke="rgba(196,147,63,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--c-accent)', letterSpacing: '-0.05em', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>20 mnt</div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--c-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>Per kreator</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--c-accent)', letterSpacing: '-0.05em', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>90%</div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--c-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>Waktu dihemat</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8 px-2">
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--c-border)', borderRadius: '14px', padding: '4px' }}>
              {(['before', 'after'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: view === v ? (v === 'before' ? 'rgba(239,68,68,0.15)' : 'rgba(196,147,63,0.15)') : 'transparent',
                    color: view === v ? (v === 'before' ? 'rgba(239,68,68,0.9)' : 'var(--c-accent)') : 'var(--c-text-muted)',
                    boxShadow: view === v ? `0 0 0 1px ${v === 'before' ? 'rgba(239,68,68,0.2)' : 'rgba(196,147,63,0.2)'}` : 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {v === 'before' ? 'Tanpa yeccafold' : 'Dengan yeccafold'}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'var(--c-compare-panel)',
              border: '1px solid var(--c-border)',
              borderRadius: '24px',
              padding: '32px',
              minHeight: '520px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.20)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: view === 'before' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: view === 'before' ? 20 : -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%' }}
              >
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: view === 'before' ? 'rgba(239,68,68,0.8)' : '#22c55e',
                  }} />
                  <span
                    className="font-heading"
                    style={{ fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--c-compare-text)' } as CSSProperties}
                  >
                    {view === 'before' ? 'Tanpa yeccafold' : 'Dengan yeccafold: terstruktur dan otomatis'}
                  </span>
                </div>
                {view === 'before' ? <ChaosBefore /> : <OrderAfter />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
