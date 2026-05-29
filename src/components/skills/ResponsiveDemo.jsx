import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Tablet, Smartphone } from 'lucide-react'

const devices = [
  { name: 'Mobile',   icon: Smartphone, w: 375,  h: 220, label: '375px' },
  { name: 'Tablet',   icon: Tablet,     w: 768,  h: 260, label: '768px' },
  { name: 'Desktop',  icon: Monitor,    w: '100%', h: 300, label: '100%' },
]

const popupSizes = {
  Mobile:  { w: 390,  h: 844  },
  Tablet:  { w: 820,  h: 1180 },
}

function MockPage({ isDesktop, isMobile }) {
  return (
    <div className="w-full h-full bg-[#f9f9f7] overflow-hidden flex flex-col" style={{ fontSize: isMobile ? '5px' : '6px' }}>
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-black/5 flex-shrink-0">
        <div className="font-bold text-black font-mono" style={{ fontSize: '7px' }}>&lt;JJB/&gt;</div>
        {!isMobile ? (
          <div className="flex gap-3 text-black/40">
            <span>About</span><span>Skills</span><span>Projects</span><span>Contact</span>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <div className="w-3 h-0.5 bg-black/30 rounded" />
            <div className="w-2.5 h-0.5 bg-black/30 rounded" />
            <div className="w-3 h-0.5 bg-black/30 rounded" />
          </div>
        )}
        {!isMobile && <div className="border border-black/10 rounded px-2 py-0.5 text-black/40">Hire Me</div>}
      </div>

      <div className={`flex ${isMobile ? 'flex-col items-center text-center' : 'flex-row items-center'} gap-3 px-3 py-3 flex-shrink-0`}>
        <div className={isMobile ? 'w-full' : 'flex-1'}>
          <div className="font-black text-black leading-tight mb-1.5" style={{ fontSize: isMobile ? '9px' : '10px' }}>
            조준범<br /><span className="text-black/15">CHO JUN-BEOM</span>
          </div>
          <div className="text-black/40 mb-2 leading-relaxed">
            보기 좋고, 쓰기 편한 웹을<br />만드는 프론트엔드 개발자
          </div>
          <div className={`flex gap-1 ${isMobile ? 'justify-center' : ''}`}>
            <div className="px-2 py-0.5 bg-black text-white rounded">프로젝트 보기</div>
            <div className="px-2 py-0.5 border border-black/15 text-black/40 rounded">연락하기</div>
          </div>
        </div>
        {isDesktop && (
          <div className="w-14 h-10 rounded-lg bg-white border border-black/8 flex flex-col gap-1 p-2 flex-shrink-0">
            <div className="h-1 bg-black/10 rounded w-full" />
            <div className="h-1 bg-black/10 rounded w-3/4" />
            <div className="h-1 bg-black/10 rounded w-1/2" />
          </div>
        )}
      </div>

      {!isMobile && (
        <div className={`grid ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'} gap-1.5 px-3 mb-2`}>
          {['Projects', 'Commits', 'Skills', 'Teams'].slice(0, isDesktop ? 4 : 2).map((s) => (
            <div key={s} className="bg-white border border-black/6 rounded p-1.5">
              <div className="text-black/20 mb-0.5">{s}</div>
              <div className="font-black text-black" style={{ fontSize: '8px' }}>12+</div>
            </div>
          ))}
        </div>
      )}

      <div className={`grid ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'} gap-1.5 px-3 pb-3`}>
        {(isDesktop ? ['Project 1', 'Project 2'] : ['Project 1']).map((s) => (
          <div key={s} className="bg-white rounded border border-black/6 p-1.5">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-3 h-3 rounded bg-black/8" />
              <div className="font-semibold text-black">{s}</div>
            </div>
            <div className="text-black/30 leading-relaxed mb-1">프로젝트 설명이 들어가는 자리입니다.</div>
            <div className="flex gap-1">
              <div className="px-1 py-0.5 bg-black/5 border border-black/8 text-black/30 rounded" style={{ fontSize: '4px' }}>React</div>
              <div className="px-1 py-0.5 bg-black/5 border border-black/8 text-black/30 rounded" style={{ fontSize: '4px' }}>TS</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ResponsiveDemo() {
  const [active, setActive] = useState('Desktop')
  const device = devices.find((d) => d.name === active)

  function openPopup() {
    const size = popupSizes[active]
    if (!size) return
    const left = Math.round(window.screenX + (window.outerWidth - size.w) / 2)
    const top  = Math.round(window.screenY + (window.outerHeight - size.h) / 2)
    window.open(window.location.href, `preview_${active}`, `width=${size.w},height=${size.h},left=${left},top=${top},resizable=yes,scrollbars=yes`)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 디바이스 선택 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.04] p-1 rounded-lg">
          {devices.map(({ name, icon: Icon, label }) => (
            <button
              key={name}
              onClick={() => setActive(name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all duration-200 ${
                active === name
                  ? 'bg-white dark:bg-white/10 text-black dark:text-white shadow-sm font-medium'
                  : 'text-black/40 dark:text-white/35 hover:text-black/60 dark:hover:text-white/60'
              }`}
            >
              <Icon size={12} />
              <span className="hidden sm:inline">{name}</span>
              <span className="font-mono text-[10px] opacity-50">{label}</span>
            </button>
          ))}
        </div>

        {popupSizes[active] && (
          <button
            onClick={openPopup}
            className="text-[10px] font-mono text-black/30 dark:text-white/25 hover:text-black/60 dark:hover:text-white/60 transition-colors border border-black/8 dark:border-white/8 px-2 py-1 rounded-lg"
          >
            실제 크기로 열기 ↗
          </button>
        )}
      </div>

      {/* 브라우저 목업 */}
      <div className="w-full overflow-hidden">
        <motion.div
          animate={{ height: device.h }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full rounded-xl border border-black/10 dark:border-white/10 shadow-md overflow-hidden bg-white"
            >
              {/* 브라우저 상단바 */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#efefed] border-b border-black/6 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="flex-1 mx-2 bg-black/6 rounded text-[6px] text-black/30 px-2 py-0.5 text-center">
                  portfolio.dev
                </div>
              </div>
              <div className="overflow-y-auto" style={{ height: 'calc(100% - 28px)' }}>
                <MockPage
                  isDesktop={active === 'Desktop'}
                  isMobile={active === 'Mobile'}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="text-xs text-black/25 dark:text-white/20 pl-0.5">
        버튼을 눌러 뷰포트를 바꿔보세요
      </p>
    </div>
  )
}
