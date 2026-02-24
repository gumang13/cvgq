fetch("questions.json")
  .then((res) => res.json()) 
  .then((data) => {
    localStorage.setItem("questions", JSON.stringify(data));

    const qData = JSON.parse(localStorage.getItem("questions"));

    if (qData) {
      const body = document.getElementById("questionBody");
      
      qData.forEach((qData) => {
        const rows = document.createElement("tr");
        // tr 태그를 생성해서 rows 변수에 저장
        rows.innerHTML = `
        <td>${qData.id + "."}</td>
        <td>${qData.testName}</td>
        `;//tr 태그 안에 td 태그를넣고
        // 각 td태그안에 qData에 id 와 testname을 넣는다
        body.appendChild(rows);
        //rows(tr) 를 body 변수 안에 추가한다 
      });

      const randomQ = [...data].sort(() => Math.random() - 0.5);

      const randomFive = randomQ.slice(0, 5);

      localStorage.setItem("random", JSON.stringify(randomFive));
    }
  });
