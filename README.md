# 전자 상거래 중간 프로젝트 
- 기관: 한국 품질 재단, 티맥스 클라우드 - 클라우드 네이티브 개발자 양성 과정
- 구성 인원: 4명(FE 2명, BE 2명)
- **본인 역할**: `BE`
- [백엔드 문제 해결 과정]()

## 전자 상거래 요구사항
0. 조별 프로젝트
1. 요구사항 정의서 작성
2. 기능 명세서 작성
3. 사용자 시나리오 또는 유스케이스 작성
4. API 설계서 작성 
    - RESTful API
    - GET/POST/PUT/DELETE 구현 
        - 전체 조회, 개별 조회 (by ID, Date, Keyword)
5. 필수 기능 
    - Spring Boot Swagger를 통한 API Doc 생성
    - 사용자 등록/인증
    - 사용자) 상품 조회, 상세보기, 장바구니, 구매하기, 결제하기, 주문 상품 조회, 각 목록의 페이징 처리
    - 관리자) 사용자의 기능 + 상품 등록 + 주문 된 상품 상태 변경 + 결제 내역 확인
    - Backend) Spring Boot + Spring Cloud + Kafka 사용 
    - Frontend) React 사용
6. 간단한 UI 추가 
7. 모듈 프로젝트 마지막 날
    - 상품 DB(데이터) 제공 
    - 제공 된 상품 DB로 구현된 요소 변경 해야 함 (UI 제외)
    - 제공 된 상품 DB로 검색 기능 검증 
    - AWS로 Migrate 작업 (EC2 + RDS)

## 주제
Spring Boot, Spring Cloud, Kafka, React를 활용하여 책을 주제로 한 온라인 서점 개발

## 목적
- MSA 구조 온라인 서점 개발을 하며 MSA 기초 경험
- 설계부터 배포까지 웹 개발 사이클 간접적 경험
- 협업 능력 향상
  - API 설계서를 통한 프론트엔드와 협업
  - 이슈 처리 시 동료와 함께 해결
  - 일정 관리, 역할 분담, 협업 툴(Github, google spreadsheet, presentation, freedcamp 등)
- AWS에 컨테이너 기반 Micro Service 배포

## 설계 문서
- [설계 문서](https://docs.google.com/spreadsheets/d/1RMjJhBACs4M5Lf2PFYwSV22JbhALD7Ir3AbgMmGk_lA/edit?usp=sharing)
  - 요구사항 정의서
  - API 설계서
- [화면 설계서](https://docs.google.com/presentation/d/1tjjttfJEs4hcG_XkakWIzEYK-_Jn_Pw7wDECue57YrU/edit?usp=sharing)
- [버전 관리](https://github.com/jjiiiiinie/Module_pjt3_Group1)

## 개발 일정
![image](https://user-images.githubusercontent.com/42633180/135300809-d2ffea27-ee8f-4214-84d0-6ade4f23df93.png)

## 구조
![image](https://user-images.githubusercontent.com/42633180/135304814-16436f30-7e7e-4556-8222-81b123067313.png)

## 환경
### 프론트엔드
- Programming Language: HTML, CSS/SCSS, JS
- Web: Node.js 14.17.6, React(17.0.2), Axios(0.21.1)

### 백엔드
- Programming Language: Java 11
- Web: Spring Boot 2.5.x, Spring Cloud
- Container Platform : Docker 20.10.x
- Cloud: AWS(EC2) Amazone-Linux
- Database: AWS RDS MariaDB
- ETC: Kafka 2.7.0, RabbitMQ 3.9


