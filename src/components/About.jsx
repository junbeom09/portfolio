import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MousePointerClick, Zap, Users } from 'lucide-react'

const values = [
  {
    Icon: MousePointerClick,
    title: '쓰기 편한 걸 만들어요',
    desc: '사용자가 헤매지 않는 흐름을 먼저 생각합니다. 클릭 한 번, 화면 전환 하나까지 자연스럽게 설계해요.',
  },
  {
    Icon: Zap,
    title: '빠르게 배우고 적용해요',
    desc: '새로운 기술도 문서를 파고들어 바로 프로젝트에 녹여냅니다. 필요한 걸 빠르게 찾아 쓰는 게 강점이에요.',
  },
  {
    Icon: Users,
    title: '함께 만들어요',
    desc: '혼자 잘하는 것보다 팀과 맞춰가는 걸 중요하게 생각해요. 코드도 다음 사람이 읽기 쉽게 씁니다.',
  },
]

// slug: Simple Icons 슬러그 / color: 브랜드 색 / desc: hover 설명
const techStack = [
  { name: 'React', slug: 'react', color: '#61DAFB', desc: '컴포넌트로 UI를 나누고 상태를 관리하며 SPA를 만들어 본 경험이 있어요.' },
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', desc: 'DOM 조작과 비동기 처리로 동적인 인터랙션을 구현해 본 경험이 있어요.' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6', desc: '타입을 정의해 안정적인 코드를 작성해 본 경험이 있어요.' },
  { name: 'HTML5', slug: 'html5', color: '#E34F26', desc: '시맨틱 태그로 구조를 잡아 마크업해 본 경험이 있어요.' },
  { name: 'CSS3', slug: 'css', color: '#663399', desc: 'Flex·Grid 레이아웃과 애니메이션, 반응형을 직접 다뤄 본 경험이 있어요.' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4', desc: '유틸리티 클래스로 빠르게 스타일링해 본 경험이 있어요.' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#000000', desc: 'App Router로 페이지를 구성하고 API Route를 다뤄 본 경험이 있어요.' },
  { name: 'Vite', slug: 'vite', color: '#646CFF', desc: '빠른 개발 서버와 번들러로 React 프로젝트를 세팅해 본 경험이 있어요.' },
  { name: 'Java', slug: 'java', color: '#ED8B00', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', desc: '객체지향 기반으로 서버 로직을 작성해 본 경험이 있어요.' },
  { name: 'Spring Boot', slug: 'springboot', color: '#6DB33F', desc: 'REST API와 데이터베이스 연동을 구현해 본 경험이 있어요.' },
  { name: 'MySQL', slug: 'mysql', color: '#4479A1', desc: '테이블을 설계하고 쿼리를 작성해 본 경험이 있어요.' },
  { name: 'Python', slug: 'python', color: '#3776AB', desc: '크롤링과 데이터 처리에 사용해 본 경험이 있어요.' },
  { name: 'Git', slug: 'git', color: '#F05032', desc: '브랜치를 나누고 PR로 협업해 본 경험이 있어요.' },
]

function BentoCard({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-4 md:p-5 hover:border-black/15 dark:hover:border-white/15 hover:shadow-sm transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}

function TechIcon({ tech, delay, inView, active, onActivate }) {
  // nextdotjs/css 등 일부는 흰 배경에서 안 보여 다크일 때 흰색으로 보정
  const iconColor = tech.color === '#000000' ? '000000' : tech.color.replace('#', '')
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => onActivate(true)}
      onMouseLeave={() => onActivate(false)}
      onClick={() => onActivate(!active)}
      className="relative"
    >
      <div
        className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: active ? `${tech.color}1a` : 'rgba(0,0,0,0.03)',
          boxShadow: active ? `0 8px 18px ${tech.color}33, 0 0 0 1px ${tech.color}40` : 'none',
          transform: active ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        <img
          src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}/${iconColor}`}
          alt={tech.name}
          className={`w-6 h-6 md:w-7 md:h-7 ${tech.iconUrl ? '' : 'dark:invert-[.85] dark:opacity-90'}`}
          loading="lazy"
        />
      </div>

      {/* 데스크톱 전용 말풍선 (hover) */}
      <div
        className={`hidden md:block absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-[210px] z-30 transition-all duration-200 pointer-events-none ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
      >
        <div
          className="rounded-lg px-3 py-2 text-white shadow-lg text-center"
          style={{ backgroundColor: tech.color === '#000000' ? '#1a1a1a' : tech.color }}
        >
          <p className="text-xs font-bold leading-tight" style={tech.color === '#F7DF1E' ? { color: '#1a1a1a' } : undefined}>{tech.name}</p>
          <p className="text-[11px] leading-snug mt-0.5 opacity-90" style={tech.color === '#F7DF1E' ? { color: '#1a1a1a' } : undefined}>{tech.desc}</p>
        </div>
        <div className="w-2 h-2 rotate-45 mx-auto -mt-1" style={{ backgroundColor: tech.color === '#000000' ? '#1a1a1a' : tech.color }} />
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTech, setActiveTech] = useState(null)

  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6 border-t border-black/[0.06] dark:border-white/[0.06]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 md:mb-10"
        >
          <span className="font-mono text-black/25 dark:text-white/20 text-xs tracking-widest uppercase">About</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
            >
              <BentoCard className="group h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:!border-black/25 dark:hover:!border-white/25 hover:shadow-xl hover:shadow-black/[0.06] dark:hover:shadow-black/40">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-black/70 dark:text-white/70 mb-4 transition-all duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:scale-110">
                  <v.Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="text-base md:text-lg font-bold text-black dark:text-white tracking-tight mb-2">
                  {v.title}
                </h3>
                <p className="text-black/40 dark:text-white/35 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </BentoCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BentoCard>
            <p className="font-mono text-[10px] text-black/20 dark:text-white/20 tracking-widest uppercase mb-6">Tech Stack</p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {techStack.map((tech, i) => (
                <TechIcon
                  key={tech.name}
                  tech={tech}
                  delay={0.2 + i * 0.05}
                  inView={inView}
                  active={activeTech === tech.name}
                  onActivate={(on) => setActiveTech(on ? tech.name : null)}
                />
              ))}
            </div>

            {/* 모바일 전용: 탭한 아이콘 설명을 행 아래 고정 영역에 (말풍선은 데스크톱에서) */}
            <div className="md:hidden mt-5 min-h-[3rem] flex items-center justify-center text-center">
              {activeTech ? (() => {
                const t = techStack.find((x) => x.name === activeTech)
                return (
                  <motion.p
                    key={activeTech}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm max-w-md"
                  >
                    <span className="font-bold" style={{ color: t.color === '#000000' ? undefined : t.color }}>{t.name}</span>
                    <span className="text-black/45 dark:text-white/40"> — {t.desc}</span>
                  </motion.p>
                )
              })() : (
                <p className="text-xs text-black/25 dark:text-white/25">아이콘을 탭하면 설명이 나와요</p>
              )}
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  )
}
