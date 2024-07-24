## 🍴 먹자VIEW

기존 식당 리뷰들을 유저의 취향에 맞게 분석 및 요약하여 제공하는 모바일 웹앱 서비스입니다.

[시연영상 바로가기](https://youtu.be/qf9TtJx6p64?si=TtyZKVVj3oJLv3M_t=759)

<br/>

## 👫 팀 소개

프론트엔드: [이승주](https://github.com/sj102300)

백엔드: [안치원](https://github.com/dh5252)

AI: [정한이](https://github.com/jeonghani) / [권현욱](https://github.com/)

<br/>


## 📜 프로젝트 소개

<img width="405" alt="화면 캡쳐" src="https://github.com/user-attachments/assets/382e4a9f-2779-444b-8316-bbed4c84e868">

- 개발 동기 및 서비스 기획
    
  기존에는 식당을 선택하기 위해 나와 잘 맞는 식당인지 판단하려면 수많은 리뷰들을 꼼꼼하게 읽어야한다는 불편한 점이 있었습니다.
  그래서 이를 생성형 AI를 이용하여 맛/분위기/서비스/가성비 네가지 기준으로 분류한 유저의 취향에 맞게 분석 및 요약한 리뷰들을 제공하는 서비스를 기획했습니다.
    
- 기능 명세
    1. 회원가입/로그인 기능
    2. 프로필 사진 카툰화
    3. GPS 기반의 지도로 유저 근처의 식당 위치 파악
    4. 목록 보기에서 유저가 좋아할만한 식당 순으로 제공
    5. 식당 및 태그 검색 기능
    6. 요약된 리뷰 확인
    7. 회원 정보 수정 가능한 마이페이지
    8. 댓글 기능
    9. 식당 찜 기능

<br/>


## 💻 사용 기술 및 개발 과정

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>
<img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariaDB&logoColor=white"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>


<img width="600" alt="파이프라인" src="https://github.com/user-attachments/assets/46c97841-ad0b-4ccb-a9d8-2017fa10e52b">

- React.ts를 이용해, 모바일에 최적화된 웹앱으로 개발 → Nginx를 이용해 호스팅
- Flask와 Spring을 이용해 API 서버 구축 / MariaDB로 CRUD 구성
- Docker로 구성 서비스들을 컨테이너화 → Github Actions와 dockerhub로 CI/CD 구축 → GCP로 배포

