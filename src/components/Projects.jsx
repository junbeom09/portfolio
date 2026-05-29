import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const projects = [
  {
    id: 1,
    title: '마인드룸 어드민',
    desc: '마인드룸 상담 서비스의 내부 관리자 대시보드. 기관·부스·장비(미니PC·LTE 라우터)·상담 세션을 통합 관리하고, 지역·성별·연령·고민별 상담 통계를 차트로 제공합니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    year: '2026',
    mockup: '/mockups/helpteacher/index.html',
  },
  {
    id: 2,
    title: '뉴진스 (NEWjinS)',
    desc: '뉴스 크롤링과 DBSCAN 군집화 기반 뉴스레터 자동화 서비스. 머신러닝(KoBERT·KoBART)으로 가짜뉴스 판별·본문 요약을 제공하고, 언론사 구독과 카테고리별 모아보기를 구현했습니다.',
    tags: ['React', 'Spring Boot', 'MySQL', 'PyTorch'],
    year: '2024',
    mockup: '/mockups/newjins/index.html',
    github: 'https://github.com/junbeom09/codequad',
  },
  {
    id: 3,
    title: 'Artistry',
    desc: '미술 프리랜서와 의뢰자를 연결하는 매칭 플랫폼. 작품 포트폴리오 게시와 카테고리 탐색, 1:1 채팅 의뢰, 카카오페이 결제, 소셜 로그인을 제공합니다.',
    tags: ['JSP/Servlet', 'Java', 'Oracle', 'MyBatis'],
    year: '2024',
    mockup: '/mockups/artistry/index.html',
    github: 'https://github.com/junbeom09/Artistry',
  },
  { id: 4, title: 'Project 4', desc: '[프로젝트 설명 작성 예정]', tags: [], year: '20XX', mockup: null },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-6 border-t border-black/[0.06] dark:border-white/[0.06]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between mb-8 md:mb-10"
        >
          <span className="font-mono text-black/25 dark:text-white/20 text-xs tracking-widest uppercase">Projects</span>
          <span className="font-mono text-black/15 dark:text-white/15 text-xs">{projects.length} works</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => project.mockup && window.open(project.mockup, '_blank', 'noopener,noreferrer')}
              className={`group relative rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-4 md:p-5 hover:border-black/15 dark:hover:border-white/15 hover:shadow-sm transition-all duration-300 overflow-hidden ${project.mockup ? 'cursor-pointer' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="font-mono text-black/15 dark:text-white/15 text-xs">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-bold text-black dark:text-white text-base">{project.title}</h3>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub 저장소"
                      onClick={(e) => e.stopPropagation()}
                      className="text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {project.mockup && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-black/30 dark:text-white/30 group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
                      데모 보기
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  )}
                </div>
              </div>

              <p className="text-black/35 dark:text-white/30 text-sm leading-relaxed mb-4 pl-6 md:pl-7">
                {project.desc}
              </p>

              <div className="flex items-center justify-between pl-6 md:pl-7">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.length > 0
                    ? project.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 bg-black/[0.04] dark:bg-white/[0.05] border border-black/8 dark:border-white/8 text-black/40 dark:text-white/35 rounded-md">
                          {tag}
                        </span>
                      ))
                    : <span className="text-[11px] text-black/15 dark:text-white/15 italic">태그 추가 예정</span>
                  }
                </div>
                <span className="font-mono text-black/15 dark:text-white/15 text-xs">{project.year}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
