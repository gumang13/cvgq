// 페이지 로드 시 questions.json에서 초기 데이터 로드 (localStorage가 비어있을 때만)
fetch("questions.json")
  .then((res) => res.json())
  .then((data) => {
    // localStorage에 데이터가 없으면 questions.json 데이터로 초기화
    let qData = localStorage.getItem('questions');
    
    if (!qData) {
      // 처음 로드: questions.json 데이터 저장
      localStorage.setItem('questions', JSON.stringify(data));
      qData = JSON.parse(localStorage.getItem('questions'));
    } else {
      // 이미 있으면: 기존 localStorage 데이터 유지
      qData = JSON.parse(qData);
      console.log('기존 localStorage 데이터 사용');
    }

    if (qData) {
      const body = document.getElementById("questionBody");

      qData.forEach((item) => {
        const rows = document.createElement("tr");

        rows.innerHTML = `
        <td>${item.id + "."}</td>
        <td>${item.testName}</td>
        `;

        body.appendChild(rows);
      });

      // 랜덤 5개 선택 및 저장
      const randomQ = [...qData].sort(() => Math.random() - 0.5);
      const randomFive = randomQ.slice(0, 5);
      localStorage.setItem("random", JSON.stringify(randomFive));
      
      console.log('총 ' + qData.length + '개 문제 로드됨');
    }
  })
  .catch(err => {
    console.error('questions.json 로드 실패:', err);
    // 로드 실패 시 localStorage의 기존 데이터 사용
    const qData = JSON.parse(localStorage.getItem('questions') || '[]');
    if (qData.length > 0) {
      const body = document.getElementById("questionBody");
      qData.forEach((item) => {
        const rows = document.createElement("tr");
        rows.innerHTML = `
        <td>${item.id + "."}</td>
        <td>${item.testName}</td>
        `;
        body.appendChild(rows);
      });
    }
  });
