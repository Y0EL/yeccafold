import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 2h7l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 2v4h4M7 9h6M7 12h6M7 15h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconLink() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8.5 11.5a4.5 4.5 0 0 0 6.364 0l2.121-2.121a4.5 4.5 0 0 0-6.364-6.364L9.5 4.136" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11.5 8.5a4.5 4.5 0 0 0-6.364 0L3.015 10.621a4.5 4.5 0 0 0 6.364 6.364L10.5 15.864" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.5l5 2.5-5 2.5V7.5z" fill="currentColor" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.5 9h5M9 6.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconSheets() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 7h14M3 11h14M3 15h14M7 3v14M11 3v14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconQueue() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M4 6h8M4 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function DocIllustration() {
  return (
    <div style={{ background: 'var(--c-invoice-strip)', borderRadius: '12px', padding: '14px', border: '1px solid var(--c-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(196,147,63,0.7)', marginBottom: '2px' }}>INVOICE</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--c-text)', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>INV-20260524-0042</div>
        </div>
        <span style={{ fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', background: 'rgba(34,197,94,0.12)', color: '#22c55e', letterSpacing: '0.06em' }}>LUNAS</span>
      </div>
      {[
        ['Kreator', 'JessicaRavena'],
        ['Platform', 'TikTok'],
        ['Nominal', 'Rp 12.500.000'],
        ['Periode', 'Mei 2026'],
      ].map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--c-border-subtle)', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>
          <span style={{ color: 'var(--c-text-muted)' }}>{k}</span>
          <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>{v}</span>
        </div>
      ))}
      <a href="/invoice-demo.html" target="_blank" rel="noopener noreferrer" style={{ marginTop: '12px', padding: '8px', borderRadius: '8px', background: 'var(--c-accent)', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#080604', letterSpacing: '0.03em', display: 'block', textDecoration: 'none', cursor: 'pointer' }}>
        Unduh PDF
      </a>
      <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '10px', color: 'var(--c-text-dim)' }}>Dibuat dalam 4 detik</div>
    </div>
  )
}

