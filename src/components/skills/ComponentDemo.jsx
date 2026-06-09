import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, Mail, MapPin, Check } from 'lucide-react'

const ACCENTS = [
  { name: 'Ink', value: '#1f2937' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Coral', value: '#fb7185' },
  { name: 'Sand', value: '#d6a35c' },
  { name: 'Plum', value: '#9d6b9e' },
]

const RADII = [
  { name: 'None', value: 0 },
  { name: 'Md', value: 12 },
  { name: 'Full', value: 28 },
]

function Control({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] tracking-widest uppercase text-black/35 dark:text-white/35">{label}</span>
      {children}
    </div>
  )
}

export default function ComponentDemo() {
  const [accent, setAccent] = useState(ACCENTS[0].value)
  const [radius, setRadius] = useState(12)
  const [layout, setLayout] = useState('card') // card | banner
  const [showRole, setShowRole] = useState(true)
  const [filled, setFilled] = useState(true)

  const banner = layout === 'banner'

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* ── 컨트롤 패널 ── */}
      <div className="lg:w-52 flex-shrink-0 flex flex-col gap-5">
        <Control label="Accent">
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map((a) => (
              <button
                key={a.value}
                onClick={() => setAccent(a.value)}
                aria-label={a.name}
                className="w-7 h-7 rounded-full transition-transform hover:scale-110 ring-offset-2 ring-offset-[#f9f9f7] dark:ring-offset-[#0a0a0a]"
                style={{
                  background: a.value,
                  boxShadow: accent === a.value ? `0 0 0 2px ${a.value}` : 'none',
                }}
              >
                {accent === a.value && <Check size={14} className="text-white mx-auto" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </Control>

        <Control label="Radius">
          <div className="flex gap-1 bg-black/[0.04] dark:bg-white/[0.05] p-1 rounded-lg">
            {RADII.map((r) => (
              <button
                key={r.name}
                onClick={() => setRadius(r.value)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  radius === r.value ? 'bg-white dark:bg-white/15 text-black dark:text-white shadow-sm' : 'text-black/40 dark:text-white/40'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </Control>

        <Control label="Layout">
          <div className="flex gap-1 bg-black/[0.04] dark:bg-white/[0.05] p-1 rounded-lg">
            {['card', 'banner'].map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  layout === l ? 'bg-white dark:bg-white/15 text-black dark:text-white shadow-sm' : 'text-black/40 dark:text-white/40'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </Control>

        <div className="flex flex-col gap-2.5 pt-1">
          <Switch label="역할 표시" checked={showRole} onChange={() => setShowRole((v) => !v)} accent={accent} />
          <Switch label="버튼 채우기" checked={filled} onChange={() => setFilled((v) => !v)} accent={accent} />
        </div>
      </div>

      {/* ── 라이브 프리뷰 ── */}
      <div className="flex-1 flex items-center justify-center min-h-[260px] rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] p-6">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className={`bg-white dark:bg-[#1a1a1a] border border-black/[0.07] dark:border-white/[0.08] shadow-sm overflow-hidden w-full ${banner ? 'max-w-md' : 'max-w-[260px]'}`}
          style={{ borderRadius: radius + 4 }}
        >
          {/* accent 헤더 */}
          <motion.div layout className={banner ? 'h-14' : 'h-20'} style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }} />

          <div className={`px-5 ${banner ? 'flex items-center gap-4' : 'flex flex-col items-center'}`}>
            <motion.div
              layout
              className={`flex items-center justify-center font-black text-white flex-shrink-0 ring-[3px] ring-white dark:ring-[#1a1a1a] ${banner ? 'w-14 h-14 text-lg -mt-7' : 'w-20 h-20 text-2xl -mt-10'}`}
              style={{ background: accent, borderRadius: radius, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            >
              JB
            </motion.div>

            <div className={`min-w-0 ${banner ? 'text-left flex-1' : 'text-center mt-3'}`}>
              <p className="font-bold text-black dark:text-white text-base truncate">조준범</p>
              {showRole && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs text-black/45 dark:text-white/40 mt-0.5"
                >
                  Frontend Developer
                </motion.p>
              )}
            </div>
          </div>

          <div className="px-5 pb-5 pt-4">
            <div className={`flex items-center gap-3 text-black/35 dark:text-white/35 mb-4 ${banner ? '' : 'justify-center'}`}>
              <MapPin size={13} /><span className="text-xs">Korea</span>
              <Link2 size={13} /><Mail size={13} />
            </div>
            <button
              className="w-full py-2 rounded-lg text-sm font-semibold transition-all"
              style={
                filled
                  ? { background: accent, color: '#fff', borderRadius: radius }
                  : { background: 'transparent', color: accent, border: `1.5px solid ${accent}`, borderRadius: radius }
              }
            >
              팔로우
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Switch({ label, checked, onChange, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-black/50 dark:text-white/45">{label}</span>
      <button
        onClick={onChange}
        className="relative w-10 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
        style={{ background: checked ? accent : 'rgba(128,128,128,0.25)' }}
      >
        <motion.span
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute left-0 w-4 h-4 rounded-full bg-white shadow"
          style={{ top: 4 }}
        />
      </button>
    </div>
  )
}
