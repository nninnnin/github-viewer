# Github Viewer

Github의 인기 저장소 목록을 확인할 수 있고, Github 사용자 간의 프로필을 대결 구도로 비교해 볼 수 있는 웹 어플리케이션입니다.

## Installation

```sj
npm install or yarn install
npm start or yarn start
```

## TODO

인기 저장소 목록을 확인할 수 있는 기능은 이미 구현되어 있습니다. 여러분의 임무는 Github 사용자 간의 대결 기능을 만드는 것입니다. 다음과 같은 기능이 가능하도록 구현해주세요.

1. 페이지 우측 상단의 Github User Battle을 눌렀을 경우, 정확히 2개의 Github 사용자 이름을 입력할 수 있는 칸이 보여야 합니다.
2. 2개의 사용자 이름을 입력하지 않은 경우, "Battle" 버튼이 보이지 않아야 합니다.
3. 2개의 사용자 이름을 입력한 경우, "Battle" 버튼이 보여야 합니다.
4. "Battle" 버튼을 눌렀을 경우, 입력받은 2명의 Github 사용자 프로필을 비교하여 승자를 판별해야 합니다.
5. 승자 결과를 기다리는 동안에는 Loading 중이라는 메시지가 화면에 표시되어야 합니다.
6. 승자 판별에 대한 결과가 완료된 후에는 화면에 각 사용자에 대해 아래와 같은 상세 정보를 보여주어야 합니다.
  - 승패 여부
  - 프로필 사진
  - 점수
  - Github Username
  - 이름
  - 지역
  - Followers Count
  - Following Count
  - Repository Count
7. 승자 판별 방식은 `utils/api`를 참고하세요.
8. 사용자가 만약 Popular Repositories로 이동한다면, 사용자 정보는 모두 초기화 되어야 합니다.
9. 마지막으로 `Loading` 컴포넌트를 함수형 컴포넌트로 수정하세요.
10. 위 Todo가 모두 완료되었다면, Jest를 이용한 React 컴포넌트 단위 테스트(Unit Test)에 대해 조사해보시고 작성해보세요.
  - [Testing React Apps](https://jestjs.io/docs/en/tutorial-react)
