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



      });

    const randomQ = [...data].sort(() => Math.random() - 0.5);

    const randomFive = randomQ.slice(0, 5);

    localStorage.setItem("random", JSON.stringify(randomFive));

    }
    
  });
