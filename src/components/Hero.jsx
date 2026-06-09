import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Lightbulb, LightbulbOff } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

export default function Hero() {
  const { isDark, toggleDark } = useTheme()

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-6 pt-24 pb-12 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6 md:mb-8"
            >
              {/* 전구 + 텍스트 — 끄면 다크모드 */}
              <button
                onClick={toggleDark}
                aria-label={isDark ? '불 켜기 (라이트 모드)' : '불 끄기 (다크 모드)'}
                title={isDark ? '불 켜기' : '불 끄기'}
                className="group/bulb flex items-center gap-2 active:scale-95 transition-transform"
              >
                <span className="transition-transform group-hover/bulb:scale-110">
                  {isDark ? (
                    <LightbulbOff size={18} className="text-white/40" />
                  ) : (
                    <motion.span
                      initial={false}
                      animate={{ filter: ['drop-shadow(0 0 0px rgba(245,200,66,0))', 'drop-shadow(0 0 6px rgba(245,200,66,0.7))', 'drop-shadow(0 0 2px rgba(245,200,66,0.4))'] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="inline-block text-amber-400"
                    >
                      <Lightbulb size={18} fill="currentColor" />
                    </motion.span>
                  )}
                </span>
                <span className="font-mono text-black/40 dark:text-white/35 group-hover/bulb:text-black/60 dark:group-hover/bulb:text-white/50 text-[13px] tracking-widest uppercase transition-colors">
                  {isDark ? 'Lights off' : 'Available for work'}
                </span>
              </button>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[clamp(3rem,12vw,8rem)] font-black leading-none tracking-tighter text-black dark:text-white mb-5 md:mb-6"
            >
              조준범<br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: `1.5px ${isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'}` }}
              >
                CHO JUN-BEOM
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-black/40 dark:text-white/35 text-sm md:text-base max-w-md leading-relaxed mb-8 md:mb-10"
            >
              보기 좋고, 쓰기 편한 웹을 만드는
              프론트엔드 개발자
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 md:gap-3"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 px-4 md:px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-black/85 dark:hover:bg-white/90 transition-colors"
              >
                프로젝트 보기
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="flex items-center px-4 md:px-5 py-2.5 border border-black/12 dark:border-white/12 text-black/50 dark:text-white/50 text-sm font-medium rounded-lg hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white transition-all"
              >
                연락하기
              </a>
              <a href="https://github.com/junbeom09" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center justify-center w-10 h-10 border border-black/10 dark:border-white/10 text-black/35 dark:text-white/35 rounded-lg hover:border-black/25 dark:hover:border-white/25 hover:text-black dark:hover:text-white transition-all">
                <GithubIcon />
              </a>
              <a href="#contact" aria-label="Email" className="flex items-center justify-center w-10 h-10 border border-black/10 dark:border-white/10 text-black/35 dark:text-white/35 rounded-lg hover:border-black/25 dark:hover:border-white/25 hover:text-black dark:hover:text-white transition-all">
                <Mail size={15} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex flex-col items-end gap-2 pb-2"
          >
            {[
              { label: 'Role', value: 'Frontend Developer' },
              { label: 'Stack', value: 'React · TypeScript' },
              { label: 'Location', value: 'Seoul, Korea' },
            ].map(({ label, value }) => (
              <div key={label} className="border border-black/8 dark:border-white/8 rounded-xl px-5 py-3.5 bg-white/60 dark:bg-white/5">
                <p className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase mb-1">{label}</p>
                <p className="text-black/70 dark:text-white/60 text-sm font-medium">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:hidden flex flex-wrap gap-2 mt-8"
        >
          {[
            { label: 'Role', value: 'Frontend Dev' },
            { label: 'Stack', value: 'React · TS' },
            { label: 'Location', value: 'Seoul' },
          ].map(({ label, value }) => (
            <div key={label} className="border border-black/8 dark:border-white/8 rounded-lg px-3 py-2 bg-white/60 dark:bg-white/5">
              <p className="font-mono text-[9px] text-black/25 dark:text-white/25 tracking-widest uppercase mb-0.5">{label}</p>
              <p className="text-black/60 dark:text-white/55 text-xs font-medium">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
