import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const projects = [
  {
    id: 6,
    title: '마음단짝 관리자 콘솔',
    desc: '서울시 청소년 상담·기관 운영을 위한 권한 기반 관리자 콘솔. 광역·기관·상담사 권한에 따라 대시보드·상담 내역·계정 관리 화면이 갈리며, 서울 자치구 지도와 통계 차트로 운영 현황을 시각화합니다.',
    tags: ['React', 'TypeScript', 'Recharts', 'Zustand'],
    year: '2026',
    mockup: '/mockups/maeumdanjjak/index.html',
    thumb: '/project-thumbs/maeumdanjjak.png',
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
    id: 1,
    title: '마인드룸 어드민',
    desc: '마인드룸 상담 서비스의 내부 관리자 대시보드. 기관·부스·장비(미니PC·LTE 라우터)·상담 세션을 통합 관리하고, 지역·성별·연령·고민별 상담 통계를 차트로 제공합니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    year: '2026',
    mockup: '/mockups/helpteacher/index.html',
    thumb: '/project-thumbs/mindroom.png',
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
]

function ProjectRow({ project, index, inView }) {
  const left = index % 2 === 0 // 텍스트가 왼쪽이면 이미지는 오른쪽
  const clickable = project.mockup || project.link
  const open = () => {
    const dest = project.mockup || project.link
    if (dest) window.open(dest, '_blank', 'noopener,noreferrer')
  }

  const Text = (
    <div className={`flex flex-col justify-center ${left ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
      {/* 모바일에서만 연도 표시 (데스크톱은 타임라인 노드에) */}
      <span className="md:hidden font-mono text-xs text-black/30 dark:text-white/30 mb-2">{project.year}</span>
      <h3 className="font-black text-black dark:text-white text-2xl md:text-3xl tracking-tight mb-3 leading-tight">
        {project.title}
      </h3>
      <p className="text-black/45 dark:text-white/40 text-sm md:text-[15px] leading-relaxed max-w-md mb-4">
        {project.desc}
      </p>
      <div className={`flex flex-wrap gap-1.5 mb-5 ${left ? '' : 'md:justify-end'}`}>
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 bg-black/[0.05] dark:bg-white/[0.06] border border-black/8 dark:border-white/8 text-black/55 dark:text-white/50 rounded-md">
            {tag}
          </span>
        ))}
      </div>
      <div className={`flex items-center gap-4 ${left ? '' : 'md:flex-row-reverse'}`}>
        {clickable && (
          <button
            onClick={open}
            className="group/btn flex items-center gap-1.5 text-sm font-semibold text-black dark:text-white"
          >
            {project.mockup ? '데모 보기' : 'PR 보기'}
            <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 저장소"
            className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            <GithubIcon />
          </a>
        )}
      </div>
    </div>
  )

  // 이미지: 카드 없이 반투명. 데스크톱은 텍스트 쪽으로 페이드, 모바일은 마스크 없이 통째로.
  const fadeDir = left ? 'to left' : 'to right' // 텍스트(가운데)쪽으로 사라지게
  const mask = `linear-gradient(${fadeDir}, transparent 0%, rgba(0,0,0,0.3) 14%, #000 45%)`
  const Image = (
    <div
      onClick={open}
      className={`group/img relative w-full ${clickable ? 'cursor-pointer' : ''}`}
      style={{ '--mask': mask }}
    >
      <img
        src={project.thumb}
        alt={project.title}
        loading="lazy"
        className="w-full h-auto object-contain rounded-xl opacity-65 group-hover/img:opacity-90 transition-all duration-500 group-hover/img:scale-[1.03] [-webkit-mask-image:none] [mask-image:none] md:[-webkit-mask-image:var(--mask)] md:[mask-image:var(--mask)]"
        style={{
          filter: project.lightenThumb ? 'brightness(1.7) saturate(0.9)' : undefined,
        }}
      />
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative md:grid md:grid-cols-2 md:gap-16 items-center"
    >
      {/* 타임라인 노드 + 연도 (가운데 라인 위) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex-col items-center">
        <span className="w-3.5 h-3.5 rounded-full bg-black dark:bg-white ring-4 ring-[#f9f9f7] dark:ring-[#0a0a0a]" />
        <span className="mt-2 font-mono text-[11px] text-black/35 dark:text-white/35 whitespace-nowrap">{project.year}</span>
      </div>

      {/* 모바일: 항상 이미지 위 → 텍스트 아래로 통일.
          데스크톱(md+): 지그재그 — left면 텍스트가 왼쪽(먼저), right면 이미지가 왼쪽(먼저) */}
      <div className={`order-1 ${left ? 'md:order-2' : 'md:order-1'}`}>{Image}</div>
      <div className={`order-2 ${left ? 'md:order-1' : 'md:order-2'}`}>{Text}</div>
    </motion.div>
  )
}

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
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <span className="font-mono text-black/25 dark:text-white/20 text-xs tracking-widest uppercase">Projects</span>
          <span className="font-mono text-black/15 dark:text-white/15 text-xs">{projects.length} works</span>
        </motion.div>

        <div className="relative">
          {/* 가운데 세로 타임라인 라인 (데스크톱) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-black/[0.1] dark:bg-white/[0.1]" />

          <div className="flex flex-col gap-16 md:gap-24">
            {projects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
