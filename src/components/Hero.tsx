import { useRef, useState, useEffect, useCallback } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowRight, Play, ChevronDown, CheckCircle, Users, Tag } from 'lucide-react'

const STAGES = ['Reachout', 'Dealing', 'Sampling', 'Drafting', 'Financing', 'Finished']

const STAGE_ACTIVITIES: [string, string][] = [
  ['Brief kampanye dikirim', 'Kreator dikontak via platform'],
  ['Negosiasi rate selesai', 'Kontrak dalam proses'],
  ['Produk dikirim ke kreator', 'Konfirmasi penerimaan'],
  ['Draft konten diunggah', 'Review pertama selesai'],
  ['Invoice dibuat otomatis', 'Menunggu pembayaran'],
  ['Pembayaran terkonfirmasi', 'Kampanye selesai'],
]

const LIVE_EVENTS: { color: string; label: string; desc: string; time: string }[] = [
  { color: 'var(--c-accent)', label: 'Invoice', desc: 'Dokumen baru dikirim ke DivaRatna', time: 'Baru saja' },
  { color: '#22c55e', label: 'Kontrak', desc: 'MayaSerafin menandatangani MOU kampanye', time: '15 dtk lalu' },
  { color: '#a855f7', label: 'Draft', desc: 'Draft ElsaAmara masuk. Menunggu persetujuan brand.', time: '34 dtk lalu' },
  { color: '#22c55e', label: 'Bayar', desc: 'Pembayaran Rp 8.500.000 terkonfirmasi', time: '52 dtk lalu' },
  { color: '#3b82f6', label: 'Sampling', desc: 'Quinn_Astrid sudah terima produk. Konten mulai pekan ini.', time: '1m lalu' },
  { color: 'var(--c-accent)', label: 'Reachout', desc: 'Aurora_Kirana bergabung ke kampanye baru', time: 'Baru saja' },
  { color: '#10b981', label: 'Selesai', desc: 'Kampanye Tiara.Melinda berhasil ditutup', time: '2m lalu' },
  { color: '#6366f1', label: 'Sinkron', desc: 'Sheets tersinkron untuk 147 kreator', time: '3m lalu' },
]

const PLATFORM_ICONS = [
  {
    name: 'TikTok',
    svg: (
      <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
        <path d="M8.25 0h-2v8.5a1.5 1.5 0 11-1.5-1.5c.14 0 .28.02.41.05V4.98A4.5 4.5 0 108.75 9.5V5.19A6.23 6.23 0 0011 5.8V3.72a4.25 4.25 0 01-2.75-3.72z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    svg: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    svg: (
      <svg width="14" height="10" viewBox="0 0 22 16" fill="currentColor">
        <path d="M21.5 2.5S21.27.9 20.5.2C19.62-.7 18.6-.7 18.1-.7 15.2-.9 11 -.9 11-.9s-4.2 0-7.1.2c-.5 0-1.5 0-2.4.9C.7.9.5 2.5.5 2.5S.27 4.4.27 6.3v1.8c0 1.9.23 3.8.23 3.8s.22 1.6 1 2.3c.9.9 2.1.87 2.6.97C5.7 15.33 11 15.4 11 15.4s4.2 0 7.1-.23c.5-.07 1.5-.07 2.4-.97.77-.7 1-2.3 1-2.3s.23-1.9.23-3.8V6.3c0-1.9-.23-3.8-.23-3.8zm-12.7 7.7V5.1l6.5 2.57-6.5 2.53z"/>
      </svg>
    ),
  },
  {
    name: 'Shopee',
    svg: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C8.69 0 6 2.69 6 6H2L1 24h22L22 6h-4C18 2.69 15.31 0 12 0zm0 2c2.21 0 4 1.79 4 4H8c0-2.21 1.79-4 4-4zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    ),
  },
]