function MagicLinkIllustration() {
  return (
    <div style={{ background: 'var(--c-illus-bg)', borderRadius: '12px', padding: '12px', border: '1px solid var(--c-illus-border)', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '120px', background: 'var(--c-illus-card)', border: '1px solid var(--c-illus-card-border)', borderRadius: '16px', padding: '12px 10px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(196,147,63,0.15)', border: '1px solid rgba(196,147,63,0.22)', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2.5v6M4 5.5L7 8.5L10 5.5" stroke="#c4933f" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 11h8" stroke="#c4933f" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--c-text)', fontFamily: 'Inter, sans-serif' }}>Tanda Tangan</div>
          <div style={{ fontSize: '8px', color: 'var(--c-text-muted)', fontFamily: 'Inter, sans-serif', marginTop: '2px' }}>MOU Kreator</div>
        </div>
        <div style={{ width: '100%', height: '36px', borderRadius: '8px', border: '1px dashed var(--c-badge-border)', background: 'rgba(196,147,63,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '8px', color: 'var(--c-text-dim)', fontFamily: 'Inter, sans-serif' }}>Tanda tangan di sini</div>
        </div>
        <div style={{ padding: '6px', borderRadius: '7px', background: 'var(--c-btn-bg)', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: 'var(--c-btn-text)', fontFamily: 'Inter, sans-serif' }}>
          Kirim
        </div>
        <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '16px', height: '16px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function CuratorIllustration() {
  const items = [
    { name: 'DivaRatna', status: 'Menunggu', color: '#f59e0b' },
    { name: 'MayaSfn', status: 'Disetujui', color: '#22c55e' },
    { name: 'QuinnA', status: 'Menunggu', color: '#f59e0b' },
    { name: 'CalystaR', status: 'Review', color: '#6366f1' },
  ]
  return (
    <div style={{ background: 'var(--c-illus-bg)', borderRadius: '12px', padding: '10px', border: '1px solid var(--c-illus-border)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
      {items.map((item) => (
        <div key={item.name} style={{ background: 'var(--c-illus-card)', border: '1px solid var(--c-illus-card-border)', borderRadius: '8px', padding: '8px' }}>
          <div style={{ width: '100%', height: '28px', borderRadius: '5px', background: 'rgba(196,147,63,0.10)', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <rect width="14" height="10" rx="2" fill="rgba(196,147,63,0.12)" />
              <path d="M5 3l4 2-4 2V3z" fill="rgba(196,147,63,0.55)" />
            </svg>
          </div>
          <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--c-text)', fontFamily: 'Inter, sans-serif', marginBottom: '3px', letterSpacing: '-0.01em' }}>{item.name}</div>
          <div style={{ fontSize: '8px', fontWeight: 700, color: item.color, fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}>{item.status}</div>
        </div>
      ))}
    </div>
    </div>
  )
}

function SearchIllustration() {
  return (
    <div style={{ background: 'var(--c-illus-bg)', borderRadius: '12px', padding: '12px', border: '1px solid var(--c-illus-border)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ background: 'var(--c-illus-card)', border: '1px solid var(--c-illus-card-border)', borderRadius: '8px', padding: '8px 10px' }}>
        <div style={{ fontSize: '8px', color: 'var(--c-text-muted)', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
          "Beauty creator, 2.4M followers,<br />TikTok @sarahkirana_,<br />niche lifestyle..."
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <div style={{ height: '1px', flex: 1, background: 'rgba(196,147,63,0.2)' }} />
        <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(196,147,63,0.7)', fontFamily: 'Inter, sans-serif' }}>AI</div>
        <div style={{ height: '1px', flex: 1, background: 'rgba(196,147,63,0.2)' }} />
      </div>
      <div style={{ background: 'var(--c-badge-bg)', border: '1px solid var(--c-badge-border)', borderRadius: '8px', padding: '8px 10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(196,147,63,0.15)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--c-text)', fontFamily: 'Inter, sans-serif' }}>Sarah_Kirana</div>
          <div style={{ fontSize: '9px', color: 'var(--c-text-muted)', fontFamily: 'Inter, sans-serif' }}>2.4M followers, TikTok</div>
        </div>
      </div>
    </div>
    </div>
  )
}

function SheetsIllustration() {
  const rows = ['Sarah_Kirana', 'DivaRatna', 'MayaSerafin']
  return (
    <div style={{ background: 'var(--c-illus-bg)', borderRadius: '12px', padding: '10px', border: '1px solid var(--c-illus-border)' }}>
    <div style={{ background: 'var(--c-illus-card)', border: '1px solid var(--c-illus-card-border)', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--c-invoice-strip)', padding: '5px 8px', gap: '8px' }}>
        {['Kreator', 'Status', 'Tanggal'].map(h => (
          <div key={h} style={{ fontSize: '8px', fontWeight: 800, color: 'var(--c-text-dim)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>{h}</div>
        ))}
      </div>
      {rows.map((name) => (
        <div key={name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '5px 8px', gap: '8px', borderTop: '1px solid var(--c-border-subtle)', alignItems: 'center' }}>
          <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--c-text)', fontFamily: 'Inter, sans-serif' }}>{name}</div>
          <div style={{ fontSize: '8px', fontWeight: 700, color: '#22c55e', fontFamily: 'Inter, sans-serif' }}>Tersinkron</div>
          <div style={{ fontSize: '8px', color: 'var(--c-text-muted)', fontFamily: 'Inter, sans-serif' }}>24 Mei</div>
        </div>
      ))}
    </div>
    </div>
  )
}

function QueueIllustration() {
  const jobs = [
    { label: 'Invoice PDF', sub: 'Dibuat otomatis', time: '1,8 dtk', done: true },
    { label: 'Email klien', sub: 'Konfirmasi terkirim', time: '2,3 dtk', done: true },
    { label: 'Google Sheets', sub: 'Baris baru ditambah', time: '3,1 dtk', done: true },
    { label: 'Google Drive', sub: 'Dokumen diunggah', time: 'berjalan...', done: false },
  ]
  return (
    <div style={{ background: 'var(--c-illus-bg)', borderRadius: '12px', padding: '14px', border: '1px solid var(--c-illus-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          padding: '7px 13px', borderRadius: '8px',
          background: 'var(--c-accent)', color: '#080604',
          fontSize: '11px', fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Buat Invoice
        </div>
        <span style={{ fontSize: '9px', color: 'var(--c-text-dim)', fontFamily: 'Inter, sans-serif' }}>5 dtk lalu</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--c-border)' }} />
        <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--c-text-dim)', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>4 proses dimulai otomatis</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--c-border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {jobs.map((job, i) => (
          <motion.div
            key={job.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '10px 12px',
              borderRadius: '9px',
              background: job.done ? 'rgba(34,197,94,0.07)' : 'var(--c-illus-card)',
              border: `1px solid ${job.done ? 'rgba(34,197,94,0.18)' : 'var(--c-illus-card-border)'}`,
              display: 'flex', flexDirection: 'column', gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {job.done ? (
                <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div style={{ width: '15px', height: '15px', borderRadius: '50%', border: '1.5px solid var(--c-accent)', flexShrink: 0, opacity: 0.65 }} />
              )}
              <span style={{ fontSize: '9px', fontWeight: 600, color: job.done ? 'rgba(34,197,94,0.75)' : 'var(--c-accent)', fontFamily: 'Inter, sans-serif' }}>
                {job.time}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--c-text)', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>{job.label}</div>
              <div style={{ fontSize: '9px', color: 'var(--c-text-muted)', fontFamily: 'Inter, sans-serif', marginTop: '1px', lineHeight: 1.4 }}>{job.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    id: 'doc',
    icon: <IconDoc />,
    label: 'Dokumen Otomatis',
    desc: 'Invoice dan MOU dibuat dalam hitungan detik. Template terstandarisasi, nomor urut otomatis, siap dikirim.',
    illustration: <DocIllustration />,
    tall: true,
    wide: false,
  },
  {
    id: 'magic',
    icon: <IconLink />,
    label: 'Magic Link',
    desc: 'Kirim link ke kreator. Mereka tanda tangan langsung dari HP tanpa perlu daftar akun.',
    illustration: <MagicLinkIllustration />,
    tall: false,
    wide: false,
  },
  {
    id: 'curator',
    icon: <IconPlay />,
    label: 'Curator Board',
    desc: 'Review dan endorsement video kreator dalam satu dasbor. Tidak ada email. Tidak ada chat yang hilang.',
    illustration: <CuratorIllustration />,
    tall: false,
    wide: false,
  },
  {
    id: 'search',
    icon: <IconSearch />,
    label: 'Pencarian Cerdas',
    desc: 'Paste bio kreator dari mana saja. AI mengekstrak nama, platform, dan statistik secara otomatis.',
    illustration: <SearchIllustration />,
    tall: false,
    wide: false,
  },
  {
    id: 'sheets',
    icon: <IconSheets />,
    label: 'Sinkronisasi Sheets',
    desc: 'Setiap perubahan data kreator langsung tercermin di Google Sheets tim kamu secara otomatis dan tanpa kerja manual.',
    illustration: <SheetsIllustration />,
    tall: false,
    wide: false,
  },
  {
    id: 'queue',
    icon: <IconQueue />,
    label: 'Proses Background',
    desc: 'Generasi dokumen, unggah video, dan sinkronisasi sheet semuanya berjalan tanpa menghambat pekerjaan kamu.',
    illustration: <QueueIllustration />,
    tall: false,
    wide: true,
  },
]

function FeatureCard({ feature, delay }: { feature: (typeof FEATURES)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      style={{
        background: 'var(--c-bg-card)',
        border: '1px solid var(--c-border)',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        cursor: 'default',
      } as CSSProperties}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(196,147,63,0.22)'
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(196,147,63,0.06)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--c-border)'
        el.style.boxShadow = 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'rgba(196,147,63,0.08)', border: '1px solid rgba(196,147,63,0.14)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--c-accent)', flexShrink: 0
        }}>
          {feature.icon}
        </div>
        <div>
          <div className="font-heading" style={{ fontSize: '16px', letterSpacing: '-0.02em', color: 'var(--c-text)', lineHeight: 1.2 } as CSSProperties}>
            {feature.label}
          </div>
        </div>
      </div>
      <p className="font-body" style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--c-text-muted)', flex: 1 } as CSSProperties}>
        {feature.desc}
      </p>
      <div style={{ flex: feature.tall ? 1 : 'none' }}>
        {feature.illustration}
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={ref}
      id="features"
      className="relative overflow-hidden"
      style={{ background: 'var(--c-bg)', padding: '80px 0 96px' }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(196,147,63,0.05) 0%, transparent 70%)', filter: 'blur(100px)', transform: 'translate(30%, -20%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
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
            Fitur Platform
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
              Setiap detail.
              <br />
              <em style={{ color: 'var(--c-accent)', fontStyle: 'italic' }}>Terautomasi.</em>
            </h2>
            <p
              className="font-body lg:max-w-[300px]"
              style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--c-text-muted)' }}
            >
              Dari reachout hingga pembayaran, setiap langkah memiliki fitur yang dirancang khusus untuk tim KOL profesional.
            </p>
          </div>
        </motion.div>

        <div className="features-grid">
          <div className="features-tall">
            <FeatureCard feature={FEATURES[0]} delay={0} />
          </div>
          <div className="features-c2r1">
            <FeatureCard feature={FEATURES[1]} delay={0.08} />
          </div>
          <div className="features-c3r1">
            <FeatureCard feature={FEATURES[2]} delay={0.12} />
          </div>
          <div className="features-c2r2">
            <FeatureCard feature={FEATURES[3]} delay={0.16} />
          </div>
          <div className="features-c3r2">
            <FeatureCard feature={FEATURES[4]} delay={0.2} />
          </div>
          <div className="features-wide">
            <FeatureCard feature={FEATURES[5]} delay={0.24} />
          </div>
        </div>
      </div>
    </section>
  )
}
