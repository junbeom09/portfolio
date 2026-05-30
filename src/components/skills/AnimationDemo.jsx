import { useState } from 'react'
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform, useMotionTemplate,
} from 'framer-motion'
import { X } from 'lucide-react'

const tabs = ['Magnetic', 'Tilt', 'Tags', 'Count']

/* 1. 마그네틱 — 크롬/실버 구체 + 패럴랙스 링 */
function MagneticDemo() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const orbS = { stiffness: 150, damping: 12, mass: 0.5 }
  const ringS = { stiffness: 80, damping: 14, mass: 0.7 }
  const ox = useSpring(mx, orbS), oy = useSpring(my, orbS)
  const rx = useSpring(mx, ringS), ry = useSpring(my, ringS)

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const clamp = (v, m) => Math.max(-m, Math.min(m, v))
    mx.set(clamp(e.clientX - (r.left + r.width / 2), r.width / 2 - 50))
    my.set(clamp(e.clientY - (r.top + r.height / 2), r.height / 2 - 50))
  }
  function reset() { mx.set(0); my.set(0) }

  return (
    <div onMouseMove={onMove} onMouseLeave={reset} className="relative w-full h-[240px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-60"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(120,120,140,0.16) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <motion.div style={{ x: rx, y: ry }} className="absolute w-32 h-32 rounded-full border border-black/15 dark:border-white/15 pointer-events-none" />
      <motion.div style={{ x: ox, y: oy }} className="absolute w-24 h-6 rounded-full bg-black/25 blur-xl translate-y-12 pointer-events-none" />
      <motion.div
        style={{ x: ox, y: oy, background: 'radial-gradient(circle at 33% 28%, #ffffff, #c9ced4 28%, #7c828b 62%, #2f343b)' }}
        whileHover={{ scale: 1.1 }}
        className="relative w-24 h-24 rounded-full shadow-xl pointer-events-none"
      >
        <span className="absolute top-3 left-4 w-7 h-4 rounded-full bg-white/70 blur-md" />
      </motion.div>
      <span className="absolute bottom-2 text-xs text-black/30 dark:text-white/30">영역 안에서 마우스를 움직여보세요</span>
    </div>
  )
}

/* 2. 틸트 — 매트 블랙 카드 + 실버 칩 (실물 카드 느낌) */
function TiltDemo() {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [16, -16]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-16, 16]), { stiffness: 200, damping: 18 })
  const sweepX = useTransform(px, [0, 1], [15, 85])
  const sweepY = useTransform(py, [0, 1], [15, 85])
  const sweepPos = useMotionTemplate`${sweepX}% ${sweepY}%`

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  function reset() { px.set(0.5); py.set(0.5) }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5" style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', background: 'linear-gradient(145deg, #2c2c30, #0b0b0d)' }}
        className="relative w-44 h-56 rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 p-5 flex flex-col justify-between" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex items-start justify-between">
            {/* 실버 칩 */}
            <div className="relative w-10 h-7 rounded-md overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8f8f8, #bdbdbd 42%, #ececec 56%, #9a9a9a)' }}>
              <div className="absolute inset-[3px] rounded-[3px] border border-black/25" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/25" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-black/25" />
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" className="mt-0.5">
              <path d="M8 8a6 6 0 0 1 0 8" /><path d="M11.5 5a10 10 0 0 1 0 14" /><path d="M15 3a14 14 0 0 1 0 18" />
            </svg>
          </div>
          <div className="space-y-2.5">
            <p className="font-mono text-white/90 text-[13px] tracking-[0.15em]">•••• •••• •••• 2026</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[8px] text-white/35 tracking-widest uppercase">Card Holder</p>
                <p className="font-mono text-white/70 text-[11px] tracking-wider mt-0.5">FRONTEND</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] text-white/35 tracking-widest uppercase">Valid</p>
                <p className="font-mono text-white/70 text-[11px] tracking-wider mt-0.5">12/26</p>
              </div>
            </div>
          </div>
        </div>
        {/* 흰 빛 반사 (넓고 은은) */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(105deg, transparent 34%, rgba(255,255,255,0.16) 50%, transparent 66%)',
          backgroundSize: '220% 220%',
          backgroundPosition: sweepPos,
        }} />
      </motion.div>
      <span className="text-xs text-black/30 dark:text-white/30">카드 위에서 마우스를 움직여보세요</span>
    </div>
  )
}

