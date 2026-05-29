import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, ArrowUpRight } from 'lucide-react'

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: '#', handle: '@username' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#', handle: 'linkedin.com/in/...' },
  { icon: Mail, label: 'Email', href: 'mailto:your@email.com', handle: 'your@email.com' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6 border-t border-black/[0.06] dark:border-white/[0.06]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 md:mb-10"
        >
          <span className="font-mono text-black/25 dark:text-white/20 text-xs tracking-widest uppercase">Contact</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 md:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tight mb-3 md:mb-4 leading-tight">
              함께<br />일해요
            </h2>
            <p className="text-black/35 dark:text-white/30 text-sm leading-relaxed mb-6 md:mb-8">
              [연락 관련 소개 문구 작성 예정]
            </p>

            <div className="flex flex-col gap-2">
              {socials.map(({ icon: Icon, label, href, handle }) => (
                <a key={label} href={href}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-white/[0.03] hover:border-black/15 dark:hover:border-white/15 hover:shadow-sm transition-all duration-200"
                >
                  <span className="text-black/30 dark:text-white/30 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors flex-shrink-0">
                    <Icon />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-black/20 dark:text-white/20 tracking-widest uppercase leading-none mb-0.5">{label}</p>
                    <p className="text-xs text-black/50 dark:text-white/45 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors truncate">{handle}</p>
                  </div>
                  <ArrowUpRight size={13} className="text-black/15 dark:text-white/15 group-hover:text-black/40 dark:group-hover:text-white/40 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-4 md:p-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase">이름</label>
                    <input type="text" required placeholder="Hong Gildong"
                      className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase">이메일</label>
                    <input type="email" required placeholder="hello@example.com"
                      className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase">제목</label>
                  <input type="text" required placeholder="프로젝트 협업 제안"
                    className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase">메시지</label>
                  <textarea required rows={4} placeholder="안녕하세요! ..."
                    className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors resize-none"
                  />
                </div>
                <button type="submit"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-black/85 dark:hover:bg-white/90 transition-colors"
                >
                  {sent ? '전송됐어요 ✓' : <><Send size={13} />보내기</>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
