# Github Viewer

![Github](github.png)

Github의 인기 저장소 목록을 확인할 수 있고, Github 사용자 간의 프로필을 대결 구도로 비교해 볼 수 있는 웹 어플리케이션입니다.

## Installation

```sh
npm install
npm start
# Visit localhost:8080
```

## Caution

🚨 Github API 요청이 많아지면 제한될 수 있습니다. 그럴 경우, `/utils/data.json`을 Mock Data로 잠시 사용하세요.

## TODO

인기 저장소 목록을 확인할 수 있는 기능은 이미 구현되어 있습니다. 여러분의 임무는 Github 사용자 간의 대결 기능을 만드는 것입니다. 다음과 같은 기능이 가능하도록 구현해주세요.

- [V] 페이지 우측 상단의 Github User Battle을 눌렀을 경우, 정확히 2개의 Github 사용자 이름을 입력할 수 있는 칸이 보여야 합니다.
- [V] 2개의 사용자 이름을 입력하지 않은 경우, "Battle" 버튼이 보이지 않거나 비활성화 되어야 합니다.
- [V] 2개의 사용자 이름을 입력한 경우에만 "Battle" 버튼이 보여지거나 활성화 되어야 합니다.
- [V] "Battle" 버튼을 눌렀을 경우, 입력받은 2명의 Github 사용자 프로필을 비교하여 승자를 판별해야 합니다.
- [V] 승자 결과를 기다리는 동안에는 Loading 중이라는 메시지가 화면에 표시되어야 합니다.
- [V] 승자 판별 방식은 `utils/api`를 참고하세요.
- [V] 승자 판별에 대한 결과가 완료된 후에는 화면에 각 사용자에 대해 아래와 같은 상세 정보를 보여주어야 합니다.
  - 승패 여부
  - 프로필 사진
  - 점수
  - Github Username
  - 이름
  - 지역
  - Followers Count
  - Following Count
  - Repository Count
- [V] Popular -> Battle & Battle 진행 -> Popular -> Battle 순으로 진행한다면, 바로 이전에 진행한 배틀 결과 정보가 보여져야 합니다.
- [V] 클래스 기반 컴포넌트로 작업되어 있는 `<Loading />` 컴포넌트를 함수형 컴포넌트로 수정하세요.
- [V] `<Loading />` 컴포넌트에 대한 Unit Test를 보강하세요. (`/spec/Loading.spec.js`)
  - [Testing React Apps](https://jestjs.io/docs/en/tutorial-react)
  - [What is TDD?](docs/tdd.md)
- [V] 사용자가 Popular -> Battle -> Popular로 이동했을 경우, (존재한다면) 이전에 가져온 데이터를 이용해 렌더링할 수 있도록 최적화 시켜주세요.
- [V] 사용자가 Polular 페이지에서 데이터가 처리되기 전에 빠른 속도로 Battle 페이지로 이동한다면, 현재 오류가 발생하고 있습니다. 콘솔의 오류 메시지를 확인하고 수정해주시기 바랍니다.
