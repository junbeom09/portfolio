import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 사이드바 열렸을 때 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f9f9f7]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06]'
          : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 text-sm text-black/40 dark:text-white/35 hover:text-black/80 dark:hover:text-white/80 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            className="flex items-center px-4 py-2 rounded-lg border border-black/12 dark:border-white/12 text-black/50 dark:text-white/50 text-xs font-medium hover:border-black/25 dark:hover:border-white/25 hover:text-black dark:hover:text-white transition-all duration-200"
          >
            Hire Me
          </a>
        </div>

        <button
          className="md:hidden text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
    </motion.header>

      {/* 모바일 사이드바 (header 밖 — 부모 transform 영향 차단) */}
      <AnimatePresence>
        {open && (
          <>
            {/* 백드롭 */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* 사이드바 패널 (오른쪽 슬라이드) */}
            <motion.aside
              key="panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="md:hidden fixed top-0 left-0 z-50 h-full w-64 max-w-[80vw] bg-[#f9f9f7] dark:bg-[#0a0a0a] border-r border-black/[0.07] dark:border-white/[0.07] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-[57px] border-b border-black/[0.06] dark:border-white/[0.06]">
                <span className="font-mono text-xs tracking-[0.2em] text-black/40 dark:text-white/40 uppercase">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="닫기"
                  className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <ul className="flex flex-col gap-1 px-3 py-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-black/55 dark:text-white/50 hover:text-black dark:hover:text-white text-[15px] font-medium rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto m-3 flex items-center justify-center px-4 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Hire Me
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
