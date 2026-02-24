// localStorage에서 "score" 값을 가져옴
const score = Number(localStorage.getItem("score"));   // 정답 개수
const total = Number(localStorage.getItem("total"));   // 총 문제 수
const wrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers") ||"[]"); // 오답 문제 배열

/*점수 출력할 div*/ 
const scoreText = document.getElementById("scoreText");

const detailText = document.getElementById("detailText");

const wrongWrap = document.getElementById("wrongWrap");



if (!total){
    scoreText.textContent = "문제풀이 없음"
    detailText.textContent = "문제풀이를 진행해주세요."
    wrongWrap.innerHTML="";
}else{ 

    const percent = Math.round((score / total) * 100);

 // 4) 점수 출력

  scoreText.textContent = `${score} / ${total} (${percent}점)`;

  detailText.innerHTML = `
                          <div>총 문제: ${total}</div>
                          <span>정답: ${score}</span>
                          <span>오답: ${wrongAnswers.length}</span>
                         `;

//오답 출력
 if (wrongAnswers.length === 0) {
  wrongWrap.innerHTML = "<p>틀린 문제 없음</p>";
} else {

  let html = "";

  wrongAnswers.forEach(function(q, index) {
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

  wrongWrap.innerHTML = html;
}
}