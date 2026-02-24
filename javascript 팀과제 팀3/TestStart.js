// 기본 변수
let questions = [];
let currentIndex = 0;
let userAnswers = []; // 고른 답 저장
let timeLeft = 180;
let timerInterval;

// 타이머
window.onload = function(){
    startTimer(); // 타이머 시작
}
function startTimer(){
    timerInterval = setInterval(function(){
        timeLeft--;

        let minute = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if(seconds < 10){
            seconds = "0" + seconds;
        }
        document.getElementById("timer").innerText = minute + ":" + seconds;

        // 시간 끝났을때
        if(timeLeft <= 0){
            clearInterval(timerInterval);
            submitTest(); // 자동제출
        }
    }, 1000);
}

// JSON 불러오기
fetch("questions.json") // 서버에서 파일 가져오기
    .then(response => response.json()) // 가져온 파일을 JSON 형식으로 변환
    .then(data => {
        questions = data; // 변환된 데이터를 questions 변수에 저장
        showQuestion(); // 화면에 첫문제 출력
    });

// 문제 출력
function showQuestion(){
    let q = questions[currentIndex];

    document.getElementById("question").innerText = q.question;

    let options = document.querySelectorAll(".option");

    for(let i = 0; i < options.length; i++){
        options[i].innerText = q.options[i];

        if(userAnswers[currentIndex] === i){
            options[i].classList.add("selected");
        } else{
            options[i].classList.remove("selected");
        }
    }
}

// 보기 클릭하면 저장
function selectAnswer(index){
    userAnswers[currentIndex] = index;
    showQuestion();
}
// 다음 버튼
function nextQuestion(){
    if(currentIndex < questions.length - 1){
        currentIndex++;
        showQuestion();
    } else {
        alert("마지막 문제 입니다.")
    }
}
// 이전 버튼
function prevQuestion(){
    if(currentIndex > 0){
        currentIndex--;
        showQuestion();
    }
}
// 시험 종료 처리(localStorage : 데이터 저장)
function submitTest(){
    clearInterval(timerInterval);

    for(let i = 0; i < questions.length; i++){
        if(userAnswers[i] === undefined){ 
            let confirmSubmit = confirm("풀지 않은 문제가 있습니다. 제출하시겠습니까?");
            if(!confirmSubmit){
                return;
            }
            break;
        }
    }

    let score = 0;
    let wrongAnswers = [];

    for(let i = 0; i < questions.length; i++){ // 0번 문제부터 마지막 문제까지 검사
        if(userAnswers[i] === questions[i].answer){ // 맞으면 score++
            score++;
        } else{
            wrongAnswers.push({ // 틀리면 wrongAnswers에 저장
                question: questions[i].question,
                correct: questions[i].answer,
                user: userAnswers[i]
            });
        }
    }

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers));

    window.location.href = "result.html"; // 팀원4에게 넘기기
}