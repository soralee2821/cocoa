#구현과정 상세 설명

## 1단계
[V] fs.readFile을 사용해서 txt 파일 읽기
[V] switch문을 사용해서 string을 숫자로 바꾸기
[V] startswith를 사용하여 Stage 명과 구분선 걸러주기
[V] 숫자로 바꾼 값을 2차원 배열에 저장하기
[V] 가로길이 : 2D 배열 내 1D 배열의 length들을 비교하여 max 값 구하기 (map, max 사용)
[V] 세로길이 : 2D 배열의 length 값
[V] 구멍의 수 : forEach를 사용하여 2D 배열 내 1의 갯수 세기 (includes, reduce 사용)
[V] 공의 수 : forEach를 사용하여 2D 배열 내 2의 갯수 세기 (includes, reduce 사용)
[V] 플레이어 위치 : forEach를 사용하여 2D 배열에서 3을 포함하는 1D 배열 찾기 (includes, indexOf 사용)

## 2단계
[V] Stage 2만 출력하기 (includes 사용)
[V] 사용자 입력 받기 (readline 사용)
[V] switch문을 사용해서 입력명령 구분하기
[V] 하나 이상의 명령을 받은 경우 순서대로 처리하기 (if 조건문, forEach문 사용)
[V] 이동한 위치가 벽, 공, 구멍이 아닌 경우, 플레이어를 이동시키기 (이동했을 때 위치가 ' '인 경우에만 실행)
[V] 이동한 위치가 벽, 공, 구멍인 경우, 에러메세지 출력하기 (if else 구문으로 구분)
[V] 플레이어가 이동한 이후 지도 출력하기 (for 문, join 사용)
[V] 'q' 또는 'Q'를 입력했을 때 창 닫기 (readline.close 사용)


## 3단계
[V] map.txt파일에 단계별 stage 추가하기
[V] 단계별로 stage를 선택하는 함수로 수정하기 (stageLevel 변수 추가)
[V] stage 1을 prompt와 같이 나타내기
[V] 플레이어가 공을 미는 기능 추가하기 (changePlayerPosition 함수와 changeBallPosition 함수로 나눔)
[V] resert 명령 추가하기 (stageMap과 currentMap을 구분하여 stageMap으로 초기화, JSON.stringfy와 parse 사용)
[V] 공이 다음 위치에서 구멍을 만나면 0으로 변하도록 만들기 (changeBallPosition 함수에서 적용)
[V] 0을 밀면 공과 구멍이 분리되는 기능 추가하기 (0 다음 방향에 벽이나 공이 없을 경우에만 적용)
[V] 처음 시작할 때, 구멍의 갯수와 score 구하기 (getValueCount 함수 만듬)
[V] 공이 0에 들어갈 때마다 score를 더해주기 (changeBallPosition함수에서 적용)
[ ] 구멍의 갯수와 score가 같을 때 다음 stage로 넘어가게 만들기
[V] 플레이어가 움직일 때마다 turnCount 세기
[ ] 마지막 stage도 클리어하면 축하메세지를 출력하고 게임 종료하기