import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { label: '레이블 1', value: '?+' },
  { label: '레이블 2', value: '?+' },
  { label: '레이블 3', value: '?+' },
]

const techStack = [
  { name: 'Skill A', level: 0 },
  { name: 'Skill B', level: 0 },
  { name: 'Skill C', level: 0 },
  { name: 'Skill D', level: 0 },
  { name: 'Skill E', level: 0 },
]

function Bar({ name, level, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-black/50 dark:text-white/45 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">{name}</span>
        <span className="text-xs text-black/25 dark:text-white/20 font-mono">{level}%</span>
      </div>
      <div className="h-px bg-black/8 dark:bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-black/40 dark:bg-white/40"
        />
      </div>
    </div>
  )
}

function BentoCard({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-4 md:p-5 hover:border-black/15 dark:hover:border-white/15 hover:shadow-sm transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="col-span-2 md:col-span-2"
          >
            <BentoCard className="h-full">
              <p className="font-mono text-[10px] text-black/20 dark:text-white/20 tracking-widest uppercase mb-3">Bio</p>
              <h2 className="text-xl md:text-2xl font-black text-black dark:text-white tracking-tight mb-3 leading-tight">
                저를 소개합니다
              </h2>
              <p className="text-black/40 dark:text-white/35 text-sm leading-relaxed mb-2">
                [자기소개 첫 번째 단락 작성 예정]
              </p>
              <p className="text-black/40 dark:text-white/35 text-sm leading-relaxed">
                [자기소개 두 번째 단락 작성 예정]
              </p>
            </BentoCard>
          </motion.div>

          {stats.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="col-span-1"
            >
              <BentoCard className="flex flex-col justify-between h-full min-h-[90px] md:min-h-[100px]">
                <p className="font-mono text-[9px] md:text-[10px] text-black/20 dark:text-white/20 tracking-widest uppercase">{label}</p>
                <p className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tighter">{value}</p>
              </BentoCard>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-2 md:col-span-3 lg:col-span-4"
          >
            <BentoCard>
              <p className="font-mono text-[10px] text-black/20 dark:text-white/20 tracking-widest uppercase mb-5">Tech Stack</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 md:gap-y-5">
                {techStack.map((tech, i) => (
                  <Bar key={tech.name} {...tech} delay={0.25 + i * 0.06} />
                ))}
              </div>
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
