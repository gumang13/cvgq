// localStorage에서 저장된 정답 개수를 숫자로 가져옴
const score = Number(localStorage.getItem("score"));   

// localStorage에서 총 문제 수를 숫자로 가져옴
const total = Number(localStorage.getItem("total"));   

// localStorage에서 오답 배열을 가져오고 없으면 빈 배열로 설정
const wrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers") || "[]");


// 점수를 출력할 요소 가져오기
const scoreText = document.getElementById("scoreText");

// 상세 정보를 출력할 요소 가져오기
const detailText = document.getElementById("detailText");

// 오답 목록을 출력할 요소 가져오기
const wrongWrap = document.getElementById("wrongWrap");


// 문제를 풀지 않았을 경우 처리
if (!total){

    // 점수 영역에 안내 문구 출력
    scoreText.textContent = "문제풀이 없음";

    // 상세 영역에 안내 문구 출력
    detailText.textContent = "문제풀이를 진행해주세요.";

    // 오답 영역 비우기
    wrongWrap.innerHTML = "";

}else{ 

    // 퍼센트 점수 계산 (반올림)
    const percent = Math.round((score / total) * 100);

    // 점수 결과 출력
    scoreText.textContent = `${score} / ${total} (${percent}점)`;

    // 총 문제, 정답, 오답 개수 출력
    detailText.innerHTML = `
        <div>총 문제: ${total}</div>
        <span>정답: ${score}</span>
        <span>오답: ${wrongAnswers.length}</span>
    `;

    // 오답이 없으면 메시지 출력
    if (wrongAnswers.length === 0) {

        wrongWrap.innerHTML = "<p>틀린 문제 없음</p>";

    } else {

        // 오답 목록을 담을 HTML 문자열 생성
        let html = "";

        // 오답 배열을 하나씩 반복
        wrongAnswers.forEach(function(q, index) {

            // 각 오답 문제를 HTML로 만들어 누적
            html += `
              <div class="note">
                <h3>${index + 1}. ${q.question}</h3>

                <div class="list ${q.user === 0 ? 'my-answer' : ''} ${q.correct === 0 ? 'correct-answer' : ''}">
                  1. ${q.options[0]}
                </div>

                <div class="list ${q.user === 1 ? 'my-answer' : ''} ${q.correct === 1 ? 'correct-answer' : ''}">
                  2. ${q.options[1]}
                </div>

                <div class="list ${q.user === 2 ? 'my-answer' : ''} ${q.correct === 2 ? 'correct-answer' : ''}">
                  3. ${q.options[2]}
                </div>

                <div class="list ${q.user === 3 ? 'my-answer' : ''} ${q.correct === 3 ? 'correct-answer' : ''}">
                  4. ${q.options[3]}
                </div>

                <p class="answer-text">정답: ${q.correct + 1}번</p>
                <p class="explanation">해설: ${q.explanation}</p>
              </div>
            `;
        });

        // 완성된 HTML을 화면에 출력
        wrongWrap.innerHTML = html;
    }
}