const CREATORS = [
  { seed: 'RiaVelora', name: 'Ria_Velora', handle: '@riavelora', followers: '2.4M', niche: 'Beauty / Lifestyle', stage: 3, special: false },
  { seed: 'NaomiXandra', name: 'Naomi.Xandra', handle: '@naomixandra', followers: '890K', niche: 'Fashion / Travel', stage: 1, special: false },
  { seed: 'ClaraMeiza', name: 'Clara_Meiza', handle: '@clarameiza', followers: '1.1M', niche: 'Food / Culture', stage: 4, special: false },
  { seed: 'DivaRatna', name: 'DivaRatna', handle: '@diva.ratna', followers: '3.2M', niche: 'Skincare / Health', stage: 5, special: false },
  { seed: 'LunaKasih', name: 'Luna.Kasih', handle: '@lunakasih', followers: '670K', niche: 'Fitness / Wellness', stage: 2, special: false },
  { seed: 'ZaraIndira', name: 'Zara_Indira', handle: '@zaraindira', followers: '1.8M', niche: 'Tech / Gadgets', stage: 0, special: false },
  { seed: 'MayaSerafin', name: 'MayaSerafin', handle: '@mayaserafin', followers: '4.5M', niche: 'Music / Entertainment', stage: 3, special: false },
  { seed: 'SeleneOktavia', name: 'Selene.Oktavia', handle: '@selene.ok', followers: '980K', niche: 'Parenting / Family', stage: 1, special: false },
  { seed: 'AuroraKirana', name: 'Aurora_Kirana', handle: '@aurorakirana', followers: '2.1M', niche: 'Art / Design', stage: 4, special: false },
  { seed: 'NessaLorraine', name: 'NessaLorraine', handle: '@nessalorraine', followers: '730K', niche: 'Comedy / Vlog', stage: 2, special: false },
  { seed: 'TiaraMelinda', name: 'Tiara.Melinda', handle: '@tiaramelinda', followers: '1.4M', niche: 'Beauty / Makeup', stage: 5, special: false },
  { seed: 'RainaAlvaro', name: 'Raina_Alvaro', handle: '@rainaalvaro', followers: '560K', niche: 'Gaming / Esports', stage: 0, special: false },
  { seed: 'SierraNovel', name: 'Sierra.Novel', handle: '@sierranovel', followers: '2.9M', niche: 'Lifestyle / Travel', stage: 3, special: false },
  { seed: 'VeldaNaura', name: 'VeldaNaura', handle: '@veldanaura', followers: '1.6M', niche: 'Finance / Career', stage: 1, special: false },
  { seed: 'QuinnAstrid', name: 'Quinn_Astrid', handle: '@quinnastrid', followers: '3.7M', niche: 'Fashion / Street', stage: 4, special: false },
  { seed: 'MillaVanessa', name: 'Milla.Vanessa', handle: '@millavanessa', followers: '820K', niche: 'Cooking / Food', stage: 2, special: false },
  { seed: 'CalystaReine', name: 'CalystaReine', handle: '@calystare', followers: '1.3M', niche: 'Yoga / Mindfulness', stage: 5, special: false },
  { seed: 'ElsaAmara', name: 'Elsa_Amara', handle: '@elsaamara', followers: '2.6M', niche: 'Dance / Performance', stage: 3, special: false },
  { seed: 'NovaNadira', name: 'Nova.Nadira', handle: '@novanadira', followers: '750K', niche: 'Photography / Visual', stage: 0, special: false },
  { seed: 'JessicaRavena', name: 'JessicaRavena', handle: '@jessica.ravena', followers: '25.8M', niche: 'Mega Creator / All Niches', stage: 2, special: true },
]

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function dicebear(seed: string) {
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=c4933f,b07d28`
}

function LiveToast() {
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const SHOW_MS = 3800
    const FADE_MS = 500
    const id = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % LIVE_EVENTS.length)
        setShow(true)
      }, FADE_MS)
    }, SHOW_MS + FADE_MS)
    return () => clearInterval(id)
  }, [])

  const ev = LIVE_EVENTS[idx]

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--c-bg-card)',
            border: '1px solid var(--c-border)',
            borderRadius: '12px',
            padding: '10px 14px',
          } as CSSProperties}
        >
          <div className="flex items-center gap-3">
            <span
              className="animate-pulse-dot shrink-0"
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--c-accent)' }}
            />
            <p className="font-body text-[11px] flex-1 min-w-0" style={{ color: 'var(--c-text-muted)', lineHeight: 1.4 }}>
              {ev.desc}
            </p>
            <span className="font-body text-[9px] tabular-nums shrink-0" style={{ color: 'var(--c-text-dim)' }}>
              {ev.time}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="hero-blob"
        style={{
          width: '80%', height: '65%',
          left: '-12%', top: '-18%',
          background: 'radial-gradient(ellipse, rgba(196,147,63,0.17) 0%, transparent 68%)',
          filter: 'blur(64px)',
          animation: 'blob-drift-1 14s ease-in-out infinite',
        }}
      />
      <div
        className="hero-blob"
        style={{
          width: '60%', height: '55%',
          right: '-10%', top: '2%',
          background: 'radial-gradient(ellipse, rgba(170,95,20,0.13) 0%, transparent 68%)',
          filter: 'blur(72px)',
          animation: 'blob-drift-2 18s ease-in-out infinite',
        }}
      />
      <div
        className="hero-blob"
        style={{
          width: '55%', height: '45%',
          left: '22%', bottom: '-8%',
          background: 'radial-gradient(ellipse, rgba(196,147,63,0.10) 0%, transparent 70%)',
          filter: 'blur(72px)',
          animation: 'blob-drift-3 20s ease-in-out infinite',
        }}
      />
      <div
        className="hero-blob"
        style={{
          width: '42%', height: '40%',
          right: '18%', top: '38%',
          background: 'radial-gradient(ellipse, rgba(210,130,30,0.09) 0%, transparent 70%)',
          filter: 'blur(64px)',
          animation: 'blob-drift-4 16s ease-in-out infinite',
        }}
      />
    </div>
  )
}

type Creator = typeof CREATORS[0]

function PipelineStrip({ stageIndex }: { stageIndex: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-0.5">
        <span className="font-body text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.1em', color: 'var(--c-text-dim)' }}>
          Pipeline
        </span>
        <span className="font-body text-[11px] font-medium" style={{ color: 'var(--c-accent)' }}>
          Tahap {stageIndex + 1} dari 6
        </span>
      </div>
      <div className="flex gap-1">
        {STAGES.map((_, i) => (
          <div key={i} className="relative flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--c-pipeline-empty)' }}>
            {i < stageIndex && (
              <div className="absolute inset-0 rounded-full" style={{ background: 'var(--c-accent)', opacity: 0.55 }} />
            )}
            {i === stageIndex && (
              <div
                className="pipeline-fill-bar absolute inset-0 rounded-full"
                style={{ background: 'var(--c-accent)' }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <span className="font-body text-[8px] uppercase" style={{ letterSpacing: '0.04em', color: 'var(--c-text-dim)' }}>
          {STAGES[0]}
        </span>
        <span className="font-body text-[8px] uppercase" style={{ letterSpacing: '0.04em', color: 'var(--c-text-dim)' }}>
          {STAGES[STAGES.length - 1]}
        </span>
      </div>
    </div>
  )
}

function CreatorCard({ creator, elapsed }: { creator: Creator; elapsed: number }) {
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const timeStr = mins > 0 ? `${mins}m ${secs}dtk lalu` : `${secs}dtk lalu`
  const elapsed2 = elapsed + 37
  const mins2 = Math.floor(elapsed2 / 60)
  const secs2 = elapsed2 % 60
  const timeStr2 = mins2 > 0 ? `${mins2}m ${secs2}dtk lalu` : `${secs2}dtk lalu`

  return (
    <div
      className="w-full rounded-[24px] overflow-hidden"
      style={{
        background: 'var(--c-bg-card)',
        border: '1px solid var(--c-border)',
        boxShadow: 'var(--c-card-shadow)',
      }}
    >
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-full overflow-hidden shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--c-accent) 0%, #8b5e1a 100%)' }}
            >
              <img src={dicebear(creator.seed)} alt={creator.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-body font-semibold text-[14px]" style={{ letterSpacing: '-0.01em', color: 'var(--c-text)' }}>
                {creator.name}
              </div>
              <div className="font-body text-[12px] mt-0.5" style={{ color: 'var(--c-text-muted)' }}>
                {creator.handle}
              </div>
            </div>
          </div>
          <span
            className="shrink-0 px-3 py-1.5 rounded-full font-body text-[10px] font-semibold uppercase"
            style={{
              letterSpacing: '0.08em',
              background: 'var(--c-badge-bg)',
              color: 'var(--c-accent)',
              border: '1px solid var(--c-badge-border)',
            }}
          >
            {STAGES[creator.stage]}
          </span>
        </div>

        <div className="flex items-center gap-5 mt-4">
          <div className="flex items-center gap-1.5">
            <Users size={11} style={{ color: 'var(--c-text-dim)' }} />
            <span className="font-body text-[12px]" style={{ color: creator.special ? 'var(--c-accent)' : 'var(--c-text-muted)' }}>
              {creator.followers} pengikut
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag size={11} style={{ color: 'var(--c-text-dim)' }} />
            <span className="font-body text-[12px]" style={{ color: 'var(--c-text-muted)' }}>{creator.niche}</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-5" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
        <div className="pt-4">
          <PipelineStrip stageIndex={creator.stage} />
        </div>
      </div>

      <div
        className="px-6 py-3 flex items-center gap-2.5"
        style={{ borderTop: '1px solid var(--c-border-subtle)', background: 'var(--c-invoice-strip)' }}
      >
        <div
          className="w-2 h-2 rounded-full shrink-0 animate-pulse-dot"
          style={{
            background: [
              '#f59e0b','#f59e0b','#6366f1','#a855f7','var(--c-accent)','#22c55e'
            ][creator.stage],
            boxShadow: `0 0 0 3px ${['rgba(245,158,11,0.18)','rgba(245,158,11,0.18)','rgba(99,102,241,0.18)','rgba(168,85,247,0.18)','rgba(196,147,63,0.18)','rgba(34,197,94,0.18)'][creator.stage]}`,
          }}
        />
        <span className="font-body text-[12px]" style={{ color: 'var(--c-text-muted)' }}>
          {['Kreator dihubungi', 'Negosiasi berjalan', 'Konten sedang dibuat', 'Draft siap direview', 'Invoice siap dibuat', 'Pembayaran terkonfirmasi'][creator.stage]}
        </span>
      </div>

      <div className="px-6 py-4" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
        <div className="font-body text-[10px] font-semibold uppercase mb-3" style={{ letterSpacing: '0.1em', color: 'var(--c-text-dim)' }}>
          Aktivitas Terbaru
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={11} className="shrink-0" style={{ color: '#10b981' }} />
            <span className="font-body text-[11px] flex-1" style={{ color: 'var(--c-text-muted)' }}>{STAGE_ACTIVITIES[creator.stage][0]}</span>
            <span className="font-body text-[10px] tabular-nums" style={{ color: 'var(--c-text-dim)' }}>{timeStr}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle size={11} className="shrink-0" style={{ color: 'var(--c-accent)' }} />
            <span className="font-body text-[11px] flex-1" style={{ color: 'var(--c-text-muted)' }}>{STAGE_ACTIVITIES[creator.stage][1]}</span>
            <span className="font-body text-[10px] tabular-nums" style={{ color: 'var(--c-text-dim)' }}>{timeStr2}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const CYCLE_DURATION = 6000

function CreatorCarousel() {
  const [order] = useState<(typeof CREATORS[0] & { stackRot: number })[]>(() =>
    shuffled(CREATORS).map(c => ({ ...c, stackRot: (Math.random() - 0.5) * 28 }))
  )
  const [index, setIndex] = useState(0)
  const [elapsed, setElapsed] = useState(() => Math.floor(Math.random() * 120) + 20)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 280, damping: 35, mass: 0.8 })
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [14, -14]), { stiffness: 280, damping: 35, mass: 0.8 })
  const rotateZ = useSpring(useTransform(mouseX, [-1, 1], [4, -4]), { stiffness: 280, damping: 35, mass: 0.8 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const advance = useCallback(() => {
    setIndex(i => (i + 1) % order.length)
    setElapsed(Math.floor(Math.random() * 120) + 20)
  }, [order.length])

  useEffect(() => {
    const id = setTimeout(advance, CYCLE_DURATION)
    return () => clearTimeout(id)
  }, [index, advance])

  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [index])

  const creator = order[index]

  const cardVariants: Variants = {
    enter: { rotateZ: 8, x: 50, y: -30, opacity: 0, scale: 0.9 },
    center: {
      rotateZ: 0, x: 0, y: 0, opacity: 1, scale: 1,
      transition: { type: 'spring', stiffness: 280, damping: 32, opacity: { duration: 0.25 } },
    },
    exit: {
      rotateZ: -22, x: -240, y: 90, opacity: 0, scale: 0.86,
      transition: { duration: 0.48, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
    },
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: '1400px', width: '520px', maxWidth: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[24px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(196,147,63,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'scale(1.15) translateY(16px)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none rounded-[24px]"
        style={{
          transform: 'translateY(18px) scale(1.055)',
          zIndex: 0,
          opacity: 0.38,
          background: 'var(--c-bg-card)',
          border: '1px solid var(--c-border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none rounded-[24px]"
        style={{
          transform: 'translateY(9px) scale(1.025)',
          zIndex: 1,
          opacity: 0.62,
          background: 'var(--c-bg-card)',
          border: '1px solid var(--c-border)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
        }}
      />

      <motion.div style={{ rotateX, rotateY, rotateZ, transformStyle: 'preserve-3d', position: 'relative', zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={creator.seed}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <CreatorCard creator={creator} elapsed={elapsed} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}


const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.18 } },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 44, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const BADGE_STATS = ['500+ kreator aktif', '10K+ dokumen dibuat', '147 aktivitas hari ini', 'Rp 2.8M diproses hari ini']

export default function Hero() {
  const [badgeIdx, setBadgeIdx] = useState(0)

  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 500], [0, -40])

  useEffect(() => {
    const id = setInterval(() => setBadgeIdx(i => (i + 1) % BADGE_STATS.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="platform" className="relative overflow-hidden" style={{ background: 'var(--c-bg)', minHeight: '100svh' }}>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--c-dot-grid) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 10%, transparent 80%)',
        } as CSSProperties}
      />

      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col" style={{ minHeight: '100svh' }}>
        <div className="h-16 shrink-0" />

        <motion.div
          className="flex flex-col items-center text-center pt-12 pb-8"
          style={{ y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-7"
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '100px', overflow: 'hidden', border: '1px solid rgba(196,147,63,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px 5px 8px', background: 'rgba(34,197,94,0.08)', borderRight: '1px solid rgba(196,147,63,0.15)' }}>
                <span className="animate-pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
                <span className="font-body" style={{ fontSize: '11px', color: '#22c55e', fontWeight: 700, letterSpacing: '0.08em' }}>LIVE</span>
              </div>
              <div style={{ padding: '5px 14px', background: 'rgba(196,147,63,0.06)', overflow: 'hidden', minWidth: '148px' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={badgeIdx}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="font-body"
                    style={{ fontSize: '11px', color: 'rgba(196,147,63,0.85)', fontWeight: 500, display: 'block', whiteSpace: 'nowrap' }}
                  >
                    {BADGE_STATS[badgeIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="font-heading font-normal text-center"
            style={{ maxWidth: '960px' } as CSSProperties}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden" style={{ paddingBottom: '4px' }}>
              <motion.div variants={wordVariants} className="inline-flex gap-[0.28em]">
                {['The', 'Future', 'of'].map(word => (
                  <span
                    key={word}
                    style={{
                      fontSize: 'clamp(20px, 3.2vw, 48px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      color: 'var(--c-text-muted)',
                    } as CSSProperties}
                  >
                    {word}
                  </span>
                ))}
              </motion.div>
            </div>
            <div className="overflow-hidden" style={{ paddingBottom: '2px' }}>
              <motion.span
                variants={wordVariants}
                className="inline-block"
                style={{
                  fontSize: 'clamp(76px, 15vw, 210px)',
                  letterSpacing: '-0.055em',
                  lineHeight: 0.82,
                  color: 'var(--c-text)',
                } as CSSProperties}
              >
                KOL
              </motion.span>
            </div>
            <div className="overflow-hidden" style={{ paddingBottom: '12px' }}>
              <motion.span
                variants={wordVariants}
                className="inline-block"
                style={{
                  fontSize: 'clamp(40px, 6.5vw, 96px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  color: 'var(--c-text)',
                } as CSSProperties}
              >
                Management.
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                variants={wordVariants}
                className="inline-block"
                style={{
                  fontSize: 'clamp(36px, 5.8vw, 84px)',
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: 700,
                  color: 'var(--c-accent)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                } as CSSProperties}
              >
                Made Efficient.
              </motion.span>
            </div>
          </motion.h1>

          <motion.p
            className="font-body mt-6"
            style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.7, color: 'var(--c-text-muted)', maxWidth: '460px' } as CSSProperties}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease: 'easeOut' }}
          >
            Satu platform. Semua kreator. Tanpa kekacauan{' '}
            <span style={{ color: 'rgba(239,68,68,0.60)', fontWeight: 600 }}>WhatsApp.</span>
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.95, ease: 'easeOut' }}
          >
            <a
              href="#workflow"
              className="group inline-flex items-center gap-2 px-7 py-3.5 font-body text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-85"
              style={{ background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)' }}
            >
              Lihat Sistemnya
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 font-body text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-80"
              style={{ border: '1px solid var(--c-ghost-border)', color: 'var(--c-ghost-text)' }}
            >
              <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ border: '1px solid var(--c-ghost-border)' }}>
                <Play size={8} fill="currentColor" className="ml-[1px]" />
              </div>
              Minta Demo
            </a>
          </motion.div>

          <motion.div
            className="mt-8 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <span className="font-body text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.12em', color: 'var(--c-text-muted)' }}>Platform</span>
              {PLATFORM_ICONS.map(p => (
                <div key={p.name} className="flex items-center gap-1.5" style={{ color: 'var(--c-text-muted)' }}>
                  {p.svg}
                  <span className="font-body text-[11px]">{p.name}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
              <span className="font-body text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.12em', color: 'var(--c-text-muted)', marginRight: '4px' }}>Dipercaya</span>
              {['Melody Agency', 'Kolektiv Co', 'StarManage', '+117 tim lainnya'].map(name => (
                <span
                  key={name}
                  className="font-body"
                  style={{
                    fontSize: '11px',
                    color: 'var(--c-text-muted)',
                    padding: '2px 9px',
                    border: '1px solid var(--c-border)',
                    borderRadius: '6px',
                    lineHeight: 1.7,
                    background: 'rgba(196,147,63,0.03)',
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center pb-14"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <CreatorCarousel />
          <div className="mt-3" style={{ width: '520px', maxWidth: '100%' }}>
            <LiveToast />
          </div>
        </motion.div>

        <motion.div
          className="shrink-0 flex justify-center pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} style={{ color: 'var(--c-text-dim)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
