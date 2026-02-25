// 기본 변수
let questions = [];
let currentIndex = 0;
let userAnswers = []; // 고른 답 저장
let timeLeft = 180;
let timerInterval;

window.onload = function(){
    loadQuestions(); // 문제 로드
    startTimer(); // 타이머 시작
}

// localStorage에서 'random' 데이터 로드
function loadQuestions(){
    try {
        const randomData = localStorage.getItem('random');
        if(randomData){
            questions = JSON.parse(randomData);
            // 정답 인덱스 정규화: 질문 데이터가 1~4(1-based)를 쓴다면 0-based로 변환
            questions = questions.map(q => {
                const copy = Object.assign({}, q);
                if(copy.answer !== undefined && copy.answer !== null){
                    const a = Number(copy.answer);
                    if(!Number.isNaN(a)){
                        // 만약 1..4이면 0..3으로 변환, 이미 0..3이면 그대로 둠
                        if(a >= 1 && a <= 4) copy.answer = a - 1;
                        else copy.answer = a;
                    }
                }
                return copy;
            });
            showQuestion();
            console.log('localStorage에서 ' + questions.length + '개 문제 로드됨');
        } else {
            alert('문제 데이터를 찾을 수 없습니다. 먼저 시험을 준비해주세요.');
            window.location.href = '../team2/testList.html';
        }
    } catch(e){
        console.error('문제 로드 실패:', e);
        alert('문제를 불러올 수 없습니다.');
    }
}
// 타이머
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

// 문제 출력
function showQuestion(){
    if(questions.length === 0) return;
    
    let q = questions[currentIndex];

    // testName을 문제로 출력 (데이터 구조에 맞게)
    document.getElementById("question").innerText = q.testName || q.question || '';
    // 옵션 컨테이너를 찾아 내부를 동적으로 생성 (항목은 항상 4개)
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    const optionList = [q.option1, q.option2, q.option3, q.option4];
    for(let i = 0; i < 4; i++){
        const opt = document.createElement('div');
        opt.className = 'option';
        opt.innerText = optionList[i] || '';
        (function(index){
            opt.addEventListener('click', function(){ selectAnswer(index); });
        })(i);

        if(userAnswers[currentIndex] === i){
            opt.classList.add('selected');
        }

        optionsDiv.appendChild(opt);
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
        if(userAnswers[i] === questions[i].answer){ 
            score++;
        } else{
            let optionList = [questions[i].option1, questions[i].option2, questions[i].option3, questions[i].option4];
            wrongAnswers.push({  // 틀린 문제 저장 (정답/사용자 인덱스는 0-based)
                id: questions[i].id,
                testName: questions[i].testName,
                correct: typeof questions[i].answer === 'number' ? questions[i].answer : null,
                user: userAnswers[i] !== undefined ? userAnswers[i] : null,
                options: optionList,
                explanation: questions[i].explanation
            });
        }
    }

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers));

    window.location.href = "/team4/result.html"; // 팀원4에게 넘기기
}