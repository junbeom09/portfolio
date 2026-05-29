import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: '헬프티처 관리자 페이지',
    desc: '상담 부스 운영을 위한 관리자 웹. 기관·부스·장비 등록과 코드 발급, 상담 통계 조회를 제공하며, 검색·필터·정렬·페이지네이션을 갖춘 데이터 테이블 UI를 구현했습니다.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
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
  },
  { id: 3, title: 'Project 3', desc: '[프로젝트 설명 작성 예정]', tags: [], year: '20XX', mockup: null },
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
                {project.mockup && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-black/30 dark:text-white/30 group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
                    데모 보기
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                )}
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
