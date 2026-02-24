fetch("questions.json")
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem("questions", JSON.stringify(data));

    const qData = JSON.parse(localStorage.getItem("questions"));

    if (qData) {
      const body = document.getElementById("questionBody");

      qData.forEach((qData) => {
        const rows = document.createElement("tr");

        rows.innerHTML = `
        <td>${qData.id + "."}</td>
        <td>${qData.testName}</td>
        `;

        body.appendChild(rows);

        const randomQ = qData[Math.floor(Math.random()*qData.length)];

        localStorage.setItem("random",JSON.stringify(randomQ));
        
        const question = JSON.parse(localStorage.getItem("random"));

console.log(question.testName);

      });
    }
  });
