import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Heart, Star, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

// dark prop = 현재 테마 기준 (글로벌 dark mode 상태)
function Toggle({ label, checked, onChange, dark }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs transition-colors" style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
        {label}
      </span>
      <button
        onClick={onChange}
        className="relative w-9 h-5 rounded-full transition-colors duration-300"
        style={{ background: checked ? (dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.7)') : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') }}
      >
        <motion.div
          animate={{ x: checked ? 16 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-4 h-4 rounded-full shadow-sm bg-white"
        />
      </button>
    </div>
  )
}

function LikeButton({ dark }) {
  const [count, setCount] = useState(24)
  const [liked, setLiked] = useState(false)
  const [float, setFloat] = useState(false)

  function toggle() {
    if (!liked) { setCount((c) => c + 1); setFloat(true); setTimeout(() => setFloat(false), 600) }
    else setCount((c) => c - 1)
    setLiked(!liked)
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {float && (
          <motion.span key="f" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -16 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} className="absolute -top-4 left-2 text-xs text-red-400 font-bold pointer-events-none">+1</motion.span>
        )}
      </AnimatePresence>
      <motion.button whileTap={{ scale: 0.85 }} onClick={toggle}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors duration-200"
        style={liked
          ? { background: 'rgba(239,68,68,0.12)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.25)' }
          : { background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }
        }
      >
        <Heart size={12} fill={liked ? 'currentColor' : 'none'} />
        {count}
      </motion.button>
    </div>
  )
}

function NotifBell({ dark }) {
  const [count, setCount] = useState(3)
  const [ring, setRing] = useState(false)

  function click() { setRing(true); setTimeout(() => setRing(false), 400); setCount(0) }

  return (
    <div className="relative">
      <motion.button
        animate={ring ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        onClick={click}
        className="p-2 rounded-lg border transition-colors"
        style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)', color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}
      >
        <Bell size={14} />
      </motion.button>
      <AnimatePresence>
        {count > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function StarRating({ dark }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <motion.button key={s} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
          onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>
          <Star size={14} className={`transition-colors ${s <= (hover || rating) ? 'text-amber-400 fill-amber-400' : dark ? 'text-white/15' : 'text-black/15'}`} />
        </motion.button>
      ))}
      {rating > 0 && <span className="text-xs ml-1" style={{ color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>{rating}.0</span>}
    </div>
  )
}

export default function ComponentDemo() {
  const { isDark, toggleDark } = useTheme()
  const [notif, setNotif] = useState(true)
  const [auto, setAuto] = useState(false)

  const bg = isDark ? '#111' : '#fff'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
  const labelColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#fafaf8'
  const monoColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'

  return (
    <motion.div
      animate={{ background: bg }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ border: `1px solid ${border}` }}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: monoColor }}>
          Interactive Components
        </p>
        <div className="flex items-center gap-1.5">
          {isDark ? <Moon size={12} style={{ color: 'rgba(255,255,255,0.4)' }} /> : <Sun size={12} style={{ color: 'rgba(0,0,0,0.3)' }} />}
          <span className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
            {isDark ? 'Dark' : 'Light'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: cardBg, border: `1px solid ${border}` }}>
          <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: monoColor }}>Toggle.jsx</p>
          {/* 다크모드 토글 — 전역 연결 */}
          <Toggle label="다크 모드" checked={isDark} onChange={toggleDark} dark={isDark} />
          <Toggle label="알림 허용" checked={notif} onChange={() => setNotif(!notif)} dark={isDark} />
          <Toggle label="자동 저장" checked={auto} onChange={() => setAuto(!auto)} dark={isDark} />
        </div>

        <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: cardBg, border: `1px solid ${border}` }}>
          <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: monoColor }}>Interactive.jsx</p>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: labelColor }}>Like</span>
            <LikeButton dark={isDark} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: labelColor }}>Notification</span>
            <NotifBell dark={isDark} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: labelColor }}>Rating</span>
            <StarRating dark={isDark} />
          </div>
        </div>
      </div>

    
    </motion.div>
  )
}
