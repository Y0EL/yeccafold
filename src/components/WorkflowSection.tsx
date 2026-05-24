import { useState, useEffect, useRef, useCallback } from 'react'
import type { CSSProperties } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'

const STAGES = [
  { num: '01', label: 'Reachout', tagline: 'Temukan dan hubungi kreator yang tepat', metric: '3m', metricLabel: 'untuk briefing 100 kreator' },
  { num: '02', label: 'Dealing', tagline: 'Negosiasi harga dan sepakati syarat', metric: '80%', metricLabel: 'lebih sedikit pesan per deal' },
  { num: '03', label: 'Sampling', tagline: 'Kirim produk dan lacak setiap pengiriman', metric: '100%', metricLabel: 'visibilitas pengiriman' },
  { num: '04', label: 'Drafting', tagline: 'Tinjau dan setujui konten kreator', metric: '4x', metricLabel: 'siklus persetujuan lebih cepat' },
  { num: '05', label: 'Financing', tagline: 'Buat invoice dalam hitungan detik', metric: '30s', metricLabel: 'per invoice lengkap' },
  { num: '06', label: 'Finished', tagline: 'Arsipkan dan siapkan kampanye berikutnya', metric: '0', metricLabel: 'data hilang antar kampanye' },
]

const STAGE_COLORS = [
  { bg: '#f3f4f6', text: '#6b7280', dot: '#9ca3af' },
  { bg: '#fef3c7', text: '#d97706', dot: '#f59e0b' },
  { bg: '#dbeafe', text: '#2563eb', dot: '#3b82f6' },
  { bg: '#e0e7ff', text: '#4f46e5', dot: '#6366f1' },
  { bg: '#f3e8ff', text: '#7c3aed', dot: '#a855f7' },
  { bg: '#dcfce7', text: '#16a34a', dot: '#22c55e' },
]

const MOCK_ROWS = [
  { name: 'Sarah_Kirana', handle: '@sarahkirana_', stageIdx: 0, followers: '2.4M', updated: '2j lalu', seed: 'SarahKirana' },
  { name: 'DivaRatna', handle: '@divaratna', stageIdx: 1, followers: '3.2M', updated: '5j lalu', seed: 'DivaRatna' },
  { name: 'MayaSerafin', handle: '@mayaserafin', stageIdx: 2, followers: '4.5M', updated: '1h lalu', seed: 'MayaSerafin' },
  { name: 'QuinnAstrid', handle: '@quinnastrid', stageIdx: 3, followers: '3.7M', updated: '3j lalu', seed: 'QuinnAstrid' },
  { name: 'CalystaReine', handle: '@calystare', stageIdx: 4, followers: '1.3M', updated: '1h lalu', seed: 'CalystaReine' },
  { name: 'ElsaAmara', handle: '@elsaamara', stageIdx: 5, followers: '2.6M', updated: '6j lalu', seed: 'ElsaAmara' },
]

const AUTO_MS = 4200
const CORNER_R = 13

