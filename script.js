// Récupération des boutons
const addDataBtn = document.querySelector("#add__data__btn");
const modifyChartBtn = document.querySelector("#modify__chart__btn");

// Création de l'objet chartData
let chartData = {
  labels: [],
  datasets: [
    {
      label: "# valeurs",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Déclaration de la fonction createChart qui va permettre de construire un graphique
const createChart = (type, height = 400) => {
  const canvasContainer = document.querySelector("#canvas__container");
  canvasContainer.innerHTML = `<canvas id="chart"></canvas>`;
  canvasContainer.style.height = `${height}px`;

  const ctx = document.querySelector("#chart").getContext("2d");
  return new Chart(ctx, {
    type: type,
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      onClick: (e, activeElements) => {
        if (activeElements.length > 0) {
          const { datasetIndex, index } = activeElements[0];
          removeData(datasetIndex, index); // Appel de la fonction removeData
        }
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
      },
    },
  });
};

let myChart = createChart("bar"); // Appel de la fonction create Chart qui va créér un graphique par défaut

// Déclaration de la fonction addData qui va permettre d'ajouter des données au graphique
const addData = () => {
  const labelInput = document.querySelector("#label__input");
  const dataInput = document.querySelector("#data__input");

  if (labelInput.value && dataInput.value) {
    chartData.labels.push(labelInput.value);
    chartData.datasets.forEach((dataset) => {
      dataset.data.push(dataInput.value);
    });
    myChart.update(); // Mise à jour du graphique
    labelInput.value = "";
    dataInput.value = "";
  }
};

// Déclaration de la fonction updateChartType qui va permettre de modifier le type de graphique
const updateChartType = () => {
  const selectedType = document.querySelector("#chart__type").value;
  myChart.destroy(); // Destruction de l'ancien graphique
  myChart = createChart(selectedType); // Appel de la fonction createChart
};

// Déclaration de la fonction removeData qui va permettre de supprimer des données du graphique
const removeData = (datasetIndex, index) => {
  if (chartData.labels.length > index) {
    // Utilisation de la méthode splice() afin de modifier le contenu du tableau labels
    chartData.labels.splice(index, 1);
    chartData.datasets[datasetIndex].data.splice(index, 1);
    myChart.update(); // Mise à jour du graphique
  }
};

// Ecoute des événements "click" et sur les boutons et appel des fonctions
addDataBtn.addEventListener("click", addData);
modifyChartBtn.addEventListener("click", updateChartType);
