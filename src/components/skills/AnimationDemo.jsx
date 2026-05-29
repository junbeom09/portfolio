import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const shapes = [
  { id: 'circle',   label: 'Circle',   class: 'rounded-full',  bg: 'bg-rose-400',    size: 'w-14 h-14' },
  { id: 'square',   label: 'Square',   class: 'rounded-lg',    bg: 'bg-violet-400',  size: 'w-14 h-14' },
  { id: 'pill',     label: 'Pill',     class: 'rounded-full',  bg: 'bg-sky-400',     size: 'w-24 h-10' },
  { id: 'diamond',  label: 'Diamond',  class: 'rounded-lg',    bg: 'bg-amber-400',   size: 'w-12 h-12' },
]

const presets = [
  { id: 'spring',  label: 'Spring',  animate: { scale: [1, 1.4, 0.85, 1.1, 1], rotate: [0, -12, 12, -6, 0] }, transition: { duration: 0.7 } },
  { id: 'bounce',  label: 'Bounce',  animate: { y: [0, -50, 0, -22, 0] },                                      transition: { duration: 0.65 } },
  { id: 'spin',    label: 'Spin',    animate: { rotate: [0, 360], scale: [1, 1.15, 1] },                       transition: { duration: 0.55 } },
  { id: 'wobble',  label: 'Wobble',  animate: { rotate: [0, -8, 8, -5, 5, -2, 2, 0], scale: [1, 1.05, 1] },   transition: { duration: 0.8 } },
  { id: 'pulse',   label: 'Pulse',   animate: { scale: [1, 1.5, 1, 1.3, 1] },                                  transition: { duration: 0.7 } },
]

const particles = Array.from({ length: 8 }, (_, i) => i)

export default function AnimationDemo() {
  const [activeShape, setActiveShape] = useState('circle')
  const [activePreset, setActivePreset] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  const [showParticles, setShowParticles] = useState(false)

  const currentShape = shapes.find((s) => s.id === activeShape)
  const currentPreset = presets.find((p) => p.id === activePreset) || presets[0]

  function trigger(presetId) {
    setActivePreset(presetId)
    setAnimKey((k) => k + 1)
    setShowParticles(false)
    setTimeout(() => { setShowParticles(true); setTimeout(() => setShowParticles(false), 700) }, 100)
  }

  const isDiamond = activeShape === 'diamond'

  return (
    <div className="flex flex-col gap-4">
      {/* Shape picker */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[10px] text-black/25 tracking-widest uppercase mr-1">Shape</span>
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveShape(s.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 border ${
              activeShape === s.id ? 'border-black/20 bg-black/5 text-black font-medium' : 'border-transparent text-black/35 hover:text-black/60'
            }`}
          >
            <span className={`inline-block w-3 h-3 ${s.class} ${s.bg} ${s.id === 'diamond' ? 'rotate-45' : ''}`} />
            {s.label}
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="relative w-full h-36 flex items-center justify-center bg-[#fafaf8] border border-black/[0.07] rounded-xl overflow-hidden">
        <AnimatePresence>
          {showParticles && particles.map((i) => (
            <motion.div
              key={`p-${animKey}-${i}`}
              initial={{ opacity: 0.8, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: Math.cos((i / particles.length) * Math.PI * 2) * 55, y: Math.sin((i / particles.length) * Math.PI * 2) * 55, scale: 0 }}
              transition={{ duration: 0.55 }}
              className={`absolute w-2 h-2 ${currentShape.class} ${currentShape.bg} opacity-50`}
            />
          ))}
        </AnimatePresence>

        <motion.div
          key={animKey}
          animate={activePreset ? currentPreset.animate : {}}
          transition={activePreset ? currentPreset.transition : {}}
          onClick={() => trigger(activePreset || presets[0].id)}
          className={`${currentShape.size} ${currentShape.class} ${currentShape.bg} cursor-pointer shadow-md ${isDiamond ? 'rotate-45' : ''}`}
        />
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => trigger(p.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activePreset === p.id
                ? 'bg-black text-white'
                : 'bg-black/[0.04] text-black/40 hover:text-black/70 hover:bg-black/8'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-black/25">도형과 애니메이션을 골라 클릭해보세요</p>
    </div>
  )
}
