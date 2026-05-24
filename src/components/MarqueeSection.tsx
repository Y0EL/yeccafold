const NICHES_ROW1 = [
  { niche: 'Beauty & Skincare', platform: 'TikTok' },
  { niche: 'Fashion & Style', platform: 'Instagram' },
  { niche: 'Kuliner & Food', platform: 'YouTube' },
  { niche: 'Tech & Gadget', platform: 'TikTok' },
  { niche: 'Travel & Lifestyle', platform: 'Instagram' },
  { niche: 'Fitness & Health', platform: 'YouTube' },
  { niche: 'Music & Arts', platform: 'TikTok' },
  { niche: 'Gaming & Esports', platform: 'YouTube' },
]

const NICHES_ROW2 = [
  { niche: 'Parenting & Family', platform: 'Instagram' },
  { niche: 'Finance & Career', platform: 'YouTube' },
  { niche: 'Comedy & Vlog', platform: 'TikTok' },
  { niche: 'Photography & Visual', platform: 'Instagram' },
  { niche: 'Yoga & Mindfulness', platform: 'TikTok' },
  { niche: 'Street Fashion', platform: 'Instagram' },
  { niche: 'Dance & Performance', platform: 'TikTok' },
  { niche: 'FMCG & Kuliner', platform: 'Instagram' },
]

function Dot() {
  return (
    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(196,147,63,0.35)', display: 'inline-block', flexShrink: 0 }} />
  )
}

function NicheChip({ niche, platform }: { niche: string; platform: string }) {
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '7px 14px', borderRadius: '100px', flexShrink: 0,
        background: 'var(--c-bg-card)', border: '1px solid var(--c-border)',
      }}
    >
      <span className="font-body" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--c-text-muted)', letterSpacing: '-0.01em' }}>
        {niche}
      </span>
      <Dot />
      <span className="font-body" style={{ fontSize: '11px', color: 'var(--c-text-dim)', fontWeight: 400 }}>
        {platform}
      </span>
    </div>
  )
}

export default function MarqueeSection() {
  const row1 = [...NICHES_ROW1, ...NICHES_ROW1]
  const row2 = [...NICHES_ROW2, ...NICHES_ROW2]

  return (
    <div
      id="marquee"
      style={{
        background: 'var(--c-bg)',
        borderTop: '1px solid var(--c-border-subtle)',
        borderBottom: '1px solid var(--c-border-subtle)',
        padding: '32px 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--c-border-subtle)' }}>
        <span className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--c-text-muted)', fontWeight: 600 }}>
          Kelola kreator dari semua niche dan platform
        </span>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <div className="marquee-fwd" style={{ display: 'flex', gap: '10px', width: 'max-content' }}>
          {row1.map((c, i) => (
            <NicheChip key={i} {...c} />
          ))}
        </div>
      </div>
      <div>
        <div className="marquee-rev" style={{ display: 'flex', gap: '10px', width: 'max-content' }}>
          {row2.map((c, i) => (
            <NicheChip key={i} {...c} />
          ))}
        </div>
      </div>
    </div>
  )
}
