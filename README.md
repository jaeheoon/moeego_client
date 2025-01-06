# 프로젝트 선정 이유
- 모이고 프로젝트는 서비스를 이용하려는 고객을 특정 분야의 전문가의 "달인"을 매칭시켜 주는 중개 플랫폼입니다. 사용자는 달인의 서비스와 일정을 확인하고 간편하게 예약할 수 있으며, 리뷰와 커뮤니티 게시판을 통해 소통할 수 있습니다. 다양한 API 연동으로 확장성을 제공하며, 관리자 페이지로 효율적인 운영을 할 수 있습니다.

# 프로젝트 소개
- 프로젝트 유형
  - [숨고](https://soomgo.com) 클론 코딩
- 목표
  - 기존 플랫폼 기능을 분석하고 재구현
  - 기존 플랫폼의 고수 신청 및 서비스 등록 개선
- 주요 기능
  - 달인 찾기기능
  - 예약 시스템
  - 커뮤니티 시스템
  - 관리자 페이지
- 개발 기간
  - 총 7주(24.11 3주차 ~ 24.12 4주차)

# 스케줄 캘린더
![image](https://github.com/user-attachments/assets/6cc62017-457a-4aa9-b4cb-7c871b1e4bfd)

# 역할 분담 및 협업 과정
- 백엔드 역할
   - 효율적 DB 설계
   - REST API 개발
   - BE CI/CD 구축
- 프론트 역할
   - React 기반 UI 설계 및 요청
   - 데이터 연동
   - 반응형 웹 구현
   - 통합 요청 API 개발
   - FE CI/CD 구축
- 협업 방식
   - 일일 스탠드업 회의로 진행사항 공유
   - GitHub 브랜치 전략
     - issue 생성 (feat, ref, fix)
     - 완성 후 pull & request 작성
     - FE, BE 팀장 확인 후 MERGE 진행

# 기술 스택
- FE
  - HTML5
  - CSS3
  - JavaScript
  - React
  - node.js
- BE
  - MySQL
  - Springboot
  - JPA
  - PostMan
- SERVER
  - NaverCloudPlatform
  - Jenkins
  - Docker
- COLLABO
  - Git
  - GitHub
  - Figma
  - Notion
  - ERD Cloud

# 설계와 구현 과정
- 기능요구사항 분석
- USECASE 작성 (사용자, 달인, 관리자)
- 페이지 백로그 작성 (페이지 별 요청 url, 방식 통일)
- Figma 웹 페이지 디자인
- ERD Cloud 테이블 설계
  - ![image](https://github.com/user-attachments/assets/22ea8df6-5f1f-461c-9973-3947f24dcb7e)
- 아키텍처 설계 및 기능 구현 (서비스 요청 경로 및 처리 과정)
- CI/CD 배포 과정
  - ![image](https://github.com/user-attachments/assets/9fd3c419-b171-46f1-b653-79e1eb90ef9a)

# 주요 기능
- 달인찾기
  - 카카오 MAP API
  - 필터 기능(서비스, 지역, 키워드)
- 예약하기
  - 자체 캘리너 API
- 커뮤니티
  - 게시판 기능(글,댓글,대댓글,맨션,공유)
- 회원관리
  - 회원가입
  - 로그인
  - 이메일 검증
  - JWT
  - 관리자 페이지

# 트러블 슈팅
## API 응답 통일
- 문제 제기
  - 기존 API 응답 형식이 일관되지 않아 클라이언트와 서버간의 통신에서 혼란 발생
- 해결 방법
  - API 응답을 하나의 통일된 형식으롤 제공하는 ApiResponse 클래스 생성 응답 방식 통일 
- ![image](https://github.com/user-attachments/assets/50bf0a3c-1f33-402d-89ba-fc9a157a3661)
- ![image](https://github.com/user-attachments/assets/abf362b3-4bca-4ff9-a4bf-9dc0991c3fd7)
## 서버 보안 위협 및 대응 사례
- 문제 발생 및 원인
  - 서버 중단 형상 발견
    - 배포 후 하루만에 NCP 서버가 예기치 않게 중단 되는 문제 발생
- NCP 시큐리티 모니터링 서비스 로그 확인
  - NCP 시큐리티 로그 확인 및 분석 결과 외부로부터 SSH(22port) 접근 시도 및 네트워크 스캔 발생, 서버가 Malware 바이러스에 감염된 것으로 확인
- 해결 방법
  - 서버 재생성
    - 감연된 기존 서버 반납 후, 새로운 NCP 서버 생성 초기 상태에서 재배포
  - 네트워크 ACL 설정 강화
    - 새로운 ACL 설정에서 SSH 접근 차단 정책 설정 및 외부 포트 차단 설정
  - 공인 IP 설정 변경
    - 서버의 직접 IP 노출을 방지하기 위해 NCP LoadBalencer 설정 후 로드밸런서의 공인 IP를 통해 외부에 직접적으로 노출되지 않도록 보안 강화


