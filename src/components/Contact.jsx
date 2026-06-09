import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, ArrowUpRight } from 'lucide-react'

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/junbeom09', handle: 'github.com/junbeom09' },
  { icon: Mail, label: 'Email', href: 'mailto:qoddkfdl@gmail.com', handle: 'qoddkfdl@gmail.com' },
]

const WEB3FORMS_KEY = 'f6ddd471-10a7-4006-b7c8-e5a537c7118b'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const formEl = e.target
    const formData = new FormData(formEl)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', '[포트폴리오] ' + (formData.get('subject') || '문의'))
    formData.append('from_name', '포트폴리오 문의')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        formEl.reset()
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
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
              무엇이든<br />물어보세요
            </h2>
            <p className="text-black/35 dark:text-white/30 text-sm leading-relaxed mb-6 md:mb-8">
              포트폴리오에 대한 피드백, 협업 문의, 가벼운 커피챗 모두 환영해요.
              메일이나 아래 폼으로 편하게 연락 주세요.
            </p>

            <div className="flex flex-col gap-2">
              {socials.map(({ icon: Icon, label, href, handle }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
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
                    <input type="text" name="name" required placeholder="홍길동"
                      className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase">이메일</label>
                    <input type="email" name="email" required placeholder="hello@example.com"
                      className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase">제목</label>
                  <input type="text" name="subject" required placeholder="프로젝트 협업 제안"
                    className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-black/25 dark:text-white/25 tracking-widest uppercase">메시지</label>
                  <textarea name="message" required rows={4} placeholder="안녕하세요! ..."
                    className="bg-black/[0.02] dark:bg-white/[0.04] border border-black/8 dark:border-white/8 rounded-lg px-3.5 py-2.5 text-sm text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/25 dark:focus:border-white/25 transition-colors resize-none"
                  />
                </div>
                {/* 스팸 방지 honeypot */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <button type="submit" disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-black/85 dark:hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? '보내는 중…'
                    : status === 'sent' ? '전송됐어요 ✓'
                    : status === 'error' ? '실패했어요 · 다시 시도'
                    : <><Send size={13} />보내기</>}
                </button>
                {status === 'error' && (
                  <p className="text-xs text-red-500/80 text-center">전송에 실패했어요. 메일(qoddkfdl@gmail.com)로 직접 보내주셔도 돼요.</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
