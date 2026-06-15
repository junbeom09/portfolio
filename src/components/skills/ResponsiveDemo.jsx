import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Tablet, Monitor, GripVertical } from 'lucide-react'

// 프리셋 폭 (Desktop은 컨테이너 풀폭으로 클램프)
const PRESETS = [
  { name: 'Mobile',  Icon: Smartphone, w: 260,      label: '375px' },
  { name: 'Tablet',  Icon: Tablet,     w: 620,      label: '768px' },
  { name: 'Desktop', Icon: Monitor,    w: Infinity, label: '1440px' },
]

const PROJECTS = ['마인드룸 어드민', '뉴진스', 'Artistry']

// 폭(px)에 따른 레이아웃 모드 — 실제 반응형처럼 브레이크포인트로 전환
function modeFor(w) {
  if (w < 460) return 'mobile'
  if (w < 720) return 'tablet'
  return 'desktop'
}

function MockPage({ mode }) {
  const mobile = mode === 'mobile'
  const tablet = mode === 'tablet'
  const statCols = mobile ? 'grid-cols-2' : 'grid-cols-4'
  const projCols = mobile ? 'grid-cols-1' : tablet ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className="w-full h-full bg-[#f9f9f7] overflow-hidden flex flex-col" style={{ fontSize: mobile ? '5px' : '6px' }}>
      {/* 네비게이션 — 모바일은 햄버거, 그 외엔 풀 메뉴 */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-black/5 flex-shrink-0">
        <div className="font-black text-black tracking-tight" style={{ fontSize: '8px' }}>Portfolio</div>
        {mobile ? (
          <div className="flex flex-col gap-0.5">
            <div className="w-3 h-0.5 bg-black/30 rounded" />
            <div className="w-2.5 h-0.5 bg-black/30 rounded" />
            <div className="w-3 h-0.5 bg-black/30 rounded" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex gap-3 text-black/40">
              <span>About</span><span>Skills</span><span>Projects</span><span>Contact</span>
            </div>
            <div className="border border-black/10 rounded px-2 py-0.5 text-black/40">Hire Me</div>
          </div>
        )}
      </div>

      {/* 히어로 — 모바일은 세로 중앙, 그 외엔 좌우 분할 */}
      <div className={`flex ${mobile ? 'flex-col items-center text-center' : 'flex-row items-center'} gap-3 px-3 py-3 flex-shrink-0`}>
        <div className={mobile ? 'w-full' : 'flex-1'}>
          <div className="font-black text-black leading-tight mb-1.5" style={{ fontSize: mobile ? '9px' : '11px' }}>
            조준범<br /><span className="text-black/15">CHO JUN-BEOM</span>
          </div>
          <div className="text-black/40 mb-2 leading-relaxed">
            보기 좋고, 쓰기 편한 웹을<br />만드는 프론트엔드 개발자
          </div>
          <div className={`flex gap-1 ${mobile ? 'justify-center' : ''}`}>
            <div className="px-2 py-0.5 bg-black text-white rounded">프로젝트 보기</div>
            <div className="px-2 py-0.5 border border-black/15 text-black/40 rounded">연락하기</div>
          </div>
        </div>
        {!mobile && (
          <div className="w-16 h-12 rounded-lg bg-white border border-black/8 flex flex-col gap-1 p-2 flex-shrink-0">
            <div className="h-1 bg-black/10 rounded w-full" />
            <div className="h-1 bg-black/10 rounded w-3/4" />
            <div className="h-1 bg-black/10 rounded w-1/2" />
          </div>
        )}
      </div>

      {/* 통계 — 모바일 2열, 그 외 4열 */}
      <div className={`grid ${statCols} gap-1.5 px-3 mb-2 flex-shrink-0`}>
        {['Projects', 'Commits', 'Skills', 'Teams'].map((s) => (
          <div key={s} className="bg-white border border-black/6 rounded p-1.5">
            <div className="text-black/20 mb-0.5">{s}</div>
            <div className="font-black text-black" style={{ fontSize: '8px' }}>12+</div>
          </div>
        ))}
      </div>

      {/* 프로젝트 카드 — 모바일 1열 / 태블릿 2열 / 데스크탑 3열 */}
      <div className={`grid ${projCols} gap-1.5 px-3 pb-3`}>
        {PROJECTS.map((s) => (
          <div key={s} className="bg-white rounded border border-black/6 p-1.5">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-3 h-3 rounded bg-black/8" />
              <div className="font-semibold text-black">{s}</div>
            </div>
            <div className="text-black/30 leading-relaxed mb-1">반응형으로 동작하는 프로젝트 카드입니다.</div>
            <div className="flex gap-1">
              <div className="px-1 py-0.5 bg-black/5 border border-black/8 text-black/30 rounded" style={{ fontSize: '4px' }}>React</div>
              <div className="px-1 py-0.5 bg-black/5 border border-black/8 text-black/30 rounded" style={{ fontSize: '4px' }}>TS</div>
            </div>
          </div>
        ))}
      </div>

      {/* 남는 아래는 페이지 배경 (실제 사이트 하단 여백 느낌) */}
      <div className="flex-1" />
    </div>
  )
}

