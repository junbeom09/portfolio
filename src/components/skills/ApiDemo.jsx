import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Wifi, WifiOff } from 'lucide-react'

const mockPosts = [
  { id: 1, title: '인터랙티브 포트폴리오 만들기', author: 'Kim Dev', views: '1.2k', tag: 'React' },
  { id: 2, title: 'Framer Motion 완벽 가이드', author: 'Lee UX', views: '856', tag: 'Animation' },
  { id: 3, title: 'TypeScript 실전 패턴', author: 'Park TS', views: '2.1k', tag: 'TypeScript' },
]

function Skeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-white/3 border border-white/5 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-white/8 animate-pulse" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-2.5 bg-white/8 rounded-full animate-pulse w-3/4" />
            <div className="h-2 bg-white/5 rounded-full animate-pulse w-1/2" />
          </div>
          <div className="w-8 h-4 bg-white/5 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

const tagColors = {
  React: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  Animation: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  TypeScript: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
}

export default function ApiDemo() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function fetchData() {
    setStatus('loading')
    // Simulate 30% error rate for realism
    const willFail = Math.random() < 0.3
    setTimeout(() => setStatus(willFail ? 'error' : 'success'), 1500)
  }

  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 font-mono">fetch · 로딩 · 에러 처리</p>
        <button
          onClick={fetchData}
          disabled={status === 'loading'}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 rounded-lg text-xs hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          <RefreshCw size={11} className={status === 'loading' ? 'animate-spin' : ''} />
          {status === 'loading' ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 py-6 text-slate-600"
          >
            <Wifi size={24} />
            <p className="text-xs">버튼을 눌러 데이터를 불러오세요</p>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Skeleton />
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 py-6 text-red-400"
          >
            <WifiOff size={24} />
            <p className="text-xs">네트워크 오류가 발생했습니다</p>
            <button onClick={fetchData} className="text-xs text-slate-400 hover:text-white underline underline-offset-2">
              다시 시도
            </button>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2"
          >
            {mockPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/3 border border-white/8 rounded-xl hover:border-white/15 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-violet-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{post.title}</p>
                  <p className="text-[10px] text-slate-500">{post.author} · 조회 {post.views}</p>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${tagColors[post.tag]}`}>
                  {post.tag}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