function dicebear(seed: string) {
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=f3f4f6,e5e7eb`
}

function StageButton({
  s,
  i,
  isActive,
  paused,
  onSelect,
}: {
  s: (typeof STAGES)[0]
  i: number
  isActive: boolean
  paused: boolean
  onSelect: (i: number) => void
}) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [dims, setDims] = useState({ w: 300, h: 64 })

  useEffect(() => {
    if (!isActive) return
    const el = btnRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setDims({ w: r.width, h: r.height })
    }
    update()
    const ob = new ResizeObserver(update)
    ob.observe(el)
    return () => ob.disconnect()
  }, [isActive])

  const perimeter =
    2 * (dims.w - 2 * CORNER_R) +
    2 * (dims.h - 2 * CORNER_R) +
    2 * Math.PI * CORNER_R

  return (
    <button
      ref={btnRef}
      onClick={() => onSelect(i)}
      className="relative text-left w-full"
      style={{
        padding: '14px 18px',
        borderRadius: '14px',
        background: isActive ? 'rgba(196,147,63,0.07)' : 'transparent',
        border: '1px solid transparent',
        marginBottom: '4px',
        transition: 'background 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {isActive && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: dims.w,
            height: dims.h,
            pointerEvents: 'none',
          }}
        >
          <rect
            x={1}
            y={1}
            width={dims.w - 2}
            height={dims.h - 2}
            rx={CORNER_R}
            stroke="rgba(196,147,63,0.18)"
            strokeWidth={1.5}
            fill="none"
          />
          <rect
            key={`${paused}-${Math.round(dims.w)}`}
            className="ring-fill-bar"
            x={1}
            y={1}
            width={dims.w - 2}
            height={dims.h - 2}
            rx={CORNER_R}
            stroke="rgba(196,147,63,0.88)"
            strokeWidth={1.5}
            fill="none"
            style={{
              strokeDasharray: perimeter,
              ['--ring-perimeter']: String(perimeter),
              animation: `ring-fill ${AUTO_MS}ms linear forwards`,
              animationPlayState: paused ? 'paused' : 'running',
            } as CSSProperties}
          />
        </svg>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <span
            className="font-body font-semibold uppercase shrink-0 mt-0.5"
            style={{
              fontSize: '9px',
              letterSpacing: '0.14em',
              color: isActive ? 'var(--c-accent)' : 'var(--c-text-dim)',
            }}
          >
            {s.num}
          </span>
          <div className="min-w-0">
            <div
              className="font-heading font-normal"
              style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                letterSpacing: '-0.02em',
                color: isActive ? 'var(--c-text)' : 'var(--c-text-muted)',
                lineHeight: 1.1,
                transition: 'color 0.3s',
              } as CSSProperties}
            >
              {s.label}
            </div>
            <AnimatePresence>
              {isActive && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p
                    className="font-body mt-1"
                    style={{ fontSize: '11px', color: 'var(--c-text-muted)', lineHeight: 1.5 }}
                  >
                    {s.tagline}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="font-heading font-normal tabular-nums"
            style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              letterSpacing: '-0.03em',
              color: isActive ? 'var(--c-accent)' : 'var(--c-text-dim)',
              transition: 'color 0.3s',
              lineHeight: 1,
            } as CSSProperties}
          >
            {s.metric}
          </div>
          <AnimatePresence>
            {isActive && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="font-body mt-0.5"
                  style={{ fontSize: '9px', color: 'var(--c-text-dim)', lineHeight: 1.4, maxWidth: '80px' }}
                >
                  {s.metricLabel}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </button>
  )
}

function DashboardMockup({ active }: { active: number }) {
  return (
    <div
      className="rounded-[18px] overflow-hidden"
      style={{
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4"
        style={{ background: '#1c1c1e', height: '38px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <div
          className="mx-auto font-body text-[11px]"
          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}
        >
          yeccafold: Daftar Kreator
        </div>
      </div>

      <div style={{ background: '#f8fafc' }}>
        <div
          className="flex items-center justify-between px-4 sm:px-5 py-3"
          style={{ borderBottom: '1px solid #f1f5f9', background: '#ffffff' }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', fontFamily: 'Inter, sans-serif' }}>Kreator</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>6 kreator aktif</div>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="3.5" stroke="#9ca3af" strokeWidth="1.2" />
              <path d="M8 8L10 10" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline" style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Cari kreator...</span>
          </div>
        </div>

        <div
          className="hidden sm:grid px-4 py-2"
          style={{ gridTemplateColumns: '1fr 0.7fr 0.5fr 0.5fr', background: '#fdfdfd', borderBottom: '1px solid #f0f0f0', gap: '8px' }}
        >
          {['KREATOR', 'STATUS', 'FOLLOWERS', 'UPDATE'].map(col => (
            <div key={col} style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>
              {col}
            </div>
          ))}
        </div>

        <div>
          {MOCK_ROWS.map((row) => {
            const isHighlighted = row.stageIdx === active
            const color = STAGE_COLORS[row.stageIdx]
            return (
              <m.div
                key={row.seed}
                animate={{ background: isHighlighted ? 'rgba(196,147,63,0.06)' : '#ffffff' }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 px-4 sm:px-4"
                style={{ borderBottom: '1px solid #f8f8f8', padding: '9px 16px' }}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div
                    className="w-7 h-7 rounded-xl overflow-hidden shrink-0"
                    style={{
                      background: '#f3f4f6',
                      border: isHighlighted ? '1.5px solid rgba(196,147,63,0.4)' : '1.5px solid transparent',
                    }}
                  >
                    <img src={dicebear(row.seed)} alt={row.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {row.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{row.handle}</div>
                  </div>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: color.bg,
                    fontSize: '9px',
                    fontWeight: 800,
                    color: color.text,
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.05em',
                    boxShadow: isHighlighted ? `0 0 0 1.5px ${color.dot}33` : 'none',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color.dot }} />
                  {STAGES[row.stageIdx].label.toUpperCase()}
                </span>

                <span className="hidden sm:block shrink-0" style={{ fontSize: '11px', color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {row.followers}
                </span>
                <span className="hidden sm:block shrink-0" style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                  {row.updated}
                </span>
              </m.div>
            )
          })}
        </div>

        <div
          className="flex items-center justify-between px-4 sm:px-5 py-3"
          style={{ borderTop: '1px solid #f1f5f9', background: '#ffffff' }}
        >
          <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            Menampilkan 6 dari 147 kreator
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map(n => (
              <div
                key={n}
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{
                  background: n === 1 ? '#000' : '#f3f4f6',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: n === 1 ? '#fff' : '#9ca3af',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkflowSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 })

  const advance = useCallback(() => {
    setActive(a => (a + 1) % STAGES.length)
  }, [])

  useEffect(() => {
    if (!isInView || paused) return
    const id = setTimeout(advance, AUTO_MS)
    return () => clearTimeout(id)
  }, [active, isInView, paused, advance])

  const handleClick = (i: number) => {
    setActive(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 10000)
  }

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative overflow-hidden"
      style={{ background: 'var(--c-bg)', padding: '80px 0 96px' }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, var(--c-orb-1) 0%, transparent 65%)', filter: 'blur(120px)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <m.div
          className="mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-body block mb-5 uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--c-accent)', fontWeight: 600 }}
          >
            Alur Kerja
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-heading font-normal"
              style={{
                fontSize: 'clamp(44px, 6vw, 80px)',
                letterSpacing: '-0.03em',
                lineHeight: 0.93,
                color: 'var(--c-text)',
              } as CSSProperties}
            >
              Enam tahap.
              <br />
              <em style={{ color: 'var(--c-accent)', fontStyle: 'italic' }}>Nol yang terlewat.</em>
            </h2>
            <p
              className="font-body lg:max-w-[300px]"
              style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--c-text-muted)' }}
            >
              Dari kontak pertama hingga pembayaran lunas. Semua kreator terpantau. Semua kontrak tersimpan. Semua invoice terkirim tepat waktu.
            </p>
          </div>
        </m.div>

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <m.div
            className="w-full lg:w-[340px] shrink-0 flex flex-col"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {STAGES.map((s, i) => (
              <StageButton
                key={s.num}
                s={s}
                i={i}
                isActive={i === active}
                paused={paused}
                onSelect={handleClick}
              />
            ))}
          </m.div>

          <m.div
            className="w-full lg:flex-1 min-w-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardMockup active={active} />
          </m.div>
        </div>
      </div>
    </section>
  )
}
