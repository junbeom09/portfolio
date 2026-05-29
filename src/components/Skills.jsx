import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ResponsiveDemo from './skills/ResponsiveDemo'
import ComponentDemo from './skills/ComponentDemo'
import AnimationDemo from './skills/AnimationDemo'
import StateDemo from './skills/StateDemo'

const skills = [
  {
    id: 'responsive',
    title: '반응형 웹',
    desc: '어떤 화면 크기에서도 자연스럽게 동작하는 레이아웃을 설계합니다.',
    tags: ['CSS Grid', 'Flexbox', 'Media Query', 'Mobile-first'],
    Demo: ResponsiveDemo,
  },
  {
    id: 'component',
    title: 'UI 컴포넌트',
    desc: '재사용 가능하고 인터랙티브한 UI 컴포넌트를 만듭니다.',
    tags: ['React', 'Framer Motion', 'Accessibility'],
    Demo: ComponentDemo,
  },
  {
    id: 'animation',
    title: '인터랙션 & 애니메이션',
    desc: '자연스러운 움직임으로 사용자 경험을 향상시킵니다.',
    tags: ['Framer Motion', 'CSS Transitions', 'Keyframes'],
    Demo: AnimationDemo,
  },
  {
    id: 'state',
    title: '상태 관리',
    desc: '복잡한 UI 상태를 예측 가능하고 일관되게 관리합니다.',
    tags: ['useState', 'useReducer', 'Zustand'],
    Demo: StateDemo,
  },
]

export default function Skills() {
  const [active, setActive] = useState(skills[0].id)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const current = skills.find((s) => s.id === active)

  return (
    <section id="skills" className="py-16 md:py-24 px-4 md:px-6 border-t border-black/[0.06] dark:border-white/[0.06]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 md:mb-10"
        >
          <span className="font-mono text-black/25 dark:text-white/20 text-xs tracking-widest uppercase">Skills</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Tab list */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:w-52 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible flex-shrink-0 pb-1 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
          >
            {skills.map((skill, idx) => {
              const isActive = active === skill.id
              return (
                <button
                  key={skill.id}
                  onClick={() => setActive(skill.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg text-left transition-all duration-200 text-sm whitespace-nowrap ${
                    isActive
                      ? 'bg-black dark:bg-white text-white dark:text-black font-medium'
                      : 'text-black/40 dark:text-white/35 hover:text-black/70 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? 'text-white/40 dark:text-black/40' : 'text-black/20 dark:text-white/20'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {skill.title}
                </button>
              )
            })}
          </motion.div>

          {/* Demo panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 min-w-0 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-white/[0.03] overflow-hidden"
          >
            <div className="px-4 md:px-5 py-3.5 md:py-4 border-b border-black/[0.05] dark:border-white/[0.05]">
              <h3 className="font-semibold text-black dark:text-white text-sm mb-0.5">{current.title}</h3>
              <p className="text-xs text-black/35 dark:text-white/30">{current.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {current.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 border border-black/8 dark:border-white/8 text-black/35 dark:text-white/30 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 md:p-6" style={{ minHeight: '360px' }}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <current.Demo />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
