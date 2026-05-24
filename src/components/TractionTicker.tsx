import type { CSSProperties } from 'react'

const ITEMS = [
  { label: '120+', desc: 'Tim KOL aktif' },
  { label: 'Rp 2.8M', desc: 'Diproses per hari' },
  { label: '10K+', desc: 'Dokumen diterbitkan' },
  { label: '40 jam', desc: 'Dihemat per bulan' },
  { label: '90%', desc: 'Lebih efisien' },
  { label: '3 kota', desc: 'Jakarta, Surabaya, Bandung' },
  { label: '500+', desc: 'Kreator tanpa spreadsheet' },
  { label: '10 mnt', desc: 'Setup platform' },
]

function Dot() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: 'rgba(196,147,63,0.3)',
        flexShrink: 0,
        alignSelf: 'center',
        margin: '0 24px',
      }}
    />
  )
}

function TickerItem({ label, desc }: { label: string; desc: string }) {
  return (
    <span className="inline-flex items-center gap-2 shrink-0" style={{ whiteSpace: 'nowrap' }}>
      <span
        className="font-heading"
        style={{ fontSize: '15px', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--c-accent)' } as CSSProperties}
      >
        {label}
      </span>
      <span
        className="font-body"
        style={{ fontSize: '12px', color: 'var(--c-text-muted)' }}
      >
        {desc}
      </span>
    </span>
  )
}

export default function TractionTicker() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--c-border)',
        borderBottom: '1px solid var(--c-border)',
        overflow: 'hidden',
        position: 'relative',
        padding: '14px 0',
        background: 'var(--c-bg)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '80px',
          background: 'linear-gradient(90deg, var(--c-bg) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: '80px',
          background: 'linear-gradient(270deg, var(--c-bg) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div className="marquee-fwd" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <TickerItem label={item.label} desc={item.desc} />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  )
}
