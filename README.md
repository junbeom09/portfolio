# Portfolio — 조준범 (CHO JUN-BEOM)

프론트엔드 개발자 개인 포트폴리오. 단일 페이지(스크롤형)로 소개·스킬·프로젝트·연락처를 담았습니다.

## ✨ 특징

- **인터랙티브 스킬 데모** — 반응형 / 컴포넌트 / 인터랙션(마그네틱·틸트·태그 입력·카운트업) / 상태 관리를 실제 동작으로 시연
- **프로젝트 목업** — 각 프로젝트의 실제 화면을 정적 목업으로 재현해 새 탭에서 바로 둘러볼 수 있음
- **제작 설명 오버레이** — 목업의 주요 영역에 마우스를 올리면 어떤 기술로 구현했는지 설명이 표시됨
- 부드러운 등장 애니메이션(framer-motion) · 커서 스포트라이트 · 다크모드 대응 스타일

## 🛠 기술 스택

| 구분 | 내용 |
|------|------|
| 프레임워크 | React 19 · Vite |
| 스타일 | Tailwind CSS |
| 애니메이션 | framer-motion |
| 아이콘 | lucide-react |
| 배포 | Vercel |

## 📂 수록 프로젝트

| 프로젝트 | 설명 | 스택 |
|----------|------|------|
| **마인드룸 어드민** | 기관·부스·장비·상담 세션 통합 관리자 | Next.js · TypeScript · Tailwind · recharts |
| **뉴진스 (NEWjinS)** | 뉴스 크롤링·군집화 기반 뉴스레터 + 가짜뉴스 판별 | React · Spring Boot · MySQL · PyTorch |
| **Artistry** | 미술 프리랜서·의뢰자 매칭 플랫폼 | JSP/Servlet · Java · Oracle · MyBatis |

> 각 프로젝트 카드를 누르면 실제 화면 목업이 새 탭으로 열리고, 화면 안의 강조 영역에 마우스를 올리면 제작 방식 설명이 나옵니다.

## 🚀 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 (dist/)
npm run preview
```

## 📁 구조

```
src/
├── App.jsx                # 섹션 구성
├── components/
│   ├── Navbar / Hero / About / Skills / Projects / Contact / Footer
│   ├── CursorSpotlight    # 커서 스포트라이트
│   └── skills/            # 스킬별 인터랙티브 데모
├── context/ThemeContext   # 다크모드 컨텍스트
└── index.css
public/mockups/            # 프로젝트별 정적 목업 (제작 설명 오버레이 포함)
```