/* 3. 태그 입력 — 키보드 입력 + 레이아웃 애니메이션 */
function TagsDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Framer'])
  const [val, setVal] = useState('')

  function add(e) {
    e.preventDefault()
    const v = val.trim()
    if (v && !tags.includes(v)) setTags((t) => [...t, v])
    setVal('')
  }
  function remove(t) { setTags((ts) => ts.filter((x) => x !== t)) }

  return (
    <div className="w-full h-[240px] flex flex-col items-center justify-center gap-5">
      <div className="w-full max-w-md">
        <form onSubmit={add} className="flex gap-2 mb-4">
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="기술 스택 입력 후 Enter"
            className="flex-1 bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
          />
          <button className="px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">추가</button>
        </form>
        <motion.div layout className="flex flex-wrap gap-2 min-h-[40px] items-start">
          <AnimatePresence mode="popLayout">
            {tags.map((t) => (
              <motion.button
                key={t}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onClick={() => remove(t)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-medium"
              >
                {t}
                <X size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <span className="text-xs text-black/30 dark:text-white/30">태그를 추가해보세요</span>
    </div>
  )
}

/* 4. 카운트업 오도미터 — 모노 카드 + 절제된 포인트 */
function Roll({ d, delay }) {
  return (
    <span style={{ height: '1em', lineHeight: 1, overflow: 'hidden', display: 'inline-block' }}>
      <motion.span style={{ display: 'block' }} initial={{ y: 0 }} animate={{ y: `-${d}em` }}
        transition={{ type: 'spring', stiffness: 90, damping: 16, delay }}>
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} style={{ display: 'block', height: '1em', lineHeight: 1 }}>{n}</span>
        ))}
      </motion.span>
    </span>
  )
}
function Odometer({ value }) {
  const chars = value.toLocaleString().split('')
  let di = 0
  return (
    <span className="inline-flex tabular-nums leading-none">
      {chars.map((ch, i) =>
        /\d/.test(ch) ? <Roll key={i} d={Number(ch)} delay={(di++) * 0.05} /> : <span key={i} className="inline-block">{ch}</span>
      )}
    </span>
  )
}
const STATS = [
  { value: 12840, suffix: '', label: '월 방문자', trend: '▲ 12%' },
  { value: 1357, suffix: '', label: '커밋', trend: '▲ 8%' },
  { value: 26, suffix: '+', label: '프로젝트', trend: '+3' },
]
function CountDemo() {
  const [run, setRun] = useState(0)
  return (
    <div className="w-full h-[240px] flex flex-col items-center justify-center gap-6">
      <div key={run} onClick={() => setRun((r) => r + 1)} className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-lg cursor-pointer select-none">
        {STATS.map((s) => (
          <div key={s.label} className="relative rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-4 overflow-hidden shadow-sm">
            <span className="absolute top-0 left-0 w-10 h-0.5 bg-black/70 dark:bg-white/70" />
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl md:text-4xl font-black tracking-tight text-black dark:text-white">
                <Odometer value={s.value} />
              </span>
              <span className="text-lg font-black text-black/40 dark:text-white/40">{s.suffix}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-black/40 dark:text-white/40">{s.label}</span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <span className="text-xs text-black/30 dark:text-white/30">카드를 클릭하면 다시 재생</span>
    </div>
  )
}

const VIEWS = { Magnetic: MagneticDemo, Tilt: TiltDemo, Tags: TagsDemo, Count: CountDemo }

export default function AnimationDemo() {
  const [tab, setTab] = useState('Magnetic')
  const Current = VIEWS[tab]

  return (
    <div className="flex flex-col gap-4">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              tab === t ? 'text-white dark:text-black' : 'text-black/50 dark:text-white/50 hover:text-black/70 dark:hover:text-white/70'
            }`}
          >
            {tab === t && (
              <motion.div layoutId="anim-tab" className="absolute inset-0 bg-black dark:bg-white rounded-md"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
            <span className="relative z-10">{t}</span>
          </button>
        ))}
      </div>

      {/* Demo area */}
      <div className="relative rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-gradient-to-b from-black/[0.02] to-transparent dark:from-white/[0.03] p-6 min-h-[300px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
