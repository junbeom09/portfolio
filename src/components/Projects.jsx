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
    thumb: '/project-thumbs/mindroom.png',
  },
  {
    id: 5,
    title: 'wmux — 오픈소스 기여',
    desc: '터미널 멀티플렉서 wmux(Electron · TypeScript)에 기여했습니다. 한국어 사용자명에서 토큰 파일 권한이 잠기는 보안 버그를 직접 재현·해결하고, 패키징 빌드에서 브라우저 도구가 잘못된 DOM을 읽는 버그를 원인 분석부터 테스트까지 수정해 머지했습니다.',
    tags: ['TypeScript', 'Electron', 'Open Source', 'Bug Fix'],
    year: '2026',
    github: 'https://github.com/openwong2kim/wmux',
    link: 'https://github.com/openwong2kim/wmux/pulls?q=is%3Apr+author%3Ajunbeom09',
    thumb: '/project-thumbs/wmux.png',
    lightenThumb: true,
    contribution: true,
  },
  {
    id: 2,
    title: '뉴진스 (NEWjinS)',
    desc: '뉴스 크롤링과 DBSCAN 군집화 기반 뉴스레터 자동화 서비스. 머신러닝(KoBERT·KoBART)으로 가짜뉴스 판별·본문 요약을 제공하고, 언론사 구독과 카테고리별 모아보기를 구현했습니다.',
    tags: ['React', 'Spring Boot', 'MySQL', 'PyTorch'],
    year: '2024',
    mockup: '/mockups/newjins/index.html',
    github: 'https://github.com/junbeom09/codequad',
    thumb: '/project-thumbs/newjins.png',
  },
  {
    id: 3,
    title: 'Artistry',
    desc: '미술 프리랜서와 의뢰자를 연결하는 매칭 플랫폼. 작품 포트폴리오 게시와 카테고리 탐색, 1:1 채팅 의뢰, 카카오페이 결제, 소셜 로그인을 제공합니다.',
    tags: ['JSP/Servlet', 'Java', 'Oracle', 'MyBatis'],
    year: '2024',
    mockup: '/mockups/artistry/index.html',
    github: 'https://github.com/junbeom09/Artistry',
    thumb: '/project-thumbs/artistry.png',
  },
  { id: 4, title: 'Project 4', desc: '[프로젝트 설명 작성 예정]', tags: [], year: '20XX', mockup: null, thumb: null },
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

        <div className="flex flex-col gap-3 md:gap-4">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => {
                const dest = project.mockup || project.link
                if (dest) window.open(dest, '_blank', 'noopener,noreferrer')
              }}
              className={`group relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111] overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-lg ${project.mockup || project.link ? 'cursor-pointer' : ''}`}
            >
              {/* 배경 이미지 (타이틀 영역 아래부터) */}
              {project.thumb && (
                <>
                  <div className="absolute inset-x-0 bottom-0 top-20 md:top-24 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-cover bg-top group-hover:scale-105 transition-all duration-500 ${project.lightenThumb ? 'opacity-50 group-hover:opacity-55' : 'opacity-60 group-hover:opacity-75'}`}
                      style={{
                        backgroundImage: `url(${project.thumb})`,
                        transformOrigin: 'bottom',
                        filter: project.lightenThumb ? 'brightness(1.85) saturate(0.85)' : undefined,
                      }}
                    />
                  </div>
                  {/* 가독성용 그라데이션 오버레이 */}
                  <div className={`absolute inset-x-0 bottom-0 top-20 md:top-24 bg-gradient-to-r dark:from-[#111] dark:via-[#111]/80 dark:to-[#111]/20 ${project.lightenThumb ? 'from-white via-white/85 to-white/40' : 'from-white via-white/80 to-white/20'}`} />
                  {/* 상단 텍스트 보호용 세로 그라데이션 */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent dark:from-[#111] dark:via-[#111]/70" />
                </>
              )}

              {/* 콘텐츠 */}
              <div className={`relative p-6 md:p-9 flex flex-col justify-between ${project.thumb ? 'min-h-[320px] md:min-h-[400px]' : 'min-h-[200px]'}`}>
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-black/25 dark:text-white/25 text-sm">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-bold text-black dark:text-white text-xl md:text-2xl tracking-tight">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub 저장소"
                          onClick={(e) => e.stopPropagation()}
                          className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {(project.mockup || project.link) && (
                        <span className="flex items-center gap-1 text-xs font-medium text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">
                          {project.mockup ? '데모 보기' : 'PR 보기'}
                          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-black/45 dark:text-white/40 text-sm md:text-[15px] leading-relaxed max-w-2xl pl-7">
                    {project.desc}
                  </p>
                </div>

                <div className="flex items-end justify-between pl-7 mt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.length > 0
                      ? project.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-1 bg-black/[0.05] dark:bg-white/[0.07] border border-black/8 dark:border-white/8 text-black/55 dark:text-white/50 rounded-md backdrop-blur-sm">
                            {tag}
                          </span>
                        ))
                      : <span className="text-xs text-black/20 dark:text-white/20 italic">태그 추가 예정</span>
                    }
                  </div>
                  <span className="font-mono text-black/25 dark:text-white/25 text-sm">{project.year}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