export default function ResponsiveDemo() {
  const containerRef = useRef(null)
  const [maxW, setMaxW] = useState(0)
  const [previewW, setPreviewW] = useState(0)
  const dragging = useRef(false)
  const inited = useRef(false)

  // 컨테이너 실제 폭을 측정 — 핸들이 들어갈 자리(16px)를 빼서 풀폭에서도 손잡이가 안 잘리게
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const rail = Math.max(0, el.offsetWidth - 16)
      setMaxW(rail)
      if (!inited.current && rail) {
        setPreviewW(rail) // 처음엔 데스크탑(풀폭)으로
        inited.current = true
      } else {
        setPreviewW((p) => Math.min(p || rail, rail))
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const clamp = (w) => Math.max(260, Math.min(w, maxW || w))
  const mode = modeFor(previewW)

  function setPreset(w) {
    setPreviewW(clamp(w === Infinity ? maxW : w))
  }

  function onPointerDown(e) {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onPointerMove(e) {
    if (!dragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPreviewW(clamp(Math.round(e.clientX - rect.left)))
  }
  function onPointerUp(e) {
    dragging.current = false
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* noop */ }
  }

  const isActivePreset = (p) =>
    p.w === Infinity ? previewW >= maxW - 2 : Math.abs(previewW - clamp(p.w)) < 3

  return (
    <div className="flex flex-col gap-4">
      {/* 상단: 프리셋 + 현재 폭/모드 표시 */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.04] p-1 rounded-lg">
          {PRESETS.map((p) => {
            const on = isActivePreset(p)
            return (
              <button
                key={p.name}
                onClick={() => setPreset(p.w)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all duration-200 ${
                  on
                    ? 'bg-white dark:bg-white/10 text-black dark:text-white shadow-sm font-medium'
                    : 'text-black/40 dark:text-white/35 hover:text-black/60 dark:hover:text-white/60'
                }`}
              >
                <p.Icon size={12} />
                <span className="hidden sm:inline">{p.name}</span>
                <span className="font-mono text-[10px] opacity-50">{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 드래그로 폭을 바꾸는 미리보기 */}
      <div ref={containerRef} className="relative w-full" style={{ height: 500 }}>
        {previewW > 0 && (
          <motion.div
            animate={{ width: previewW }}
            transition={dragging.current ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 32 }}
            className="absolute inset-y-0 left-0"
          >
            <div className="w-full h-full rounded-xl border border-black/10 dark:border-white/10 shadow-md overflow-hidden bg-white flex flex-col">
              {/* 브라우저 상단바 */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#efefed] border-b border-black/6 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 rounded-full bg-green-400/80" />
                <div className="flex-1 mx-2 bg-black/6 rounded text-[6px] text-black/30 px-2 py-0.5 text-center">portfolio.dev</div>
              </div>
              <div className="flex-1 overflow-hidden">
                <MockPage mode={mode} />
              </div>
            </div>

            {/* 드래그 핸들 */}
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="group absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-16 rounded-lg bg-black dark:bg-white shadow-lg flex items-center justify-center cursor-ew-resize touch-none z-10 transition-transform hover:scale-105 active:scale-95"
              title="끌어서 폭 조절"
            >
              <GripVertical size={14} className="text-white dark:text-black" />
              {/* 손잡이 양옆 화살표 힌트 */}
              <span className="pointer-events-none absolute -left-3 text-black/25 dark:text-white/25 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">‹</span>
              <span className="pointer-events-none absolute -right-3 text-black/25 dark:text-white/25 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
            </div>
          </motion.div>
        )}
      </div>

      <p className="text-xs text-black/30 dark:text-white/20 pl-0.5">
        <span className="hidden sm:inline">오른쪽 손잡이를 끌어 화면 폭을 바꿔보세요 — 레이아웃이 실시간으로 반응해요</span>
        <span className="sm:hidden">위 버튼으로 화면 크기를 바꿔보세요 — 레이아웃이 반응해요</span>
      </p>
    </div>
  )
}
