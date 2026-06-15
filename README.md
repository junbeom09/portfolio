# Portfolio — 조준범 (CHO JUN-BEOM)

프론트엔드 개발자 개인 포트폴리오. 단일 페이지(스크롤형)에 소개·프로젝트·스킬·연락처를 담았습니다.

🔗 **Live** — https://junbeom09.com/

## ✨ 특징

- **미니 터미널 인트로** — Hero에서 명령이 한 줄씩 타이핑되며 자기소개가 출력됩니다.
- **인터랙티브 스킬 데모** — 직접 만져보는 4종 데모:
  - 반응형(손잡이를 끌면 폭이 바뀌며 레이아웃이 실시간 전환)
  - UI 컴포넌트(색·라운드·레이아웃 실시간 커스터마이즈)
  - 인터랙션(마그네틱 · 틸트 · 태그 입력 · 카운트업)
  - 상태 관리(장바구니 + 주문 완료 모달)
- **프로젝트 목업** — 각 프로젝트의 실제 화면을 정적 목업으로 재현해 새 탭에서 둘러볼 수 있고, 강조 영역에 마우스를 올리면 어떤 기술로 구현했는지 설명이 표시됩니다.
- framer-motion 등장 애니메이션 · 커서 스포트라이트 · 다크모드 대응.
- **🔦 숨은 다크모드** — 사이트 어딘가의 **불을 끄면** 다크모드로 바뀌어요. 어디 있는지는… 직접 찾아보세요 😉

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
| **마음단짝 관리자 콘솔** | 광역·기관·상담사 권한별 운영 관리 콘솔 (서울 자치구 지도·운영 통계) | React · TypeScript · Recharts · Zustand |
| **wmux (오픈소스 기여)** | Electron 기반 터미널 멀티플렉서에 버그 수정 PR 기여·머지 | TypeScript · Electron |
| **마인드룸 어드민** | 기관·부스·장비·상담 세션 통합 관리자 | Next.js · TypeScript · Tailwind · Recharts |
| **뉴진스 (NEWjinS)** | 뉴스 크롤링·군집화 기반 뉴스레터 + 가짜뉴스 판별 | React · Spring Boot · MySQL · PyTorch |
| **Artistry** | 미술 프리랜서·의뢰자 매칭 플랫폼 | JSP/Servlet · Java · Oracle · MyBatis |

> 각 프로젝트 카드를 누르면 실제 화면 목업이 새 탭으로 열립니다. (일부 프로젝트는 비공개 저장소라 소스 링크가 제공되지 않습니다.)

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
│   ├── Navbar / Hero / About / Projects / Skills / Contact / Footer
│   ├── CursorSpotlight    # 커서 스포트라이트
│   └── skills/            # 스킬별 인터랙티브 데모
├── context/ThemeContext   # 다크모드 컨텍스트
└── index.css
public/mockups/            # 프로젝트별 정적 목업 (제작 설명 오버레이 포함)
```
